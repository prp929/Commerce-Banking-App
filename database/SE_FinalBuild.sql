
drop table if exists users_roles;
drop table if exists users;
drop table if exists roles;
drop table if exists transactions;

CREATE TABLE users (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(45) NOT NULL,
  first_name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  balance decimal(10, 2), 
  username varchar(45) NOT NULL,
  password varchar(64) NOT NULL,
  enabled tinyint(4) DEFAULT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY email_UNIQUE (email)
);
 
CREATE TABLE roles (
  role_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL,
  PRIMARY KEY (role_id)
);
 
-- CREATE TABLE `users_roles` (
--   `user_id` int(11) NOT NULL,
--   `role_id` int(11) NOT NULL,
--   KEY `user_fk_idx` (`user_id`),
--   KEY `role_fk_idx` (`role_id`),
--   CONSTRAINT `role_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
--   CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
-- );

create table transactions(
id int not null auto_increment,
description varchar(50) not null,
username  varchar(30) not null,
amount numeric(10,2),
date date not null, 
planned_option boolean,
expense_option boolean,
recur_option boolean,
primary key(id)
);

INSERT INTO roles (`name`) VALUES ('USER');
INSERT INTO roles (`name`) VALUES ('CREATOR');
INSERT INTO roles (`name`) VALUES ('EDITOR');
INSERT INTO roles (`name`) VALUES ('ADMIN');

INSERT INTO users (`email`, `first_name`, `last_name`, `balance`, `username`, `password`, `enabled`) 
	VALUES ('a@gmail.com','john',  'doe', 100.00 , 'prp01', '0000', '1');
INSERT INTO users (`email`, `first_name`, `last_name`, `balance`, `username`, `password`, `enabled`) 
	VALUES ('b@gmail.com','jane',  'doe', 200.00 , 'jDD', '0000', '1');
INSERT INTO users (`email`, `first_name`, `last_name`, `balance`, `username`, `password`, `enabled`) 
	VALUES ('c@gmail.com','jerry',  'doe', 300.00 , 'wffMoney', '0000', '1');
INSERT INTO `users` (`email`, `first_name`, `last_name`, `balance`, `username`, `password`, `enabled`) 
	VALUES ('d@gmail.com','jason',  'doe', 400.00 , 'js123', '0000', '1');

-- INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (1, 1); -- user patrick has role USER
-- INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (2, 2); -- user alex has role CREATOR
-- INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (3, 3); -- user john has role EDITOR
-- INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (4, 2); -- user namhm has role CREATOR

insert into transactions values (1, "For the boys1", "prp01", 2.22, "2023-04-05", false, false, false);
insert into transactions values (100, "2nd trans demo", "prp01", 100.22, "2023-04-05", false, false, false);
insert into transactions values (101, "3rd trans demo", "prp01", 100.22, "2023-04-05", false, false, false);
insert into transactions values (2, "For the boys2", "prp01", 12.22, "2023-04-09", false, false, false);
insert into transactions values (3, "For the boys3", "prp01", 32.22, "2023-05-21", false, false, false);
insert into transactions values (41, "For the boys4", "prp01", 82.22, "2023-05-29", false, false, false);
insert into transactions values (133, "For the boys1", "prp01", 2.22, "2023-05-05", false, false, false);
insert into transactions values (110, "2nd trans demo", "prp01", 100.22, "2023-05-05", false, false, false);
insert into transactions values (111, "3rd trans demo", "prp01", 100.22, "2023-03-05", false, false, false);
insert into transactions values (21, "For the boys2", "prp01", 12.22, "2023-03-09", false, false, false);
insert into transactions values (31, "For the boys3", "prp01", 32.22, "2023-03-21", false, false, false);
insert into transactions values (44, "For the boys4", "prp01", 82.22, "2023-03-29", false, false, false);

insert into transactions values (5, "For the girls1", "jDD", 122.22, "2023-04-01", false, false, false);
insert into transactions values (6, "For the girls2", "jDD", 342.22, "2023-04-01", false, false, false);
insert into transactions values (7, "For the girls3", "jDD", 562.22, "2023-04-01", false, false, false);

insert into transactions values (8, "Buy Bread", "wffMoney", 3.33, "2023-04-01", false, false, false);
insert into transactions values (9, "Buy Milk", "wffMoney", 3.33, "2023-04-01", false, false, false);
insert into transactions values (10, "Pay anime subscription", "wffMoney", 3.33, "2023-04-01", false, false, false);

insert into transactions values (11, "Lose money gambling", "js123", 55.55, "2023-04-01", false, false, false);
insert into transactions values (12, "Invest in Doge Coin", "js123", 55.55, "2023-04-01", false, false, false);
insert into transactions values (13, "Invest in AMC",       "js123", 155.55, "2023-04-01", false, false, false);
insert into transactions values (14, "Punch elon musk in the face" , "js123", 1055.55 , "2023-04-01", false, false, false );
insert into transactions values (15, "Lose Lawsuit", "js123", 1.11,  "2023-04-01", false, false, false);
