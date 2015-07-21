<?php

class AdminController extends BaseController {

	 public function __construct()
    {
        //$this->beforeFilter('auth', array('except' => 'home.index'));
        $this->beforeFilter(function()
        {
            if (!Sentry::check())
                return View::make('home.index');
        });

    }
	public function getIndex()
    {
       return View::make('admin.index');
    }

    public function postProfile()
    {
        return View::make('admin.index');
    }

    public function getLogout()
    {
        $type = Session::get('type');
        Sentry::logout();
        return Redirect::to('/');
    }

    public function getValidatelogin()
    {
        try
        {
            $user = Sentry::findUserByCredentials(array(
                'username'      => Input::get('username'),
                'password'   => Input::get('password')
            ));
            $success=true;
        }
        catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
        {
            $success=false;
        }

        return Response::json(array('success' => $success),201);
    }

    public function postUpdatepassword()
    {
        $message="";
        $success=false;
        try
        {
            $user = Sentry::findUserByCredentials(array(
                'username'      => Input::get('username'),
                'password'   => Input::get('password')
            ));
            if(Input::get('newpassword')==Input::get('repeatpassword')){
                $user->password = Input::get('newpassword');
                $user->save();
                $success=true;
                $message="Contraseña actualizada satisfactoriamente";
            }else{
                $message="Contraseña de confirmación no coincide con la nueva contraseña";
            }

        }
        catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
        {
            $success=false;
            $message="Credenciales de Usuario no validas";
        }

        return Response::json(array('success' => $success,'message'=>$message),201);
    }

    public function getUsuario()
    {

        $usuario=Sentry::getUser();

        return Response::json(array(
              'error' => false,
              'data' => $usuario->toArray()),
              201
        );
    }
    public function getDocente()
    {

        $usuario=Sentry::getUser();
        $grupos=$usuario->getGroups();
        $grupo=$grupos[0];
        $customusuario=null;
        switch($grupo->url){
            case 'administrador':

                break;
            case 'docente':
                $customusuario=Docente::where('usuario_id','=',$usuario->id)->first();
                break;
        }
        return Response::json(array(
              'error' => false,
              'data' => $customusuario->toArray()),
              201
        );
    }
    public function getAlumno()
    {

        $usuario=Sentry::getUser();
        $grupos=$usuario->getGroups();
        $grupo=$grupos[0];
        $customusuario=null;
        switch($grupo->url){
            case 'administrador':

                break;
            case 'docente':

                break;
            case 'alumno':
                $customusuario=Alumno::where('usuario_id','=',$usuario->id)->first();
                break;
        }
        return Response::json(array(
              'error' => false,
              'data' => $customusuario->toArray()),
              201
        );
    }

    public function getUseravailable()
    {
        $username=Input::get("username");
        try
        {
            $user = Sentry::findUserByLogin($username);
            $success=false;
        }
        catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
        {
            $success=true;
        }
        return Response::json(array('success' => $success),201);
    }

