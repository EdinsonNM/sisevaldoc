
Create Table

CREATE TABLE `ficha_impresion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) DEFAULT NULL,
  `alumno_id` int(11) DEFAULT NULL,
  `semestre_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `total` int(10) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1



//Indicador_Eval_Prom_AlDocDim

DELIMITER $$

USE `user40`$$

DROP PROCEDURE IF EXISTS `Indicador_Eval_Prom_AlDocDim`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Indicador_Eval_Prom_AlDocDim`(IN vidSemestre INT, IN vidPlantilla INT, IN vidDocente INT)
BEGIN
	SELECT
	ve.id AS valoracionevaluacion_id, ve.`tipovaloracion_id`, ce.id AS criterioevaluacion_id, ce.`idpadre`,
	CAST(AVG(tv.`value`) AS DECIMAL(4, 2)) AS prom, CAST(STDDEV(tv.`value`) AS DECIMAL(4, 2)) AS sd,
	e.`id` AS evaluacion_id, ic.`id` AS inscripcioncurso_id, al.id AS alumno_id, ca.id AS cursoasignado_id, d.id AS docente_id
	FROM valoracionevaluacion ve
	INNER JOIN criterioevaluacion ce ON ve.`criterioevaluacion_id`=ce.`id`
	INNER JOIN tipovaloracion tv ON ve.`tipovaloracion_id`=tv.`id`
	INNER JOIN evaluacion e ON ve.`evaluacion_id`=e.`id`
	INNER JOIN inscripcioncurso ic ON e.`inscripcioncurso_id`=ic.`id`
	INNER JOIN alumno al ON ic.`alumno_id`=al.`id`
	INNER JOIN cursoasignado ca ON ic.`cursoasignado_id`=ca.`id`
	INNER JOIN docente d ON ca.`docente_id`=d.`id`
	WHERE d.id=vidDocente AND e.`finalizado`=1 AND ce.`plantilla_id`=vidPlantilla AND ca.`semestre_id`=vidSemestre
	GROUP BY ce.id;
    END$$

DELIMITER ;





//Reporte resultados de la encuesta de evaluacion de desempeño docente segun percepcion de los estudiantes - unu

DELIMITER $$

USE `user40`$$

DROP PROCEDURE IF EXISTS `Reporte_Eval_Desempeno_DocAl`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Reporte_Eval_Desempeno_DocAl`(IN vidSemestre INT, IN vidPlantilla INT, IN vidEscuela INT)
BEGIN
	SELECT
	CAST(AVG(suma4) AS DECIMAL(4, 2)) AS prom4,
	CAST(AVG(suma3) AS DECIMAL(4, 2)) AS prom3,
	CAST(AVG(suma2) AS DECIMAL(4, 2)) AS prom2,
	CAST(AVG(suma1) AS DECIMAL(4, 2)) AS prom1,
	X.docente_id,
	dd.firstname,
	dd.lastname,
	X.escuela_nombre,
	X.facultad_nombre
	FROM
	(
		SELECT
		SUM(IF(tv.`value` = 4, 1, 0)) AS suma4,
		SUM(IF(tv.`value` = 3, 1, 0)) AS suma3,
		SUM(IF(tv.`value` = 2, 1, 0)) AS suma2,
		SUM(IF(tv.`value` = 1, 1, 0)) AS suma1,
		e.`id` AS evaluacion_id,  al.id AS alumno_id, d.id AS docente_id,
		d.`escuela_id` AS escuela_id, es.`description` AS escuela_nombre, f.`description` AS facultad_nombre
		FROM valoracionevaluacion ve
		INNER JOIN criterioevaluacion ce ON ve.`criterioevaluacion_id`=ce.`id`
		INNER JOIN tipovaloracion tv ON ve.`tipovaloracion_id`=tv.`id`
		INNER JOIN evaluacion e ON ve.`evaluacion_id`=e.`id`
		INNER JOIN inscripcioncurso ic ON e.`inscripcioncurso_id`=ic.`id`
		INNER JOIN alumno al ON ic.`alumno_id`=al.`id`
		INNER JOIN cursoasignado ca ON ic.`cursoasignado_id`=ca.`id`
		INNER JOIN docente d ON ca.`docente_id`=d.`id`
		INNER JOIN escuela es ON d.`escuela_id`=es.`id`
		INNER JOIN facultad f ON es.`facultad_id`=f.id
		WHERE  e.`finalizado`=1 AND ce.`plantilla_id`=vidPlantilla AND ca.`semestre_id`=vidSemestre AND d.`escuela_id`=vidEscuela
		GROUP BY al.id, d.id
	) AS X
	INNER JOIN docente dd ON X.docente_id=dd.id
	GROUP BY X.docente_id;
    END$$

DELIMITER ;




//Report eval jefe

DELIMITER $$

USE `user40`$$

DROP PROCEDURE IF EXISTS `Reporte_Eval_Jefe`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Reporte_Eval_Jefe`(IN vidSemestre INT, IN vidPlantilla INT, IN vidJefe INT)
BEGIN
	SELECT
	vej.id, vej.`evaluacionjefedpto_id`, vej.`criterioevaluacion_id`, vej.`tipovaloracion_id`,
	d.id AS docente_id, ej.`docente_id` AS evaluador, GROUP_CONCAT(tv.`value`) AS valores,
	SUM(IF(tv.`value` = 5, 1, 0)) AS suma5,
	SUM(IF(tv.`value` = 4, 1, 0)) AS suma4,
	SUM(IF(tv.`value` = 3, 1, 0)) AS suma3,
	SUM(IF(tv.`value` = 2, 1, 0)) AS suma2,
	SUM(IF(tv.`value` = 1, 1, 0)) AS suma1
	FROM valoracionevaluacionjefedpto vej
	INNER JOIN criterioevaluacion ce ON vej.`criterioevaluacion_id`=ce.`id`
	INNER JOIN tipovaloracion tv ON vej.`tipovaloracion_id`=tv.id
	INNER JOIN evaluacionjefedpto ej ON vej.`evaluacionjefedpto_id`=ej.`id`
	INNER JOIN cursoasignado ca ON ej.`cursoasignado_id`=ca.`id`
	INNER JOIN docente d ON ca.`docente_id`=d.id
	WHERE ce.`plantilla_id`=vidPlantilla AND ej.`docente_id`=vidJefe AND ca.`semestre_id`=vidSemestre
	GROUP BY d.id;
    END$$

DELIMITER ;
