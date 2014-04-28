<?php
class CargaNoLectiva extends Eloquent {
   	protected $table = 'carganolectiva';
	public function semestre(){
        return $this->belongsTo('Semestre');
    }
    public function docente(){
        return $this->belongsTo('Docente');
    }
    public function actividad(){
        return $this->belongsTo('Actividad');
    }
}
?>