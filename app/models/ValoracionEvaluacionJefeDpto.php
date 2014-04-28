<?php
class ValoracionEvaluacionJefeDpto extends Eloquent {
   protected $table = 'valoracionevaluacionjefedpto';
   
   public function evaluacion(){
        return $this->belongsTo('EvaluacionJefeDpto');
   }

   public function criterioevaluacion(){
        return $this->belongsTo('CriterioEvaluacion');
   }

   public function tipovaloracion(){
        return $this->belongsTo('TipoValoracion');
   }
}
?>