<?php

class LoginUserController extends BaseController {

	 //establecemos restful a true
    public $restful = true;

    public function getForgotmypassword(){
        return View::make('login.forgotmypassword');
    }
    public function postRequestressetpassword(){
        $user=Input::get('username');
        $message="";
        $title="";
        try
        {
            $user = Sentry::findUserByLogin($user);
            $resetCode = $user->getResetPasswordCode();
            $title="solicitud Enviada!";
            $message="Se ha enviado una solicitud de cambio de contraseña a la siguiente dirección de correo :$user->email ";
            Mail::send('emails.RequestChangePassword',
                array(
                    'user'=>$user->toArray(),
                    'resetCode'=>$resetCode
                ), function($message) use($user)
            {
                 $message->from('admin@admin.com', 'Sisevaldoc');
                 $message->to($user->email, $user->first_name.' '.$user->last_name)->subject('Solicitud de cambio de Contraseña');
            });
        }
        catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
        {
            $message='Usuario ingresado no se encontro en el sistema. Por favor intentelo nuevamente';
            $title="No se pudo enviar la solicitud!";
        }
        return View::make('login.requestpassword')
            ->with("message",$message)
            ->with("title",$title);
    }

    public function getResetpassword()
    {
        $username=Input::get('username');
        $code=Input::get('code');
        $user = Sentry::findUserByLogin($username);

        // Check if the reset password code is valid
        if ($user->checkResetPasswordCode($code))
        {
            $success=true;
        }
        else
        {
            $success=false;
        }
        
        return View::make('login.resetpassword')
            ->with("success",$success)
            ->with("code",$code)
            ->with("username",$username);
    }
    public function postResetpassword()
    {
        $username=Input::get('username');
        $code=Input::get('code');
        $password=Input::get('password');
        $user = Sentry::findUserByLogin($username);

        // Check if the reset password code is valid
        if ($user->checkResetPasswordCode($code))
        {
             if ($user->attemptResetPassword($code, $password))
            {
                $success=true;
                $title="Operación Satisfactoria!";
                $message="Felicidades. Ud. ha cambiado su contraseña de usuario satisfactoriamente";
            }
            else
            {
                $success=false;
                $title="Error de Cambio de Contraseña!";
                $message="Ocurrio un error mientras se intentaba cambiar la contraseña. Por favor intente nuevamente";
            }
            
        }
        else
        {
            $success=false;
            $title="Requerimiento Denegado!";
            $message="Código de Petición de cambio de contraseña es incorrecto. Este problema puede ocurrir debido a que la dirección es invalida o su código de petición ha expirado. Si desea cambiar su contraseña haga click <a href='./forgotmypassword'>aqui</a>";
        }
        
        return View::make('login.resetpasswordsuccess')
            ->with("success",$success)
            ->with("code",$code)
            ->with("username",$username)
            ->with('title',$title)
            ->with('message',$message);
    }

}