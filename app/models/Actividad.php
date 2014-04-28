<?php
class Actividad extends Eloquent {
   	protected $table = 'actividad';
	public function cargasnolectivas(){
        return $this->hasMany('CargaNoLectiva','actividad_id');
   	}
}
?>