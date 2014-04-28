<?php
class Semestre extends Eloquent {
   	protected $table = 'semestre';
	
	public function escuelas(){
        return $this->hasMany('EtapaEvaluacion','semestre_id');
   	}
   	public function cursosasignados(){
        return $this->hasMany('CursoAsignado','semestre_id');
   	}

   	public function cargasnolectivas(){
        return $this->hasMany('CargaNoLectiva','semestre_id');
    }
}
?>