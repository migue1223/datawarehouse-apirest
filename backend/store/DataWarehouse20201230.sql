-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: data_warehouse
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auths`
--

DROP TABLE IF EXISTS `auths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auths` (
  `auth_id` int(11) NOT NULL AUTO_INCREMENT,
  `auth_password` text,
  `auth_create_at` datetime DEFAULT '2020-12-29 18:13:07',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`auth_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `auths_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auths`
--

LOCK TABLES `auths` WRITE;
/*!40000 ALTER TABLE `auths` DISABLE KEYS */;
INSERT INTO `auths` VALUES (1,'$2b$10$ObwaOHVvEJkj5v4A3CMJ9eigoXUs4FYRXWTV6GR2WilMHamTpKPNm','2020-12-29 18:13:07',1);
/*!40000 ALTER TABLE `auths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channels`
--

DROP TABLE IF EXISTS `channels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channels` (
  `channel_id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_name` varchar(60) DEFAULT NULL,
  `channel_create_at` datetime DEFAULT '2020-12-29 18:13:07',
  PRIMARY KEY (`channel_id`),
  UNIQUE KEY `channels_name_unique` (`channel_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channels`
--

LOCK TABLES `channels` WRITE;
/*!40000 ALTER TABLE `channels` DISABLE KEYS */;
INSERT INTO `channels` VALUES (1,'Teléfono','2020-12-29 18:13:07'),(2,'Whatsapp','2020-12-29 18:13:07'),(3,'Instagram','2020-12-29 18:13:07'),(4,'Facebook','2020-12-29 18:13:07'),(5,'Linkedin','2020-12-29 18:13:07');
/*!40000 ALTER TABLE `channels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(60) DEFAULT NULL,
  `city_create_at` datetime DEFAULT '2020-12-29 18:13:07',
  `country_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `cities_name_unique` (`city_name`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Medellín','2020-12-29 18:13:07',1),(2,'Bogotá','2020-12-29 18:13:07',1),(3,'Cali','2020-12-29 18:13:07',1),(4,'Barranquilla','2020-12-29 18:13:07',1),(5,'Cartagena','2020-12-29 18:13:07',1),(6,'Buenos Aires','2020-12-30 04:25:57',2);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `comp_id` int(11) NOT NULL AUTO_INCREMENT,
  `comp_name` varchar(60) DEFAULT NULL,
  `comp_email` varchar(60) DEFAULT NULL,
  `comp_address` varchar(60) DEFAULT NULL,
  `comp_create_at` datetime DEFAULT '2020-12-29 18:13:07',
  `region_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`comp_id`),
  UNIQUE KEY `companies_name_unique` (`comp_name`),
  UNIQUE KEY `companies_email_unique` (`comp_email`),
  KEY `region_id` (`region_id`),
  KEY `country_id` (`country_id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `companies_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `companies_ibfk_3` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'Solar Unity SAS','solar@solar.com','Cl 10 52A 18','2020-12-30 04:25:57',1,1,1);
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `contact_id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_name` varchar(60) DEFAULT NULL,
  `contact_lastname` varchar(60) DEFAULT NULL,
  `contact_email` varchar(60) DEFAULT NULL,
  `contact_position` varchar(20) DEFAULT NULL,
  `contact_address` varchar(60) DEFAULT NULL,
  `contact_interests` varchar(10) DEFAULT NULL,
  `contact_user` varchar(60) DEFAULT NULL,
  `contact_created_at` datetime DEFAULT '2020-12-29 18:13:07',
  `channel_id` int(11) DEFAULT NULL,
  `preference_id` int(11) DEFAULT NULL,
  `region_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`contact_id`),
  UNIQUE KEY `contacts_email_unique` (`contact_email`),
  KEY `channel_id` (`channel_id`),
  KEY `preference_id` (`preference_id`),
  KEY `region_id` (`region_id`),
  KEY `country_id` (`country_id`),
  KEY `city_id` (`city_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`channel_id`) REFERENCES `channels` (`channel_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `contacts_ibfk_2` FOREIGN KEY (`preference_id`) REFERENCES `preferences` (`pref_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `contacts_ibfk_3` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `contacts_ibfk_4` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `contacts_ibfk_5` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `contacts_ibfk_6` FOREIGN KEY (`company_id`) REFERENCES `companies` (`comp_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'Jonathan','Jimenez','jta1223@gmail.com','Developer','Cl 80S 60 54','75%','+57368850497','2020-12-30 04:25:57',2,3,1,1,1,1);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(60) DEFAULT NULL,
  `country_create_at` datetime DEFAULT '2020-12-29 18:13:07',
  `region_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`country_id`),
  UNIQUE KEY `countries_name_unique` (`country_name`),
  KEY `region_id` (`region_id`),
  CONSTRAINT `countries_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'Colombia','2020-12-29 18:13:07',1),(2,'Argentina','2020-12-30 04:25:57',1);
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preferences`
--

DROP TABLE IF EXISTS `preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preferences` (
  `pref_id` int(11) NOT NULL AUTO_INCREMENT,
  `pref_name` varchar(60) DEFAULT NULL,
  `pref_create_at` datetime DEFAULT '2020-12-29 18:13:07',
  PRIMARY KEY (`pref_id`),
  UNIQUE KEY `preferences_name_unique` (`pref_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preferences`
--

LOCK TABLES `preferences` WRITE;
/*!40000 ALTER TABLE `preferences` DISABLE KEYS */;
INSERT INTO `preferences` VALUES (1,'Sin preferencia','2020-12-29 18:13:07'),(2,'Canal favorito','2020-12-29 18:13:07'),(3,'No molestar','2020-12-29 18:13:07');
/*!40000 ALTER TABLE `preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `region_id` int(11) NOT NULL AUTO_INCREMENT,
  `region_name` varchar(60) DEFAULT NULL,
  `region_create_at` datetime DEFAULT '2020-12-29 18:13:07',
  PRIMARY KEY (`region_id`),
  UNIQUE KEY `regions_name_unique` (`region_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'Suramérica','2020-12-29 18:13:07');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(60) DEFAULT NULL,
  `user_lastname` varchar(60) DEFAULT NULL,
  `user_email` varchar(60) DEFAULT NULL,
  `user_rol` varchar(15) DEFAULT 'Empleado',
  `user_admin` int(11) DEFAULT '0',
  `user_enable` int(11) DEFAULT '1',
  `user_created_at` datetime DEFAULT '2020-12-29 18:13:07',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `users_email_unique` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Admin','admin@admin.com','Administrador',1,1,'2020-12-29 18:13:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'data_warehouse'
--

--
-- Dumping routines for database 'data_warehouse'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-30  9:38:34
