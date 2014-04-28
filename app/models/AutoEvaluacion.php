<?php
class Autoevaluacion extends Eloquent {
   protected $table = 'autoevaluacion';
   
   public function valoraciones(){
        return $this->hasMany('ValoracionAutoEvaluacion','autoevaluacion_id');
   }

   public function  cursoasignado(){
        return $this->belongsTo('CursoAsignado');
   }
}
?>