<?php
class Grupo extends Eloquent {
   	protected $table = 'grupo';
	
	public function usuarios(){
        return $this->hasMany('Usuario','grupo_id');
   	}
}
