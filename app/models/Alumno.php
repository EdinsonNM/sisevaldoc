<?php
class Alumno extends Eloquent {
   protected $table = 'alumno';
   
   public function escuela(){
        return $this->belongsTo('Escuela');
   }

   public function usuario(){
        return $this->belongsTo('User');;
    }
}
?>