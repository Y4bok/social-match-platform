import { eq, and, or, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, userProfiles, InsertUserProfile, twoFactorAuth, InsertTwoFactorAuth, authLogs, InsertAuthLog, conversations, InsertConversation, messages, InsertMessage, likes, InsertLike, matches, InsertMatch, agreements, InsertAgreement, contactSubmissions, InsertContactSubmission, captchaLogs, InsertCaptchaLog } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// User Profile Helpers
export async function createOrUpdateUserProfile(userId: number, profile: Partial<InsertUserProfile>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  const existing = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  
  if (existing.length > 0) {
    await db.update(userProfiles).set(profile).where(eq(userProfiles.userId, userId));
  } else {
    await db.insert(userProfiles).values({ userId, ...profile });
  }
}

export async function getUserProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
  return result[0];
}

// 2FA Helpers
export async function createOrUpdateTwoFactorAuth(userId: number, data: Partial<InsertTwoFactorAuth>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  const existing = await db.select().from(twoFactorAuth).where(eq(twoFactorAuth.userId, userId)).limit(1);
  
  if (existing.length > 0) {
    await db.update(twoFactorAuth).set(data).where(eq(twoFactorAuth.userId, userId));
  } else {
    const insertData: any = { userId, ...data };
    if (!insertData.secret) {
      throw new Error("Secret is required for 2FA setup");
    }
    await db.insert(twoFactorAuth).values(insertData);
  }
}

export async function getTwoFactorAuth(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(twoFactorAuth).where(eq(twoFactorAuth.userId, userId)).limit(1);
  return result[0];
}

// Auth Logs
export async function logAuthAction(log: InsertAuthLog): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(authLogs).values(log);
}

// Messaging Helpers
export async function getOrCreateConversation(user1Id: number, user2Id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const [id1, id2] = user1Id < user2Id ? [user1Id, user2Id] : [user2Id, user1Id];
  
  let conversation = await db.select().from(conversations)
    .where(and(eq(conversations.user1Id, id1), eq(conversations.user2Id, id2)))
    .limit(1);
  
  if (conversation.length === 0) {
    await db.insert(conversations).values({ user1Id: id1, user2Id: id2 });
    conversation = await db.select().from(conversations)
      .where(and(eq(conversations.user1Id, id1), eq(conversations.user2Id, id2)))
      .limit(1);
  }
  
  return conversation[0];
}

export async function addMessage(conversationId: number, senderId: number, content: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.insert(messages).values({ conversationId, senderId, content });
  return result;
}

export async function getConversationMessages(conversationId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(desc(messages.createdAt))
    .limit(limit);
}

// Matching Helpers
export async function addLike(userId: number, likedUserId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  const existing = await db.select().from(likes)
    .where(and(eq(likes.userId, userId), eq(likes.likedUserId, likedUserId)))
    .limit(1);
  
  if (existing.length === 0) {
    await db.insert(likes).values({ userId, likedUserId });
  }
}

export async function checkMutualLike(user1Id: number, user2Id: number) {
  const db = await getDb();
  if (!db) return false;
  
  const like1 = await db.select().from(likes)
    .where(and(eq(likes.userId, user1Id), eq(likes.likedUserId, user2Id)))
    .limit(1);
  
  const like2 = await db.select().from(likes)
    .where(and(eq(likes.userId, user2Id), eq(likes.likedUserId, user1Id)))
    .limit(1);
  
  return like1.length > 0 && like2.length > 0;
}

export async function createMatch(user1Id: number, user2Id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  const [id1, id2] = user1Id < user2Id ? [user1Id, user2Id] : [user2Id, user1Id];
  
  const existing = await db.select().from(matches)
    .where(and(eq(matches.user1Id, id1), eq(matches.user2Id, id2)))
    .limit(1);
  
  if (existing.length === 0) {
    await db.insert(matches).values({ user1Id: id1, user2Id: id2 });
  }
}

// Agreement Helpers
export async function recordAgreement(userId: number, type: string, version: string, ipAddress?: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.insert(agreements).values({
    userId,
    type,
    version,
    ipAddress,
    agreedAt: new Date(),
  });
}

// Contact Submission Helpers
export async function createContactSubmission(submission: InsertContactSubmission): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(contactSubmissions).values(submission);
}

// CAPTCHA Log Helpers
export async function logCaptchaValidation(log: InsertCaptchaLog): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(captchaLogs).values(log);
}
