<?php

class ImportController extends BaseController {

	 public function __construct()
    {
        $this->beforeFilter(function()
        {
            if (!Sentry::check())
                return View::make('home.index');
        });
        set_time_limit (600);

    }
	public function postFacultad()
    {
       if (!empty( $_FILES ))
       {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $result=Excel::excel2Array($tempPath);
            $isHeader=true;

            foreach ($result[0] as $valor) {
                $isvalid=true;
                $message="";
                if($isHeader)
                    $isHeader=false;
                else
                {
                    $facultad=Facultad::where('code','=',$valor[0][0])->first();
                    if($facultad){
                        $message="Registro no se importara. Codigo de Facultad ya existe";
                        $isvalid=false;
                    }
                    $data[]=array(
                        'code' => $valor[0][0],
                        'name' => $valor[0][1],
                        'description'=>$valor[0][2],
                        'isvalid'=>$isvalid,
                        'message'=>$message
                    );
                }

            }
            $success=true;
        } else
           $success=false;

       return Response::json(
               array('total'=>count($data),'success' => $success,'data'=>$data),
              201
        );
    }

    public function postFacultadsave()
    {
        $input = Input::All();
        $entities = array();
        foreach ($input as $item) {
            if($item['isvalid']){
                $entity = new Facultad();
                $entity->code=$item['code'];
                $entity->name=$item['name'];
                $entity->description=$item['description'];
                $entity->save();
                $entities[]=$entity;
            }
        }

        return Response::json(array(
            'error' => false,
            'entities'=>$entities
            ), 200
        );
    }

    public function postEscuela()
    {
       if (!empty( $_FILES ))
       {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $result=Excel::excel2Array($tempPath);
            $isHeader=true;
            foreach ($result[0] as $valor) {
                $isvalid=true;
                $message="";
                if($isHeader)
                    $isHeader=false;
                else
                {
                    $facultad=Facultad::where('code','=',$valor[0][0])->first();
                    if(!$facultad){
                        $message="Registro no se importara. Codigo de Facultad N° ".$valor[0][0]." no existe";
                        $isvalid=false;
                        $facultad=new Facultad();

                    }
                    $escuela=Escuela::where('code','=',$valor[0][1])->first();
                    if($escuela){
                        $message="Registro no se importara. Codigo de Escuela ya existe";
                        $isvalid=false;
                    }
                    $data[]=array(
                        'facultad_id' => $facultad->id,
                        'code' => $valor[0][1],
                        'name' => $valor[0][2],
                        'description'=>$valor[0][3],
                        'facultad'=>$facultad->toArray(),
                        'isvalid'=>$isvalid,
                        'message'=>$message
                    );
                }

            }
            $success=true;
        } else
           $success=false;

       return Response::json(
               array('total'=>count($data),'success' => $success,'data'=>$data),
              201
        );
    }

    public function postEscuelasave()
    {
        $input = Input::All();
        $entities = array();
        foreach ($input as $item) {
            if($item['isvalid']){
                $entity = new Escuela();
                $entity->facultad_id=$item['facultad_id'];
                $entity->code=$item['code'];
                $entity->name=$item['name'];
                $entity->description=$item['description'];
                $entity->save();
                $entities[]=$entity;
            }
        }

        return Response::json(array(
            'error' => false,
            'entities'=>$entities
            ), 200
        );
    }

    public function postCurso()
    {
       if (!empty( $_FILES ))
       {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $result=Excel::excel2Array($tempPath);
            $isHeader=true;
            foreach ($result[0] as $valor) {
                $isvalid=true;
                $message="";
                if($isHeader)
                    $isHeader=false;
                else
                {
                    $escuela=Escuela::where('code','=',$valor[0][0])->first();
                    if(!$escuela){
                        $message="Registro no se importara. Codigo de Escuela N° ".$valor[0][0]." no existe";
                        $isvalid=false;
                        $escuela=new Escuela();

                    }
                    $curso=Curso::where('code','=',$valor[0][1])->first();
                    if($curso){
                        $message="Registro no se importara. Codigo de Curso ya existe";
                        $isvalid=false;
                    }
                    $data[]=array(
                        'escuela_id' => $escuela->id,
                        'code' => $valor[0][1],
                        'name' => $valor[0][2],
                        'ciclo'=>$valor[0][3],
                        'numbercredits'=>$valor[0][4],
                        'numberhours'=>$valor[0][5],
                        'escuela'=>$escuela->toArray(),
                        'isvalid'=>$isvalid,
                        'message'=>$message
                    );
                }

            }
            $success=true;
        } else
           $success=false;

       return Response::json(
               array('total'=>count($data),'success' => $success,'data'=>$data),
              201
        );
    }

