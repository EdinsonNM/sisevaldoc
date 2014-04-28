/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50534
Source Host           : localhost:3306
Source Database       : sisevaldoc

Target Server Type    : MYSQL
Target Server Version : 50534
File Encoding         : 65001

Date: 2014-03-16 18:38:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `alumno`
-- ----------------------------
DROP TABLE IF EXISTS `alumno`;
CREATE TABLE `alumno` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `yearinput` int(11) NOT NULL,
  `escuela_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `alumno_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of alumno
-- ----------------------------
INSERT INTO `alumno` VALUES ('1', '132456', 'Edinson', 'Nuñez More', '2', '2001', '1', '2014-03-06 21:03:02', '2014-03-06 21:03:02');
INSERT INTO `alumno` VALUES ('2', '24121231', 'Alvia', 'Carbajal Camposano', '3', '2002', '1', '2014-03-06 21:08:18', '2014-03-06 21:08:18');
INSERT INTO `alumno` VALUES ('3', '45789564', 'Luz', 'Carbajal Camposano', '4', '2000', '2', '2014-03-06 21:12:08', '2014-03-06 21:12:08');
INSERT INTO `alumno` VALUES ('4', '098439033', 'Edadil', 'More Olaya', '5', '2004', '1', '2014-03-06 21:13:45', '2014-03-06 21:13:45');
INSERT INTO `alumno` VALUES ('5', '4023484903', 'Cesar Martin', 'Nuñez More', '6', '2003', '1', '2014-03-06 21:14:39', '2014-03-06 21:14:39');
INSERT INTO `alumno` VALUES ('6', '9498329403', 'Sebastian', 'Nuñez Carbajal', '7', '2006', '1', '2014-03-06 21:15:42', '2014-03-06 21:15:42');
INSERT INTO `alumno` VALUES ('7', '8795647086', 'Yumi', 'Tominaga Garcia', '8', '2004', '1', '2014-03-06 21:18:18', '2014-03-06 21:18:18');
INSERT INTO `alumno` VALUES ('8', '8709889790', 'Milagros', 'Nuñez More', '9', '2006', '1', '2014-03-06 21:20:13', '2014-03-06 21:20:13');
INSERT INTO `alumno` VALUES ('9', '254234324', 'Jillian', 'Exaltacion Moreno', '11', '2000', '1', '2014-03-06 21:37:18', '2014-03-06 21:37:18');
INSERT INTO `alumno` VALUES ('10', '89479327', 'Lourdes', 'Castillo', '12', '2004', '1', '2014-03-06 21:38:16', '2014-03-06 21:38:16');
INSERT INTO `alumno` VALUES ('11', '9842834032', 'Danitza', 'Nuñez More', '13', '2006', '1', '2014-03-06 21:38:55', '2014-03-06 21:38:55');

-- ----------------------------
-- Table structure for `autoevaluacion`
-- ----------------------------
DROP TABLE IF EXISTS `autoevaluacion`;
CREATE TABLE `autoevaluacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cursoasignado_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of autoevaluacion
-- ----------------------------

-- ----------------------------
-- Table structure for `categoriadocente`
-- ----------------------------
DROP TABLE IF EXISTS `categoriadocente`;
CREATE TABLE `categoriadocente` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of categoriadocente
-- ----------------------------
INSERT INTO `categoriadocente` VALUES ('1', 'Nombrado', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `categoriadocente` VALUES ('2', 'Asociado', '2014-03-06 21:31:14', '2014-03-06 21:31:14');

-- ----------------------------
-- Table structure for `criterioevaluacion`
-- ----------------------------
DROP TABLE IF EXISTS `criterioevaluacion`;
CREATE TABLE `criterioevaluacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idpadre` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `grupo` int(11) NOT NULL,
  `plantilla_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of criterioevaluacion
