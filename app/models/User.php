<?php
class User extends Eloquent {
   	protected $table = 'users';
    //protected $hidden = array('password','persist_code','reset_password_code');
   	public function alumno(){
        return $this->hasOne('Alumno','usuario_id');
   }
   public function docente(){
        return $this->hasOne('Docente','usuario_id');
   }

   public function groups(){
        return $this->belongsToMany('Group', 'users_groups', 'user_id', 'group_id');
   }
}
