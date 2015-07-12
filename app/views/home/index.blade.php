<!DOCTYPE HTML>
<html >
	<head>
		<title>Sisevaldoc</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css" />
		<!--[if lte IE 8]><script src="js/html5shiv.js"></script><![endif]-->

			{{ HTML::style('css/style.css') }}
			{{ HTML::style('css/style-desktop.css') }}

			{{ HTML::style('js/libs/font-awesome-4.3.0/css/font-awesome.min.css') }}
			{{ HTML::style('css/bootstrap.min.css') }}

		<!--[if lte IE 8]><link rel="stylesheet" href="css/ie8.css" /><![endif]-->
	</head>
	<body class="homepage" ng-app='myapp'>
<div class="" ng-view>

</div>


<!--scripts-->
{{ HTML::script('js/jquery.min.js') }}
{{ HTML::script('js/jquery.dropotron.min.js') }}
{{ HTML::script('js/jquery.scrolly.min.js') }}
{{ HTML::script('js/jquery.onvisible.min.js') }}
{{ HTML::script('js/skel.min.js') }}
{{ HTML::script('js/util.js') }}
{{ HTML::script('js/init.js') }}
{{ HTML::script('js/libs/angular/angular.min.js') }}
{{ HTML::script('js/libs/angular/angular-route.min.js') }}
{{ HTML::script('js/pages/home/index.js') }}

	</body>
</html>
