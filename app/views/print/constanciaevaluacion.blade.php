<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>Universidad Nacional de Ucayali</title>

	{{ HTML::style('css/normalize.css') }}
	{{ HTML::style('css/print.css') }}
</head>
<body>
	<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<h3 class="text-center">Universidad Nacional de Ucayali</h3>
		</div>
	</div>	
	<br/>
	<br/>
	<br/>
	<div class="row">
		<div class="col-md-12">
			<h3 class="text-center">CONSTANCIA DE REGISTRO DE EVALUACION DE DESEMPEÑO DEL DOCENTE (SISEVALDOC)</h3>
		</div>
	</div>	
	<br/>
	<br/>
	<div class="row">
		<div class="col-md-2 col-md-offset-1">
			<label>SEMESTRE:</label>
		</div>
		<div class="col-md-6">
			{{ $entity->inscripcion->cursoasignado->semestre->year}} - {{ $entity->inscripcion->cursoasignado->semestre->period}}
		</div>
	</div>	
	<div class="row">
		<div class="col-md-2 col-md-offset-1">
			<label>AÑO:</label>
		</div>
		<div class="col-md-6">
			{{ $entity->inscripcion->cursoasignado->semestre->year}}
		</div>
	</div>	
	<div class="row">
		<div class="col-md-2 col-md-offset-1">
			<label>FECHA Y HORA:</label>
		</div>
		<div class="col-md-6">
			{{ $entity->updated_at}}
		</div>
	</div>	
	<div class="row">
		<div class="col-md-2 col-md-offset-1">
			<label>CURSO:</label>
			 
		</div>
		<div class="col-md-6">
			{{ $entity->inscripcion->cursoasignado->curso->name}}
		</div>
	</div>	
	<br/>
	<br/>
	<br/>
	<br/>
	<div class="row">
		<div class="col-md-12 text-center">
			<strong>UD. A EVALUADO A SU DOCENTE SATISFACTORIAMENTE.</strong>
		</div>
	</div>	
	<br/>
	<br/>
	<br/>
	<div class="row">
		<div class="col-md-4 col-md-offset-2 text-center">
			_______________________
		</div>
		<div class="col-md-4 text-center">
			_______________________
		</div>
	</div>	
	<div class="row">
		<div class="col-md-4 col-md-offset-2 text-center">
			FIRMA DEL DECANO DE LA FACULTAD
		</div>
		<div class="col-md-4 text-center">
			FIRMA DEL JEFE DE DEPARTAMENTO
		</div>
	</div>			
</div>

</body>
</html>


