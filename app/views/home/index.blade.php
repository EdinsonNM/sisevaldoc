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
					<div class="row">
						
						<!-- Tweets -->
							<section class="4u">
								<header>
									<h2 class="fa fa-twitter circled solo"><span>Tweets</span></h2>
								</header>
								<ul class="divided">
									<li>
										<article class="tweet">
											Amet nullam fringilla nibh nulla convallis tique ante sociis accumsan.
											<span class="timestamp">5 minutes ago</span>
										</article>
									</li>
									<li>
										<article class="tweet">
											Hendrerit rutrum quisque.
											<span class="timestamp">30 minutes ago</span>
										</article>
									</li>
									<li>
										<article class="tweet">
											Curabitur donec nulla massa laoreet nibh. Lorem praesent montes.
											<span class="timestamp">3 hours ago</span>
										</article>
									</li>
									<li>
										<article class="tweet">
											Lacus natoque cras rhoncus curae dignissim ultricies. Convallis orci aliquet.
											<span class="timestamp">5 hours ago</span>
										</article>
									</li>
								</ul>
							</section>

						<!-- Posts -->
							<section class="4u">
								<header>
									<h2 class="fa fa-file circled solo"><span>Posts</span></h2>
								</header>
								<ul class="divided">
									<li>
										<article class="post stub">
											<header>
												<h3><a href="#">Nisl fermentum integer</a></h3>
											</header>
											<span class="timestamp">3 hours ago</span>
										</article>
									</li>
									<li>
										<article class="post stub">
											<header>
												<h3><a href="#">Phasellus portitor lorem</a></h3>
											</header>
											<span class="timestamp">6 hours ago</span>
										</article>
									</li>
									<li>
										<article class="post stub">
											<header>
												<h3><a href="#">Magna tempus consequat</a></h3>
											</header>
											<span class="timestamp">Yesterday</span>
										</article>
									</li>
									<li>
										<article class="post stub">
											<header>
												<h3><a href="#">Feugiat lorem ipsum</a></h3>
											</header>
											<span class="timestamp">2 days ago</span>
										</article>
									</li>
								</ul>
							</section>

						<!-- Photos -->
							<section class="4u">
								<header>
									<h2 class="fa fa-camera circled solo"><span>Photos</span></h2>
								</header>
								<div class="row quarter no-collapse">
									<div class="6u">
										<a href="http://mdomaradzki.deviantart.com/art/Air-Lounge-385212062" class="image full"><img src="images/pic10.jpg" alt="" /></a>
									</div>
									<div class="6u">
										<a href="http://mdomaradzki.deviantart.com/art/Paris-City-Streets-II-382623606" class="image full"><img src="images/pic11.jpg" alt="" /></a>
									</div>
								</div>
								<div class="row quarter no-collapse">
									<div class="6u">
										<a href="http://mdomaradzki.deviantart.com/art/Trainride-Visions-383309985" class="image full"><img src="images/pic12.jpg" alt="" /></a>
									</div>
									<div class="6u">
										<a href="http://mdomaradzki.deviantart.com/art/Paris-Metro-382623851" class="image full"><img src="images/pic13.jpg" alt="" /></a>
									</div>
								</div>
								<div class="row quarter no-collapse">
									<div class="6u">
										<a href="http://mdomaradzki.deviantart.com/art/Cliffs-of-Coogee-II-366961860" class="image full"><img src="images/pic14.jpg" alt="" /></a>
									</div>
									<div class="6u">
										<a href="http://mdomaradzki.deviantart.com/art/Stormy-Coast-VII-366561367" class="image full"><img src="images/pic15.jpg" alt="" /></a>
									</div>
								</div>
							</section>

					</div>
					<hr />
					<div class="row">
						<div class="12u">
							
							<!-- Contact -->
								<section class="contact">
									<header>
										<h3>Nisl turpis nascetur interdum?</h3>
									</header>
									<p>Urna nisl non quis interdum mus ornare ridiculus egestas ridiculus lobortis vivamus tempor aliquet.</p>
									<ul class="icons">
										<li><a href="#" class="fa fa-twitter solo"><span>Twitter</span></a></li>
										<li><a href="#" class="fa fa-facebook solo"><span>Facebook</span></a></li>
										<li><a href="#" class="fa fa-google-plus solo"><span>Google+</span></a></li>
										<li><a href="#" class="fa fa-pinterest solo"><span>Pinterest</span></a></li>
										<li><a href="#" class="fa fa-dribbble solo"><span>Dribbble</span></a></li>
										<li><a href="#" class="fa fa-linkedin solo"><span>Linkedin</span></a></li>
									</ul>
								</section>
							
							<!-- Copyright -->
								<div class="copyright">
									<ul class="menu">
										<li>&copy; Untitled. All rights reserved.</li>
										<li>Design: <a href="http://html5up.net/">HTML5 UP</a></li>
										<li>Demo Images: <a href="http://mdomaradzki.deviantart.com/">Michael Domaradzki</a></li>
									</ul>
								</div>
							
						</div>
					
					</div>
				</div>
			</div>

	</body>
</html>