-- ----------------------------
INSERT INTO `criterioevaluacion` VALUES ('1', '0', 'PLANIFICACIÓN Y PREPARACIÓN DE CLASES', '1', '1', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `criterioevaluacion` VALUES ('2', '0', 'METODOLOGÍA', '1', '1', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `criterioevaluacion` VALUES ('3', '0', 'AMBIENTE PARA EL APRENDIZAJE', '1', '1', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `criterioevaluacion` VALUES ('4', '0', 'EVALUACIÓN', '1', '1', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `criterioevaluacion` VALUES ('5', '1', 'EXPLICA EL CONTENIEDO DEL SILABO EN FORMA CLARA Y PRECISA EL PRIMER DIA DE CLASE', '0', '1', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `criterioevaluacion` VALUES ('6', '1', 'EL DOCENTE ASISTE Y CUMPLE CON EL DESARROLLO DE LOS TEMAS PLANIFICADOS DE ACUERDO AL SILABO', '0', '1', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `criterioevaluacion` VALUES ('7', '1', 'EL DOCENTE EN CASO DE NO ASISTIR A CLASES, RECUPERA LAS CLASES INMEDIATAMENTE', '0', '1', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `criterioevaluacion` VALUES ('8', '1', 'INFORMA LA IMPORTANCIA O UTILIDAD DE LOS CONOCIMIENTOS QUE SE ADQUIERAN', '0', '1', '2014-03-06 21:31:14', '2014-03-06 21:31:14');

-- ----------------------------
-- Table structure for `curso`
-- ----------------------------
DROP TABLE IF EXISTS `curso`;
CREATE TABLE `curso` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ciclo` int(11) NOT NULL,
  `numbercredits` int(11) NOT NULL,
  `escuela_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `curso_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of curso
-- ----------------------------
INSERT INTO `curso` VALUES ('1', '00001', 'INTRODUCCION A LOS ALGORITMOS', '1', '4', '1', '2014-03-06 21:31:15', '2014-03-06 21:31:15');
INSERT INTO `curso` VALUES ('2', '00002', 'MATEMATICA I', '1', '4', '1', '2014-03-06 21:31:15', '2014-03-06 21:31:15');
INSERT INTO `curso` VALUES ('3', '00003', 'MATEMATICA II', '2', '4', '1', '2014-03-06 21:31:15', '2014-03-06 21:31:15');

-- ----------------------------
-- Table structure for `cursoasignado`
-- ----------------------------
DROP TABLE IF EXISTS `cursoasignado`;
CREATE TABLE `cursoasignado` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `curso_id` int(11) NOT NULL,
  `docente_id` int(11) NOT NULL,
  `semestre_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of cursoasignado
-- ----------------------------
INSERT INTO `cursoasignado` VALUES ('1', '1', '1', '1', '2014-03-06 21:41:34', '2014-03-06 21:41:34');

-- ----------------------------
-- Table structure for `docente`
-- ----------------------------
DROP TABLE IF EXISTS `docente`;
CREATE TABLE `docente` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `dedication` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `categoriadocente_id` int(11) NOT NULL,
  `grado_id` int(11) NOT NULL,
  `titulo_id` int(11) NOT NULL,
  `tipodedicacion_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `docente_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of docente
-- ----------------------------
INSERT INTO `docente` VALUES ('1', '674892374', 'Alvia', 'Camposano Velazco', '0', '14', '1', '1', '1', '1', '2014-03-06 21:39:44', '2014-03-06 21:39:44');

-- ----------------------------
-- Table structure for `escuela`
-- ----------------------------
DROP TABLE IF EXISTS `escuela`;
CREATE TABLE `escuela` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `facultad_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `escuela_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of escuela
-- ----------------------------
INSERT INTO `escuela` VALUES ('1', '00001', 'INGENIERIA DE SISTEMAS', null, '1', '2014-03-06 21:31:15', '2014-03-06 21:31:15');
INSERT INTO `escuela` VALUES ('2', '00002', 'INGENIERIA CIVIL', null, '1', '2014-03-06 21:31:15', '2014-03-06 21:31:15');

-- ----------------------------
-- Table structure for `etapaevaluacion`
-- ----------------------------
DROP TABLE IF EXISTS `etapaevaluacion`;
CREATE TABLE `etapaevaluacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `date_init` date NOT NULL,
  `date_end` date NOT NULL,
  `semestre_id` int(11) NOT NULL,
  `facultad_id` int(11) NOT NULL,
  `plantilla_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of etapaevaluacion
-- ----------------------------

-- ----------------------------
-- Table structure for `evaluacion`
-- ----------------------------
DROP TABLE IF EXISTS `evaluacion`;
CREATE TABLE `evaluacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inscripcioncurso_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of evaluacion
-- ----------------------------

-- ----------------------------
-- Table structure for `facultad`
-- ----------------------------
DROP TABLE IF EXISTS `facultad`;
CREATE TABLE `facultad` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `facultad_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of facultad
-- ----------------------------
INSERT INTO `facultad` VALUES ('1', '00001', 'INGENIERIA CIVIL Y DE SISTEMAS', null, '2014-03-06 21:31:15', '2014-03-06 21:31:15');

-- ----------------------------
-- Table structure for `grado`
-- ----------------------------
DROP TABLE IF EXISTS `grado`;
CREATE TABLE `grado` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of grado
-- ----------------------------
INSERT INTO `grado` VALUES ('1', 'BACHILLER', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `grado` VALUES ('2', 'MAGISTER', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `grado` VALUES ('3', 'DOCTOR', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `grado` VALUES ('4', 'PHD', '2014-03-06 21:31:14', '2014-03-06 21:31:14');

-- ----------------------------
-- Table structure for `groups`
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `subtitle` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `permissions` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `groups_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO `groups` VALUES ('1', 'Docente', 'docente', 'SISEVALDOC para Docentes', 'Registre sus cursos, alumnos y complete su matriz de evaluación.', 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.', null, '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `groups` VALUES ('2', 'Alumno', 'alumno', 'SISEVALDOC para Alumnos', 'Realiza la evaluación de tus docentes.', 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.', null, '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `groups` VALUES ('3', 'Jefe de Departamento', 'jefedpto', 'SISEVALDOC para Jefe de Departamentos', 'Commodo id natoque malesuada sollicitudin elit suscipit', 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.', null, '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `groups` VALUES ('4', 'Administrador', 'administrador', 'SISEVALDOC para Administrador', 'Commodo id natoque malesuada sollicitudin elit suscipit', 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.', null, '2014-03-06 21:31:14', '2014-03-06 21:31:14');

-- ----------------------------
-- Table structure for `inscripcioncurso`
-- ----------------------------
DROP TABLE IF EXISTS `inscripcioncurso`;
CREATE TABLE `inscripcioncurso` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `alumno_id` int(11) NOT NULL,
  `cursoasignado_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of inscripcioncurso
-- ----------------------------
INSERT INTO `inscripcioncurso` VALUES ('1', '7', '1', '2014-03-06 21:42:04', '2014-03-06 21:42:04');
INSERT INTO `inscripcioncurso` VALUES ('2', '3', '1', '2014-03-06 21:42:24', '2014-03-06 21:42:24');
INSERT INTO `inscripcioncurso` VALUES ('3', '6', '1', '2014-03-06 21:43:26', '2014-03-06 21:43:26');

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `padre_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `orden` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '0', 'Home', '', './admin', '1', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `menu` VALUES ('2', '0', 'mantenimiento', '', '', '1', '2014-03-06 21:31:14', '2014-03-06 21:31:14');

-- ----------------------------
-- Table structure for `migrations`
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES ('2014_02_24_222256_create_session_table', '1');
INSERT INTO `migrations` VALUES ('2014_02_26_040048_create_tables', '1');
INSERT INTO `migrations` VALUES ('2014_02_26_210205_create_tables2', '1');
INSERT INTO `migrations` VALUES ('2012_12_06_225921_migration_cartalyst_sentry_install_users', '2');
INSERT INTO `migrations` VALUES ('2012_12_06_225929_migration_cartalyst_sentry_install_groups', '2');
INSERT INTO `migrations` VALUES ('2012_12_06_225945_migration_cartalyst_sentry_install_users_groups_pivot', '2');
INSERT INTO `migrations` VALUES ('2012_12_06_225988_migration_cartalyst_sentry_install_throttle', '2');

-- ----------------------------
-- Table structure for `permiso`
-- ----------------------------
DROP TABLE IF EXISTS `permiso`;
CREATE TABLE `permiso` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of permiso
-- ----------------------------

-- ----------------------------
-- Table structure for `plantillacriterios`
-- ----------------------------
DROP TABLE IF EXISTS `plantillacriterios`;
CREATE TABLE `plantillacriterios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of plantillacriterios
-- ----------------------------
INSERT INTO `plantillacriterios` VALUES ('1', 'MATRIZ GENERAL DE CRITERIOS DE EVALUACIÓN', '1', '2014-03-06 21:31:14', '2014-03-06 21:31:14');

-- ----------------------------
-- Table structure for `semestre`
-- ----------------------------
DROP TABLE IF EXISTS `semestre`;
CREATE TABLE `semestre` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `period` int(11) NOT NULL,
  `numberweeks` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of semestre
-- ----------------------------
INSERT INTO `semestre` VALUES ('1', '2014', '1', '16', '2014-03-06 21:31:15', '2014-03-06 21:31:15');
INSERT INTO `semestre` VALUES ('2', '2013', '1', '16', '2014-03-06 21:31:15', '2014-03-06 21:31:15');
INSERT INTO `semestre` VALUES ('3', '2013', '2', '16', '2014-03-06 21:31:15', '2014-03-06 21:31:15');

-- ----------------------------
-- Table structure for `sessions`
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `payload` text COLLATE utf8_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  UNIQUE KEY `sessions_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sessions
-- ----------------------------

-- ----------------------------
-- Table structure for `throttle`
-- ----------------------------
DROP TABLE IF EXISTS `throttle`;
CREATE TABLE `throttle` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `ip_address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `attempts` int(11) NOT NULL DEFAULT '0',
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `last_attempt_at` timestamp NULL DEFAULT NULL,
  `suspended_at` timestamp NULL DEFAULT NULL,
  `banned_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `throttle_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of throttle
-- ----------------------------
INSERT INTO `throttle` VALUES ('1', '1', '::1', '0', '0', '0', null, null, null);
INSERT INTO `throttle` VALUES ('2', '14', '::1', '0', '0', '0', null, null, null);

-- ----------------------------
-- Table structure for `tipodedicacion`
-- ----------------------------
DROP TABLE IF EXISTS `tipodedicacion`;
CREATE TABLE `tipodedicacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `abbreviation` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tipodedicacion
-- ----------------------------
INSERT INTO `tipodedicacion` VALUES ('1', 'TIEMPO COMPLETO', 'TC', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `tipodedicacion` VALUES ('2', 'TIEMPO PARCIAL', 'TP', '2014-03-06 21:31:14', '2014-03-06 21:31:14');

-- ----------------------------
-- Table structure for `tipovaloracion`
-- ----------------------------
DROP TABLE IF EXISTS `tipovaloracion`;
CREATE TABLE `tipovaloracion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `value` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tipovaloracion
-- ----------------------------
INSERT INTO `tipovaloracion` VALUES ('1', 'Siempre', '4', '2014-03-06 21:31:15', '2014-03-06 21:31:15');
INSERT INTO `tipovaloracion` VALUES ('2', 'Frecuente', '3', '2014-03-06 21:31:15', '2014-03-06 21:31:15');
INSERT INTO `tipovaloracion` VALUES ('3', 'Pocas Veces', '2', '2014-03-06 21:31:15', '2014-03-06 21:31:15');
INSERT INTO `tipovaloracion` VALUES ('4', 'Nunca', '1', '2014-03-06 21:31:15', '2014-03-06 21:31:15');

-- ----------------------------
-- Table structure for `titulo`
-- ----------------------------
DROP TABLE IF EXISTS `titulo`;
CREATE TABLE `titulo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `abrev` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of titulo
-- ----------------------------
INSERT INTO `titulo` VALUES ('1', 'INGENIERO DE SISTEMAS', '', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `titulo` VALUES ('2', 'INGENIERO INDUSTRIAL', '', '2014-03-06 21:31:14', '2014-03-06 21:31:14');
INSERT INTO `titulo` VALUES ('3', 'ADMINISTRACIÓN', '', '2014-03-06 21:31:14', '2014-03-06 21:31:14');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8_unicode_ci,
  `activated` tinyint(1) NOT NULL DEFAULT '0',
  `activation_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `activated_at` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `persist_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reset_password_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  KEY `users_activation_code_index` (`activation_code`),
  KEY `users_reset_password_code_index` (`reset_password_code`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', 'admin@admin.com', '$2y$10$Y.RumIT6LLfblqw/XoHtj.ACW0pb79MZ31HkaMMsYhwEj8GHxxR6i', null, '1', null, null, '2014-03-06 21:32:03', '$2y$10$1Yg4bDf6qobkJfybVg7LTeAnpIJwe5gODbk.v2q5s5Gxrav/pVSIu', null, null, null, '2014-03-06 21:31:14', '2014-03-06 21:32:03');
INSERT INTO `users` VALUES ('2', '132456', 'nmedinson@gmail.com', '$2y$10$BJQjcSR260oqWirvOzg7auxPTHfbtHkDcpg/jO7r1jr6CGJXVtPy2', null, '1', null, null, null, null, null, 'Edinson', 'Nuñez More', '2014-03-06 21:03:02', '2014-03-06 21:03:02');
INSERT INTO `users` VALUES ('3', '24121231', 'misha_2001@hotmail.com', '$2y$10$hjsYFbJcwOAs4CTZ317NjeSJSt5WOARfU1B73LBOIj93W5x33CnVm', null, '1', null, null, null, null, null, 'Alvia', 'Carbajal Camposano', '2014-03-06 21:08:18', '2014-03-06 21:08:18');
INSERT INTO `users` VALUES ('4', '45789564', 'luzbcc@gmail.com', '$2y$10$XObyidKkMkF45sJ2MxKyTOFef7NvIWOgyruVoAFImkOWy5uqAGEPK', null, '1', null, null, null, null, null, 'Luz', 'Carbajal Camposano', '2014-03-06 21:12:08', '2014-03-06 21:12:08');
INSERT INTO `users` VALUES ('5', '098439033', 'edadilmo@hotmail.com', '$2y$10$Ov/zyglINlppe3Frv5pWSu7jjNeCtEYH0a2CxRRSADJTs3WG03U86', null, '1', null, null, null, null, null, 'Edadil', 'More Olaya', '2014-03-06 21:13:45', '2014-03-06 21:13:45');
INSERT INTO `users` VALUES ('6', '40234849032', 'cesar007@hotmail.com', '$2y$10$w1NtijNAtQYhEYuuFTYxouI4G7Sbsxl3PTb8YZpfUCohrw/YFpwBa', null, '1', null, null, null, null, null, 'Cesar Martin', 'Nuñez More', '2014-03-06 21:14:39', '2014-03-06 21:14:39');
INSERT INTO `users` VALUES ('7', '9498329403', 'sebasnc@gmail.com', '$2y$10$PPvjchOpdVFVbtX5EEm18.QfRJ6CajELchwhjj6//FkNp3fOB/k2y', null, '1', null, null, null, null, null, 'Sebastian', 'Nuñez Carbajal', '2014-03-06 21:15:42', '2014-03-06 21:15:42');
INSERT INTO `users` VALUES ('8', '8795647086', 'ytominaga@gmail.com', '$2y$10$x0SR1VbtHrxokqFYUtX29uAbFR4Xhgvd9rvOhxerlKDdLCWFumPQu', null, '1', null, null, null, null, null, 'Yumi', 'Tominaga Garcia', '2014-03-06 21:18:18', '2014-03-06 21:18:18');
INSERT INTO `users` VALUES ('9', '8709889790', 'milagrosnm@gmail.com', '$2y$10$yy7AGNHZoy0TpFINGJdmS.2eK8Fxst9skgv95FF6IlNv/MPn3h6AS', null, '1', null, null, null, null, null, 'Milagros', 'Nuñez More', '2014-03-06 21:20:13', '2014-03-06 21:20:13');
INSERT INTO `users` VALUES ('11', '254234324', 'jillianjxi@gmail.com', '$2y$10$ai1lT4l1tLUE2EvmS8MopOT.bUKQEREPMkSwoKBds/gYZar6b5w3y', null, '1', null, null, null, null, null, 'Jillian', 'Exaltacion Moreno', '2014-03-06 21:37:18', '2014-03-06 21:37:18');
INSERT INTO `users` VALUES ('12', '89479327', 'lulu@hotmail.com', '$2y$10$Zoe4lX2I3XL.9VnWBXULF.SxrgT.WwmKEEF3pmAqDX2Rw5TGiQi.O', null, '1', null, null, null, null, null, 'Lourdes', 'Castillo', '2014-03-06 21:38:15', '2014-03-06 21:38:15');
INSERT INTO `users` VALUES ('13', '9842834032', 'dani007@gmail.com', '$2y$10$GUrsHDvrpg/z9giK3db8b.yfhHEE/5dFMifClOO/LZmOPXMsruMSK', null, '1', null, null, null, null, null, 'Danitza', 'Nuñez More', '2014-03-06 21:38:55', '2014-03-06 21:38:55');
INSERT INTO `users` VALUES ('14', 'a.campo', 'alviacc@gmail.com', '$2y$10$iJItZyoPq6SPNgLqwb2N1uc1OyxdhczKdttXaqLw0tZDlPfuQr0Fy', null, '1', null, null, '2014-03-07 15:59:37', '$2y$10$NYSgizUeh4EepWF5wMmEg.7KdryDBgwRMQooJrMShzkHUOkQWeSV6', null, 'Alvia', 'Camposano Velazco', '2014-03-06 21:39:43', '2014-03-07 15:59:37');

-- ----------------------------
-- Table structure for `users_groups`
-- ----------------------------
DROP TABLE IF EXISTS `users_groups`;
CREATE TABLE `users_groups` (
  `user_id` int(10) unsigned NOT NULL,
  `group_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users_groups
-- ----------------------------
INSERT INTO `users_groups` VALUES ('1', '4');
INSERT INTO `users_groups` VALUES ('10', '2');
INSERT INTO `users_groups` VALUES ('11', '2');
INSERT INTO `users_groups` VALUES ('12', '2');
INSERT INTO `users_groups` VALUES ('13', '2');
INSERT INTO `users_groups` VALUES ('14', '1');

-- ----------------------------
-- Table structure for `valoracionautoevaluacion`
-- ----------------------------
DROP TABLE IF EXISTS `valoracionautoevaluacion`;
CREATE TABLE `valoracionautoevaluacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `criterioevaluacion_id` int(11) NOT NULL,
  `autoevaluacion_id` int(11) NOT NULL,
  `tipovaloracion_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of valoracionautoevaluacion
-- ----------------------------

-- ----------------------------
-- Table structure for `valoracionevaluacion`
-- ----------------------------
DROP TABLE IF EXISTS `valoracionevaluacion`;
CREATE TABLE `valoracionevaluacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `evaluacion_id` int(11) NOT NULL,
  `criterioevaluacion_id` int(11) NOT NULL,
  `tipovaloracion_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of valoracionevaluacion
-- ----------------------------
