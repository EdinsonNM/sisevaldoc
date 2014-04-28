<?php

/**
* Agregamos un usuario nuevo a la base de datos.
*/
class TableTeachersSeeder extends Seeder {
    public function run(){

    	//Alumno 1
        $docente=Docente::create(array(
            'code'  => 'Docente',
            'firstname' => 'Juan',
            'lastname'=> 'Perez Perez',
            'categoriadocente_id'=>1,
            'grado_id'=>1,
            'titulo_id'=>1,
            'tipodedicacion_id'=>1,
            'escuela_id'=> 2
           
        ));
 		
    	$user = Sentry::createUser(array(
            'username'     => 'j.perez',
            'first_name'=>$docente->firstname,
            'last_name'=>$docente->lastname,
            'password'  => 'j.perez',
            'email' =>'jperez@hotmail.com',
            'activated' => true,
        ));
        $adminGroup = Sentry::findGroupById(1);
        $user->addGroup($adminGroup);

     	$docente->usuario_id=$user->id;
        $docente->save();

    }
}