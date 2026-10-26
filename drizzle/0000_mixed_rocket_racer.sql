CREATE TABLE `service_inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`vehicle` text NOT NULL,
	`vehicle_size` text NOT NULL,
	`package_id` text NOT NULL,
	`extras` text NOT NULL,
	`estimate` integer NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'New' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `service_inquiries_reference_unique` ON `service_inquiries` (`reference`);