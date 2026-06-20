CREATE TABLE `addresses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`address_line1` text NOT NULL,
	`address_line2` text,
	`city` varchar(100) NOT NULL,
	`state` varchar(100) NOT NULL,
	`zip_code` varchar(20) NOT NULL,
	`is_default` boolean DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `addresses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coupons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(50) NOT NULL,
	`description` text,
	`discount_type` enum('percentage','fixed') NOT NULL,
	`discount_value` decimal(10,2) NOT NULL,
	`max_usage` int,
	`current_usage` int DEFAULT 0,
	`valid_from` timestamp,
	`valid_until` timestamp,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `coupons_id` PRIMARY KEY(`id`),
	CONSTRAINT `coupons_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`food_item_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `food_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` enum('breakfast','south_indian','north_indian','starters','chinese','snacks','desserts','drinks','beverages') NOT NULL,
	`description` text,
	`ingredients` text,
	`price` decimal(10,2) NOT NULL,
	`image` text,
	`rating` decimal(3,1) DEFAULT '0',
	`is_vegetarian` boolean DEFAULT true,
	`availability` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `food_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loyalty_points` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`points` int NOT NULL DEFAULT 0,
	`total_points_earned` int NOT NULL DEFAULT 0,
	`total_points_redeemed` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loyalty_points_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` varchar(50) NOT NULL,
	`user_id` int,
	`table_id` int,
	`table_number` varchar(10),
	`items` text NOT NULL,
	`total_amount` decimal(10,2) NOT NULL,
	`tax_amount` decimal(10,2) DEFAULT '0',
	`discount_amount` decimal(10,2) DEFAULT '0',
	`status` enum('pending','accepted','preparing','ready','served','completed','cancelled') DEFAULT 'pending',
	`payment_status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
	`order_type` enum('dine_in','delivery','takeaway') DEFAULT 'dine_in',
	`delivery_address` text,
	`special_instructions` text,
	`coupon_code` varchar(50),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`completed_at` timestamp,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_order_id_unique` UNIQUE(`order_id`)
);
--> statement-breakpoint
CREATE TABLE `reservations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reservation_id` varchar(50) NOT NULL,
	`user_id` int,
	`customer_name` varchar(255) NOT NULL,
	`customer_phone` varchar(20) NOT NULL,
	`customer_email` varchar(320),
	`reservation_date` timestamp NOT NULL,
	`reservation_time` varchar(10) NOT NULL,
	`number_of_guests` int NOT NULL,
	`table_type` enum('normal','family','couple','premium') DEFAULT 'normal',
	`assigned_table_id` int,
	`special_requests` text,
	`status` enum('pending','confirmed','checked_in','completed','cancelled') DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reservations_id` PRIMARY KEY(`id`),
	CONSTRAINT `reservations_reservation_id_unique` UNIQUE(`reservation_id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`order_id` int NOT NULL,
	`food_item_id` int,
	`rating` int NOT NULL,
	`comment` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staff` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` enum('chef','waiter','manager') NOT NULL,
	`assigned_tables` text,
	`status` enum('active','inactive','on_break') DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `staff_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tables` (
	`id` int AUTO_INCREMENT NOT NULL,
	`table_number` varchar(10) NOT NULL,
	`capacity` int NOT NULL,
	`status` enum('available','occupied','reserved') DEFAULT 'available',
	`qr_code` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tables_id` PRIMARY KEY(`id`),
	CONSTRAINT `tables_table_number_unique` UNIQUE(`table_number`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
