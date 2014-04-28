<?php
class CategoriaDocente extends Eloquent {
   protected $table = 'categoriadocente';
   
   public function docentes(){
        return $this->hasMany('Docente','categoriadocente_id');
   }
   
}
?>