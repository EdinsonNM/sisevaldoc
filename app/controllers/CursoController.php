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
		$entity=null;
		$success=false;
		$validator = Validator::make($data = Input::all(), Curso::$rules_save);
		$message='';
		if (!$validator->fails())
		{
			$entity=Curso::create($data);
			$success=true;
			$entity=$entity->toArray();
		}else{
			$message=$validator->messages()->toArray();
		}

		return Response::json(array('success' => $success, 'entity'=>$entity,'messages'=>$message), 201);
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
		$success=false;
		$entity = Curso::findOrFail($id);
		$message='';
		$validator = Validator::make($data = Input::all(), Curso::$rules_update);

		if (!$validator->fails())
		{
			$entity->update($data);
			$success=true;
		}else{
			$message=$validator->messages()->toArray();
		}

		return Response::json(array('success' => $success, 'entity'=>$entity,'messages'=>$message), 201);
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
