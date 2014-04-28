<?php
class EvaluacionJefeDpto extends Eloquent {
   protected $table = 'evaluacionjefedpto';
   
   public function valoraciones(){
        return $this->hasMany('ValoracionEvaluacionJefeDpto','evaluacionjefedpto_id');
   }
   public function  cursoasignado(){
        return $this->belongsTo('CursoAsignado');
   }
   public function  docente(){
        return $this->belongsTo('Docente');
   }
}
?>