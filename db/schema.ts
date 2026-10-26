import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const inquiries = sqliteTable("service_inquiries", {
  id: text("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  vehicle: text("vehicle").notNull(),
  vehicleSize: text("vehicle_size").notNull(),
  packageId: text("package_id").notNull(),
  extras: text("extras").notNull(),
  estimate: integer("estimate").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("New"),
  createdAt: integer("created_at").notNull(),
});
