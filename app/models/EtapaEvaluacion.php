<?php
class EtapaEvaluacion extends Eloquent {
   protected $table = 'etapaevaluacion';
   
   public function facultad(){
        return $this->belongsTo('Facultad');
   }
   public function semestre(){
        return $this->belongsTo('Semestre');
   }
   public function plantilla(){
        return $this->belongsTo('PlantillaCriterios');
   }
  
}
?>