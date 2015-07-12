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
        $success=false;
        $message='';
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
                        $success=true;

                    }

                }else{
                     $message="Grupo incorrrecto.!!";
                }
            }

        }
        return Response::json(array('success'=>$success,'message'=>$message,'type'=>$type),200);
            Log::info('no existe');
            return Redirect::to('login/'.$type)
            ->with('mensaje',$message)
            ->with('type',$type);




    }

}
