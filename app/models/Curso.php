<?php
class Curso extends Eloquent {
   protected $table = 'curso';
   
   public function escuela(){
        return $this->belongsTo('Escuela','escuela_id');
   }
    public function cursosasignados(){
        return $this->hasMany('CursoAsignado','curso_id');
   	}
}
?>