<?php

class ValoracionEvaluacionController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$plantilla_id=(!isset($filter['plantilla_id']))?'':$filter['plantilla_id'];
		$evaluacion_id=(!isset($filter['evaluacion_id']))?'':$filter['evaluacion_id'];
        
		$plantillacriterios=PlantillaCriterios::select('plantillacriterios.id')
				    ->whereRaw("plantillacriterios.tipo='Evaluacion'")
			        ->where('plantillacriterios.id','=',$plantilla_id)
			        ->get();
			       
        $ids = array();   
        foreach ($plantillacriterios as $plantillacriterio) {
            $ids[]=$plantillacriterio->id;
        }

		$entities=CriterioEvaluacion::with(array('children'=>function($q)  use ($evaluacion_id){
			   $q->with(array('valoracionevaluacion' => function($q)  use ($evaluacion_id)
					{
					    $q->where('evaluacion_id','=',$evaluacion_id);
					    
					}));
			}))
			
			->with(array('valoracionevaluacion' => function($q) use ($evaluacion_id)
			{
			    $q->where('evaluacion_id','=',$evaluacion_id);
			  
			}))
			
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
		$entity=ValoracionEvaluacion::where('criterioevaluacion_id','=',Input::get('criterioevaluacion_id'))
			->where('evaluacion_id','=',Input::get('evaluacion_id'))->first();

		if($entity){
			$entity->tipovaloracion_id=Input::get('tipovaloracion_id');
		}else{
			$entity = new ValoracionEvaluacion();
			$entity->criterioevaluacion_id=Input::get('criterioevaluacion_id');
			$entity->evaluacion_id=Input::get('evaluacion_id');
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