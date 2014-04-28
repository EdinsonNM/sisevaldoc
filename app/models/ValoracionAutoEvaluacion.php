<?php
class ValoracionAutoEvaluacion extends Eloquent {
   protected $table = 'valoracionautoevaluacion';
   
   public function autoevaluacion(){
        return $this->belongsTo('AutoEvaluacion');
   }

   public function criterioevaluacion(){
        return $this->belongsTo('CriterioEvaluacion');
   }

   public function tipovaloracion(){
        return $this->belongsTo('TipoValoracion');
   }
}
?>