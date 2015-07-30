-- phpMyAdmin SQL Dump
-- version 4.4.9
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Mer 29 Juillet 2015 à 23:15
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `News`
--

INSERT INTO `News` (`ID_News`, `TitreNews`, `TextNews`, `DateNews`) VALUES
  (1, 'Essai 1', 'zjcgukqcvuqgqucdqudqudvqdvqdvx', '2015-06-12 15:21:27'),
  (2, 'Essai 2', 'jgkfcuqbdxilnXOQxxhqil\r\nqhjfxyqxy\r\nqadx', '2015-06-12 15:59:01'),
  (3, 'Très longue news pour voir ce que ça donne', 'ezcjbjc\r\nezcf\r\nece\r\ncveeeeeeeerffffffffffffffffffffffffffff', '2015-06-14 09:18:32'),
  (29, ' r', '<p>&eacute;r</p>\r\n\r\n<p>yey</p>\r\n', '2015-06-26 22:03:15'),
  (30, 'zefr\r\nss', 'zr\r\nzfdzd\r\nzdfez\r\nzf\r\nzfd\r\n', '2015-06-26 22:03:16'),
  (31, '  rege', '<p>&eacute;r</p>\r\n\r\n<p>egesdf</p>\r\n', '2015-06-26 22:03:16'),
  (35, 'ezfd', '<p><strong>Votre News</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><s>zefr</s></p>\r\n\r\n<p><em>zef</em></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<ul>\r\n	<li><em>zd</em></li>\r\n	<li><em>tuh</em></li>\r\n</ul>\r\n', '2015-06-26 22:21:24'),
  (36, ' Vrai annonce', '<h1>Notre premier vrai test !</h1>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h2>Une nouvelle aventure...</h2>\r\n\r\n<p>Par o&ugrave; commencer ? Peut &ecirc;tre par le d&eacute;but. Nous voil&agrave; &agrave; &eacute;crire davnat vous ce que...</p>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum scelerisque molestie. Nulla nisl nulla, auctor nec tortor sit amet, congue dignissim odio. Aliquam tristique ultrices sollicitudin. Donec at turpis dolor. In sit amet auctor nunc, vitae ultrices justo. Aliquam dapibus mollis efficitur. Ut neque risus, pretium quis quam sit amet, malesuada porta justo. Nullam fringilla sodales sapien, non ultrices sapien dictum sit amet. Cras porta enim ipsum, sit amet commodo ipsum consequat id.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt="" src="http://www.jeuxvideoinfoparents.fr/jeux-video/jeux-video_party-game.jpg" style="height:409px; width:596px" /></p>\r\n\r\n<p>Aliquam semper vel augue eget vulputate. Mauris sit amet sapien nec dui mollis sollicitudin. Mauris luctus pharetra nisi, ac ornare est ornare ac. Pellentesque vestibulum condimentum nunc quis maximus. Proin aliquet blandit ultrices. Nulla tempor, eros et viverra consequat, tortor enim imperdiet metus, pulvinar hendrerit metus lorem eu purus. Nunc commodo quam condimentum congue consequat. Ut justo justo, ultrices vel massa sit amet, blandit aliquet mauris. Fusce venenatis <s>tortor</s> nec quam laoreet facilisis. Ut eu augue sollicitudin, <em>tincidunt orci quis</em>, tempor sapien. Nunc nibh arcu, iaculis et <em><strong>tellus</strong></em> et, volutpat tempus odio. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis eget aliquet nisl, at euismod diam.</p>\r\n\r\n<p>Donec et arcu sit amet lacus ornare posuere quis sed elit. Suspendisse nec nisl luctus nisi interdum imperdiet id eu orci. Integer non risus gravida, pharetra libero eu, molestie erat. Nullam vitae libero tortor. Vivamus et mauris molestie, lacinia arcu in, luctus est. Ut sit amet mi nibh. Donec odio turpis, dapibus sed massa sed, maximus sollicitudin massa. Donec sagittis ipsum id nisl viverra scelerisque. Integer id vestibulum odio. Maecenas ac ipsum quis magna fermentum scelerisque at ac risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut dictum, felis in luctus bibendum, metus felis rhoncus odio, ac sodales metus purus non neque.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h2>2&egrave;me chance</h2>\r\n\r\n<p>Sed laoreet porta ante eget sagittis. Duis gravida interdum magna, ut placerat sem faucibus eget. Etiam vel erat bibendum, cursus enim a, vestibulum purus. Curabitur porttitor posuere erat, eget <strong>posuere</strong> eros convallis sodales. Integer porttitor vehicula felis. Maecenas finibus eget velit dapibus fringilla. Aliquam malesuada ut nisl non imperdiet.</p>\r\n\r\n<ul>\r\n	<li>etudiants</li>\r\n	<li>nouveaux</li>\r\n	<li>et oui ^^</li>\r\n	<li>alors ?</li>\r\n</ul>\r\n\r\n<p>Phasellus a est sed erat consectetur pharetra pretium in lacus. Cras purus elit, faucibus in nulla a, fringilla tristique dui. Proin nec malesuada metus, non vestibulum velit. Nulla tincidunt velit in orci malesuada fermentum. Sed rhoncus eget tortor eget suscipit. Donec ullamcorper ultrices varius. Pellentesque ornare interdum arcu, cursus aliquam dolor sollicitudin in. Nullam accumsan eros sit amet ante placerat, eu placerat magna varius. Donec a ultrices justo. Nullam mattis id ligula non auctor. Phasellus pharetra urna ac ipsum consectetur, id imperdiet mi fermentum.</p>\r\n', '2015-07-24 17:02:13'),
  (37, 'Tartiflette', '<h1>Quelle belle tartiflette !</h1>\r\n\r\n<p><img alt="" src="http://orsimages.unileversolutions.com/ORS_Images/Knorr_fr-FR/tartiflette_27_3.1.83_326X580_27_3.1.83_326X580.Jpeg" style="height:326px; width:580px" /></p>\r\n', '2015-07-26 12:22:59'),
  (38, 'Plusieurs Images', '<p>Votre News</p>\r\n\r\n<p><img alt="" src="https://cinedam.files.wordpress.com/2014/11/cinema-22.jpg" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>une autre</p>\r\n\r\n<p><img alt="" src="http://www.cagnes-tourisme.com/upload/wysiwyg/photo%20cinema.JPG" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Et encore</p>\r\n\r\n<p><img alt="" src="http://img1.gtsstatic.com/wallpapers/55cb135265088aeee5147c2db20515d8_large.jpeg" /></p>\r\n', '2015-07-29 16:28:32'),
  (39, '    Image', '<p>R&eacute;alisation de test</p>\r\n\r\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Avec une photo...</p>\r\n\r\n<p>&nbsp;<img alt="" src="http://www.freemages.fr/album/nature/ciel_en_feu.jpg" style="height:1270px; width:2724px" /></p>\r\n\r\n<p>&nbsp;</p>\r\n', '2015-07-29 19:24:01');

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
MODIFY `ID_News` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=40;