<?php
class TipoValoracion extends Eloquent {
   	protected $table = 'tipovaloracion';
   	public function valoracionesautoevaluacion(){
        return $this->hasMany('ValoracionAutoEvaluacion','tipovaloracion_id');
   	}
   	public function valoracionesevaluacion(){
        return $this->hasMany('ValoracionEvaluacion','tipovaloracion_id');
   	}
}
?>