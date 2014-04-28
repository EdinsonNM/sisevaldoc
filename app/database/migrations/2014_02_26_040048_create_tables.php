<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		
        Schema::create('facultad',function($table){
            $table->increments('id');
            $table->string('code',10)->unique();
            $table->string('name',100);
            $table->string('description',300)->nullable();
            $table->timestamps();
        });

        Schema::create('escuela',function($table){
            $table->increments('id');
            $table->string('code',10)->unique();
            $table->string('name',100);
            $table->string('description',300)->nullable();
            $table->integer('facultad_id');
            $table->timestamps();
        });
        Schema::create('grado',function($table){
            $table->increments('id');
            $table->string('name',100);
            $table->timestamps();
        });
        Schema::create('titulo',function($table){
            $table->increments('id');
            $table->string('name',100);
            $table->string('abrev',100);
            $table->timestamps();
        });
        Schema::create('tipodedicacion',function($table){
            $table->increments('id');
            $table->string('name',100);
            $table->string('abbreviation',3);       
            $table->timestamps();
        });
        Schema::create('docente',function($table){
            $table->increments('id');
            $table->string('code',10)->unique();
            $table->string('firstname',100);
            $table->string('lastname',100);
            $table->integer('dedication');
            $table->integer('usuario_id');
            $table->integer('categoriadocente_id');
            $table->integer('grado_id');
            $table->integer('titulo_id');
            $table->integer('tipodedicacion_id');
            $table->integer('escuela_id');
            $table->enum('condition',array('NOMBRADO','CONTRATADO'););
            $table->timestamps();
        });
        Schema::create('alumno',function($table){
            $table->increments('id');
            $table->string('code',10)->unique();
            $table->string('firstname',100);
            $table->string('lastname',100);
            $table->integer('usuario_id');
            $table->integer('yearinput');
            $table->integer('escuela_id');         
            $table->timestamps();
        });

        Schema::create('semestre',function($table){
            $table->increments('id');
            $table->integer('year');
            $table->integer('period');
            $table->integer('numberweeks');
            $table->date('date_start');
            $table->date('date_end');
            $table->timestamps();
        });

        Schema::create('curso',function($table){
            $table->increments('id');
            $table->string('code',10)->unique();
            $table->string('name',100);
            $table->integer('ciclo');
            $table->integer('numbercredits');
            $table->integer('numberhours');
            $table->integer('escuela_id');
            $table->timestamps();
        });

        
        Schema::create('menu',function($table){
            $table->increments('id');
            $table->integer('padre_id');
            $table->string('name',100);
            $table->string('description',300);
            $table->string('url',100);
            $table->integer('orden');
            $table->timestamps();
        });

        Schema::create('permiso',function($table){
            $table->increments('id');
            $table->integer('menu_id');
            $table->integer('grupo_id');           
            $table->timestamps();
        });

        Schema::create('categoriadocente',function($table){
            $table->increments('id');
            $table->string('name',100);
            $table->timestamps();
        });

        

        Schema::create('cursoasignado',function($table){
            $table->increments('id');
            $table->integer('curso_id');
            $table->integer('docente_id');
            $table->integer('semestre_id');
            $table->integer('students_approved');
            $table->integer('students_disapproved');
            $table->integer('percentage_progress');
            $table->enum('type', array('Obligatorio', 'Electivo'));
            $table->integer('number_hours_theory');
            $table->integer('number_hours_practices');
            $table->integer('number_hours_laboratory');
            $table->timestamps();
        });

        Schema::create('criterioevaluacion',function($table){
            $table->increments('id');
            $table->integer('idpadre');
            $table->string('name',200);
            $table->integer('grupo');
            $table->integer('plantilla_id');
            $table->timestamps();
        });
        
        Schema::create('etapaevaluacion',function($table){
            $table->increments('id');
            $table->string('name',200);
            $table->date('date_init');
            $table->date('date_end');
            $table->integer('semestre_id');
            $table->integer('facultad_id');
            $table->integer('plantilla_id');
            $table->timestamps();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('grado');
        Schema::drop('titulo');
        Schema::drop('tipodedicacion');
		Schema::drop('facultad');
		Schema::drop('escuela');
		Schema::drop('docente');
        Schema::drop('alumno');
        Schema::drop('semestre');
        Schema::drop('curso');
        
        Schema::drop('menu');
        Schema::drop('permiso');
        Schema::drop('categoriadocente');
        
        Schema::drop('cursoasignado');
		Schema::drop('criterioevaluacion');
		Schema::drop('etapaevaluacion');
	}

}