    public function postCursosave()
    {
        $input = Input::All();
        $entities = array();
        $cursos=array();
        foreach ($input as $item) {
            if($item['isvalid']){
                $entity = new Curso();
                $entity->escuela_id=$item['escuela_id'];
                $entity->code=$item['code'];
                $entity->name=$item['name'];
                $entity->ciclo=$item['ciclo'];
                $entity->numbercredits=$item['numbercredits'];
                $entity->numberhours=$item['numberhours'];
                //$entity->save();
                $entities[]=$entity;
                $cursos[]=$entity->toArray();
            }
        }
        Curso::insert($cursos);
        return Response::json(array(
            'error' => false,
            'entities'=>$entities
            ), 200
        );
    }

    public function postDocente()
    {
       if (!empty( $_FILES ))
       {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $result=Excel::excel2Array($tempPath);
            $isHeader=true;
            foreach ($result[0] as $valor) {
                $isvalid=true;
                $message="";
                if($isHeader)
                    $isHeader=false;
                else
                {
                    $escuela=Escuela::where('code','=',$valor[0][0])->first();
                    if(!$escuela){
                        $message="Registro no se importara. Codigo de Escuela N° ".$valor[0][0]." no existe";
                        $isvalid=false;
                        $escuela=new Escuela();

                    }

                    $categoria=CategoriaDocente::where('name','=',$valor[0][4])->first();
                    if(!$categoria){
                        $message="Registro no se importara. Categoria [".$valor[0][4]."] no existe";
                        $isvalid=false;
                        $categoria=new CategoriaDocente();

                    }

                    $grado=Grado::where('name','=',$valor[0][5])->first();
                    if(!$grado){
                        $message="Registro no se importara. Grado [".$valor[0][5]."] no existe";
                        $isvalid=false;
                        $grado=new Grado();

                    }

                    $titulo=Titulo::where('name','=',$valor[0][6])->first();
                    if(!$titulo){
                        $message="Registro no se importara. Titulo [".$valor[0][6]."] no existe";
                        $isvalid=false;
                        $titulo=new Titulo();

                    }

                    $dedicacion=TipoDedicacion::where('abbreviation','=',$valor[0][7])->first();
                    if(!$dedicacion){
                        $message="Registro no se importara. Tipo de Dedicación [".$valor[0][7]."] no existe";
                        $isvalid=false;
                        $dedicacion=new TipoDedicacion();

                    }

                    $docente=Docente::where('code','=',$valor[0][1])->first();
                    if($docente){
                        $message="Registro no se importara. Codigo de Docente ya existe";
                        $isvalid=false;
                    }

                    $usuario=User::where('username','=',$valor[0][8])->first();
                    if($usuario){
                        $message="Registro no se importara. Usuario [".$valor[0][8]."] ya existe";
                        $isvalid=false;
                    }
                    $data[]=array(
                        'escuela_id' => $escuela->id,
                        'categoriadocente_id' => $categoria->id,
                        'grado_id' => $grado->id,
                        'titulo_id' => $titulo->id,
                        'tipodedicacion_id'=>$dedicacion->id,
                        'code' => $valor[0][1],
                        'firstname' => $valor[0][2],
                        'lastname' => $valor[0][3],
                        'user'=>$valor[0][8],
                        'email'=>$valor[0][9],
                        'condition'=>$valor[0][10],
                        'escuela'=>$escuela->toArray(),
                        'categoriadocente'=>$categoria->toArray(),
                        'grado'=>$grado->toArray(),
                        'titulo'=>$titulo->toArray(),
                        'dedicacion'=>$dedicacion->toArray(),
                        'isvalid'=>$isvalid,
                        'message'=>$message
                    );
                }

            }
            $success=true;
        } else
           $success=false;

       return Response::json(
               array('total'=>count($data),'success' => $success,'data'=>$data),
              201
        );
    }

