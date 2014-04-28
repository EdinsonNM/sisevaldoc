<?php

class AlumnoCursoController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$alumno_id=(!isset($filter['alumno_id']))?'':$filter['alumno_id'];
		$semestre_id=(!isset($filter['semestre_id']))?'':$filter['semestre_id'];
		$entities = InscripcionCurso::with(array('cursoasignado'=>function($q) use($semestre_id){
				return $q->where('semestre_id','=',$semestre_id)
				->with(array('curso'=>function($q){
					return $q->with('escuela');
				}))
				->with('docente')
				->with('semestre');
			}))
			->whereExists(function($query) use($semestre_id)
            {
                $query->select(DB::raw(1))
                      ->from('cursoasignado')
                      ->whereRaw("inscripcioncurso.cursoasignado_id = cursoasignado.id and cursoasignado.semestre_id=$semestre_id");
            })
			->where('alumno_id','=',$alumno_id)
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
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$entity = InscripcionCurso::with(array('cursoasignado'=>function($q){
				return $q->with(array('curso'=>function($q){
							return $q->with('escuela');
						}))
						->with('docente')
						->with('semestre');
			}))
			->with('alumno')
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
		//
	}

}