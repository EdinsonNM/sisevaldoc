<?php

class ValoracionAutoevaluacionController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$plantilla_id=(!isset($filter['plantilla_id']))?'':$filter['plantilla_id'];
		$autoevaluacion_id=(!isset($filter['autoevaluacion_id']))?'':$filter['autoevaluacion_id'];
		
		$curso_id=(!isset($filter['curso_id']))?'':$filter['curso_id'];

		$plantillacriterios=Curso::select('plantillacriterios.id')
		->leftjoin('escuela','curso.escuela_id','=','escuela.id')
		->leftjoin('facultad','escuela.facultad_id','=','facultad.id')
		->leftjoin('etapaevaluacion','facultad.id','=','etapaevaluacion.facultad_id')
		->leftjoin('plantillacriterios','plantillacriterios.id','=','etapaevaluacion.plantilla_id')
		->whereRaw("plantillacriterios.tipo='AutoEvaluacion'")
		->Where('curso.id','=',$curso_id)
		->get();

		
        $ids = array();   
        foreach ($plantillacriterios as $plantillacriterio) {
            $ids[]=$plantillacriterio->id;
        }

		$entities=CriterioEvaluacion::with(array('children'=>function($q)  use ($autoevaluacion_id){
				$q->with(array('valoracionautoevaluacion' => function($q)  use ($autoevaluacion_id)
					{
					    $q->where('autoevaluacion_id','=',$autoevaluacion_id);
					    
					}));
			}))
			
			->with(array('valoracionautoevaluacion' => function($q) use ($autoevaluacion_id)
			{
			    $q->where('autoevaluacion_id','=',$autoevaluacion_id);
			    
			}))
			
			//->with('autoevaluacion')
			->whereIn('plantilla_id',$ids)
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
		$input = Input::all();
		$entity=ValoracionAutoEvaluacion::where('criterioevaluacion_id','=',Input::get('criterioevaluacion_id'))
			->where('autoevaluacion_id','=',Input::get('autoevaluacion_id'))->first();

		if($entity){
			$entity->tipovaloracion_id=Input::get('tipovaloracion_id');
		}else{
			$entity = new ValoracionAutoEvaluacion();
			$entity->criterioevaluacion_id=Input::get('criterioevaluacion_id');
			$entity->autoevaluacion_id=Input::get('autoevaluacion_id');
			$entity->tipovaloracion_id=Input::get('tipovaloracion_id');
		}
        
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