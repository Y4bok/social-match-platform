import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as speakeasy from "speakeasy";
import { TRPCError } from "@trpc/server";
import { 
  createOrUpdateUserProfile, 
  getUserProfile, 
  createOrUpdateTwoFactorAuth, 
  getTwoFactorAuth,
  logAuthAction,
  getOrCreateConversation,
  addMessage,
  getConversationMessages,
  addLike,
  checkMutualLike,
  createMatch,
  recordAgreement,
  createContactSubmission,
  logCaptchaValidation,
  getUserByOpenId,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),

    // 2FA Setup
    setup2FA: protectedProcedure.mutation(async ({ ctx }) => {
      const secret = speakeasy.generateSecret({
        name: `SocialMatch (${ctx.user.email})`,
        issuer: "SocialMatch",
        length: 32,
      });

      // Generate backup codes
      const backupCodes = Array.from({ length: 10 }, () =>
        Math.random().toString(36).substring(2, 10).toUpperCase()
      );

      await createOrUpdateTwoFactorAuth(ctx.user.id, {
        secret: secret.base32,
        backupCodes,
        isEnabled: false,
      });

      return {
        qrCode: secret.otpauth_url,
        backupCodes,
        secret: secret.base32,
      };
    }),

    // Verify 2FA code
    verify2FA: protectedProcedure
      .input(z.object({ code: z.string(), enableIt: z.boolean().optional() }))
      .mutation(async ({ ctx, input }) => {
        const twoFA = await getTwoFactorAuth(ctx.user.id);
        if (!twoFA) {
          throw new TRPCError({ code: "NOT_FOUND", message: "2FA not configured" });
        }

        const verified = speakeasy.totp.verify({
          secret: twoFA.secret,
          encoding: "base32",
          token: input.code,
          window: 2,
        });

        if (!verified) {
          await logAuthAction({
            userId: ctx.user.id,
            action: "2fa_verify",
            status: "failed",
            reason: "Invalid code",
            ipAddress: ctx.req.headers["x-forwarded-for"] as string,
          });
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid 2FA code" });
        }

        if (input.enableIt) {
          await createOrUpdateTwoFactorAuth(ctx.user.id, { isEnabled: true });
        }

        await logAuthAction({
          userId: ctx.user.id,
          action: "2fa_verify",
          status: "success",
          ipAddress: ctx.req.headers["x-forwarded-for"] as string,
        });

        return { success: true };
      }),

    // Disable 2FA
    disable2FA: protectedProcedure.mutation(async ({ ctx }) => {
      await createOrUpdateTwoFactorAuth(ctx.user.id, { isEnabled: false });
      return { success: true };
    }),

    // Get 2FA status
    get2FAStatus: protectedProcedure.query(async ({ ctx }) => {
      const twoFA = await getTwoFactorAuth(ctx.user.id);
      return {
        isEnabled: twoFA?.isEnabled ?? false,
        isConfigured: !!twoFA,
      };
    }),
  }),

  // Profile Management
  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await getUserProfile(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({
        bio: z.string().optional(),
        profilePhotoUrl: z.string().optional(),
        age: z.number().optional(),
        gender: z.string().optional(),
        location: z.string().optional(),
        preferences: z.record(z.string(), z.any()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await createOrUpdateUserProfile(ctx.user.id, input);
        return { success: true };
      }),
  }),

  // Messaging
  messaging: router({
    getConversations: protectedProcedure.query(async ({ ctx }) => {
      // This is a simplified version - in production, use proper queries
      return [];
    }),

    getMessages: protectedProcedure
      .input(z.object({ conversationId: z.number() }))
      .query(async ({ input }) => {
        return await getConversationMessages(input.conversationId);
      }),

    sendMessage: protectedProcedure
      .input(z.object({ recipientId: z.number(), content: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const conversation = await getOrCreateConversation(ctx.user.id, input.recipientId);
        if (!conversation) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }

        await addMessage(conversation.id, ctx.user.id, input.content);
        return { success: true };
      }),
  }),

  // Matching System
  matching: router({
    like: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await addLike(ctx.user.id, input.userId);

        // Check for mutual like
        const isMutual = await checkMutualLike(ctx.user.id, input.userId);
        if (isMutual) {
          await createMatch(ctx.user.id, input.userId);
          return { matched: true };
        }

        return { matched: false };
      }),

    getMatches: protectedProcedure.query(async ({ ctx }) => {
      // Simplified - implement proper query in production
      return [];
    }),
  }),

  // Agreements
  agreements: router({
    agree: protectedProcedure
      .input(z.object({ type: z.string(), version: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await recordAgreement(
          ctx.user.id,
          input.type,
          input.version,
          ctx.req.headers["x-forwarded-for"] as string
        );
        return { success: true };
      }),
  }),

  // Contact Form
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        subject: z.string().min(1),
        message: z.string().min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        await logCaptchaValidation({
          action: "contact_form",
          verified: true,
          ipAddress: ctx.req.headers["x-forwarded-for"] as string,
        });

        await createContactSubmission({
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
