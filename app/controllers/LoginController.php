<?php

class LoginController extends BaseController {

	 //establecemos restful a true
    public $restful = true;
    //protected $layout = 'layout';
 
    /**
     * Display the specified resource.
     *
     * @param  string  $type
     */
    public function getIndex($type)
    {
 
       
        //si se ha iniciado sesión no dejamos volver
        if(Auth::check())
        {
            return Redirect::to('admin')->with('type',$type);
        }
        //mostramos la vista views/login/index.blade.php pasando un título
        return View::make('login.index')->with('type',$type);
 
    }
 
     /**
     * Display the specified resource.
     *
     * @param  string  $type
     */
    public function postIndex($type)
    {
        $group=null;
        $user=null;
        try
        {
            $group = Sentry::findGroupByUrl($type);
        }
        catch (Cartalyst\Sentry\Groups\GroupNotFoundException $e)
        {
            $message='Grupo no encontrado!!!.';
            $error=true;
        }
        
        if($group){
            Log::info('si existe el grupo');
           
            try
            {
                 $user = Sentry::findUserByLogin(Input::get('username'));
            }
            catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
            {
                $message="Usuario o Contraseña incorrectos.";
            }
            if($user){
                if($user->inGroup($group)){
                    $credentials = array(
                    'username' => Input::get('username'),
                    'password'=> Input::get('password')
                    );

                    try{
                        $user = Sentry::authenticate($credentials, false);
                    }catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
                    {
                        $message="Usuario o Contraseña incorrectos.";
                    }
                    
                    if (Sentry::check())
                    {
                        Session::put('type', $type);
                        return Redirect::to('/admin');

                    }
                   
                }else{
                     $message="Grupo incorrrecto.!!";
                }
            }
            
        }

            Log::info('no existe');
            return Redirect::to('login/'.$type)
            ->with('mensaje',$message)
            ->with('type',$type);
        
       
       
 
    }
 
}