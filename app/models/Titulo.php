<?php
class Titulo extends Eloquent {
   	protected $table = 'titulo';
	public function docentes(){
        return $this->hasMany('Docente','titulo_id');
   	}
}
?>