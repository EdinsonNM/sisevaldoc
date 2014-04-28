<?php

class CriterioEvaluacionController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$name=(!isset($filter['name']))?'':$filter['name'];
		$plantilla_id=(!isset($filter['plantilla_id']))?'':$filter['plantilla_id'];
		$entities=CriterioEvaluacion::with('children')
			->where('plantilla_id','=',$plantilla_id)
			->where("name",'LIKE','%'.$name.'%')
			->where("grupo",'=',1)
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
		// add some validation also
        $input = Input::all();

        $entity = new CriterioEvaluacion();

 		$entity->name=Input::get('name');
 		$entity->idpadre=Input::get('idpadre');
 		$entity->grupo=Input::get('grupo');
 		$entity->plantilla_id=Input::get('plantilla_id');

            
       
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
		$entity = CriterioEvaluacion::with('padre')
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

        $entity = CriterioEvaluacion::find($id);

 		$entity->name=Input::get('name');      
        $entity->save();

        return Response::json(array(
            'sucess' => true,
            'message' => 'Criterio actualizado satisfactoriamente'),
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
		$entity = CriterioEvaluacion::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}