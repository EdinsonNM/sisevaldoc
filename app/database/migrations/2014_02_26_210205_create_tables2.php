<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTables2 extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('inscripcioncurso',function($table){
            $table->increments('id');
            $table->integer('alumno_id');
            $table->integer('cursoasignado_id');
            $table->timestamps();
        });
        Schema::create('plantillacriterios',function($table){
            $table->increments('id');
            $table->string('name',100);
            $table->boolean('active');
            $table->timestamps();
        });
        Schema::create('tipovaloracion',function($table){
            $table->increments('id');
            $table->string('name',100);
            $table->integer('value');
            $table->timestamps();
        });
		Schema::create('autoevaluacion',function($table){
            $table->increments('id');
            $table->integer('cursoasignado_id');
            $table->boolean('finalizado')->default(0);
            $table->timestamps();
        });
        Schema::create('valoracionautoevaluacion',function($table){
            $table->increments('id');
            $table->integer('criterioevaluacion_id');
            $table->integer('autoevaluacion_id');
            $table->integer('tipovaloracion_id');
            $table->timestamps();
        });
        Schema::create('evaluacion',function($table){
            $table->increments('id');
            $table->integer('inscripcioncurso_id');
            $table->boolean('finalizado')->default(0);
            $table->timestamps();
        });
        Schema::create('valoracionevaluacion',function($table){
            $table->increments('id');
            $table->integer('evaluacion_id');
            $table->integer('criterioevaluacion_id');    
            $table->integer('tipovaloracion_id');
            $table->timestamps();
        });
        
        Schema::create('cargalectiva',function($table){
            $table->increments('id');
            $table->integer('week');
            $table->date('date_start');    
            $table->date('date_end');
            $table->integer('numberhours');         
            $table->enum('typeplace', array('Pabellón', 'Laboratorio'));
            $table->string('place',100);
            $table->text('content');
            $table->integer('cursoasignado_id');
            $table->timestamps();
        });

        Schema::create('actividad',function($table){
            $table->increments('id');
            $table->text('description');
            $table->timestamps();
        });

         Schema::create('carganolectiva',function($table){
            $table->increments('id');
            $table->date('date_start');  
            $table->date('date_end');
            $table->string('place',300);
            $table->text('content');
            $table->integer('numberhours');
            $table->integer('actividad_id');
            $table->integer('docente_id');
            $table->integer('semestre_id');  
            $table->timestamps();
        });

        Schema::create('evaluacionjefedpto',function($table){
            $table->increments('id');
            $table->integer('cursoasignado_id');
            $table->integer('docente_id');
            $table->boolean('finalizado')->default(0);
            $table->timestamps();
        });
        
        Schema::create('valoracionevaluacionjefedpto',function($table){
            $table->increments('id');
            $table->integer('evaluacionjefedpto_id');
            $table->integer('criterioevaluacion_id');    
            $table->integer('tipovaloracion_id');
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
		Schema::drop('inscripcioncurso');
		Schema::drop('plantillacriterios');
		Schema::drop('tipovaloracion');
		Schema::drop('autoevaluacion');
		Schema::drop('valoracionautoevaluacion');
		Schema::drop('evaluacion');
		Schema::drop('valoracionevaluacion');
        Schema::drop('cargalectiva');
        Schema::drop('actividad');
        Schema::drop('carganolectiva');
        Schema::drop('evaluacionjefedpto');
        Schema::drop('valoracionevaluacionjefedpto');
	}

}
