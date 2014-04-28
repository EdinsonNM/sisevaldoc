<?php
class Docente extends Eloquent {
   protected $table = 'docente';
   
   	public function categoriadocente(){
        return $this->belongsTo('CategoriaDocente');
   	}
	  public function grado(){
        return $this->belongsTo('Grado');
   	}
   	public function titulo(){
        return $this->belongsTo('Titulo');
   	}
   	public function tipodedicacion(){
        return $this->belongsTo('TipoDedicacion');
   	}
   	public function usuario(){
        return $this->belongsTo('User');;
    }
    public function cursosasignados(){
        return $this->hasMany('CursoAsignado','docente_id');
   	}

    public function escuela(){
        return $this->belongsTo('Escuela');
    }

    public function cargasnolectivas(){
        return $this->hasMany('CargaNoLectiva','docente_id');
    }

    public function evaluaciones(){
        return $this->hasMany('EvaluacionJefeDpto','docente_id');
    }
}
?>