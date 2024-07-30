CREATE DATABASE IF NOT EXISTS db_dashboard;
USE db_dashboard;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(500) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patients (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    roles INT NOT NULL DEFAULT 2,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

alter table patients add column birth_date DATE NOT NULL;
alter table patients add column phone VARCHAR(11) NOT NULL;
alter table patients add column marital_status VARCHAR(100) NOT NULL;
alter table patients add column cpf VARCHAR(11) NOT NULL;
alter table patients add column rg VARCHAR(9) NOT NULL;
alter table patients add column gender VARCHAR(6) NOT NULL;