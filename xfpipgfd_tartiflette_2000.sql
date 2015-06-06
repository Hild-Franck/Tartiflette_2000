-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Sam 06 Juin 2015 à 18:53
-- Version du serveur: 5.5.41-cll-lve
-- Version de PHP: 5.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `xfpipgfd_tartiflette_2000`
--

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE IF NOT EXISTS `inscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `randKey` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=19 ;

--
-- Contenu de la table `inscription`
--

INSERT INTO `inscription` (`id`, `email`, `randKey`) VALUES
(14, 'mathieu.fontenille@y-nov.com', '1l6waYq9EQ');

-- --------------------------------------------------------

--
-- Structure de la table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=12 ;

--
-- Contenu de la table `members`
--

INSERT INTO `members` (`id`, `pseudo`, `password`, `mail`) VALUES
(1, 'syphuros', '0070a955f3aa829968ee2ec00746e1ffb0713168', 'mederic.laurent@y-nov.com'),
(2, 'djomnt ', '97249b30246800297769d25080ff254e00d3f246', 'jordan.minetto@y-nov.com'),
(3, 'obusco', 'f12718bc75a3f7bdf9540a8a66eb14713abf5c2b', 'alex.werner@y-nov.com'),
(4, 'Vallab', '68ae130b01838207eb8c452340d7750c5e7d3f87', 'valentin.lablanche@y-nov.com'),
(5, 'jerome', 'a7b4b42f09cd967d93a1be28d20842500ebaf7d5', 'jerome.andre@y-nov.com'),
(6, 'Obsolete', '17832e7a5be5427bdb0f473c8c7fe263df30ca31', 'francois.lozes@y-nov.com'),
(7, 'Knarfux', 'd3574cf92fbff4d94f3bdd931f26966c3f8bceab', 'franck.hild@y-nov.com'),
(8, 'AzSiAz', 'f56f6a4a15e6512f24be45c7bbd92d4ce3620596', 'stephan.deumier@y-nov.com'),
(9, 'Dx Alexei', '47a64e58acc4fec7b310a2c7bab130b86c581834', 'alexis.rey@y-nov.com'),
(10, 'ziracmo', 'f00a838ce4017c8e506117f983989f07b53a781e', 'alexandre.roussange@y-nov.com'),
(11, 'Swex', 'ece1f035fd07107912140225fe5e673df706e5db', 'valentin.stefanescu@y-nov.com');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
