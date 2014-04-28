<?php
class Group extends Eloquent {
   	protected $table = 'groups';

   	public function users(){
        return $this->belongsToMany('User', 'users_groups', 'group_id', 'user_id');
   }
}
