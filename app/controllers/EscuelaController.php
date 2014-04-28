<?php

class EscuelaController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{

	    $filter=Input::get("filter");
		$id=(!isset($filter['facultad_id']))?0:$filter['facultad_id'];
		$code=(!isset($filter['code']))?'':$filter['code'];
		$name=(!isset($filter['name']))?'':$filter['name'];
		$entities = Escuela::with('Facultad')	
				->where(function ($query) use($id){
					if($id!=0)
				    	return $query->where('facultad_id', '=', $id);
				    else
				    	return $query;
				})
				->where('name','LIKE','%'.$name.'%')
				->where('code','LIKE','%'.$code.'%')
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

        $entity = new Escuela();
 		$entity->code=Input::get('code');
 		$entity->name=Input::get('name');
 		$entity->description=Input::get('description');
 		$entity->facultad_id=Input::get('facultad_id');
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
		$entity = Escuela::with('facultad')->find($id);
		//$entity['facultad']=$entity->facultad;
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

        $entity = Escuela::find($id);

 		$entity->code=Input::get('code');
 		$entity->name=Input::get('name');
 		$entity->description=Input::get('description');
 		$entity->facultad_id=Input::get('facultad_id');
 		$entity->save();


        return Response::json(array(
            'success' => true,
            'message' => 'Escuela actualizada satisfactoriamente'),
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
		$entity = Escuela::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}