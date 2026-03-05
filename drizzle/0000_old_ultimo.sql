CREATE TABLE `aanbieders` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`slug` text NOT NULL,
	`bedrijfsnaam` text NOT NULL,
	`beschrijving` text,
	`logo_url` text,
	`vestigingsplaats` text,
	`provincie` text,
	`werkgebied` text,
	`website` text,
	`telefoon` text,
	`contact_email` text,
	`review_link` text,
	`review_score` integer,
	`review_count` integer,
	`status` text DEFAULT 'pending' NOT NULL,
	`rejection_reason` text,
	`approved_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_aanbieders_user_id` ON `aanbieders` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_aanbieders_slug` ON `aanbieders` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_aanbieders_status` ON `aanbieders` (`status`);--> statement-breakpoint
CREATE TABLE `aanbieders_occasions` (
	`id` text PRIMARY KEY NOT NULL,
	`aanbieder_id` text NOT NULL,
	`titel` text NOT NULL,
	`beschrijving` text,
	`prijs` integer,
	`prijs_label` text,
	`woningtype` text,
	`locatie` text,
	`provincie` text,
	`oppervlakte_m2` integer,
	`bouwjaar` integer,
	`conditie` text,
	`isolatie` text,
	`dak_type` text,
	`fundering` text,
	`energielabel` text,
	`leveringstermijn` text,
	`financieringsopties` text,
	`images` text,
	`status` text DEFAULT 'active' NOT NULL,
	`mollie_subscription_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`aanbieder_id`) REFERENCES `aanbieders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_occasions_aanbieder` ON `aanbieders_occasions` (`aanbieder_id`);--> statement-breakpoint
CREATE INDEX `idx_occasions_status_woningtype` ON `aanbieders_occasions` (`status`,`woningtype`);--> statement-breakpoint
CREATE TABLE `certificaten` (
	`id` text PRIMARY KEY NOT NULL,
	`aanbieder_id` text NOT NULL,
	`naam` text NOT NULL,
	`bewijs_url` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`aanbieder_id`) REFERENCES `aanbieders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_certificaten_aanbieder` ON `certificaten` (`aanbieder_id`);--> statement-breakpoint
CREATE TABLE `listings` (
	`id` text PRIMARY KEY NOT NULL,
	`source` text NOT NULL,
	`source_id` text NOT NULL,
	`source_url` text NOT NULL,
	`woningtype` text,
	`title` text NOT NULL,
	`description` text,
	`price` integer,
	`price_label` text,
	`location` text,
	`province` text,
	`surface_m2` integer,
	`build_year` integer,
	`condition` text,
	`seller_type` text,
	`transport` text,
	`images` text,
	`scraped_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`is_active` integer DEFAULT 1
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_listings_source_sourceid` ON `listings` (`source`,`source_id`);--> statement-breakpoint
CREATE INDEX `idx_listings_active_woningtype` ON `listings` (`is_active`,`woningtype`);--> statement-breakpoint
CREATE INDEX `idx_listings_scraped_at` ON `listings` (`scraped_at`);--> statement-breakpoint
CREATE INDEX `idx_listings_price` ON `listings` (`price`);--> statement-breakpoint
CREATE TABLE `mollie_customers` (
	`id` text PRIMARY KEY NOT NULL,
	`aanbieder_id` text NOT NULL,
	`mollie_customer_id` text NOT NULL,
	`has_mandate_active` integer DEFAULT 0,
	`created_at` text NOT NULL,
	FOREIGN KEY (`aanbieder_id`) REFERENCES `aanbieders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_mollie_customers_aanbieder` ON `mollie_customers` (`aanbieder_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_mollie_customers_mollie_id` ON `mollie_customers` (`mollie_customer_id`);--> statement-breakpoint
CREATE TABLE `password_reset_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`expires_at` text NOT NULL,
	`used_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_password_reset_user` ON `password_reset_tokens` (`user_id`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`aanbieder_id` text NOT NULL,
	`type` text NOT NULL,
	`reference_id` text,
	`amount` integer NOT NULL,
	`currency` text DEFAULT 'EUR' NOT NULL,
	`mollie_payment_id` text,
	`mollie_status` text,
	`moneybird_invoice_id` text,
	`moneybird_status` text,
	`created_at` text NOT NULL,
	`paid_at` text,
	FOREIGN KEY (`aanbieder_id`) REFERENCES `aanbieders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_payments_aanbieder` ON `payments` (`aanbieder_id`);--> statement-breakpoint
CREATE INDEX `idx_payments_mollie` ON `payments` (`mollie_payment_id`);--> statement-breakpoint
CREATE TABLE `platform_settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `portfolio` (
	`id` text PRIMARY KEY NOT NULL,
	`aanbieder_id` text NOT NULL,
	`titel` text NOT NULL,
	`afbeelding_url` text NOT NULL,
	`woning_type` text,
	`locatie` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`aanbieder_id`) REFERENCES `aanbieders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_portfolio_aanbieder` ON `portfolio` (`aanbieder_id`);--> statement-breakpoint
CREATE TABLE `scrape_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`source` text NOT NULL,
	`started_at` text NOT NULL,
	`finished_at` text,
	`listings_found` integer,
	`listings_new` integer,
	`error` text,
	`status` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_sessions_user_id` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text NOT NULL,
	`email_verified` integer DEFAULT 0,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_users_email` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `woningtype_subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`aanbieder_id` text NOT NULL,
	`woningtype_slug` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`mollie_subscription_id` text,
	`started_at` text NOT NULL,
	`cancelled_at` text,
	FOREIGN KEY (`aanbieder_id`) REFERENCES `aanbieders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_subscriptions_aanbieder_woningtype` ON `woningtype_subscriptions` (`aanbieder_id`,`woningtype_slug`);--> statement-breakpoint
CREATE INDEX `idx_subscriptions_status` ON `woningtype_subscriptions` (`status`);