    public function getMenu()
    {

        //$grupos=Sentry::getUser()->getGroups();
        $type = Session::get('type');
        switch($type){
            case 'administrador':
                $menu[1]=array('title'=>"Usuarios",'url'=>'javascript:return false;','icon'=>'glyphicon glyphicon-user');
                $menu[1]['children'][0]=array('title'=>"Docentes",'url'=>'#/docente','icon'=>'glyphicon glyphicon-user');
                $menu[1]['children'][1]=array('title'=>"Alumnos",'url'=>'#/alumno','icon'=>'glyphicon glyphicon-user');




                $menu[0]=array('title'=>"Mantenimiento",'url'=>'javascript:return false;','icon'=>'glyphicon glyphicon-bookmark');
                $menu[0]['children'][0]=array('title'=>"Grado",'url'=>'#/grado','icon'=>'glyphicon glyphicon-bookmark');
                $menu[0]['children'][1]=array('title'=>"Titulo",'url'=>'#/titulo','icon'=>'glyphicon glyphicon-bookmark');
                $menu[0]['children'][2]=array('title'=>"Categoria de Docentes",'url'=>'#/categoriadocente','icon'=>'glyphicon glyphicon-bookmark');
                $menu[0]['children'][3]=array('title'=>"Actividad",'url'=>'#/actividad','icon'=>'glyphicon glyphicon-dashboard');

                $menu[2]=array('id'=>1,'title'=>"Facultades",'url'=>'#/facultad','icon'=>'glyphicon glyphicon-tower');

                $menu[3]=array('title'=>"Semestre",'url'=>'#/semestre','icon'=>'glyphicon glyphicon-calendar');

                $menu[4]=array('title'=>"Evaluación",'url'=>'javascript:return false;','icon'=>'glyphicon glyphicon-list');
                $menu[4]['children'][0]=array('title'=>"Criterios de Evaluación",'url'=>'#/matrizevaluacion','icon'=>'glyphicon glyphicon-list');
                $menu[4]['children'][1]=array('title'=>"Asignación de Cursos",'url'=>'#/asignacioncursos','icon'=>'glyphicon glyphicon-book');

                $menu[5]=array('title'=>"Reportes",'url'=>'javascript:return false;','icon'=>'glyphicon glyphicon-book');
                $menu[5]['children'][0]=array('title'=>"Evaluación Docente",'url'=>'#/reports/evaluaciondocente','icon'=>'');
                $menu[5]['children'][1]=array('title'=>"Grafico Evaluación",'url'=>'#/reports/graphicevaluacion','icon'=>'');
                $menu[5]['children'][2]=array('title'=>"Grafico AutoEvaluación",'url'=>'#/reports/graphicautoevaluacion','icon'=>'');
                $menu[5]['children'][3]=array('title'=>"Grafico AutoEvaluación Por Criterios",'url'=>'#/reports/graphicautoevaluacioncriterio','icon'=>'');
                $menu[5]['children'][4]=array('title'=>"Grafico Evaluación Jefe Departamento ",'url'=>'#/reports/evaluacionjefedepartamento','icon'=>'');
                $menu[5]['children'][5]=array('title'=>"Carga Horaria Asignada",'url'=>'#/reports/cargahorariaasignada','icon'=>'');
                $menu[5]['children'][6]=array('title'=>"Avance Curricular",'url'=>'#/reports/avancecurricular','icon'=>'');

								$menu[5]['children'][7]=array('title'=>"Evaluacion de Desempeño Docente según percepción de los Estudiantes",'url'=>'#/reports/evaluaciondesempenodocal','icon'=>'');
								$menu[5]['children'][8]=array('title'=>"Evaluacion Promedio de Alumnos a los Docentes por Dimension",'url'=>'#/reports/evaluacionpromedioaldocdim','icon'=>'');


                break;
            case 'docente':
                $menu[0]=array('id'=>1,'title'=>"Mis Cursos",'url'=>'#/cursoasignado','icon'=>'glyphicon glyphicon-book');

                break;

            case 'alumno':
                $menu[0]=array('id'=>1,'title'=>"Mis Cursos",'url'=>'#/alumnocurso','icon'=>'glyphicon glyphicon-book');
                break;

            case 'jefedpto':
                $menu[0]=array('title'=>"Evaluación de Cursos",'url'=>'#/evaluaciondocentes','icon'=>'glyphicon glyphicon-book');
                $menu[1]=array('title'=>"Reportes",'url'=>'javascript:return false;','icon'=>'glyphicon glyphicon-book');
                $menu[1]['children'][0]=array('title'=>"Evaluación Docente",'url'=>'#/reports/evaluaciondocentejd','icon'=>'glyphicon glyphicon-bookmark');
                $menu[1]['children'][1]=array('title'=>"Auto Evaluación Docente",'url'=>'#/reports/autoevaluaciondocentejd','icon'=>'glyphicon glyphicon-bookmark');
                $menu[1]['children'][2]=array('title'=>"Avance Curricular",'url'=>'#/reports/avancecurricularjd','icon'=>'');
                $menu[1]['children'][3]=array('title'=>"Carga Horaria Asignada",'url'=>'#/reports/cargahorariaasignadajd','icon'=>'');

								$menu[2]=array('title'=>"Reportes",'url'=>'javascript:return false;','icon'=>'glyphicon glyphicon-book');
                $menu[2]['children'][0]=array('title'=>"Evaluación Docente",'url'=>'#/reports/evaluaciondocente','icon'=>'');
                $menu[2]['children'][1]=array('title'=>"Grafico Evaluación",'url'=>'#/reports/graphicevaluacion','icon'=>'');
                $menu[2]['children'][2]=array('title'=>"Grafico AutoEvaluación",'url'=>'#/reports/graphicautoevaluacion','icon'=>'');
                $menu[2]['children'][3]=array('title'=>"Grafico AutoEvaluación Por Criterios",'url'=>'#/reports/graphicautoevaluacioncriterio','icon'=>'');
                $menu[2]['children'][4]=array('title'=>"Grafico Evaluación Jefe Departamento ",'url'=>'#/reports/evaluacionjefedepartamento','icon'=>'');
                $menu[2]['children'][5]=array('title'=>"Carga Horaria Asignada",'url'=>'#/reports/cargahorariaasignada','icon'=>'');
                $menu[2]['children'][6]=array('title'=>"Avance Curricular",'url'=>'#/reports/avancecurricular','icon'=>'');

								$menu[2]['children'][7]=array('title'=>"Evaluacion de Desempeño Docente según percepción de los Estudiantes",'url'=>'#/reports/evaluaciondesempenodocal','icon'=>'');
								$menu[2]['children'][8]=array('title'=>"Evaluacion Promedio de Alumnos a los Docentes por Dimension",'url'=>'#/reports/evaluacionpromedioaldocdim','icon'=>'');

                break;
        }

        return Response::json(array(
              'error' => false,
              'data' => $menu),
              201
         );
    }

    public function getType()
    {

        $usuario=Sentry::getUser();
        $type = Session::get('type');
        $customusuario=null;
        switch($type){
            case 'administrador':
            $customusuario=new Docente();
            break;
            case 'alumno':
                $customusuario=Alumno::where('usuario_id','=',$usuario->id)
                    ->with(array('escuela' =>function($q){
                        return $q->with('facultad');
                    } ))
                    ->first();
                break;
            case 'jefedpto':
            case 'docente':
                $customusuario=Docente::where('usuario_id','=',$usuario->id)
                    ->with(array('escuela' =>function($q){
                        return $q->with('facultad');
                    } ))
                    ->first();
                break;
        }

        return Response::json(array('type' => $type,'entity'=>$customusuario->toArray()),201);
    }

    public function postExportexcel(){
        $statusCode=200;
        $data=(Input::get('data_download'));
        $contents = View::make('admin.download')->with('data', $data);
        $response = Response::make($contents, $statusCode);
        $response->header('Content-Type', 'application/vnd.ms-excel;');
        $response->header('Content-Disposition', 'attachment; filename="report.xls"');
        return $response;
    }

}