    public function postDocentesave()
    {
        $input = Input::All();
        $entities = array();
        foreach ($input as $item) {
            if($item['isvalid']){
                $entity = new Docente();
                $entity->escuela_id=$item['escuela_id'];
                $entity->code=$item['code'];
                $entity->firstname=$item['firstname'];
                $entity->lastname=$item['lastname'];
                $entity->grado_id=$item['grado_id'];
                $entity->titulo_id=$item['titulo_id'];
                $entity->tipodedicacion_id=$item['tipodedicacion_id'];
                $entity->categoriadocente_id=$item['categoriadocente_id'];
                $entity->condition=$item['condition'];
                $user = Sentry::createUser(array(
                    'username'     => $item['user'],
                    'first_name'=>$entity->firstname,
                    'last_name'=>$entity->lastname,
                    'password'  => $item['user'],
                    'email' =>$item['email'],
                    'activated' => true,
                ));
                $adminGroup = Sentry::findGroupById(1);
                $user->addGroup($adminGroup);
                $entity->usuario_id=$user->id;

                $entity->save();
                $entities[]=$entity;
            }
        }

        return Response::json(array(
            'error' => false,
            'entities'=>$entities
            ), 200
        );
    }

    public function postAlumno()
    {
       if (!empty( $_FILES ))
       {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $result=Excel::excel2Array($tempPath);
            $isHeader=true;
            foreach ($result[0] as $valor) {
                $isvalid=true;
                $message="";
                if($isHeader)
                    $isHeader=false;
                else
                {
                    $escuela=Escuela::where('code','=',$valor[0][0])->first();
                    if(!$escuela){
                        $message="Registro no se importara. Codigo de Escuela N° ".$valor[0][0]." no existe";
                        $isvalid=false;
                        $escuela=new Escuela();

                    }


                    $alumno=Alumno::where('code','=',$valor[0][1])->first();
                    if($alumno){
                        $message="Registro no se importara. Codigo de Alumno ya existe";
                        $isvalid=false;
                    }

                    $usuario=User::where('username','=',$valor[0][5])->first();
                    if($usuario){
                        $message="Registro no se importara. Usuario [".$valor[0][5]."] ya existe";
                        $isvalid=false;
                    }
                    $data[]=array(
                        'escuela_id' => $escuela->id,
                        'code' => $valor[0][1],
                        'firstname' => $valor[0][2],
                        'lastname' => $valor[0][3],
                        'yearinput' => $valor[0][4],
                        'user'=>$valor[0][5],
                        'email'=>$valor[0][6],
                        'escuela'=>$escuela->toArray(),
                        'isvalid'=>$isvalid,
                        'message'=>$message
                    );
                }

            }
            $success=true;
        } else
           $success=false;

       return Response::json(
               array('total'=>count($data),'success' => $success,'data'=>$data),
              201
        );
    }

