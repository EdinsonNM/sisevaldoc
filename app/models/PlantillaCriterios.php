<?php
class PlantillaCriterios extends Eloquent {
   protected $table = 'plantillacriterios';
   
   public function criterios(){
        return $this->hasMany('CriterioEvaluacion','plantilla_id');
   }
   public function etapasevaluacion(){
        return $this->hasMany('EtapaEvaluacion','plantilla_id');
   }
}
?>