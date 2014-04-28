<?php

class DocenteController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$escuela_id=(!isset($filter['escuela_id']))?0:$filter['escuela_id'];
		$code=(!isset($filter['code']))?'':$filter['code'];
		$firtsname=(!isset($filter['firtsname']))?'':$filter['firtsname'];
		$lastname=(!isset($filter['lastname']))?'':$filter['lastname'];
		$entities = Docente::with(array('usuario'=>function($q){
			return $q->with('groups');
		}))
			->with('escuela')
			->with('CategoriaDocente')
			->with('Grado')
			->with('Titulo')
			->with('TipoDedicacion')
			->where(function($q) use($escuela_id){
				if($escuela_id!=0)
					return $q->where('escuela_id','=',$escuela_id);
				else
					return $q;
			})
			->where('firstname','LIKE','%'.$firtsname.'%')
			->where('code','LIKE','%'.$code.'%')
			->where('lastname','LIKE','%'.$lastname.'%')
			->paginate(Input::get('count'));
		
	    return Response::json(
	           $entities->toArray(),
	          201
	    );
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$input = Input::all();

        $entity = new Docente();
 		$entity->code=Input::get('code');
 		$entity->firstname=Input::get('firstname');
 		$entity->lastname=Input::get('lastname');
 		$entity->categoriadocente_id=Input::get('categoriadocente_id');
 		$entity->condition=Input::get('condition');
 		$entity->grado_id=Input::get('grado_id');
 		$entity->titulo_id=Input::get('titulo_id');
 		$entity->tipodedicacion_id=Input::get('tipodedicacion_id');
 		$entity->escuela_id=Input::get('escuela_id');

 		$username=Input::get('username');
		$user = Sentry::createUser(array(
	        'username'     => $username,
	        'first_name'=>$entity->firstname,
	        'last_name'=>$entity->lastname,
	        'password'  => $username,
	        'email' =>Input::get('usuario.email'),
	        'activated' => true,
	    ));
	    $adminGroup = Sentry::findGroupById(1);
	    $user->addGroup($adminGroup);

 		$entity->usuario_id=$user->id;
        $entity->save();

        return Response::json(array(
            'error' => false,
            'entity' => $entity->toArray()),
            200
        );
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$entity = Docente::with('CategoriaDocente')
			->with('Usuario')
			->with(array('escuela'=>function($q){
				return $q->with('facultad');
			}))
			->find($id);
		return Response::json(array(
	          'success' => true,
	          'data' => $entity->toArray()
	          ),
	          
	          201
	     );
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$input = Input::all();
		$entity = Docente::find($id);
		if(Input::get('updateGroup')){
			
			$user = Sentry::findUserById($entity->usuario_id);
			$exist=false;
			foreach ($user->getGroups() as $group) {
				if($group->id==3)
					$exist=true;
			}
			$adminGroup = Sentry::findGroupById(3);
			if($exist){
				$user->removeGroup($adminGroup);
				$message="Docente fue desasignado como Jefe de Departamento";
			}else{
	    		$user->addGroup($adminGroup);
	    		$message="Docente fue asignado como Jefe de Departamento";
			}
			
		}else{
			$user = Sentry::findUserById($entity->usuario_id);
	        $user->username=Input::get('username');
	        $user->email=Input::get('usuario.email');
			$user->save();
	 		$entity->code=Input::get('code');
	 		$entity->firstname=Input::get('firstname');
	 		$entity->lastname=Input::get('lastname');
	 		$entity->categoriadocente_id=Input::get('categoriadocente_id');
			$entity->escuela_id=Input::get('escuela_id');
			$entity->condition=Input::get('condition');

			$entity->save();
			$message="Docente actualizado satisfactoriamente";
		}
       

        return Response::json(array(
            'success' => true,
            'message' => $message),
            200
        );
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$entity = Docente::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}