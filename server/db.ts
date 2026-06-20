import { eq, and, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  foodItems,
  orders,
  reservations,
  tables,
  staff,
  addresses,
  reviews,
  favorites,
  coupons,
  loyaltyPoints
} from "../drizzle/schema";
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

// TODO: add feature queries here as your schema grows.

// Food Items Queries
export async function getAllFoodItems() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(foodItems).where(eq(foodItems.availability, true));
}

export async function getFoodItemsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(foodItems).where(
    and(eq(foodItems.category, category as any), eq(foodItems.availability, true))
  );
}

export async function getFoodItemById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(foodItems).where(eq(foodItems.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function searchFoodItems(query: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(foodItems).where(
    and(like(foodItems.name, `%${query}%`), eq(foodItems.availability, true))
  );
}

// Orders Queries
export async function createOrder(order: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(orders).values(order);
  return result;
}

export async function getOrderById(orderId: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(orders).where(eq(orders.orderId, orderId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.userId, userId));
}

export async function updateOrderStatus(orderId: string, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(orders).set({ status: status as any }).where(eq(orders.orderId, orderId));
}

export async function getKitchenOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(
    and(
      eq(orders.status, "pending" as any),
      eq(orders.orderType, "dine_in" as any)
    )
  );
}

// Reservations Queries
export async function createReservation(reservation: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(reservations).values(reservation);
}

export async function getReservationById(reservationId: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(reservations).where(eq(reservations.reservationId, reservationId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getUserReservations(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reservations).where(eq(reservations.userId, userId));
}

export async function updateReservationStatus(reservationId: string, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(reservations).set({ status: status as any }).where(eq(reservations.reservationId, reservationId));
}

// Tables Queries
export async function getAllTables() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tables);
}

export async function getTableById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(tables).where(eq(tables.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getTableByNumber(tableNumber: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(tables).where(eq(tables.tableNumber, tableNumber)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateTableStatus(tableId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(tables).set({ status: status as any }).where(eq(tables.id, tableId));
}

// Staff Queries
export async function getStaffByRole(role: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(staff).where(eq(staff.role, role as any));
}

export async function getStaffById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(staff).where(eq(staff.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Addresses Queries
export async function getUserAddresses(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(addresses).where(eq(addresses.userId, userId));
}

export async function createAddress(address: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(addresses).values(address);
}

// Reviews Queries
export async function getOrderReviews(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).where(eq(reviews.orderId, orderId));
}

export async function createReview(review: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(reviews).values(review);
}

// Favorites Queries
export async function getUserFavorites(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(favorites).where(eq(favorites.userId, userId));
}

export async function addToFavorites(userId: number, foodItemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(favorites).values({ userId, foodItemId });
}

// Coupons Queries
export async function getCouponByCode(code: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(coupons).where(eq(coupons.code, code)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getActiveCoupons() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(coupons).where(eq(coupons.isActive, true));
}

// Loyalty Points Queries
export async function getUserLoyaltyPoints(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(loyaltyPoints).where(eq(loyaltyPoints.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateLoyaltyPoints(userId: number, points: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(loyaltyPoints).set({ points }).where(eq(loyaltyPoints.userId, userId));
}
