/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50534
Source Host           : localhost:3306
Source Database       : sisevaldoc

Target Server Type    : MYSQL
Target Server Version : 50534
File Encoding         : 65001

Date: 2014-03-20 04:29:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `actividad`
-- ----------------------------
DROP TABLE IF EXISTS `actividad`;
CREATE TABLE `actividad` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of actividad
-- ----------------------------
INSERT INTO `actividad` VALUES ('1', 'PREPARACIÓN Y EVALUACIÓN (FACTOR 0,50)', '2014-03-20 06:30:18', '2014-03-20 06:33:01');
INSERT INTO `actividad` VALUES ('3', 'CONSEJERIA: Señalar número de alumnos y el ciclo', '2014-03-20 06:32:16', '2014-03-20 06:33:25');
INSERT INTO `actividad` VALUES ('4', 'academico con los que se desarrolla (como minimo 01  INVESTIGACION: Consignar el numero de registro, codigo,', '2014-03-20 06:32:21', '2014-03-20 06:33:44');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of alumno
-- ----------------------------
INSERT INTO `alumno` VALUES ('1', '12345678', 'Edinson', 'Nuñez More', '3', '2001', '1', '2014-03-20 07:25:31', '2014-03-20 07:25:31');

-- ----------------------------
-- Table structure for `autoevaluacion`
-- ----------------------------
DROP TABLE IF EXISTS `autoevaluacion`;
CREATE TABLE `autoevaluacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cursoasignado_id` int(11) NOT NULL,
  `finalizado` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of autoevaluacion
-- ----------------------------

