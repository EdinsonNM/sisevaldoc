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

		public function getValidaConstanciaAlumno(){
			$success=true;
			$message="Constancia valida para imprimir";
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

					if(count($inscripciones)>0){
						foreach ($inscripciones as $inscripcion) {
							if(count($inscripcion->evaluaciones)==0){
								$message="Es necesario completar el registro de todas las evaluaciones";
								$success=false;
							}else{
								if(!$inscripcion->evaluaciones[0]->finalizado){
									$message="Una o mas evaluaciones no han sido finalizadas";
									$success=false;
								}else{
									if($inscripcion->evaluaciones[0]->impreso){
										$message="Ya se imprimio una copia de la constancia de evaluación. No tienes acceso a imprimir una replica";
										$success=false;
									}
								}
							}
						}

					}else{
						$message="Alumno No se ha inscrito en ningun curso en el semestre seleccionado";
						$success=false;
					}

				}else{
					$success=false;
					$message="Parametros alumno_id y semestre_id son requeridos";
				}
			}else{
				if(!$ficha->habilitada){
					$message="Ya se imprimio una copia de la Ficha de Evaluación";
					$success=false;
				}

			}

			return Response::json(array('success'=>$success,'message'=>$message),201);
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

						if(count($inscripciones)>0){
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
											$message="Ya se imprimio una copia de la constancia de evaluación. No tienes acceso a imprimir una replica";
											$success=false;
										}
									}
								}
							}
						}else{
							$message="Alumno No se ha inscrito en ningun curso en el semestre seleccionado";
							$success=false;
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
					if($ficha->habilitada){
						$inscripciones=InscripcionCurso::select(DB::Raw("inscripcioncurso.*"))
						->with('evaluaciones')
						->with(array('cursoasignado'=>function($q){
								return $q->with('curso');
							}))
						->join('cursoasignado','cursoasignado.id','=','inscripcioncurso.cursoasignado_id')
						->where('cursoasignado.semestre_id','=',$semestre_id)
						->where('inscripcioncurso.alumno_id','=',$alumno_id)
						->get();
						$ficha->habilitada=0;
						$ficha->save();
						$data = array('data' => $inscripciones,'alumno'=>$alumno,'semestre'=>$semestre,'constancia'=>$ficha);
						$pdf = PDF::loadView('print.constanciaevaluacion',$data);
						return $pdf->download('constanciaevaluacion.pdf');
					}else{
						$message="Ya se imprimio una copia de la Ficha de Evaluación";
						$success=false;
					}

				}

				return $message;

    }

		public function postHabilitarConstancia(){
			$success=false;
			$message='';
			$alumno_id=Input::get('alumno_id','');
			$semestre_id=Input::get('semestre_id','');
			$constancia=FichaImpresion::where('alumno_id',$alumno_id)->where('semestre_id',$semestre_id)->first();
			if($constancia){
					$constancia->habilitada=1;
					$constancia->save();
					$message="Constancia habilitada para impresión";
					$success=true;
			}else{
				$message="No se encontro constancia para el semestre seleccionado";
			}
			return Response::json(array('success'=>$success,'message'=>$message),201);
		}

		public function postExportExcel(){
			$statusCode=200;
			$data=(Input::get('data_download'));
			$contents = View::make('downloadTable')->with('data', $data);
			$response = Response::make($contents, $statusCode);
			$response->header('Content-Type', 'application/vnd.ms-excel;');
			$response->header('Content-Disposition', 'attachment; filename="report.xls"');
			return $response;
		}
}
