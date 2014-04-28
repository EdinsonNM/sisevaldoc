/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50534
Source Host           : localhost:3306
Source Database       : sisevaldoc

Target Server Type    : MYSQL
Target Server Version : 50534
File Encoding         : 65001

Date: 2014-03-31 18:19:22
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of actividad
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of alumno
-- ----------------------------
INSERT INTO `alumno` VALUES ('1', '00001', 'Juan', 'Perez Perez', '5', '2001', '17', '2014-03-21 18:15:08', '2014-03-21 18:15:08');
INSERT INTO `alumno` VALUES ('2', '00002', 'Maria', 'Ponce Bellido', '6', '2002', '17', '2014-03-21 18:15:08', '2014-03-21 18:15:08');
INSERT INTO `alumno` VALUES ('3', '00003', 'Carlos Martin', 'Gonzales Prado', '7', '20003', '17', '2014-03-21 18:15:08', '2014-03-21 18:15:08');
INSERT INTO `alumno` VALUES ('4', '00004', 'Hernan Jose', 'Pacheco Duran', '8', '2005', '17', '2014-03-21 18:15:08', '2014-03-21 18:15:08');
INSERT INTO `alumno` VALUES ('5', '00005', 'Vilma ', 'Flores Ramos', '9', '2001', '17', '2014-03-21 18:15:09', '2014-03-21 18:15:09');
INSERT INTO `alumno` VALUES ('6', '00006', 'Andrea', 'Nuñez Carbajal', '10', '2000', '17', '2014-03-21 18:15:09', '2014-03-21 18:15:09');
INSERT INTO `alumno` VALUES ('7', '00008', 'Luz', 'Caldas Torrejon', '11', '2009', '17', '2014-03-21 18:15:09', '2014-03-21 18:15:09');

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of cargalectiva
-- ----------------------------
INSERT INTO `cargalectiva` VALUES ('1', '1', '2014-03-07', '2014-03-11', 'jh j hjhjk hjk hkj', '8', '0000-00-00 00:00:00', '2014-03-27 19:03:27');
INSERT INTO `cargalectiva` VALUES ('2', '2', '0000-00-00', '0000-00-00', 'contenido de prueba...', '8', '2014-03-27 08:30:46', '2014-03-27 17:11:30');
INSERT INTO `cargalectiva` VALUES ('3', '10', '2014-03-13', '2014-03-21', 'probandoooo-.... :O', '8', '2014-03-27 08:31:13', '2014-03-27 08:31:13');
INSERT INTO `cargalectiva` VALUES ('4', '1', '2014-03-20', '2014-03-31', 'rttrytr yryy ryrtyr yty', '8', '2014-03-27 08:36:07', '2014-03-27 19:02:38');
INSERT INTO `cargalectiva` VALUES ('6', '2', '2014-03-13', '2014-03-19', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci nulla, imperdiet vel est nec, tincidunt ornare nisl. Morbi semper tincidunt sem vel mollis. Phasellus eget nisi ac urna aliquet ultrices. Aliquam interdum tellus non diam ullamcorper, in interdum sem posuere. Sed molestie elit id nisl tempus, eu posuere sem consectetur. Donec tempus mi vel augue facilisis ultricies. Vivamus in nisl a erat suscipit tempor eu id magna. Integer blandit arcu in quam semper, vel tincidunt est porttitor. Fusce tempor tempor ultrices. In hac habitasse platea dictumst.', '8', '2014-03-27 08:38:15', '2014-03-27 08:38:15');
INSERT INTO `cargalectiva` VALUES ('7', '4', '2014-03-06', '2014-03-11', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci nulla, imperdiet vel est nec, tincidunt ornare nisl. Morbi semper tincidunt sem vel mollis. Phasellus eget nisi ac urna aliquet ultrices. Aliquam interdum tellus non diam ullamcorper, in interdum sem posuere. Sed molestie elit id nisl tempus, eu posuere sem consectetur. Donec tempus mi vel augue facilisis ultricies. Vivamus in nisl a erat suscipit tempor eu id magna. Integer blandit arcu in quam semper, vel tincidunt est porttitor. Fusce tempor tempor ultrices. In hac habitasse platea dictumst.', '8', '2014-03-27 08:38:52', '2014-03-27 08:38:52');
INSERT INTO `cargalectiva` VALUES ('8', '5', '2014-02-26', '2014-03-13', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci nulla, imperdiet vel est nec, tincidunt ornare nisl. Morbi semper tincidunt sem vel mollis. Phasellus eget nisi ac urna aliquet ultrices. Aliquam interdum tellus non diam ullamcorper, in interdum sem posuere. Sed molestie elit id nisl tempus, eu posuere sem consectetur. Donec tempus mi vel augue facilisis ultricies. Vivamus in nisl a erat suscipit tempor eu id magna. Integer blandit arcu in quam semper, vel tincidunt est porttitor. Fusce tempor tempor ultrices. In hac habitasse platea dictumst.', '8', '2014-03-27 08:39:07', '2014-03-27 08:39:07');
INSERT INTO `cargalectiva` VALUES ('9', '6', '2014-02-26', '2014-03-05', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci nulla, imperdiet vel est nec, tincidunt ornare nisl. Morbi semper tincidunt sem vel mollis. Phasellus eget nisi ac urna aliquet ultrices. Aliquam interdum tellus non diam ullamcorper, in interdum sem posuere. Sed molestie elit id nisl tempus, eu posuere sem consectetur. Donec tempus mi vel augue facilisis ultricies. Vivamus in nisl a erat suscipit tempor eu id magna. Integer blandit arcu in quam semper, vel tincidunt est porttitor. Fusce tempor tempor ultrices. In hac habitasse platea dictumst.', '8', '2014-03-27 08:39:26', '2014-03-27 08:39:26');
INSERT INTO `cargalectiva` VALUES ('10', '7', '2014-03-06', '2014-03-17', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci nulla, imperdiet vel est nec, tincidunt ornare nisl. Morbi semper tincidunt sem vel mollis. Phasellus eget nisi ac urna aliquet ultrices. Aliquam interdum tellus non diam ullamcorper, in interdum sem posuere. Sed molestie elit id nisl tempus, eu posuere sem consectetur. Donec tempus mi vel augue facilisis ultricies. Vivamus in nisl a erat suscipit tempor eu id magna. Integer blandit arcu in quam semper, vel tincidunt est porttitor. Fusce tempor tempor ultrices. In hac habitasse platea dictumst.', '8', '2014-03-27 08:39:37', '2014-03-27 08:39:37');
INSERT INTO `cargalectiva` VALUES ('11', '8', '2014-03-04', '2014-02-23', 'RLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci nulla, imperdiet vel est nec, tincidunt ornare nisl. Morbi semper tincidunt sem vel mollis. Phasellus eget nisi ac urna aliquet ultrices. Aliquam interdum tellus non diam ullamcorper, in interdum sem posuere. Sed molestie elit id nisl tempus, eu posuere sem consectetur. Donec tempus mi vel augue facilisis ultricies. Vivamus in nisl a erat suscipit tempor eu id magna. Integer blandit arcu in quam semper, vel tincidunt est porttitor. Fusce tempor tempor ultrices. In hac habitasse platea dictumst.', '8', '2014-03-27 08:39:51', '2014-03-27 08:39:51');
INSERT INTO `cargalectiva` VALUES ('12', '9', '2014-03-05', '2014-03-26', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc orci nulla, imperdiet vel est nec, tincidunt ornare nisl. Morbi semper tincidunt sem vel mollis. Phasellus eget nisi ac urna aliquet ultrices. Aliquam interdum tellus non diam ullamcorper, in interdum sem posuere. Sed molestie elit id nisl tempus, eu posuere sem consectetur. Donec tempus mi vel augue facilisis ultricies. Vivamus in nisl a erat suscipit tempor eu id magna. Integer blandit arcu in quam semper, vel tincidunt est porttitor. Fusce tempor tempor ultrices. In hac habitasse platea dictumst.', '8', '2014-03-27 08:40:12', '2014-03-27 08:40:12');

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
INSERT INTO `categoriadocente` VALUES ('1', 'Nombrado', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `categoriadocente` VALUES ('2', 'Asociado', '2014-03-21 15:08:36', '2014-03-21 15:08:36');

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
INSERT INTO `criterioevaluacion` VALUES ('1', '0', 'PLANIFICACIÓN Y PREPARACIÓN DE CLASES', '1', '1', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `criterioevaluacion` VALUES ('2', '0', 'METODOLOGÍA', '1', '1', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `criterioevaluacion` VALUES ('3', '0', 'AMBIENTE PARA EL APRENDIZAJE', '1', '1', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `criterioevaluacion` VALUES ('4', '0', 'EVALUACIÓN', '1', '1', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `criterioevaluacion` VALUES ('5', '1', 'EXPLICA EL CONTENIEDO DEL SILABO EN FORMA CLARA Y PRECISA EL PRIMER DIA DE CLASE', '0', '1', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `criterioevaluacion` VALUES ('6', '1', 'EL DOCENTE ASISTE Y CUMPLE CON EL DESARROLLO DE LOS TEMAS PLANIFICADOS DE ACUERDO AL SILABO', '0', '1', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `criterioevaluacion` VALUES ('7', '1', 'EL DOCENTE EN CASO DE NO ASISTIR A CLASES, RECUPERA LAS CLASES INMEDIATAMENTE', '0', '1', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `criterioevaluacion` VALUES ('8', '1', 'INFORMA LA IMPORTANCIA O UTILIDAD DE LOS CONOCIMIENTOS QUE SE ADQUIERAN', '0', '1', '2014-03-21 15:08:36', '2014-03-21 15:08:36');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of curso
-- ----------------------------
INSERT INTO `curso` VALUES ('1', '00001', 'MATEMATICA I', '1', '4', '17', '2014-03-21 16:21:57', '2014-03-21 16:21:57');
INSERT INTO `curso` VALUES ('2', '00002', 'MATEMATICA II', '2', '4', '17', '2014-03-21 16:21:57', '2014-03-21 16:21:57');
INSERT INTO `curso` VALUES ('3', '00003', 'INTRODUCCION A LOS ALGORITMOS', '1', '4', '17', '2014-03-21 16:21:57', '2014-03-21 16:21:57');
INSERT INTO `curso` VALUES ('4', '00004', 'ADMINISTRACION I', '1', '4', '17', '2014-03-21 16:21:57', '2014-03-21 16:21:57');
INSERT INTO `curso` VALUES ('5', '00005', 'CONTABILIDAD I', '1', '3', '17', '2014-03-21 16:21:57', '2014-03-21 16:21:57');
INSERT INTO `curso` VALUES ('6', '00006', 'DEFENSA NACIONAL', '1', '3', '17', '2014-03-21 16:21:57', '2014-03-21 16:21:57');
INSERT INTO `curso` VALUES ('7', '00008', 'PROGRAMACION I', '2', '4', '17', '2014-03-21 16:21:57', '2014-03-21 16:21:57');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of cursoasignado
-- ----------------------------
INSERT INTO `cursoasignado` VALUES ('8', '1', '1', '1', '0', '0', '0', '2014-03-25 00:50:01', '2014-03-25 00:50:01');
INSERT INTO `cursoasignado` VALUES ('9', '2', '1', '1', '0', '0', '0', '2014-03-25 00:50:01', '2014-03-25 00:50:01');
INSERT INTO `cursoasignado` VALUES ('10', '3', '1', '1', '0', '0', '0', '2014-03-25 00:50:01', '2014-03-25 00:50:01');
INSERT INTO `cursoasignado` VALUES ('11', '4', '1', '1', '0', '0', '0', '2014-03-25 00:50:01', '2014-03-25 00:50:01');
INSERT INTO `cursoasignado` VALUES ('12', '5', '1', '1', '0', '0', '0', '2014-03-25 00:50:01', '2014-03-25 00:50:01');
INSERT INTO `cursoasignado` VALUES ('13', '6', '1', '1', '0', '0', '0', '2014-03-25 00:50:01', '2014-03-25 00:50:01');
INSERT INTO `cursoasignado` VALUES ('14', '7', '1', '1', '0', '0', '0', '2014-03-25 00:50:01', '2014-03-25 00:50:01');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of docente
-- ----------------------------
INSERT INTO `docente` VALUES ('1', '00001', 'Juan', 'Perez Perez', '0', '2', '1', '1', '3', '1', '17', '2014-03-21 17:27:32', '2014-03-21 17:27:32');
INSERT INTO `docente` VALUES ('2', '00006', 'Andrea', 'Nuñez Carbajal', '0', '3', '2', '3', '1', '1', '17', '2014-03-21 17:27:33', '2014-03-21 17:27:33');
INSERT INTO `docente` VALUES ('3', '00008', 'Luz', 'Caldas Torrejon', '0', '4', '2', '2', '3', '1', '17', '2014-03-21 17:27:33', '2014-03-21 17:27:33');

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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of escuela
-- ----------------------------
INSERT INTO `escuela` VALUES ('17', '00001', 'INGENIERIA DE SISTEMAS', null, '14', '2014-03-21 15:56:15', '2014-03-21 15:56:15');
INSERT INTO `escuela` VALUES ('18', '00002', 'INGENIERIA CIVIL', null, '14', '2014-03-21 15:56:15', '2014-03-21 15:56:15');
INSERT INTO `escuela` VALUES ('19', '00003', 'CIENCIAS FORESTALeS Y AMBIENTALES', null, '10', '2014-03-21 15:56:15', '2014-03-21 15:56:15');
INSERT INTO `escuela` VALUES ('20', '00004', 'CIENCIAS DE LA SALUD', null, '11', '2014-03-21 15:56:15', '2014-03-21 15:56:15');
INSERT INTO `escuela` VALUES ('21', '00005', 'MEDICINA HUMANA', null, '12', '2014-03-21 15:56:15', '2014-03-21 15:56:15');
INSERT INTO `escuela` VALUES ('22', '00006', 'CONTABILIDAD', null, '13', '2014-03-21 15:56:15', '2014-03-21 15:56:15');
INSERT INTO `escuela` VALUES ('23', '00007', 'ADMINISTRACION', null, '13', '2014-03-21 15:56:15', '2014-03-21 15:56:15');
INSERT INTO `escuela` VALUES ('24', '00008', 'ECONOMIA', null, '13', '2014-03-21 15:56:15', '2014-03-21 15:56:15');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of etapaevaluacion
-- ----------------------------
INSERT INTO `etapaevaluacion` VALUES ('1', 'sfafsdfs', '2014-03-13', '2014-03-15', '1', '9', '1', '2014-03-27 17:14:06', '2014-03-28 02:20:03');
INSERT INTO `etapaevaluacion` VALUES ('2', 'Etapa de evaluación 2014-1', '2014-03-01', '2014-03-06', '1', '14', '1', '2014-03-27 22:38:08', '2014-03-27 22:38:08');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of evaluacion
-- ----------------------------
INSERT INTO `evaluacion` VALUES ('3', '11', '0', '2014-03-27 23:35:22', '2014-03-27 23:35:22');
INSERT INTO `evaluacion` VALUES ('4', '10', '0', '2014-03-28 15:20:06', '2014-03-28 15:20:06');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of facultad
-- ----------------------------
INSERT INTO `facultad` VALUES ('9', '00001', 'CIENCIAS AGROPECUARIAS', null, '2014-03-21 15:42:20', '2014-03-21 15:42:20');
INSERT INTO `facultad` VALUES ('10', '00002', 'CIENCIAS FORESTALES Y AMBIENTALES', null, '2014-03-21 15:42:20', '2014-03-21 15:42:20');
INSERT INTO `facultad` VALUES ('11', '00003', 'CIENCIAS DE LA SALUD', null, '2014-03-21 15:42:20', '2014-03-21 15:42:20');
INSERT INTO `facultad` VALUES ('12', '00004', 'MEDICINA HUMANA', null, '2014-03-21 15:42:20', '2014-03-21 15:42:20');
INSERT INTO `facultad` VALUES ('13', '00005', 'CIENCIAS ECONOMICAS, ADMINISTRATIVAS Y CONTABLES', null, '2014-03-21 15:42:20', '2014-03-21 15:42:20');
INSERT INTO `facultad` VALUES ('14', '00006', 'INGENIERIA DE SISTEMAS E INGENIERIA CIVIL', null, '2014-03-21 15:42:20', '2014-03-21 15:42:20');
INSERT INTO `facultad` VALUES ('15', '00007', 'DERECHO Y CIENCIAS POLITICAS', null, '2014-03-21 15:42:20', '2014-03-21 15:42:20');
INSERT INTO `facultad` VALUES ('16', '00008', 'EDUCACION Y CIENCIAS SOCIALES', null, '2014-03-21 15:42:20', '2014-03-21 15:42:20');

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
INSERT INTO `grado` VALUES ('1', 'BACHILLER', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `grado` VALUES ('2', 'MAGISTER', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `grado` VALUES ('3', 'DOCTOR', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `grado` VALUES ('4', 'PHD', '2014-03-21 15:08:36', '2014-03-21 15:08:36');

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
INSERT INTO `groups` VALUES ('1', 'Docente', 'docente', 'SISEVALDOC para Docentes', 'Registre sus cursos, alumnos y complete su matriz de evaluación.', 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.', null, '2014-03-21 15:08:35', '2014-03-21 15:08:35');
INSERT INTO `groups` VALUES ('2', 'Alumno', 'alumno', 'SISEVALDOC para Alumnos', 'Realiza la evaluación de tus docentes.', 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.', null, '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `groups` VALUES ('3', 'Jefe de Departamento', 'jefedpto', 'SISEVALDOC para Jefe de Departamentos', 'Commodo id natoque malesuada sollicitudin elit suscipit', 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.', null, '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `groups` VALUES ('4', 'Administrador', 'administrador', 'SISEVALDOC para Administrador', 'Commodo id natoque malesuada sollicitudin elit suscipit', 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.', null, '2014-03-21 15:08:36', '2014-03-21 15:08:36');

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of inscripcioncurso
-- ----------------------------
INSERT INTO `inscripcioncurso` VALUES ('10', '2', '8', '2014-03-25 00:50:55', '2014-03-25 00:50:55');
INSERT INTO `inscripcioncurso` VALUES ('11', '1', '8', '2014-03-25 00:51:20', '2014-03-25 00:51:20');
INSERT INTO `inscripcioncurso` VALUES ('12', '2', '9', '2014-03-25 00:51:20', '2014-03-25 00:51:20');
INSERT INTO `inscripcioncurso` VALUES ('13', '3', '10', '2014-03-25 00:51:20', '2014-03-25 00:51:20');
INSERT INTO `inscripcioncurso` VALUES ('14', '1', '11', '2014-03-25 00:51:20', '2014-03-25 00:51:20');
INSERT INTO `inscripcioncurso` VALUES ('15', '1', '12', '2014-03-25 00:51:21', '2014-03-25 00:51:21');
INSERT INTO `inscripcioncurso` VALUES ('16', '1', '13', '2014-03-25 00:51:21', '2014-03-25 00:51:21');
INSERT INTO `inscripcioncurso` VALUES ('17', '1', '14', '2014-03-25 00:51:21', '2014-03-25 00:51:21');

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
INSERT INTO `menu` VALUES ('1', '0', 'Home', '', './admin', '1', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `menu` VALUES ('2', '0', 'mantenimiento', '', '', '1', '2014-03-21 15:08:36', '2014-03-21 15:08:36');

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
INSERT INTO `plantillacriterios` VALUES ('1', 'MATRIZ GENERAL DE CRITERIOS DE EVALUACIÓN', '1', '2014-03-21 15:08:36', '2014-03-21 15:08:36');

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
INSERT INTO `semestre` VALUES ('1', '2014', '1', '16', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `semestre` VALUES ('2', '2013', '1', '16', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `semestre` VALUES ('3', '2013', '2', '16', '2014-03-21 15:08:36', '2014-03-21 15:08:36');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of throttle
-- ----------------------------
INSERT INTO `throttle` VALUES ('1', '1', '::1', '0', '0', '0', null, null, null);
INSERT INTO `throttle` VALUES ('2', '2', '::1', '0', '0', '0', null, null, null);
INSERT INTO `throttle` VALUES ('3', '3', '::1', '0', '0', '0', null, null, null);
INSERT INTO `throttle` VALUES ('4', '5', '::1', '0', '0', '0', null, null, null);
INSERT INTO `throttle` VALUES ('5', '6', '::1', '0', '0', '0', null, null, null);

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
INSERT INTO `tipodedicacion` VALUES ('1', 'TIEMPO COMPLETO', 'TC', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `tipodedicacion` VALUES ('2', 'TIEMPO PARCIAL', 'TP', '2014-03-21 15:08:36', '2014-03-21 15:08:36');

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
INSERT INTO `tipovaloracion` VALUES ('1', 'Siempre', '4', '2014-03-21 15:08:37', '2014-03-21 15:08:37');
INSERT INTO `tipovaloracion` VALUES ('2', 'Frecuente', '3', '2014-03-21 15:08:37', '2014-03-21 15:08:37');
INSERT INTO `tipovaloracion` VALUES ('3', 'Pocas Veces', '2', '2014-03-21 15:08:37', '2014-03-21 15:08:37');
INSERT INTO `tipovaloracion` VALUES ('4', 'Nunca', '1', '2014-03-21 15:08:37', '2014-03-21 15:08:37');

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
INSERT INTO `titulo` VALUES ('1', 'INGENIERO DE SISTEMAS', '', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `titulo` VALUES ('2', 'INGENIERO INDUSTRIAL', '', '2014-03-21 15:08:36', '2014-03-21 15:08:36');
INSERT INTO `titulo` VALUES ('3', 'ADMINISTRACIÓN', '', '2014-03-21 15:08:36', '2014-03-21 15:08:36');

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', 'admin@admin.com', '$2y$10$p8oOoJl74Vn7v7sMFTclf.LKi4.j1XNQ9/OTw.LQWfxHI.JzYtaxC', null, '1', null, null, '2014-03-31 18:14:49', '$2y$10$I7CeT95lQ3vSK1pWFiuZsul5dV2dVvuyzii19ANRtplBJIg09/O0y', null, null, null, '2014-03-21 15:08:36', '2014-03-31 18:14:49');
INSERT INTO `users` VALUES ('2', 'jperez', 'jperez@gmail.com', '$2y$10$71f6d.zCRAlBSUeSWHw8xe2YSh5Olkck.bgYY.B9cJNq4SakCEJuq', null, '1', null, null, '2014-03-31 21:03:48', '$2y$10$dmR0Gpp/jFOpY91kimAbyuwOAiYJMYU5BHlf.dGww3rGJUIma/FWq', null, 'Juan', 'Perez Perez', '2014-03-21 17:27:32', '2014-03-31 21:03:48');
INSERT INTO `users` VALUES ('3', 'anuñez', 'anuñez@gmail.com', '$2y$10$lgAQVKfJ1WDtFz/sW6Iwn.jh3sqlB33dJV3JX4Q5wKJgeWQ6C0WRG', null, '1', null, null, '2014-03-26 00:52:50', '$2y$10$H2PQc3zksMJpfg2TVdNOluiTJiBqjQMtu0uEViCZp6TyiynzloE.a', null, 'Andrea', 'Nuñez Carbajal', '2014-03-21 17:27:33', '2014-03-26 00:52:50');
INSERT INTO `users` VALUES ('4', 'lcaldas', 'lcaldas@gmail.com', '$2y$10$/pzDj4UU8/kGfVXgqqOmQuyGjEz.BKC3ARsvb7Dk2cToQGcnFgMNS', null, '1', null, null, null, null, null, 'Luz', 'Caldas Torrejon', '2014-03-21 17:27:33', '2014-03-21 17:27:33');
INSERT INTO `users` VALUES ('5', '00001', 'jperez@gmail.com', '$2y$10$mu373ArGapgv8mywPipcm.lIlQGDk3pYHItF7yCPY557SsOBm1PaC', null, '1', null, null, '2014-03-28 14:36:05', '$2y$10$xIH8/9I76dx143sVs57pD.o.1i786ykhksqS/RAJWOaMPFtlrOItG', null, 'Juan', 'Perez Perez', '2014-03-21 18:15:08', '2014-03-28 14:36:05');
INSERT INTO `users` VALUES ('6', '00002', 'mponce@gmail.com', '$2y$10$1OZ.ZVsvFNeHV/ZZi56N2eiLKqG.PgyFRdt5eTTtWGouhHNbD5zPK', null, '1', null, null, '2014-03-28 15:19:24', '$2y$10$IThRG/tUtdKgjrJ3Jr2nR.sIouNQsEoAV1XEDWaim4NUmc03xBe0u', null, 'Maria', 'Ponce Bellido', '2014-03-21 18:15:08', '2014-03-28 15:19:24');
INSERT INTO `users` VALUES ('7', '00003', 'cgonzales@gmail.com', '$2y$10$IiNLtxMg3yF7XmChgfeGn.vy806AY7nvxD/Xb9X2JnnjK2EyWoSdu', null, '1', null, null, null, null, null, 'Carlos Martin', 'Gonzales Prado', '2014-03-21 18:15:08', '2014-03-21 18:15:08');
INSERT INTO `users` VALUES ('8', '00004', 'hpacheco@gmail.com', '$2y$10$L6O5cdvUdGTWqv33A2d9feacTv9qNcijf80qtwhUQp.pyLGaPJtiy', null, '1', null, null, null, null, null, 'Hernan Jose', 'Pacheco Duran', '2014-03-21 18:15:08', '2014-03-21 18:15:08');
INSERT INTO `users` VALUES ('9', '00005', 'vflores@gmail.com', '$2y$10$m4fotmPnQgKXoq/LhjZoOetB755oEFAYWnPvYqv/xjVVeNUtjUxby', null, '1', null, null, null, null, null, 'Vilma ', 'Flores Ramos', '2014-03-21 18:15:09', '2014-03-21 18:15:09');
INSERT INTO `users` VALUES ('10', '00006', 'anuñez@gmail.com', '$2y$10$Rwk3BJHQKBudAWGVHMrPjuyB4ebBXGvOzgiboqbqdkSjC6ceoeB.O', null, '1', null, null, null, null, null, 'Andrea', 'Nuñez Carbajal', '2014-03-21 18:15:09', '2014-03-21 18:15:09');
INSERT INTO `users` VALUES ('11', '00008', 'lcaldas@gmail.com', '$2y$10$iwmNqVnpIciATga98.p2ZeAtM1GBsFXH5Mo3rUnrfoLvJUHE53eXO', null, '1', null, null, null, null, null, 'Luz', 'Caldas Torrejon', '2014-03-21 18:15:09', '2014-03-21 18:15:09');

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
INSERT INTO `users_groups` VALUES ('2', '3');
INSERT INTO `users_groups` VALUES ('3', '1');
INSERT INTO `users_groups` VALUES ('4', '1');
INSERT INTO `users_groups` VALUES ('5', '2');
INSERT INTO `users_groups` VALUES ('6', '2');
INSERT INTO `users_groups` VALUES ('7', '2');
INSERT INTO `users_groups` VALUES ('8', '2');
INSERT INTO `users_groups` VALUES ('9', '2');
INSERT INTO `users_groups` VALUES ('10', '2');
INSERT INTO `users_groups` VALUES ('11', '2');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of valoracionevaluacion
-- ----------------------------
INSERT INTO `valoracionevaluacion` VALUES ('1', '3', '5', '1', '2014-03-28 14:36:43', '2014-03-28 14:36:43');
INSERT INTO `valoracionevaluacion` VALUES ('2', '3', '6', '2', '2014-03-28 14:36:44', '2014-03-28 14:36:44');
INSERT INTO `valoracionevaluacion` VALUES ('3', '3', '7', '3', '2014-03-28 14:36:47', '2014-03-28 14:36:47');
INSERT INTO `valoracionevaluacion` VALUES ('4', '3', '8', '3', '2014-03-28 14:36:51', '2014-03-28 14:36:51');
INSERT INTO `valoracionevaluacion` VALUES ('5', '4', '5', '1', '2014-03-28 15:20:17', '2014-03-28 15:20:17');
INSERT INTO `valoracionevaluacion` VALUES ('6', '4', '6', '2', '2014-03-28 15:20:19', '2014-03-28 15:20:19');
INSERT INTO `valoracionevaluacion` VALUES ('7', '4', '7', '1', '2014-03-28 15:20:21', '2014-03-28 15:20:21');
INSERT INTO `valoracionevaluacion` VALUES ('8', '4', '8', '2', '2014-03-28 15:20:22', '2014-03-28 15:20:22');
