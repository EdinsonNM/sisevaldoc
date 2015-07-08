<?php

class PrintController extends BaseController {

	 public function __construct()
    {
        $this->beforeFilter(function()
        {
            if (!Sentry::check())   
                return View::make('home.index');
        });

    }

    public function getConstanciaevaluacion()
    {
        $id=Input::get('idevaluacion');
        $entity=Evaluacion::with(array('inscripcion'=>function($q){
                return $q->with('alumno')->with(array('cursoasignado' =>function($q) {
                return $q->with('curso')->with('docente')->with('semestre');
            }));
        }))->find($id);

        $data = array('entity' => $entity);
        $pdf = PDF::loadView('print.constanciaevaluacion',$data);
        return $pdf->download('constanciaevaluacion.pdf');

    }
}