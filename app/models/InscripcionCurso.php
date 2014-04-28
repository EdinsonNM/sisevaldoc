<?php
class InscripcionCurso extends Eloquent {
   protected $table = 'inscripcioncurso';
   
   public function alumno(){
        return $this->belongsTo('Alumno');
   }
   public function cursoasignado(){
        return $this->belongsTo('CursoAsignado');
   }
   public function evaluaciones(){
        return $this->hasMany('Evaluacion','inscripcioncurso_id');
   }
}
?>