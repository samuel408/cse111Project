-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 06, 2023 at 06:48 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `valleystealz`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartId` int(11) NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cartId`, `customerId`, `productId`) VALUES
(1, 1, 1),
(3, 2, 2),
(6, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
(1, 'eletronicsssss'),
(2, 'clothing'),
(3, 'new'),
(4, 'sdfds'),
(5, 'dfdsfsdfsd'),
(6, 'new'),
(7, 'new3434'),
(8, 'ergdffsdgs');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerId` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `phoneNo` varchar(50) DEFAULT NULL,
  `emailAddress` varchar(50) DEFAULT NULL,
  `stAddress` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `isBlocked` enum('0','1') DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customerId`, `firstName`, `lastName`, `phoneNo`, `emailAddress`, `stAddress`, `city`, `state`, `zipcode`, `password`, `isBlocked`) VALUES
(1, 'hello', 'Thakur', '9876543210', 'hello@gmail.com', 'my address', 'my city', 'my state', '324234', 'ritik123', '0'),
(2, 'first', 'last', '34242342342', 'admin@example.com', 'abc', 'new city', 'sdfsd', '324234', '#Admin123', '0'),
(3, 'first', 'last', '32423423423', 'abc@gmail.com', 'sdf', 'sdf', 'sdfsd', 'sdfds', 'hello123', '0');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employeeId` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `phoneNo` varchar(50) DEFAULT NULL,
  `emailAddress` varchar(50) DEFAULT NULL,
  `stAddress` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zipcode` varchar(50) DEFAULT NULL,
  `role` enum('normal','admin') DEFAULT 'normal',
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employeeId`, `firstName`, `lastName`, `phoneNo`, `emailAddress`, `stAddress`, `city`, `state`, `zipcode`, `role`, `password`) VALUES
(1, 'John', 'Doe', '123-456-7890', 'john.doe@email.com', '123 Main St', 'Cityville', 'CA', '12345', 'admin', 'hello123'),
(2, 'Jane', 'Smith', '987-654-3210', 'jane.smith@email.com', '456 Oak St', 'Techland', 'NY', '54321', 'normal', 'hello123'),
(3, 'Mike', 'Johnson', '555-123-4567', 'mike.johnson@email.com', '789 Pine St', 'Helpville', 'TX', '67890', 'normal', 'hello123'),
(4, 'Sara', 'Williams', '333-999-8888', 'sara.williams@email.com', '321 Elm St', 'Salesburg', 'FL', '54321', 'normal', 'hello123'),
(5, 'Daniel', 'Taylor', '444-777-2222', 'daniel.taylor@email.com', '555 Birch St', 'Internville', 'CA', '98765', 'normal', 'hello123'),
(6, 'Emily', 'Brown', '555-888-9999', 'emily.brown@email.com', '789 Maple St', 'Techland', 'NY', '23456', 'normal', 'hello123');

-- --------------------------------------------------------

--
-- Table structure for table `orderDetails`
--

CREATE TABLE `orderDetails` (
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unitPrice` decimal(10,2) DEFAULT NULL,
  `discountApplied` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `orderDate` date DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `employeeId` int(11) DEFAULT NULL,
  `shippingMethodId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `orderDate`, `customerId`, `employeeId`, `shippingMethodId`) VALUES
(1, '2023-12-05', 1, NULL, 1),
(2, '2023-12-05', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `productName` varchar(50) DEFAULT NULL,
  `productDescription` varchar(50) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `quantityOnHand` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `productDescription`, `categoryId`, `quantityOnHand`, `price`) VALUES
(1, 'mobile phone', 'nice looking watch', 1, 10, 100),
(2, 'watch', 'nice looking watch', 1, 10, 200),
(3, 'updated', 'sdfs', 5, 3, NULL),
(4, 'hello prouct', 'dsfsdf', 4, 33, NULL),
(5, 'avc', 'adf', 6, 33, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productvendors`
--

CREATE TABLE `productvendors` (
  `vendorId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shipping`
--

CREATE TABLE `shipping` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shipping`
--

INSERT INTO `shipping` (`id`, `type`, `price`) VALUES
(1, 'shipping', '20');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `vendorId` int(11) NOT NULL,
  `vendorName` varchar(40) DEFAULT NULL,
  `phoneNo` varchar(40) DEFAULT NULL,
  `emailAddress` varchar(40) DEFAULT NULL,
  `city` varchar(40) DEFAULT NULL,
  `state` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`vendorId`, `vendorName`, `phoneNo`, `emailAddress`, `city`, `state`) VALUES
(1, 'ABC Electronics', '123-456-7890', 'abc.electronics@email.com', 'Cityville', 'CA'),
(2, 'XYZ Supplies', '987-654-3210', 'xyz.supplies@email.com', 'Techland', 'NY'),
(3, 'TechGadgets Inc.', '555-123-4567', 'techgadgets.inc@email.com', 'Helpville', 'TX'),
(4, 'Quality Products Co.', '333-999-8888', 'quality.products@email.com', 'Salesburg', 'FL'),
(5, 'Global Imports Ltd.', '444-777-2222', 'global.imports@email.com', 'Internville', 'CA');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerId`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employeeId`);

--
-- Indexes for table `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `employeeId` (`employeeId`),
  ADD KEY `shippingMethodId` (`shippingMethodId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `productvendors`
--
ALTER TABLE `productvendors`
  ADD KEY `vendorId` (`vendorId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `shipping`
--
ALTER TABLE `shipping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`vendorId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `shipping`
--
ALTER TABLE `shipping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `vendorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customerId`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- Constraints for table `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customerId`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`shippingMethodId`) REFERENCES `shipping` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);

--
-- Constraints for table `productvendors`
--
ALTER TABLE `productvendors`
  ADD CONSTRAINT `productvendors_ibfk_1` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`vendorId`),
  ADD CONSTRAINT `productvendors_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
