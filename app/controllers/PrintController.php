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

		public function getConstanciaEvaluacionAlumno()
    {
        $success=true;
				$alumno_id=Input::get('alumno_id','');
				$semestre_id=Input::get('semestre_id','');
				$ficha=FichaImpresion::where('semestre_id','=',$semestre_id)->where('alumno_id','=',$alumno_id)->first();
				$alumno=Alumno::find($alumno_id);
				$semestre=Semestre::find($semestre_id);

				if(!$ficha){
					if($semestre_id!=''&&$alumno_id!=''){
						$inscripciones=InscripcionCurso::select(DB::Raw("inscripcioncurso.*"))
						->with('evaluaciones')
						->with(array('cursoasignado'=>function($q){
								return $q->with('curso');
							}))
						->join('cursoasignado','cursoasignado.id','=','inscripcioncurso.cursoasignado_id')
						->where('cursoasignado.semestre_id','=',$semestre_id)
						->where('inscripcioncurso.alumno_id','=',$alumno_id)
						->get();

						foreach ($inscripciones as $inscripcion) {
							if(count($inscripcion->evaluaciones)==0){
								$message="Es necesario completar el registro de todas las evaluaciones";
								$success=false;
							}else{
								if(!$inscripcion->evaluaciones[0]->finalizado){
									$message="Una o mas evaluaciones no ha sido finalizadas";
									$success=false;
								}else{
									if($inscripcion->evaluaciones[0]->impreso){
										$message="Ya se imprimio la ficha de evaluación. No tienes acceso a imprimir una replica";
										$success=false;
									}
								}
							}
						}
						if($success){
							$ficha=new FichaImpresion();
							$ficha->semestre_id=$semestre_id;
							$ficha->alumno_id=$alumno_id;
							$ficha->save();
							$ficha->codigo=str_pad($semestre_id, 4, "0", STR_PAD_LEFT).'-'.str_pad($ficha->id, 6, "0", STR_PAD_LEFT);
							$ficha->save();

							$data = array('data' => $inscripciones,'alumno'=>$alumno,'semestre'=>$semestre,'constancia'=>$ficha);
			        $pdf = PDF::loadView('print.constanciaevaluacion',$data);
			        return $pdf->download('constanciaevaluacion.pdf');
						}

					}else{
						$success=false;
						$message="Parametros alumno_id y semestre_id son requeridos";
					}
				}else{
					$message="Ya se imprimio una copia de la Ficha de Evaluación";
					$success=false;
				}

				return Response::json(array('success'=>$success,'message'=>$message),201);

    }
}
