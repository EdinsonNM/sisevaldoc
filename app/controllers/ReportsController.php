<?php

class ReportsController extends BaseController {

	public $restful = true;
    public function __construct()
    {
        //$this->beforeFilter('auth', array('except' => 'home.index'));
        $this->beforeFilter(function()
        {
            if (!Sentry::check())
                return View::make('home.index');
        });

    }
    public function getIndex(){

    }
    public function getDocentessemestre()
    {
        $facultad_id=Input::get("facultad_id",0);
        $escuela_id=Input::get("escuela_id",0);
        $semestre_id=Input::get("semestre_id",0);

        $docentes=CursoAsignado::select('cursoasignado.docente_id')
                            ->join('curso','curso.id','=','cursoasignado.curso_id')
                            ->join('escuela','escuela.id','=','curso.escuela_id')
                            ->whereRaw("cursoasignado.semestre_id = $semestre_id")
                            ->where(function($q) use($escuela_id){
                                if($escuela_id==0)
                                    return $q;
                                else
                                    return $q->whereRaw("curso.escuela_id=$escuela_id");
                            })
                            ->where(function($q) use($facultad_id){
                                if($facultad_id==0)
                                    return $q;
                                else
                                    return $q->whereRaw("escuela.facultad_id=$facultad_id");
                            })
                            ->distinct()
                            ->get();
        $ids = array();
        foreach ($docentes as $docente) {
            $ids[]=$docente->docente_id;
        }
        $entities=Docente::whereIn('id',$ids)->get();

        return Response::json(
               $entities,
              201
        );
    }
    public function getEvaluaciondocente()
    {
        $criterio_id=Input::get("criterio_id", '');
        $filter=Input::get("filter");
        $plantilla_id=(!isset($filter['plantilla_id']))?'':$filter['plantilla_id'];
        $cursoasignado_id=(!isset($filter['cursoasignado_id']))?'':$filter['cursoasignado_id'];

        $plantillaids=PlantillaCriterios::select('plantillacriterios.id')
                ->Where('plantillacriterios.tipo','=','Evaluacion')
                ->WhereRaw('plantillacriterios.active=1')
                ->get();

        $ids = array();
        foreach ($plantillaids as $plantid) {
            $ids[]=$plantid->id;
        }

        $entities=CriterioEvaluacion::with(array('children'=>function($q) use ($cursoasignado_id)
            {
                return $q->with(array('valoracionevaluacion' => function($q) use ($cursoasignado_id)
                    {
                        return $q->with('tipovaloracion')
                        ->whereExists(function($query) use($cursoasignado_id)
                        {

                            $query->select(DB::raw(1))
                            ->from('evaluacion')
                            ->join('inscripcioncurso','inscripcioncurso.id','=','evaluacion.inscripcioncurso_id')
                            ->whereRaw("inscripcioncurso.cursoasignado_id = $cursoasignado_id and evaluacion.id=valoracionevaluacion.evaluacion_id");
                        });

                    }));

            }))
            ->whereIn('criterioevaluacion.plantilla_id',$ids)
            ->Where(function($q) use($criterio_id){
                    if ($criterio_id!=''){
                        $q=$q->where('criterioevaluacion.id','=', $criterio_id);
                    }
                    return $q;
                })
            ->where("grupo",'=',1)
            ->paginate(Input::get('count'));

        //$entities=CriterioEvaluacion::where('plantilla_id','=',$plantilla_id)->get();
        return Response::json(
               $entities->toArray(),
              201
        );

    }

    public function getAutoevaluaciondocentejd()
    {
        $filter=Input::get("filter");
        $plantilla_id=(!isset($filter['plantilla_id']))?'':$filter['plantilla_id'];
        $cursoasignado_id=(!isset($filter['cursoasignado_id']))?'':$filter['cursoasignado_id'];

        $plantillaids=PlantillaCriterios::select('plantillacriterios.id')
                ->Where('plantillacriterios.tipo','=','AutoEvaluacion')
                ->WhereRaw('plantillacriterios.active=1')
                ->get();

        $ids = array();
        foreach ($plantillaids as $plantid) {
            $ids[]=$plantid->id;
        }

        $autoevas=AutoEvaluacion::Select('autoevaluacion.id')
                 ->where('autoevaluacion.cursoasignado_id','=',$cursoasignado_id)
                 ->WhereRaw('autoevaluacion.finalizado=1')
                 ->get();

        $idautos = array();

        foreach ($autoevas as $auto) {
            $idautos[]=$auto->id;
        }

        $entities=CriterioEvaluacion::with(array('children'=>function($q)  use ($idautos){
            return $q->with(array('valoracionautoevaluacion' => function($q)  use ($idautos)
                {
                        $q->whereIn('valoracionautoevaluacion.autoevaluacion_id',$idautos);
                        return $q->with('tipovaloracion')
                        ->whereExists(function($query) use ($idautos)
                        {
                            $query->select('*')
                            ->from('tipovaloracion')
                            ->join('valoracionautoevaluacion','tipovaloracion.id','=','valoracionautoevaluacion.tipovaloracion_id')
                            ->join('autoevaluacion','autoevaluacion.id','=','valoracionautoevaluacion.autoevaluacion_id')
                            ->whereIn('valoracionautoevaluacion.autoevaluacion_id',$idautos)
                            ->WhereRaw('criterioevaluacion_id=valoracionautoevaluacion.criterioevaluacion_id');

                        });

                }));


        }))
        ->whereIn('criterioevaluacion.plantilla_id',$ids)

        ->where("grupo",'=',1)
        ->paginate(Input::get('count'));


        return Response::json(
               $entities->toArray(),
              201
        );

    }

