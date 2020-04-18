CREATE TABLE `Bookings` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_address` varchar(255) NOT NULL,
	`airline_address` varchar(255) NOT NULL,
	`to_` varchar(3) NOT NULL,
	`from_` varchar(3) NOT NULL,
	`time` varchar(10) NOT NULL,
	`date` varchar(10) NOT NULL,
	`name` varchar(20) NOT NULL,
	PRIMARY KEY (`id`)
);
