<?php

/**
* Agregamos un usuario nuevo a la base de datos.
*/
class TableStudentsSeeder extends Seeder {
    public function run(){

        //Alumno 1
        $alumno=Alumno::create(array(
            'code'  => '123456',
            'firstname' => 'Alvia',
            'lastname'=> 'Carbajal Camposano',
            'escuela_id'=> 2,
            'yearinput'=> 2001
           
        ));
 		
    	$user = Sentry::createUser(array(
            'username'     => $alumno->code,
            'first_name'=>$alumno->firstname,
            'last_name'=>$alumno->lastname,
            'password'  => $alumno->code,
            'email' =>'misha@hotmail.com',
            'activated' => true,
        ));
        $adminGroup = Sentry::findGroupById(2);
        $user->addGroup($adminGroup);

     	$alumno->usuario_id=$user->id;
        $alumno->save();

        //Alumno 2
        $alumno=Alumno::create(array(
            'code'  => '342853598',
            'firstname' => 'Edinson',
            'lastname'=> 'Nuñez More',
            'escuela_id'=> 2,
            'yearinput'=> 2001
           
        ));
        
        $user = Sentry::createUser(array(
            'username'     => $alumno->code,
            'first_name'=>$alumno->firstname,
            'last_name'=>$alumno->lastname,
            'password'  => $alumno->code,
            'email' =>'nmedinson@hotmail.com',
            'activated' => true,
        ));
        $adminGroup = Sentry::findGroupById(2);
        $user->addGroup($adminGroup);

        $alumno->usuario_id=$user->id;
        $alumno->save();


        //Alumno 3
        $alumno=Alumno::create(array(
            'code'  => '3428513598',
            'firstname' => 'Yumi',
            'lastname'=> 'Tominaga Garcia',
            'escuela_id'=> 2,
            'yearinput'=> 2001
           
        ));
        
        $user = Sentry::createUser(array(
            'username'     => $alumno->code,
            'first_name'=>$alumno->firstname,
            'last_name'=>$alumno->lastname,
            'password'  => $alumno->code,
            'email' =>'yumini@hotmail.com',
            'activated' => true,
        ));
        $adminGroup = Sentry::findGroupById(2);
        $user->addGroup($adminGroup);

        $alumno->usuario_id=$user->id;
        $alumno->save();
    }
}