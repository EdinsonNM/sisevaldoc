<?php

class CursoAsignadoController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$semestre_id=(!isset($filter['semestre_id']))?'':$filter['semestre_id'];
		$docente_id=(!isset($filter['docente_id']))?'':$filter['docente_id'];
		$entities = CursoAsignado::with('Semestre')
			->with('Docente')
			->with('alumnos')	
			->with(array('Curso'=>function($q){
				return $q->with(array('escuela'=>function($q){
					return $q->with('facultad');
				}));
			}))
			->where('semestre_id','=',$semestre_id)
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
		$entity=CursoAsignado::where('curso_id','=',Input::get('curso_id'))
			->where('semestre_id','=',Input::get('semestre_id'))
			->where('docente_id','=',Input::get('docente_id'))
			->first();
		if(!$entity){
	        $entity = new CursoAsignado();
	 		$entity->semestre_id=Input::get('semestre_id');
	 		$entity->curso_id=Input::get('curso_id');
	 		$entity->docente_id=Input::get('docente_id');
	 		$entity->save();
	 		$success=true;
	 		$message="Curso asignado satisfactoriamente";
	 		$type="success";
		}else{
			$message="Curso ya se encuentra asignado al docente para el semestre seleccionado";
			$success=false;
			$type="warning";
		}
        return Response::json(array(
            'success' => $success,
            'entity' => $entity->toArray(),
            'message'=>$message,
            'type'=>$type),
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
		$entity = CursoAsignado::with('Semestre')
			->with('Docente')
			->with('alumnos')	
			->with(array('curso'=>function($q){
				return $q->with(array('escuela'=>function($q){
					return $q->with("facultad");
				}));
			}))	
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

        $entity = CursoAsignado::find($id);

       
 		$entity->type=Input::get('type');
 		$entity->number_hours_theory=Input::get('number_hours_theory');
 		$entity->number_hours_practices=Input::get('number_hours_practices');
		$entity->number_hours_laboratory=Input::get('number_hours_laboratory');
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
		$entity = CursoAsignado::find($id);

        $entity->delete();

        return Response::json(array(
            'error' => false,
            'message' => 'Entity Deleted'),
            200
        );
	}

}