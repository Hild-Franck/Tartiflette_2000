-- phpMyAdmin SQL Dump
-- version 4.4.9
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Mer 24 Juin 2015 à 17:34
-- Version du serveur :  5.5.42
-- Version de PHP :  5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `tartiflette-2000`
--

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE `inscription` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `randKey` varchar(15) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `inscription`
--

INSERT INTO `inscription` (`id`, `email`, `randKey`) VALUES
  (14, 'mathieu.fontenille@y-nov.com', '1l6waYq9EQ');

-- --------------------------------------------------------

--
-- Structure de la table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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

-- --------------------------------------------------------

--
-- Structure de la table `News`
--

CREATE TABLE `News` (
  `ID_News` int(11) NOT NULL,
  `TitreNews` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `TextNews` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `DateNews` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `News`
--

INSERT INTO `News` (`ID_News`, `TitreNews`, `TextNews`, `DateNews`) VALUES
  (1, 'Essai 1', 'zjcgukqcvuqgqucdqudqudvqdvqdvx', '2015-06-12 15:21:27'),
  (2, 'Essai 2', 'jgkfcuqbdxilnXOQxxhqil\r\nqhjfxyqxy\r\nqadx', '2015-06-12 15:59:01'),
  (3, 'Très longue news pour voir ce que ça donne', 'ezcjbjc\r\nezcf\r\nece\r\ncveeeeeeeerffffffffffffffffffffffffffff', '2015-06-14 09:18:32');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `inscription`
--
ALTER TABLE `inscription`
ADD PRIMARY KEY (`id`);

--
-- Index pour la table `members`
--
ALTER TABLE `members`
ADD PRIMARY KEY (`id`);

--
-- Index pour la table `News`
--
ALTER TABLE `News`
ADD PRIMARY KEY (`ID_News`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT pour la table `members`
--
ALTER TABLE `members`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT pour la table `News`
--
ALTER TABLE `News`
MODIFY `ID_News` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;