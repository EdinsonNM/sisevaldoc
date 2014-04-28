<?php
class Grado extends Eloquent {
   	protected $table = 'grado';
	public function docentes(){
        return $this->hasMany('Docente','grado_id');
   	}
}
?>