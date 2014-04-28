<?php
class CargaLectiva extends Eloquent {
   	protected $table = 'cargalectiva';
	public function cursoasignado(){
        return $this->belongsTo('CursoAsignado');
    }
}
?>