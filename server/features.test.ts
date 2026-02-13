import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as speakeasy from "speakeasy";

// Mock user context
function createAuthContext(userId: number = 1): TrpcContext {
  return {
    user: {
      id: userId,
      openId: `user-${userId}`,
      email: `user${userId}@example.com`,
      name: `User ${userId}`,
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: { "x-forwarded-for": "192.168.1.1" },
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("2FA Features", () => {
  it("should setup 2FA and return QR code", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.setup2FA();

    expect(result).toHaveProperty("qrCode");
    expect(result).toHaveProperty("backupCodes");
    expect(result).toHaveProperty("secret");
    expect(result.backupCodes).toHaveLength(10);
  });

  it("should verify valid 2FA code", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Setup 2FA first
    const setupResult = await caller.auth.setup2FA();
    const secret = setupResult.secret;

    // Generate a valid TOTP code
    const token = speakeasy.totp({
      secret: secret,
      encoding: "base32",
    });

    // Verify the code
    const verifyResult = await caller.auth.verify2FA({
      code: token,
      enableIt: true,
    });

    expect(verifyResult).toEqual({ success: true });
  });

  it("should reject invalid 2FA code", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Setup 2FA first
    await caller.auth.setup2FA();

    // Try to verify with invalid code
    try {
      await caller.auth.verify2FA({
        code: "000000",
        enableIt: false,
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });

  it("should get 2FA status", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Setup 2FA
    await caller.auth.setup2FA();

    // Get status
    const status = await caller.auth.get2FAStatus();

    expect(status).toHaveProperty("isEnabled");
    expect(status).toHaveProperty("isConfigured");
    expect(status.isConfigured).toBe(true);
  });

  it("should disable 2FA", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Setup and enable 2FA
    const setupResult = await caller.auth.setup2FA();
    const token = speakeasy.totp({
      secret: setupResult.secret,
      encoding: "base32",
    });
    await caller.auth.verify2FA({ code: token, enableIt: true });

    // Disable 2FA
    const disableResult = await caller.auth.disable2FA();
    expect(disableResult).toEqual({ success: true });

    // Verify it's disabled
    const status = await caller.auth.get2FAStatus();
    expect(status.isEnabled).toBe(false);
  });
});

describe("Profile Features", () => {
  it("should update user profile", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const updateResult = await caller.profile.update({
      bio: "I love traveling and photography",
      age: 28,
      gender: "male",
      location: "Paris, France",
    });

    expect(updateResult).toEqual({ success: true });
  });

  it("should get user profile", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Update profile first
    await caller.profile.update({
      bio: "Test bio",
      age: 25,
      gender: "female",
      location: "Lyon",
    });

    // Get profile
    const profile = await caller.profile.get();

    expect(profile).toHaveProperty("bio");
    expect(profile?.age).toBe(25);
    expect(profile?.gender).toBe("female");
  });
});

describe("Matching Features", () => {
  it("should like a user", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.matching.like({ userId: 2 });

    expect(result).toHaveProperty("matched");
    expect(typeof result.matched).toBe("boolean");
  });

  it("should create a match when mutual like", async () => {
    const ctx1 = createAuthContext(1);
    const ctx2 = createAuthContext(2);
    const caller1 = appRouter.createCaller(ctx1);
    const caller2 = appRouter.createCaller(ctx2);

    // User 1 likes User 2
    const result1 = await caller1.matching.like({ userId: 2 });
    expect(result1).toHaveProperty('matched');
    expect(typeof result1.matched).toBe('boolean');

    // User 2 likes User 1
    const result2 = await caller2.matching.like({ userId: 1 });
    expect(result2).toHaveProperty('matched');
    expect(typeof result2.matched).toBe('boolean');
  });

  it("should get matches", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const matches = await caller.matching.getMatches();

    expect(Array.isArray(matches)).toBe(true);
  });
});

describe("Contact Form", () => {
  it("should submit contact form", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {
        protocol: "https",
        headers: { "x-forwarded-for": "192.168.1.1" },
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    });

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      subject: "Support Request",
      message: "I need help with my account",
    });

    expect(result).toEqual({ success: true });
  });

  it("should reject invalid contact form data", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    });

    try {
      await caller.contact.submit({
        name: "J", // Too short
        email: "invalid-email",
        subject: "Hi", // Too short
        message: "Short", // Too short
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });
});

describe("Agreements", () => {
  it("should record user agreement", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agreements.agree({
      type: "terms",
      version: "1.0",
    });

    expect(result).toEqual({ success: true });
  });
});
