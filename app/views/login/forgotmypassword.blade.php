<!DOCTYPE HTML>
<html>
    <head>
        <title>Olvide mi contraseña</title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css" />
        <!--[if lte IE 8]><script src="js/html5shiv.js"></script><![endif]-->
        {{ HTML::script('js/jquery.min.js') }}
        {{ HTML::script('js/jquery.dropotron.min.js') }}
        {{ HTML::script('js/skel.min.js') }}
        {{ HTML::script('js/skel-panels.min.js') }}
        {{ HTML::script('js/init.js') }}
        {{ HTML::script('js/bootstrap.min.js') }}

        {{ HTML::style('css/skel-noscript.css') }}
        {{ HTML::style('css/style.css') }}
        {{ HTML::style('css/style-desktop.css') }}
        {{ HTML::style('css/style-noscript.css') }}
        {{ HTML::style('css/bootstrap.min.css') }}
        
        <!--[if lte IE 8]><link rel="stylesheet" href="css/ie8.css" /><![endif]-->
    </head>
    <body class="no-sidebar" ng-app='myapp2'>

        <!-- Header -->
            <div id="header">

                <!-- Inner -->
                    <div class="inner">
                        <header>
                            <h1><a href="#" id="logo">SISEVALDOC</a></h1>
                              <span class="byline">
                                        Restablecer Contraseña de Usuario
                                    </span>
                        </header>
                    </div>
                
                <!-- Nav -->
                   <nav id="nav" ng-controller="LoadGroupsController">
                        <ul id="menu">
                            <li><a href="../home">Inicio</a></li>
                            <li><a href="#sisevaldoc" class="scrolly">Sisevaldoc</a></li>
                            
                            <li ng-repeat="group in groups" bn-log-dom-creation>
                                <a href="//'../login/'+group.url//" class="scrolly">//group.name//</a>
                            </li>
                            
                            
                        </ul>
                    </nav>

            </div>
            
        <!-- Main -->
<div class="container">
<div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">

            <form action="./requestressetpassword" method="POST">
                <p>&nbsp;</p>
                <div class="row">
                <div class="col-md-12 text-center">
                    <p>Bienvenido! Ingrese su nombre de usuario para poder restablecer su contraseña</p>
                </div>
                </div>
      

                <div class="row">
                    <div class="col-md-12">
                        <label for="username"> Nombre de usuario:</label>
                        <input type="text" id="username" name="username" required="required" class="form-control">
                        <p>&nbsp;</p>
                        <input type="submit" value="Restablecer contraseña" class="btn btn-lg btn-primary btn-block">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">

                    </div>
                   
                </div>
        </form>

    </div>
    <div class="col-md-4"></div>
</div>
</div>
               

{{ HTML::script('js/libs/angular/angular.min.js') }}
{{ HTML::script('js/libs/angular/angular-route.min.js') }}
{{ HTML::script('js/libs/angular/angular-resource.min.js') }}
{{ HTML::script('js/pages/home/login.js') }}

    </body>
</html>