    public function postAlumnosave()
    {
        $input = Input::All();
        $entities = array();
        $alumnos = array();
        $users = array();
        $usersgroups = array();
        $maxUserId=User::max('id');
        $maxAlumnoId=Alumno::max('id');
        $countValid=0;
        foreach ($input as $item) {
            if($item['isvalid']){
                $countValid++;
                $user=new User();
                $user->id=++$maxUserId;
                $user->username =$item['user'];
                $user->first_name=$item['firstname'];
                $user->last_name=$item['lastname'];
                $user->password  = password_hash($user->username, PASSWORD_DEFAULT);
                $user->email =$item['email'];
                $user->activated = true;
                $users[]=$user->toArray();
                $usersgroups[]=array('group_id' => 2,'user_id'=>$user->id);

                $alumno=new Alumno();
                $alumno->id=++$maxAlumnoId;
                $alumno->escuela_id=$item['escuela_id'];
                $alumno->code=$item['code'];
                $alumno->firstname=$item['firstname'];
                $alumno->lastname=$item['lastname'];
                $alumno->yearinput=$item['yearinput'];
                $alumno->usuario_id=$user->id;
								$alumno->created_at=new Datetime();
                $alumnos[]=$alumno->toArray();
            }
        }
        if($countValid>0){
            User::insert($users);
            DB::table('users_groups')->insert($usersgroups);
            Alumno::insert($alumnos);
        }
        return Response::json(array(
            'error' => false,
            'valid'=>$countValid
            ), 200
        );
    }

    public function postCursoasignado()
    {
       if (!empty( $_FILES ))
       {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $result=Excel::excel2Array($tempPath);
            $isHeader=true;
            foreach ($result[0] as $valor) {
                $isvalid=true;
                $message="";
                if($isHeader)
                    $isHeader=false;
                else
                {
                    $docente=Docente::where('code','=',$valor[0][0])->first();
                    if(!$docente){
                        $message="Registro no se importara. Codigo de Docente N° ".$valor[0][0]." no existe";
                        $isvalid=false;
                        $docente=new Docente();
                    }
                    $escuela=Escuela::where('code','=',$valor[0][1])->first();

                    if($escuela){
                        $curso=Curso::where('code','=',$valor[0][2])
                            ->where('escuela_id','=',$escuela->id)
                            ->first();
                        if(!$curso){
                            $message="Registro no se importara. Codigo de Curso N° ".$valor[0][2]." de la escuela con código N° [".$valor[0][1]."] no existe";
                            $isvalid=false;
                            $escuela=new Curso();

                        }
                    }else{
                        $message="Registro no se importara. Codigo de Escuela N° ".$valor[0][1]." no existe";
                        $isvalid=false;
                        $escuela=new Escuela();
                        $curso=new Curso();
                    }

                    $semestre=Semestre::where('year','=',$valor[0][3])
                            ->where('period','=',$valor[0][4])->first();

                    if(!$semestre){
                        $message="Registro no se importara.Semestre N° ".$valor[0][3]."-".$valor[0][4]." no existe";
                        $isvalid=false;
                        $semestre=new Semestre();
                    }


                    if($isvalid){
                        $cursoasignado=CursoAsignado::where('curso_id','=',$curso->id)
                            ->where('semestre_id','=',$semestre->id)
                            ->where('docente_id','=',$docente->id)
                            ->first();
                        if($cursoasignado){
                            $message="Registro no se importara. Curso ya se encuentra asignado al docente para el semestre seleccionado";
                            $isvalid=false;
                        }
                    }

                    $data[]=array(
                        'escuela_id' => $escuela->id,
                        'curso_id' => $curso->id,
                        'docente_id' => $docente->id,
                        'semestre_id' => $semestre->id,
                        'escuela'=>$escuela->toArray(),
                        'curso'=>$curso->toArray(),
                        'docente'=>$docente->toArray(),
                        'semestre'=>$semestre->toArray(),
                        'isvalid'=>$isvalid,
                        'message'=>$message
                    );

                }

            }
            $success=true;
        } else
           $success=false;

       return Response::json(
               array('total'=>count($data),'success' => $success,'data'=>$data),
              201
        );
    }

    public function postCursoasignadosave()
    {
        $input = Input::All();
        $entities = array();
        foreach ($input as $item) {
            if($item['isvalid']){
                $entity = new CursoAsignado();
                $entity->docente_id=$item['docente_id'];
                $entity->semestre_id=$item['semestre_id'];
                $entity->curso_id=$item['curso_id'];
                $entity->save();
                $entities[]=$entity;
            }
        }

        return Response::json(array(
            'error' => false,
            'entities'=>$entities
            ), 200
        );
    }

