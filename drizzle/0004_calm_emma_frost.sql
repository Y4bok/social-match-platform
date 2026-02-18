ALTER TABLE `user_profiles` ADD `jobTitle` varchar(255);--> statement-breakpoint
ALTER TABLE `user_profiles` ADD `company` varchar(255);--> statement-breakpoint
ALTER TABLE `user_profiles` ADD `isProfileComplete` boolean DEFAULT false;