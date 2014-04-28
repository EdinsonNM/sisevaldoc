<?php

class CargaLectivaController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$cursoasignado_id=(!isset($filter['cursoasignado_id']))?'':$filter['cursoasignado_id'];
		$entities = CargaLectiva::with('cursoasignado')
			->where('cursoasignado_id','=',$cursoasignado_id)
			->orderBy('week')
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

        $entity = new CargaLectiva();
 		
 		$entity->cursoasignado_id=Input::get('cursoasignado_id');
 		$entity->week=Input::get('week');
 		$entity->date_start=Input::get('date_start');
 		$entity->date_end=Input::get('date_end');
 		$entity->content=Input::get('content');
 		$entity->typeplace=Input::get('typeplace');
 		$entity->place=Input::get('place');
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
		$entity = CargaLectiva::find($id);
		
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

        $entity = CargaLectiva::find($id);
 		
 		$entity->week=Input::get('week');
 		$entity->date_start=Input::get('date_start');
 		$entity->date_end=Input::get('date_end');
 		$entity->content=Input::get('content');
 		$entity->typeplace=Input::get('typeplace');
 		$entity->place=Input::get('place');
 		$entity->numberhours=Input::get('numberhours');
        $entity->save();

        return Response::json(array(
            'sucess' => true,
            'message' => 'Carga Lectiva actualizada satisfactoriamente'),
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
		$entity = CargaLectiva::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}