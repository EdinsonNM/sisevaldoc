<?php
class Evaluacion extends Eloquent {
   protected $table = 'evaluacion';
   
   public function valoraciones(){
        return $this->hasMany('ValoracionEvaluacion','evaluacion_id');
   }
   public function  inscripcion(){
        return $this->belongsTo('InscripcionCurso','inscripcioncurso_id');
   }
}
?>