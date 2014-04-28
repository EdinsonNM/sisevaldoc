<?php
class Facultad extends Eloquent {
   protected $table = 'facultad';
   
   public function escuelas(){
        return $this->hasMany('Escuela','facultad_id');
   }
}
?>