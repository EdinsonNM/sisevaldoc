<?php

class FacultadController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$facultad_id = Input::get('facultad_id',0);
		if($facultad_id!=0)
			$entities = Facultad::where('id','=',$facultad_id)->paginate(Input::get('count'));
		else
			$entities = Facultad::paginate(Input::get('count'));
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

        $entity = new Facultad();

 		$entity->code=Input::get('code');
 		$entity->name=Input::get('name');
 		$entity->description=Input::get('description');
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
		$entity = Facultad::find($id);
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

        $entity = Facultad::find($id);

       
 		$entity->code=Input::get('code');
 		$entity->name=Input::get('name');
 		$entity->description=Input::get('description');

        $entity->save();

        return Response::json(array(
            'sucess' => true,
            'message' => 'Facultad actualizada satisfactoriamente'),
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
		$entity = Facultad::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}