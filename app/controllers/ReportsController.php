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
        $filter=Input::get("filter");
        $plantilla_id=(!isset($filter['plantilla_id']))?'':$filter['plantilla_id'];
        $cursoasignado_id=(!isset($filter['cursoasignado_id']))?'':$filter['cursoasignado_id'];

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
            ->where('plantilla_id','=',$plantilla_id)
            ->where("grupo",'=',1)
            ->paginate(Input::get('count'));
       
        //$entities=CriterioEvaluacion::where('plantilla_id','=',$plantilla_id)->get();
        return Response::json(
               $entities->toArray(),
              201
        );
        
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

}
