<?php
class TipoDedicacion extends Eloquent {
   	protected $table = 'tipodedicacion';
   	public function docentes(){
        return $this->hasMany('Docente','tipodedicacion_id');
   	}
}
?>