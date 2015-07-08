<?php

class EtapaEvaluacionController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$facultad_id=(!isset($filter['facultad_id']))?'':$filter['facultad_id'];
		$semestre_id=(!isset($filter['semestre_id']))?'':$filter['semestre_id'];
		$from_question=(!isset($filter['fromquestion']))?'':$filter['fromquestion'];
		if($semestre_id==''){
			$entities = EtapaEvaluacion::with('Facultad')
				->with('plantilla')
				->with('Semestre')	
				->where('facultad_id','=',$facultad_id)
				->paginate(Input::get('count'));
	    }else{
	    	$entities = EtapaEvaluacion::with('Facultad')
				->with('plantilla')
				->with('Semestre')	
				->where('facultad_id','=',$facultad_id)
				->where('semestre_id','=',$semestre_id)
				->where('fromquestion','=',$from_question)
				->paginate(Input::get('count'));
	    }
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

        $entity = new EtapaEvaluacion();
 		
 		$entity->name=Input::get('name');
 		$entity->date_init=Input::get('date_init');
 		$entity->date_end=Input::get('date_end');
 		$entity->semestre_id=Input::get('semestre_id');
 		$entity->facultad_id=Input::get('facultad_id');
 		$entity->plantilla_id=Input::get('plantilla_id');
 		$entity->fromquestion=Input::get('fromquestion');
 		$entity->save();

        return Response::json(array(
            'success' => true,
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
		$entity = EtapaEvaluacion::with('Facultad')->with('Semestre')->find($id);
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

        $entity = EtapaEvaluacion::find($id);

 		$entity->name=Input::get('name');
 		$entity->date_init=Input::get('date_init');
 		$entity->date_end=Input::get('date_end');
 		$entity->semestre_id=Input::get('semestre_id');
 		$entity->facultad_id=Input::get('facultad_id');
 		$entity->plantilla_id=Input::get('plantilla_id');
 		$entity->save();


        return Response::json(array(
            'success' => true,
            'message' => 'Etapa de Evaluación actualizada satisfactoriamente'),
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
		$entity = EtapaEvaluacion::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}