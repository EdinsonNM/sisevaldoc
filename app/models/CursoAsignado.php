<?php
class CursoAsignado extends Eloquent {
   protected $table = 'cursoasignado';
   
   public function semestre(){
        return $this->belongsTo('Semestre');
   }
   public function docente(){
        return $this->belongsTo('Docente');
   }
   public function curso(){
        return $this->belongsTo('Curso');
   }
   public function alumnos(){
        return $this->hasMany('InscripcionCurso','cursoasignado_id');
   }
   public function cargaslectivas(){
        return $this->hasMany('CargaLectiva','cursoasignado_id');
   }
   
}
?>