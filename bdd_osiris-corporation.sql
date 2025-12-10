-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 05 déc. 2025 à 05:10
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `osiris-corporation`
--

-- --------------------------------------------------------

--
-- Structure de la table `contacts_absurdes`
--

DROP TABLE IF EXISTS `contacts_absurdes`;
CREATE TABLE IF NOT EXISTS `contacts_absurdes` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `prenom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nom_famille` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `sujet` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `nom_robot_compagnie` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `heure_reveil_exacte` time NOT NULL,
  `couleur_chaussette_prefere` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `consentement` tinyint(1) NOT NULL,
  `date_soumission` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contacts_absurdes`
--

INSERT INTO `contacts_absurdes` (`id`, `prenom`, `nom_famille`, `email`, `sujet`, `message`, `nom_robot_compagnie`, `heure_reveil_exacte`, `couleur_chaussette_prefere`, `consentement`, `date_soumission`) VALUES
(1, 'Louis', 'AMEDRO', 'test@mail.fr', 'test', 'fbhzbf', 'lui', '10:00:00', 'jaune', 1, '2025-12-05 02:53:06'),
(2, 'Louis', 'Amedor', 'nzed@mail.fr', 'ecz', 'dez', 'zdee', '12:34:00', 'fez', 1, '2025-12-05 03:21:35');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
