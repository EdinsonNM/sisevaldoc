<?php

class CargaNoLectivaController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$semestre_id=(!isset($filter['semestre_id']))?'':$filter['semestre_id'];
		$docente_id=(!isset($filter['docente_id']))?'':$filter['docente_id'];
		$entities = CargaNoLectiva::with('semestre')
			->with("docente")
			->with("actividad")
			->where('semestre_id','=',$semestre_id)
			->where('docente_id','=',$docente_id)
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

        $entity = new CargaNoLectiva();
 		
 		$entity->semestre_id=Input::get('semestre_id');
 		$entity->docente_id=Input::get('docente_id');
 		$entity->actividad_id=Input::get('actividad_id');
 		$entity->place=Input::get('place');
 		$entity->date_start=Input::get('date_start');
 		$entity->date_end=Input::get('date_end');
 		$entity->content=Input::get('content');
 		$entity->numberhours=Input::get('numberhours');
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
		$entity = CargaNoLectiva::find($id);
		
		return Response::json(array(
	          'error' => false,
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

        $entity = CargaNoLectiva::find($id);
 		
 		$entity->actividad_id=Input::get('actividad_id');
 		$entity->place=Input::get('place');
 		$entity->date_start=Input::get('date_start');
 		$entity->date_end=Input::get('date_end');
 		$entity->content=Input::get('content');
 		$entity->numberhours=Input::get('numberhours');
        $entity->save();

        return Response::json(array(
            'sucess' => true,
            'message' => 'Carga No Lectiva actualizada satisfactoriamente'),
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
		$entity = CargaNoLectiva::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}