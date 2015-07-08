<!DOCTYPE HTML>
<html>
	<head>
		<title>Sisevaldoc</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css" />
		<!--[if lte IE 8]><script src="js/html5shiv.js"></script><![endif]-->
		{{ HTML::script('js/jquery.min.js') }}
		{{ HTML::script('js/jquery.dropotron.min.js') }}
		{{ HTML::script('js/skel.min.js') }}
		{{ HTML::script('js/skel-panels.min.js') }}
		{{ HTML::script('js/libs/angular/angular.min.js') }}
		{{ HTML::script('js/init.js') }}
		{{ HTML::script('js/pages/home/index.js') }}

		<noscript>
			{{ HTML::style('css/skel-noscript.css') }}
			{{ HTML::style('css/style.css') }}
			{{ HTML::style('css/style-desktop.css') }}
			{{ HTML::style('css/style-noscript.css') }}
		</noscript>
		<!--[if lte IE 8]><link rel="stylesheet" href="css/ie8.css" /><![endif]-->
	</head>
	<body class="homepage" ng-app='myapp'>

		<!-- Header -->
			<div id="header">
						
				<!-- Inner -->
					<div class="inner">
						<header>
							<h1><a href="#" id="logo">SISEVALDOC</a></h1>
							<hr />
							<h3><a href="#" style="color:#FFFFFF">Universidad Nacional de Ucayali</a></h3>
							<span class="byline">Sistema Informático para la Evaluación del Desempeño del Docente</span>
							
						</header>
						<footer>
							<a href="#sisevaldoc" class="button circled scrolly">¿Que es?</a>
						</footer>
					</div>
				
				<!-- Nav -->
					<nav id="nav" ng-controller="LoadGroupsController">
						<ul id="menu">
							<li><a href="#">Inicio</a></li>
							<li><a href="#sisevaldoc" class="scrolly">Sisevaldoc</a></li>
							
							<li ng-repeat="group in groups" bn-log-dom-creation>
								<a href="#//group.url//" class="scrolly">//group.name//</a>
							</li>
							
							
						</ul>
					</nav>

			</div>
			
		<!-- Banner -->
			<div id="sisevaldoc">
				<article id="main" class="container special">
					
					<header>
						<h2><a href="#">¿Que es SISEVALDOC?</a></h2>
						<span class="byline">
							Sistema Informático para la Evaluación del Desempeño del Docente de la Universidad Nacional de Pucallpa.
						</span>
					</header>
					<p>
						El Sistema de Evaluación del Desempeño Docente tiene como objetivo asegurar la calidad de la docencia en la Universidad Nacional de Ucayali, en un ambiente de confianza, participación y transparencia, en la perspectiva de formar recursos humanos en pregrado y postgrado, con enfoque humanista, sólida base científico-técnica, capaces de contribuir a resolver los problemas del desarrollo humano de la región y del país.

Como resultado del proceso de evaluación, es de esperar resultados confiables que permita tomar decisiones; un plan de mejoras estructurado de manera adecuada; y, un cambio de actitud favorable de los docentes, para superar sus debilidades y coadyuvar al cumplimiento de la misión de la Universidad Nacional de Ucayali.
					</p>
					<footer>
						<a href="#" class="button">Seguir Leyendo</a>
					</footer>
				</article>
			</div>

<div ng-controller="LoadGroupsController">
			<div ng-repeat="group in groups" id="//group.url//">
				<article id="main-//group.url//" class="container special">
					<p>&nbsp;</p>
					<header>
						<h2><a href="#">//group.title//</a></h2>
						<span class="byline">
							//group.subtitle//
						</span>
					</header>
					<p>
						//group.description//
					</p>
					<footer>
						<a href="//'./login/'+group.url//" class="button">Ingresar al Sistema</a>
					</footer>
				</article>
				<p>&nbsp;</p>
			</div>
</div>
		
		

		<!-- Footer -->
			<div id="footer">
				<div class="container">
					<div class="copyright">
									<ul class="menu">
										<li>&copy; YTG. All rights reserved.</li>
										<li>Design: <a href="http://html5up.net/">HTML5 UP</a></li>
									
									</ul>
					</div>
				</div>
			</div>

	</body>
</html>