<!DOCTYPE HTML>
<html>
    <head>
        <title>Login {{$type}}</title>
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
                                        Bienvenido, ingresa tu usuario y contraseña para iniciar sesión
                                    </span>
                        </header>
                    </div>
                
                <!-- Nav -->
                   <nav id="nav" ng-controller="LoadGroupsController">
                        <ul id="menu">
                            <li><a href="../home">Inicio</a></li>
                            <li><a href="#sisevaldoc" class="scrolly">Sisevaldoc</a></li>
                            
                            <li ng-repeat="group in groups" bn-log-dom-creation>
                                <a href="//'./'+group.url//" class="scrolly">//group.name//</a>
                            </li>
                            
                            
                        </ul>
                    </nav>

            </div>
            
        <!-- Main -->
          

                <div class="container">
                    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
            <div class="form">

                {{ Form::open(array('url' => '/login/'.$type)) }}

                    <!-- Revisemos si tenemos errores de login -->
                    @if (Session::has('mensaje'))
                    <span class="error">{{ Session::get('mensaje') }}</span>
                    @endif
             
                    {{ Form::label('usuario', 'Usuario') }}
             
                    {{ Form::text('username', '',array('class' => 'form-control')) }}
             
                    {{ Form::label('password', 'Password') }}
             
                    {{ Form::password('password',array('class' => 'form-control')) }}
             {{ Form::token() }}
                    <br />
                    {{ Form::submit('Iniciar sesión',array('class'=>'btn btn-primary btn-lg btn-block')) }}
                    <div class="text-center">
                        <a href="../loginuser/forgotmypassword" >Olvide mi contraseña</a>
                    </div>
                    
                {{ Form::close() }}

               

            </div>
            <div>
                @yield('mensaje')
            </div>
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