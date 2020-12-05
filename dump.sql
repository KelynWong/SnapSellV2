-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: snapsell
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_user_id` int(11) NOT NULL,
  `fk_listing_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_like` (`fk_user_id`,`fk_listing_id`),
  KEY `fk_listing_id` (`fk_listing_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`fk_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`fk_listing_id`) REFERENCES `listing` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (38,35,48,'2020-02-07 16:19:30'),(39,35,47,'2020-02-07 16:19:36'),(40,35,49,'2020-02-07 16:19:38'),(41,37,47,'2020-02-07 16:45:06'),(47,37,48,'2020-02-07 16:45:29'),(49,17,47,'2020-02-07 20:18:36');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing`
--

DROP TABLE IF EXISTS `listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `fk_poster_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `listing_pic_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_poster_id` (`fk_poster_id`),
  CONSTRAINT `listing_ibfk_1` FOREIGN KEY (`fk_poster_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing`
--

LOCK TABLES `listing` WRITE;
/*!40000 ALTER TABLE `listing` DISABLE KEYS */;
INSERT INTO `listing` VALUES (47,'Bengal cat (Mimi)','Mimi is cute',9999,16,'2020-02-04 13:48:36','/images/Mimi.jpg'),(48,'Bengal cat (Ding Ding)','Ding ding is cute',8888,16,'2020-02-04 13:50:33','/images/DingDing.jpg'),(49,'Bengal cat (Nala)','Nala is cute',7777,16,'2020-02-04 13:51:19','/images/Nala.jpg'),(50,'Journal','Journaling is good for you',12,35,'2020-02-04 14:22:01','/images/Journal.jpg'),(51,'Diary','Diarying is even better for you',15,35,'2020-02-04 14:22:33','/images/Diary.jpg'),(52,'Jourdia','Journal + diary = jourdia',23,35,'2020-02-04 14:23:34','/images/Jourdia.jpg'),(53,'Pugg','Pug is cute',395,17,'2020-02-07 16:47:21','/images/Pug.jpg'),(56,'Golden doggo','Golden doggo is cute',720,17,'2020-02-07 18:44:46','/images/GoldenDoggo.jpg');
/*!40000 ALTER TABLE `listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `offer` int(11) NOT NULL,
  `fk_listing_id` int(11) NOT NULL,
  `fk_offeror_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `offers` (`fk_listing_id`,`fk_offeror_id`),
  KEY `fk_offeror_id` (`fk_offeror_id`),
  CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`fk_listing_id`) REFERENCES `listing` (`id`),
  CONSTRAINT `offers_ibfk_2` FOREIGN KEY (`fk_offeror_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `profile_pic_url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'Lisa','/images/Lisa.jpg','2020-01-20 12:39:33','$2a$10$ywrcp90ADSBA6jjcSfCCcu8N8ITCvsuGFXWjZRU9uwkWn8FWJdZAi'),(17,'Dani','/images/Dani.jpg','2020-01-25 14:45:35','$2a$10$0vbs.FHI3FlqMkjIrVen8ueAuTnSReifnHlG7fsS.faGMjl02NGF2'),(20,'Lauren','/images/Lauren.jpg','2020-01-28 21:07:41','$2a$10$4Kizx1DoPi9Plc4ZjA/LxekIGRBvldln3zZi6mZtpBNFY0emNnmku'),(35,'Katherine','/images/Katherine.jpg','2020-01-28 22:08:19','$2a$10$WUPCeHccltFRQ./Zy/WeceaiX4hqLi9AIYr8Nsb0OrQZ83FleDEzK'),(37,'Christina','/images/Christina.jpg','2020-01-28 23:08:15','$2a$10$Nq1QxF4BMdBi8qEOXyyiGuuH9Pt/LaaIK.n.A1QFYKQ0FsecnCLnC');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-08 14:53:14