    public function getResumencriteriosauto()
    {

        $facultad_id =Input::get('facultad_id',0);
        $escuela_id  =Input::get('escuela_id',0);
        $semestre_id =Input::get('semestre_id',0);

        $var1 = $facultad_id;
        $var2 = $escuela_id;
        $var3 = $semestre_id;

        $query = DB::select('call Reporte_AutoEval_Grupo(' . $var1 . ',' . $var2 . ',' . $var3 . ')');

        $data = array();

        foreach ($query as $criterio) {

            $data[]=$criterio;
        }

        return Response::json($data, 201);

    }

    public function getEvaluacionjefedepartamento()
    {

        $facultad_id =Input::get('facultad_id');
        $escuela_id  =Input::get('escuela_id');
        $semestre_id =Input::get('semestre_id');
        $docente_id =Input::get('docente_id');

        $var1 = $facultad_id;
        $var2 = $escuela_id;
        $var3 = $semestre_id;
        $var4 = $docente_id;

        $query = DB::select('call Reporte_EvalJefe(' . $var1 . ',' . $var2 . ',' . $var3  . ',' . $var4 . ')');

        $data = array();

        foreach ($query as $criterio) {

            $data[]=$criterio;
        }
//dd($data);
        return Response::json($data, 201);

    }

    public function getCriterios()
    {
        $entities=CriterioEvaluacion::select('id','name')
            ->whereRaw("plantilla_id=3")
            ->whereRaw("idpadre=0")
            ->get();
        return Response::json(
            $entities->toArray(),
            201
        );
    }

    public function getResumencriteriosautodetalle()
    {

        $facultad_id =Input::get('facultad_id',0);
        $escuela_id  =Input::get('escuela_id',0);
        $semestre_id =Input::get('semestre_id',0);
        $criterio_id =Input::get('criterio_id',0);

        $var1 = $criterio_id;
        $var2 = $facultad_id;
        $var3 = $escuela_id;
        $var4 = $semestre_id;


        $query = DB::select('call Reporte_AutoEval_Grupo_Detalle(' . $var1 . ',' . $var2 . ',' . $var3 . ',' . $var4 . ')');

        $data = array();

        foreach ($query as $criterio) {

            $data[]=$criterio;
        }

        return Response::json($data, 201);

    }
    public function getResumencriterios()
    {
        $semestre_id=1;

        $plantilla_id=Input::get('plantilla_id',0);
        $facultad_id=Input::get('facultad_id',0);
        $escuela_id=Input::get('escuela_id',0);
        $docente_id=Input::get('docente_id',0);
        $cursoasignado_id=Input::get('cursoasignado_id',0);
        $semestre_id=Input::get('semestre_id',0);
        $criterios=CriterioEvaluacion::select('id')
            ->where('plantilla_id','=',$plantilla_id)
            ->where('grupo','=','0')->get();

        $ids = array();
        foreach ($criterios as $criterio) {
            $ids[]=$criterio->id;
        }
        $entities=ValoracionEvaluacion::select(
            'valoracionevaluacion.criterioevaluacion_id',
            'criterioevaluacion.name',
            DB::raw('COUNT(CASE tipovaloracion_id WHEN 1 THEN tipovaloracion_id END) AS Siempre'),
            DB::raw('COUNT(CASE tipovaloracion_id WHEN 2 THEN tipovaloracion_id END) AS Frecuente'),
            DB::raw('COUNT(CASE tipovaloracion_id WHEN 3 THEN tipovaloracion_id END) AS Poco'),
            DB::raw('COUNT(CASE tipovaloracion_id WHEN 4 THEN tipovaloracion_id END) AS Nunca')
        )
        ->join('criterioevaluacion','criterioevaluacion.id','=','valoracionevaluacion.criterioevaluacion_id')
        ->join('evaluacion','evaluacion.id','=','valoracionevaluacion.evaluacion_id')
        ->join('inscripcioncurso','inscripcioncurso.id','=','evaluacion.inscripcioncurso_id')
        ->join('cursoasignado','cursoasignado.id','=','inscripcioncurso.cursoasignado_id')
        ->join('curso','curso.id','=','cursoasignado.curso_id')
        ->join('escuela','escuela.id','=','curso.escuela_id')
        ->whereIn('valoracionevaluacion.criterioevaluacion_id',$ids)
        ->where(function ($query) use($facultad_id){
            if($facultad_id!=0)
                return $query->where('escuela.facultad_id', '=', $facultad_id);
            else
                return $query;
        })
        ->where(function ($query) use($escuela_id){
            if($escuela_id!=0)
                return $query->where('escuela.id', '=', $escuela_id);
            else
                return $query;
        })
        ->where(function ($query) use($docente_id){
            if($docente_id!=0)
                return $query->where('cursoasignado.docente_id', '=', $docente_id);
            else
                return $query;
        })
        ->where(function ($query) use($cursoasignado_id){
            if($cursoasignado_id!=0)
                return $query->where('cursoasignado.id', '=', $cursoasignado_id);
            else
                return $query;
        })
        ->where('cursoasignado.semestre_id','=',$semestre_id)
        ->groupBy('valoracionevaluacion.criterioevaluacion_id','criterioevaluacion.name')
        ->get();

        return Response::json(
               $entities->toArray(),
              201
        );

    }

		function getEvaluacionpromedioaldocdim(){
			$semestre_id = Input::get("semestre_id");
			$facultad_id = Input::get("facultad_id");
			$escuela_id = Input::get("escuela_id");
			$docente_id = Input::get("docente_id");

			$etapaEvaluacion = EtapaEvaluacion::where('semestre_id', '=', $semestre_id)
				->where('facultad_id', '=', $facultad_id)
				->where('fromquestion', '=', 'Alumno')
				->first();
			$plantillaCriterios = array();
		}

}
