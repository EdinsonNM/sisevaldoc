<?php
class CriterioEvaluacion extends Eloquent {
   protected $table = 'criterioevaluacion';
   static $idautoevaluacion=0;
   public function padre(){
        return $this->belongsTo('CriterioEvaluacion','idpadre');
   }
   public function children(){
        return $this->hasMany('CriterioEvaluacion','idpadre');
   }
   public function plantilla(){
   		return $this->belongsTo('PlantillaCriterios');
   }

   public function valoracionautoevaluacion(){
        return $this->hasMany('ValoracionAutoEvaluacion','criterioevaluacion_id');
   }

   public function valoracionevaluacion(){
        return $this->hasMany('ValoracionEvaluacion','criterioevaluacion_id');
   }

   public function valoracionevaluacionjefedpto(){
        return $this->hasMany('ValoracionEvaluacionJefeDpto','criterioevaluacion_id');
   }

}
?>