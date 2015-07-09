<?php
class Curso extends Eloquent {
   protected $table = 'curso';
    public static $rules_save = [
		'code' => 'required|unique:curso'
  	];
  	public static $rules_update = [];
  	// Don't forget to fill this array
  	protected $fillable = ['id','code','name','ciclo','numbercredits','numberhours','escuela_id'];

   public function escuela(){
        return $this->belongsTo('Escuela','escuela_id');
   }
    public function cursosasignados(){
        return $this->hasMany('CursoAsignado','curso_id');
   	}
}
?>
