import { 
  int, 
  mysqlEnum, 
  mysqlTable, 
  text, 
  timestamp, 
  varchar,
  decimal,
  json,
  boolean
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Food/Menu Items Table
 */
export const foodItems = mysqlTable("food_items", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: mysqlEnum("category", [
    "breakfast",
    "south_indian",
    "north_indian",
    "starters",
    "chinese",
    "snacks",
    "desserts",
    "drinks",
    "beverages"
  ]).notNull(),
  description: text("description"),
  ingredients: text("ingredients"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("0"),
  isVegetarian: boolean("is_vegetarian").default(true),
  availability: boolean("availability").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type FoodItem = typeof foodItems.$inferSelect;
export type InsertFoodItem = typeof foodItems.$inferInsert;

/**
 * Tables in the Restaurant
 */
export const tables = mysqlTable("tables", {
  id: int("id").autoincrement().primaryKey(),
  tableNumber: varchar("table_number", { length: 10 }).notNull().unique(),
  capacity: int("capacity").notNull(),
  status: mysqlEnum("status", ["available", "occupied", "reserved"]).default("available"),
  qrCode: text("qr_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Table = typeof tables.$inferSelect;
export type InsertTable = typeof tables.$inferInsert;

/**
 * Orders Table
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  orderId: varchar("order_id", { length: 50 }).notNull().unique(),
  userId: int("user_id"),
  tableId: int("table_id"),
  tableNumber: varchar("table_number", { length: 10 }),
  items: text("items").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).default("0"),
  discountAmount: decimal("discount_amount", { precision: 10, scale: 2 }).default("0"),
  status: mysqlEnum("status", [
    "pending",
    "accepted",
    "preparing",
    "ready",
    "served",
    "completed",
    "cancelled"
  ]).default("pending"),
  paymentStatus: mysqlEnum("payment_status", [
    "pending",
    "completed",
    "failed",
    "refunded"
  ]).default("pending"),
  orderType: mysqlEnum("order_type", [
    "dine_in",
    "delivery",
    "takeaway"
  ]).default("dine_in"),
  deliveryAddress: text("delivery_address"),
  specialInstructions: text("special_instructions"),
  couponCode: varchar("coupon_code", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Reservations Table
 */
export const reservations = mysqlTable("reservations", {
  id: int("id").autoincrement().primaryKey(),
  reservationId: varchar("reservation_id", { length: 50 }).notNull().unique(),
  userId: int("user_id"),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  customerEmail: varchar("customer_email", { length: 320 }),
  reservationDate: timestamp("reservation_date").notNull(),
  reservationTime: varchar("reservation_time", { length: 10 }).notNull(),
  numberOfGuests: int("number_of_guests").notNull(),
  tableType: mysqlEnum("table_type", [
    "normal",
    "family",
    "couple",
    "premium"
  ]).default("normal"),
  assignedTableId: int("assigned_table_id"),
  specialRequests: text("special_requests"),
  status: mysqlEnum("status", [
    "pending",
    "confirmed",
    "checked_in",
    "completed",
    "cancelled"
  ]).default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = typeof reservations.$inferInsert;

/**
 * Staff/Employees Table
 */
export const staff = mysqlTable("staff", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["chef", "waiter", "manager"]).notNull(),
  assignedTables: text("assigned_tables"),
  status: mysqlEnum("status", ["active", "inactive", "on_break"]).default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Staff = typeof staff.$inferSelect;
export type InsertStaff = typeof staff.$inferInsert;

/**
 * Customer Addresses Table
 */
export const addresses = mysqlTable("addresses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  zipCode: varchar("zip_code", { length: 20 }).notNull(),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Address = typeof addresses.$inferSelect;
export type InsertAddress = typeof addresses.$inferInsert;

/**
 * Reviews and Ratings Table
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  orderId: int("order_id").notNull(),
  foodItemId: int("food_item_id"),
  rating: int("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Favorites/Wishlist Table
 */
export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  foodItemId: int("food_item_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;

/**
 * Coupons/Promotions Table
 */
export const coupons = mysqlTable("coupons", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  description: text("description"),
  discountType: mysqlEnum("discount_type", ["percentage", "fixed"]).notNull(),
  discountValue: decimal("discount_value", { precision: 10, scale: 2 }).notNull(),
  maxUsage: int("max_usage"),
  currentUsage: int("current_usage").default(0),
  validFrom: timestamp("valid_from"),
  validUntil: timestamp("valid_until"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Coupon = typeof coupons.$inferSelect;
export type InsertCoupon = typeof coupons.$inferInsert;

/**
 * Loyalty Points Table
 */
export const loyaltyPoints = mysqlTable("loyalty_points", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  points: int("points").notNull().default(0),
  totalPointsEarned: int("total_points_earned").notNull().default(0),
  totalPointsRedeemed: int("total_points_redeemed").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type LoyaltyPoints = typeof loyaltyPoints.$inferSelect;
export type InsertLoyaltyPoints = typeof loyaltyPoints.$inferInsert;