CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE  if not exists employee (
    id int auto_increment primary key,
    name varchar(30) not null,
    salary int(5) default null
);

INSERT INTO employee (name, salary) VALUES
    ('marco', 13000),
    ('javier', 19000),
    ('cristobal', 17000),
    ('juan', 14000),
    ('pedro', 10000),
    ('paula', 11000),
    ('gabriel', 12000);