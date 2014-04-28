<?php

class EvaluacionJefeDptoController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$cursoasignado_id=Input::get("cursoasignado_id");
		$docente_id=Input::get("docente_id");
		$entities=EvaluacionJefeDpto::with('cursoasignado')
			->with('docente')
			->where('cursoasignado_id','=',$cursoasignado_id)
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

        $entity = new EvaluacionJefeDpto();
 		$entity->cursoasignado_id=Input::get('cursoasignado_id');
 		$entity->docente_id=Input::get('docente_id');
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
		//
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

        $entity = EvaluacionJefeDpto::find($id);
 		
 		$entity->finalizado=Input::get('finish');
        $entity->save();

        return Response::json(array(
            'sucess' => true,
            'message' => 'Evaluación finalizada satisfactoriamente'),
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
		//
	}

}