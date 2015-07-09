<?php

class AlumnoController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$code=(!isset($filter['code']))?'':$filter['code'];
		$firstname=(!isset($filter['firstname']))?'':$filter['firstname'];
		$lastname=(!isset($filter['lastname']))?'':$filter['lastname'];
		$yearinput=(!isset($filter['yearinput']))?'':$filter['yearinput'];
		$escuela_id=(!isset($filter['escuela_id']))?0:$filter['escuela_id'];

		$entities = Alumno::with('Usuario')
		->with('Escuela')
		->where('firstname','LIKE','%'.$firstname.'%')
		->where('code','LIKE','%'.$code.'%')
		->where('lastname','LIKE','%'.$lastname.'%')
		->where(function ($query) use($yearinput,$escuela_id){
				if($yearinput!='')
			    	$query=$query->where('yearinput', '=', $yearinput);
				if($escuela_id!=0)
			    	$query=$query->where('escuela_id', '=', $escuela_id);
		    return $query;
		})
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

        $entity = new Alumno();
 		$entity->code=Input::get('code');
 		$entity->firstname=Input::get('firstname');
 		$entity->lastname=Input::get('lastname');
 		$entity->escuela_id=Input::get('escuela_id');
 		$entity->yearinput=Input::get('yearinput');


	$user = Sentry::createUser(array(
        'username'     => $entity->code,
        'first_name'=>$entity->firstname,
        'last_name'=>$entity->lastname,
        'password'  => $entity->code,
        'email' =>Input::get('usuario.email'),
        'activated' => true,
    ));
    $adminGroup = Sentry::findGroupById(2);
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
		$entity = Alumno::with('Escuela')
			->with('Usuario')
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

        $entity = Alumno::find($id);
 		$entity->code=Input::get('code');
 		$entity->firstname=Input::get('firstname');
 		$entity->lastname=Input::get('lastname');
 		$entity->escuela_id=Input::get('escuela_id');
 		$entity->yearinput=Input::get('yearinput');

 		$user=User::find($entity->usuario_id);
 		$user->username=$entity->code;
 		$user->first_name=Input::get('firstname');
 		$user->email=Input::get('usuario.email');
 		$user->last_name=Input::get('lastname');
 		$user->password=$entity->code;
		$user->save();
	    $entity->save();

        return Response::json(array(
            'success' => true,
            'message' => 'Alumno actualizado satisfactoriamente'),
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
		$entity = Alumno::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}
