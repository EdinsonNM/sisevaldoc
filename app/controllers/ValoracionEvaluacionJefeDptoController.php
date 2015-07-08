<?php

class ValoracionEvaluacionJefeDptoController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$filter=Input::get("filter");
		$plantilla_id=(!isset($filter['plantilla_id']))?'':$filter['plantilla_id'];
		$evaluacionjefedpto_id=(!isset($filter['evaluacionjefedpto_id']))?'':$filter['evaluacionjefedpto_id'];
		
		$plantillacriterios=PlantillaCriterios::select('plantillacriterios.id')
				    ->whereRaw("plantillacriterios.tipo='EvaluacionJefe'")
			        ->where('plantillacriterios.id','=',$plantilla_id)
			        ->get();
			       
        $ids = array();   
        foreach ($plantillacriterios as $plantillacriterio) {
            $ids[]=$plantillacriterio->id;
        }

		$entities=CriterioEvaluacion::with(array('children'=>function($q)  use ($evaluacionjefedpto_id){
				$q->with(array('valoracionevaluacionjefedpto' => function($q)  use ($evaluacionjefedpto_id)
					{
					    $q->where('evaluacionjefedpto_id','=',$evaluacionjefedpto_id);

					}));
			}))

			->with(array('valoracionevaluacionjefedpto' => function($q) use ($evaluacionjefedpto_id)
			{
			    $q->where('evaluacionjefedpto_id','=',$evaluacionjefedpto_id);

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
		$entity=ValoracionEvaluacionJefeDpto::where('criterioevaluacion_id','=',Input::get('criterioevaluacion_id'))
			->where('evaluacionjefedpto_id','=',Input::get('evaluacionjefedpto_id'))->first();

		if($entity){
			$entity->tipovaloracion_id=Input::get('tipovaloracion_id');
		}else{
			$entity = new ValoracionEvaluacionJefeDpto();
			$entity->criterioevaluacion_id=Input::get('criterioevaluacion_id');
			$entity->evaluacionjefedpto_id=Input::get('evaluacionjefedpto_id');
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