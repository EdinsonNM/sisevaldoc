<?php

class HomeController extends BaseController {

	
	public function getIndex()
    {
       return View::make('home.index');
    }

    public function postProfile()
    {
        return View::make('home.index');
    }

   

}