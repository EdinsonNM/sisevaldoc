<?php

class CursoController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$escuela_id=(!isset($filter['escuela_id']))?'':$filter['escuela_id'];
		$code=(!isset($filter['code']))?'':$filter['code'];
		$name=(!isset($filter['name']))?'':$filter['name'];
		$ciclo=(!isset($filter['ciclo']))?'':$filter['ciclo'];

		$entities = Curso::with('Escuela')	

			->where('escuela_id','=',$escuela_id)
			->where('name','LIKE','%'.$name.'%')
			->where('code','LIKE','%'.$code.'%')
			->where('ciclo','LIKE','%'.$ciclo.'%')
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

        $entity = new Curso();
 		$entity->code=Input::get('code');
 		$entity->name=Input::get('name');
 		$entity->ciclo=Input::get('ciclo');
 		$entity->numbercredits=Input::get('numbercredits');
 		$entity->numberhours=Input::get('numberhours');
 		$entity->escuela_id=Input::get('escuela_id');
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
		$entity = Curso::with('Escuela')->find($id);
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

        $entity = Curso::find($id);

       
 		$entity->code=Input::get('code');
 		$entity->name=Input::get('name');
 		$entity->ciclo=Input::get('ciclo');
		$entity->numbercredits=Input::get('numbercredits');
		$entity->numberhours=Input::get('numberhours');
        $entity->save();

        return Response::json(array(
            'sucess' => true,
            'message' => 'Curso actualizado satisfactoriamente'),
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
		$entity = Curso::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}