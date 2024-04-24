-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: library
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS books;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE books (
  bookid int NOT NULL AUTO_INCREMENT,
  title varchar(255) DEFAULT NULL,
  author varchar(255) DEFAULT NULL,
  isbn varchar(255) DEFAULT NULL,
  pub_year int DEFAULT NULL,
  category varchar(255) DEFAULT NULL,
  availability tinyint DEFAULT NULL,
  PRIMARY KEY (bookid)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES books WRITE;
/*!40000 ALTER TABLE books DISABLE KEYS */;
INSERT INTO books VALUES (8,'Animal Stories','Maria Hoey, Peter Hoey','978-1-60309-502-0',2022,'Comic',0),(9,'Ashses','Álvaro Ortiz','978-1-60309-517-4',2023,'Graphic Novel',1),(10,'But You Have Friends','Emilia McKenzie','978-1-60309-527-3',2023,'Comic',0),(11,'Chester 5000 (Book 1)','Jess Fink','978-1-60309-535-8',2021,'Comic',1),(12,'The Last Wish','Andrzej Sapkowski','978-0316029186',2008,'Fiction',1),(13,'The Tower of Swallows','Andrzej Sapkowski','978-0316457033',2022,'Fiction',1),(14,'Software Architecture: The Hard Parts: Modern Trade-Off Analyses for Distributed Architectures ','Neal Ford, Mark Richards','978-1492086895',2021,'Computer Science',1);
/*!40000 ALTER TABLE books ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS faculty;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE faculty (
  facultyid int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  department varchar(255) DEFAULT NULL,
  PRIMARY KEY (facultyid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES faculty WRITE;
/*!40000 ALTER TABLE faculty DISABLE KEYS */;
INSERT INTO faculty VALUES (9009011,'Fac1','fac1@dickinson.edu','Computer Science'),(9009012,'Fac2','fac2@dickinson.edu','Math'),(9009013,'Fac3','fac3@dickinson.edu','English');
/*!40000 ALTER TABLE faculty ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `librarians`
--

DROP TABLE IF EXISTS librarians;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE librarians (
  librarianid int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  PRIMARY KEY (librarianid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `librarians`
--

LOCK TABLES librarians WRITE;
/*!40000 ALTER TABLE librarians DISABLE KEYS */;
INSERT INTO librarians VALUES (9009005,'Lib1','lib1@dickinson.edu'),(9009006,'Lib2','lib2@dickinson.edu'),(9009007,'Lib3','lib3@dickinson.edu');
/*!40000 ALTER TABLE librarians ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS students;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE students (
  studentid int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  department varchar(255) DEFAULT NULL,
  PRIMARY KEY (studentid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES students WRITE;
/*!40000 ALTER TABLE students DISABLE KEYS */;
INSERT INTO students VALUES (9009001,'Student1','stud1@dickinson.edu','Computer Science'),(9009002,'Student2','stud2@dickinson.edu','English'),(9009003,'Student3','stud3@dickinson.edu','Math'),(9009004,'Student4','stud4@dickinson.edu','Physics');
/*!40000 ALTER TABLE students ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS transactions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE transactions (
  transactionid int NOT NULL AUTO_INCREMENT,
  bookid int NOT NULL,
  borrowerid int NOT NULL,
  librarianid int NOT NULL,
  bdate date DEFAULT NULL,
  rdate date DEFAULT NULL,
  PRIMARY KEY (transactionid)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES transactions WRITE;
/*!40000 ALTER TABLE transactions DISABLE KEYS */;
INSERT INTO transactions VALUES (2,8,9009001,9009005,'2024-04-21','2024-04-22'),(3,14,9009013,9009006,'2024-04-18','2024-05-02'),(6,10,9009001,9009005,'2024-04-04','2024-05-15'),(7,8,9009002,9009005,'2024-03-20','2024-04-23');
/*!40000 ALTER TABLE transactions ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 15:04:58