-- ----------------------------
-- Table structure for `cargalectiva`
-- ----------------------------
DROP TABLE IF EXISTS `cargalectiva`;
CREATE TABLE `cargalectiva` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `week` int(11) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `cursoasignado_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of cargalectiva
-- ----------------------------

-- ----------------------------
-- Table structure for `carganolectiva`
-- ----------------------------
DROP TABLE IF EXISTS `carganolectiva`;
CREATE TABLE `carganolectiva` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `place` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `actividad_id` int(11) NOT NULL,
  `docente_id` int(11) NOT NULL,
  `semestre_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of carganolectiva
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
INSERT INTO `categoriadocente` VALUES ('1', 'Nombrado', '2014-03-20 05:39:44', '2014-03-20 05:39:44');
INSERT INTO `categoriadocente` VALUES ('2', 'Asociado', '2014-03-20 05:39:44', '2014-03-20 05:39:44');

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
INSERT INTO `criterioevaluacion` VALUES ('1', '0', 'PLANIFICACIÓN Y PREPARACIÓN DE CLASES', '1', '1', '2014-03-20 05:39:44', '2014-03-20 05:39:44');
INSERT INTO `criterioevaluacion` VALUES ('2', '0', 'METODOLOGÍA', '1', '1', '2014-03-20 05:39:44', '2014-03-20 05:39:44');
INSERT INTO `criterioevaluacion` VALUES ('3', '0', 'AMBIENTE PARA EL APRENDIZAJE', '1', '1', '2014-03-20 05:39:44', '2014-03-20 05:39:44');
INSERT INTO `criterioevaluacion` VALUES ('4', '0', 'EVALUACIÓN', '1', '1', '2014-03-20 05:39:44', '2014-03-20 05:39:44');
INSERT INTO `criterioevaluacion` VALUES ('5', '1', 'EXPLICA EL CONTENIEDO DEL SILABO EN FORMA CLARA Y PRECISA EL PRIMER DIA DE CLASE', '0', '1', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `criterioevaluacion` VALUES ('6', '1', 'EL DOCENTE ASISTE Y CUMPLE CON EL DESARROLLO DE LOS TEMAS PLANIFICADOS DE ACUERDO AL SILABO', '0', '1', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `criterioevaluacion` VALUES ('7', '1', 'EL DOCENTE EN CASO DE NO ASISTIR A CLASES, RECUPERA LAS CLASES INMEDIATAMENTE', '0', '1', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `criterioevaluacion` VALUES ('8', '1', 'INFORMA LA IMPORTANCIA O UTILIDAD DE LOS CONOCIMIENTOS QUE SE ADQUIERAN', '0', '1', '2014-03-20 05:39:45', '2014-03-20 05:39:45');

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
INSERT INTO `curso` VALUES ('1', '00001', 'INTRODUCCION A LOS ALGORITMOS', '1', '4', '1', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `curso` VALUES ('2', '00002', 'MATEMATICA I', '1', '4', '1', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `curso` VALUES ('3', '00003', 'MATEMATICA II', '2', '4', '1', '2014-03-20 05:39:45', '2014-03-20 05:39:45');

-- ----------------------------
-- Table structure for `cursoasignado`
-- ----------------------------
DROP TABLE IF EXISTS `cursoasignado`;
CREATE TABLE `cursoasignado` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `curso_id` int(11) NOT NULL,
  `docente_id` int(11) NOT NULL,
  `semestre_id` int(11) NOT NULL,
  `students_approved` int(11) NOT NULL,
  `students_disapproved` int(11) NOT NULL,
  `percentage_progress` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of cursoasignado
-- ----------------------------

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
  `escuela_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `docente_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of docente
-- ----------------------------
INSERT INTO `docente` VALUES ('1', '2121212232', 'Juan', 'Perez', '0', '2', '1', '1', '1', '1', '1', '2014-03-20 05:54:51', '2014-03-20 06:00:05');

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
INSERT INTO `escuela` VALUES ('1', '00001', 'INGENIERIA DE SISTEMAS', null, '1', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `escuela` VALUES ('2', '00002', 'INGENIERIA CIVIL', null, '1', '2014-03-20 05:39:45', '2014-03-20 05:39:45');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of etapaevaluacion
-- ----------------------------
INSERT INTO `etapaevaluacion` VALUES ('1', 'Etaoa 2014 - I', '2014-03-01', '2014-03-14', '1', '1', '1', '2014-03-20 07:31:50', '2014-03-20 07:31:50');

-- ----------------------------
-- Table structure for `evaluacion`
-- ----------------------------
DROP TABLE IF EXISTS `evaluacion`;
CREATE TABLE `evaluacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inscripcioncurso_id` int(11) NOT NULL,
  `finalizado` tinyint(1) NOT NULL DEFAULT '0',
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
INSERT INTO `facultad` VALUES ('1', '00001', 'INGENIERIA CIVIL Y DE SISTEMAS', 'descripcion', '2014-03-20 05:39:45', '2014-03-20 07:31:00');

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
INSERT INTO `grado` VALUES ('1', 'BACHILLER', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `grado` VALUES ('2', 'MAGISTER', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `grado` VALUES ('3', 'DOCTOR', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `grado` VALUES ('4', 'PHD', '2014-03-20 05:39:45', '2014-03-20 05:39:45');

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
INSERT INTO `groups` VALUES ('1', 'Docente', 'docente', 'QUE ES EL SISEVALDOC: AUTOEVALUACIÓN', 'Sistema Informático para la Evaluación del Desempeño del Docente de la Universidad Nacional de Pucallpa.', 'La evaluación de la docencia universitaria es una tarea compleja cuyo objetivo fundamental es la mejora de la calidad de la enseñanza. Para ello, conviene  abarcar todos los puntos de vista relevantes, el de los alumnos y el del propio profesor. Hasta el momento, las  experiencias de evaluación realizadas en la universidad Nacional de Ucayali se han centrado preferentemente en la opinión de los alumnos sobre la actuación del docente en el aula. Esta información es útil y necesaria pero suele ser poco aprovechada para la mejora de la docencia y conviene completarla con otros puntos de vista, en especial el del profesor.\r\n', null, '2014-03-20 05:39:44', '2014-03-20 05:39:44');
INSERT INTO `groups` VALUES ('2', 'Alumno', 'alumno', 'QUE ES EL SISEVALDOC PARA ALUMNOS', 'Sistema Informático para la Evaluación del Desempeño del Docente de la Universidad Nacional de Pucallpa.', 'La evaluación del desempeño docente por estudiantes tiene como objetivo valorar las fortalezas y dificultades de las actividades desarrolladas por los docentes en el trabajo formativo; por su naturaleza, constituye una herramienta que proporciona información útil para adecuar las estrategias institucionales de capacitación y desarrollo de competencias de los profesores. Dicho instrumento queda a disposición de los estudiantes para que con su participación responsable y honesta, valoren el desempeño de sus profesores y contribuyan de esta manera a la mejora continua de su educación universitaria', null, '2014-03-20 05:39:44', '2014-03-20 05:39:44');
INSERT INTO `groups` VALUES ('3', 'Jefe de Departamento', 'jefedpto', 'QUE ES EL SISEVALDOC: POR EL JEFE DE DEPARTAMENTO', 'Sistema Informático para la Evaluación del Desempeño del Docente de la Universidad Nacional de Pucallpa.', 'Los Departamentos Académicos son unidades de servicios académicos de la universidad y agrupan a los profesores que cultivan disciplinas afines. El artículo N° 172 de Estatuto de la UNU, establece que los Jefes de Departamentos Académicos evaluarán anualmente los méritos de docente, de acuerdo con el sistema establecido; tomando en cuenta los aspectos de su preparación intelectual, científica y pedagógica, de sus méritos y actitudes.\r\n', null, '2014-03-20 05:39:44', '2014-03-20 05:39:44');
INSERT INTO `groups` VALUES ('4', 'Administrador', 'administrador', 'SISEVALDOC para Administrador', 'Sistema Informático para la Evaluación del Desempeño del Docente de la Universidad Nacional de Pucallpa.', 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.', null, '2014-03-20 05:39:44', '2014-03-20 05:39:44');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of inscripcioncurso
-- ----------------------------

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
INSERT INTO `menu` VALUES ('1', '0', 'Home', '', './admin', '1', '2014-03-20 05:39:44', '2014-03-20 05:39:44');
INSERT INTO `menu` VALUES ('2', '0', 'mantenimiento', '', '', '1', '2014-03-20 05:39:44', '2014-03-20 05:39:44');

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
INSERT INTO `plantillacriterios` VALUES ('1', 'MATRIZ GENERAL DE CRITERIOS DE EVALUACIÓN', '1', '2014-03-20 05:39:44', '2014-03-20 05:39:44');

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
INSERT INTO `semestre` VALUES ('1', '2014', '1', '16', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `semestre` VALUES ('2', '2013', '1', '16', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `semestre` VALUES ('3', '2013', '2', '16', '2014-03-20 05:39:45', '2014-03-20 05:39:45');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of throttle
-- ----------------------------
INSERT INTO `throttle` VALUES ('1', '1', '::1', '0', '0', '0', null, null, null);

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
INSERT INTO `tipodedicacion` VALUES ('1', 'TIEMPO COMPLETO', 'TC', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `tipodedicacion` VALUES ('2', 'TIEMPO PARCIAL', 'TP', '2014-03-20 05:39:45', '2014-03-20 05:39:45');

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
INSERT INTO `tipovaloracion` VALUES ('1', 'Siempre', '4', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `tipovaloracion` VALUES ('2', 'Frecuente', '3', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `tipovaloracion` VALUES ('3', 'Pocas Veces', '2', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `tipovaloracion` VALUES ('4', 'Nunca', '1', '2014-03-20 05:39:45', '2014-03-20 05:39:45');

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
INSERT INTO `titulo` VALUES ('1', 'INGENIERO DE SISTEMAS', '', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `titulo` VALUES ('2', 'INGENIERO INDUSTRIAL', '', '2014-03-20 05:39:45', '2014-03-20 05:39:45');
INSERT INTO `titulo` VALUES ('3', 'ADMINISTRACIÓN', '', '2014-03-20 05:39:45', '2014-03-20 05:39:45');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', 'admin@admin.com', '$2y$10$FhL7D/IE0Xc2X4gBt63QW.ZxE/qfdYTnrD2qtpV8.I/RbX52S87eq', null, '1', null, null, '2014-03-20 08:24:54', '$2y$10$dPVIVdWq2MsIxLaaHmFUdOHqQuUMriyR7SW2fA5sLrR3QV9F31tke', null, null, null, '2014-03-20 05:39:44', '2014-03-20 08:24:54');
INSERT INTO `users` VALUES ('2', 'j.perez', 'jperez@gmail.com', '$2y$10$vgfecK/4UCny1d..jRFNBOyz3iS7HuN8zP7UkgyQqxBoTBf3wE4eu', null, '1', null, null, null, null, null, 'Juan', 'Perez', '2014-03-20 05:54:50', '2014-03-20 05:54:50');
INSERT INTO `users` VALUES ('3', '12345678', 'nmedinson@gmail.com', '$2y$10$N2C5uVav6Gx4vRtsxWn1GOOqIJT9LF08Kn9kY4JSOo5erBgbZUp2S', null, '1', null, null, null, null, null, 'Edinson', 'Nuñez More', '2014-03-20 07:25:30', '2014-03-20 07:25:30');

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
INSERT INTO `users_groups` VALUES ('2', '1');
INSERT INTO `users_groups` VALUES ('3', '2');

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
