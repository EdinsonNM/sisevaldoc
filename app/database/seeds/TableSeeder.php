<?php

/**
* Agregamos un usuario nuevo a la base de datos.
*/
class TableSeeder extends Seeder {
    public function run(){
       
        Group::create(array(
            'name'  => 'Docente',
            'url'     => 'docente',
            'title'=> 'SISEVALDOC para Docentes',
            'subtitle'=> 'Registre sus cursos, alumnos y complete su matriz de evaluación.',
            'description'=> 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.'
           
        ));
        Group::create(array(
            'name'  => 'Alumno',
            'url'     => 'alumno',
            'title'=> 'SISEVALDOC para Alumnos',
            'subtitle'=> 'Realiza la evaluación de tus docentes.',
            'description'=> 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.'
           
        ));
        Group::create(array(
            'name'  => 'Jefe de Departamento',
            'url'     => 'jefedpto',
            'title'=> 'SISEVALDOC para Jefe de Departamentos',
            'subtitle'=> 'Commodo id natoque malesuada sollicitudin elit suscipit',
            'description'=> 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.'
           
        ));
        Group::create(array(
            'name'  => 'Administrador',
            'url'     => 'administrador',
            'title'=> 'SISEVALDOC para Administrador',
            'subtitle'=> 'Commodo id natoque malesuada sollicitudin elit suscipit',
            'description'=> 'Commodo id natoque malesuada sollicitudin elit suscipit. Curae suspendisse mauris posuere accumsan massa posuere lacus convallis tellus interdum. Amet nullam fringilla nibh nulla convallis ut venenatis purus sit arcu sociis. Nunc fermentum adipiscing tempor cursus nascetur adipiscing adipiscing. Primis aliquam mus lacinia lobortis phasellus suscipit. Fermentum lobortis non tristique ante proin sociis accumsan lobortis. Auctor etiam porttitor phasellus tempus cubilia ultrices tempor sagittis. Nisl fermentum consequat integer interdum integer purus sapien. Nibh eleifend nulla nascetur pharetra commodo mi augue interdum tellus. Ornare cursus augue feugiat sodales velit lorem. Semper elementum ullamcorper lacinia natoque aenean scelerisque.'
           
        ));

        $user = Sentry::createUser(array(
        'username'=> 'admin',
        'email'     => 'admin@admin.com',
        'password'  => 'admin',
        'activated' => true,
        ));
        $adminGroup = Sentry::findGroupById(4);

        $user->addGroup($adminGroup);
        Menu::create(array(
            'name'  => 'Home',
            'url'     => './admin',
            'padre_id'=> '0',
            'orden' => 1
        ));
        Menu::create(array(
            'name'  => 'mantenimiento',
            'url'     => '',
            'padre_id'=> '0',
            'orden' => 1
        ));
        /*
        CategoriaDocente::create(array(
            'name'  => 'Nombrado',
        ));
        CategoriaDocente::create(array(
            'name'  => 'Asociado',
        ));
        */
        PlantillaCriterios::create(array(
            'name'  => 'MATRIZ GENERAL DE CRITERIOS DE EVALUACIÓN',
            'active'=>'1'
        ));
        /*
        CriterioEvaluacion::create(array(
            'name'  => 'PLANIFICACIÓN Y PREPARACIÓN DE CLASES',
            'idpadre'=>0,
            'grupo'=>1,
            'plantilla_id'=>1
        ));
        CriterioEvaluacion::create(array(
            'name'  => 'METODOLOGÍA',
            'idpadre'=>0,
            'grupo'=>1,
            'plantilla_id'=>1
        ));
        CriterioEvaluacion::create(array(
            'name'  => 'AMBIENTE PARA EL APRENDIZAJE',
            'idpadre'=>0,
            'grupo'=>1,
            'plantilla_id'=>1
        ));
        CriterioEvaluacion::create(array(
            'name'  => 'EVALUACIÓN',
            'idpadre'=>0,
            'grupo'=>1,
            'plantilla_id'=>1
        ));
        CriterioEvaluacion::create(array(
            'name'  => 'EXPLICA EL CONTENIEDO DEL SILABO EN FORMA CLARA Y PRECISA EL PRIMER DIA DE CLASE',
            'idpadre'=>1,
            'grupo'=>0,
            'plantilla_id'=>1
        ));
        CriterioEvaluacion::create(array(
            'name'  => 'EL DOCENTE ASISTE Y CUMPLE CON EL DESARROLLO DE LOS TEMAS PLANIFICADOS DE ACUERDO AL SILABO',
            'idpadre'=>1,
            'grupo'=>0,
            'plantilla_id'=>1
        ));
        CriterioEvaluacion::create(array(
            'name'  => 'EL DOCENTE EN CASO DE NO ASISTIR A CLASES, RECUPERA LAS CLASES INMEDIATAMENTE',
            'idpadre'=>1,
            'grupo'=>0,
            'plantilla_id'=>1
        ));
        CriterioEvaluacion::create(array(
            'name'  => 'INFORMA LA IMPORTANCIA O UTILIDAD DE LOS CONOCIMIENTOS QUE SE ADQUIERAN',
            'idpadre'=>1,
            'grupo'=>0,
            'plantilla_id'=>1
        ));
        */
        Grado::create(array(
            'name'  => 'BACHILLER'
        ));
        Grado::create(array(
            'name'  => 'MAGISTER'
        ));
        Grado::create(array(
            'name'  => 'DOCTOR'
        ));
        Grado::create(array(
            'name'  => 'PHD'
        ));
        /*
        Titulo::create(array(
            'name'  => 'INGENIERO DE SISTEMAS'
        ));
        Titulo::create(array(
            'name'  => 'INGENIERO INDUSTRIAL'
        ));
        Titulo::create(array(
            'name'  => 'ADMINISTRACIÓN'
        ));
        */
        TipoDedicacion::create(array(
            'name'  => 'TIEMPO COMPLETO',
            'abbreviation'=>'TC'
        ));
        TipoDedicacion::create(array(
            'name'  => 'TIEMPO PARCIAL',
            'abbreviation'=>'TP'
        ));

        /*
        Facultad::create(array(
            'code'  => '00001',
            'name'  => 'INGENIERIA CIVIL Y DE SISTEMAS'
        ));
        Escuela::create(array(
            'code'  => '00001',
            'name'  => 'INGENIERIA DE SISTEMAS',
            'facultad_id'=>1
        ));
        Escuela::create(array(
            'code'  => '00002',
            'name'  => 'INGENIERIA CIVIL',
            'facultad_id'=>1
        ));
        Curso::create(array(
            'code'  => '00001',
            'name'  => 'INTRODUCCION A LOS ALGORITMOS',
            'escuela_id'=>1,
            'ciclo'=>1,
            'numbercredits'=>4
        ));
        Curso::create(array(
            'code'  => '00002',
            'name'  => 'MATEMATICA I',
            'escuela_id'=>1,
            'ciclo'=>1,
            'numbercredits'=>4
        ));
        Curso::create(array(
            'code'  => '00003',
            'name'  => 'MATEMATICA II',
            'escuela_id'=>1,
            'ciclo'=>2,
            'numbercredits'=>4
        ));
        */
        Semestre::create(array(
            'year'  => '2014',
            'period'  => '1',
            'numberweeks'=>16
        ));
        Semestre::create(array(
            'year'  => '2013',
            'period'  => '1',
            'numberweeks'=>16
        ));
        Semestre::create(array(
            'year'  => '2013',
            'period'  => '2',
            'numberweeks'=>16
        ));

        TipoValoracion::create(array(
            'name'  => 'Siempre',
            'value'  => '4'
        ));
        TipoValoracion::create(array(
            'name'  => 'Frecuente',
            'value'  => '3'
        ));
        TipoValoracion::create(array(
            'name'  => 'Pocas Veces',
            'value'  => '2'
        ));
        TipoValoracion::create(array(
            'name'  => 'Nunca',
            'value'  => '1'
        ));

    }
}