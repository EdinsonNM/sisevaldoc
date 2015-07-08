
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


DELIMITER $$
USE `user40`$$

DROP PROCEDURE IF EXISTS `Indicador_Eval_Prom_AlDocDim`$$
CREATE
    DEFINER = `root`@`localhost`
    PROCEDURE `user40`.`Indicador_Eval_Prom_AlDocDim`(IN vidSemestre INT, IN vidPlantilla INT, IN vidDocente INT)
    BEGIN
      SELECT ve.id AS valoracionevaluacion_id, ve.`tipovaloracion_id`, ce.id AS criterioevaluacion_id, ce.`idpadre`,
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

SELECT
CAST(AVG(suma4) AS DECIMAL(4, 2)) AS prom4,
CAST(AVG(suma3) AS DECIMAL(4, 2)) AS prom3,
CAST(AVG(suma2) AS DECIMAL(4, 2)) AS prom2,
CAST(AVG(suma1) AS DECIMAL(4, 2)) AS prom1,
X.docente_id
FROM
(
SELECT

SUM(IF(tv.`value` = 4, 1, 0)) AS suma4,
SUM(IF(tv.`value` = 3, 1, 0)) AS suma3,
SUM(IF(tv.`value` = 2, 1, 0)) AS suma2,
SUM(IF(tv.`value` = 1, 1, 0)) AS suma1,
e.`id` AS evaluacion_id,  al.id AS alumno_id, d.id AS docente_id
FROM valoracionevaluacion ve
INNER JOIN criterioevaluacion ce ON ve.`criterioevaluacion_id`=ce.`id`
INNER JOIN tipovaloracion tv ON ve.`tipovaloracion_id`=tv.`id`
INNER JOIN evaluacion e ON ve.`evaluacion_id`=e.`id`
INNER JOIN inscripcioncurso ic ON e.`inscripcioncurso_id`=ic.`id`
INNER JOIN alumno al ON ic.`alumno_id`=al.`id`
INNER JOIN cursoasignado ca ON ic.`cursoasignado_id`=ca.`id`
INNER JOIN docente d ON ca.`docente_id`=d.`id`
WHERE  e.`finalizado`=1 AND ce.`plantilla_id`=1 AND ca.`semestre_id`=1
GROUP BY al.id, d.id
) AS X
GROUP BY X.docente_id