    public function postInscripcionalumno()
    {
       if (!empty( $_FILES ))
       {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $result=Excel::excel2Array($tempPath);
            $isHeader=true;
            foreach ($result[0] as $valor) {
                $isvalid=true;
                $message="";
                if($isHeader)
                    $isHeader=false;
                else
                {
                    $docente=Docente::where('code','=',$valor[0][0])->first();
                    if(!$docente){
                        $message="Registro no se importara. Codigo de Docente N° ".$valor[0][0]." no existe";
                        $isvalid=false;
                        $docente=new Docente();
                    }
                    $escuela=Escuela::where('code','=',$valor[0][1])->first();

                    if($escuela){
                        $curso=Curso::where('code','=',$valor[0][2])
                            ->where('escuela_id','=',$escuela->id)
                            ->first();
                        if(!$curso){
                            $message="Registro no se importara. Codigo de Curso N° ".$valor[0][2]." de la escuela con código N° [".$valor[0][1]."] no existe";
                            $isvalid=false;
                            $escuela=new Curso();

                        }
                    }else{
                        $message="Registro no se importara. Codigo de Escuela N° ".$valor[0][1]." no existe";
                        $isvalid=false;
                        $escuela=new Escuela();
                        $curso=new Curso();
                    }

                    $semestre=Semestre::where('year','=',$valor[0][3])
                            ->where('period','=',$valor[0][4])->first();

                    if(!$semestre){
                        $message="Registro no se importara.Semestre N° ".$valor[0][3]."-".$valor[0][4]." no existe";
                        $isvalid=false;
                        $semestre=new Semestre();
                    }

                    $alumno=Alumno::where('code','=',$valor[0][5])->first();

                    if(!$alumno){
                        $message="Registro no se importara.Código de alumno N° ".$valor[0][5]." no existe";
                        $isvalid=false;
                        $alumno=new Alumno();
                    }

                    $cursoasignado=CursoAsignado::where('curso_id','=',$curso->id)
                            ->where('semestre_id','=',$semestre->id)
                            ->where('docente_id','=',$docente->id)
                            ->first();
                    if(!$cursoasignado){
                            $message="Registro no se importara. El curso [".$curso->name."] al cual desea inscribir al alumno para el semestre [".$semestre->year.'-'.$semestre->period."] no se encuentra disponible";
                            $isvalid=false;
                            $cursoasignado=new CursoAsignado();
                    }

                    if($isvalid){
                        $inscripcion=InscripcionCurso::where('alumno_id','=',$alumno->id)
                            ->where('cursoasignado_id','=',$cursoasignado->id)->first();
                        if($inscripcion){
                            $message="Registro no se importara. El alumno ya se encuentra inscrito";
                            $isvalid=false;
                        }
                    }


                    $data[]=array(
                        'escuela_id' => $escuela->id,
                        'curso_id' => $curso->id,
                        'docente_id' => $docente->id,
                        'semestre_id' => $semestre->id,
                        'cursoasignado_id'=>$cursoasignado->id,
                        'alumno_id'=>$alumno->id,
                        'escuela'=>$escuela->toArray(),
                        'curso'=>$curso->toArray(),
                        'docente'=>$docente->toArray(),
                        'semestre'=>$semestre->toArray(),
                        'alumno'=>$alumno->toArray(),
                        'cursoasignado'=>$cursoasignado->toArray(),
                        'isvalid'=>$isvalid,
                        'message'=>$message
                    );

                }

            }
            $success=true;
        } else
           $success=false;

       return Response::json(
               array('total'=>count($data),'success' => $success,'data'=>$data),
              201
        );
    }

    public function postInscripcionalumnosave()
    {
        $input = Input::All();
        $entities = array();
        foreach ($input as $item) {
            if($item['isvalid']){
                $entity = new InscripcionCurso();
                $entity->cursoasignado_id=$item['cursoasignado_id'];
                $entity->alumno_id=$item['alumno_id'];
                $entity->save();
                $entities[]=$entity;
            }
        }

        return Response::json(array(
            'error' => false,
            'entities'=>$entities
            ), 200
        );
    }


}
