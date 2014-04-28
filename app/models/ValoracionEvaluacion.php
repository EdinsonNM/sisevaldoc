<?php
class ValoracionEvaluacion extends Eloquent {
   protected $table = 'valoracionevaluacion';
   
   public function evaluacion(){
        return $this->belongsTo('Evaluacion');
   }
   public function criterioevaluacion(){
        return $this->belongsTo('CriterioEvaluacion');
   }
   public function tipovaloracion(){
        return $this->belongsTo('TipoValoracion');
   }
}
?>