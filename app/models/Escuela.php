<?php
class Escuela extends Eloquent {
   protected $table = 'escuela';
   
   public function facultad(){
        return $this->belongsTo('Facultad','facultad_id');
   }
   public function cursos(){
        return $this->hasMany('Curso','escuela_id');
   }
   public function docentes(){
        return $this->hasMany('Docente','docente_id');
   }
}
?>