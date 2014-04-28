<?php

class SemestreController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$entities = Semestre::paginate(Input::get('count'));
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

        $entity = new Semestre();

 		$entity->year=Input::get('year');
 		$entity->period=Input::get('period');
 		$entity->numberweeks=Input::get('numberweeks');
 		$entity->date_start=Input::get('date_start');
 		$entity->date_end=Input::get('date_end');
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
		$entity = Semestre::find($id);
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

        $entity = Semestre::find($id);

 		$entity->year=Input::get('year');
 		$entity->period=Input::get('period');
 		$entity->numberweeks=Input::get('numberweeks');
 		$entity->date_start=Input::get('date_start');
 		$entity->date_end=Input::get('date_end');
        $entity->save();

        return Response::json(array(
            'sucess' => true,
            'message' => 'Semestre actualizado satisfactoriamente'),
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
		$entity = Semestre::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}