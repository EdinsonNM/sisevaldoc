<?php

class InscripcionCursoController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$cursoasignado_id=(!isset($filter['cursoasignado_id']))?'':$filter['cursoasignado_id'];
		$entities = InscripcionCurso::with('cursoasignado')
			->with('alumno')
			->where('cursoasignado_id','=',$cursoasignado_id)
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
		$message='';
		$success=false;
		$input = Input::all();
		$entity=null;
		$inscripciones=InscripcionCurso::where('alumno_id',Input::get('alumno.id'))
			->where('cursoasignado_id',Input::get('cursoasignado.id'))
			->get();

    if(count($inscripciones)==0){
			$entity = new InscripcionCurso();
	 		$entity->alumno_id=Input::get('alumno.id');
	 		$entity->cursoasignado_id=Input::get('cursoasignado.id');
	 		$entity->save();
			$success=true;
			$message='Alumno registrado satisfactoriamente';
			$entity=$entity->toArray();
		}else{
			$message='Alumno ya se encuentra registrado';
		}


 		return Response::json(array(
            'success' => $success,
            'entity' => $entity,
						'message'=>$message
					),
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
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$entity = InscripcionCurso::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}
