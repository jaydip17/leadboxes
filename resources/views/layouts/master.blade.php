<html>
   
   <head>
      <title>@yield('title')</title>
   </head>
   
   <body>
      @yield('sidebar')
     
      
      <div class = "container">
         @section('content')
		 content section starts
		 @show
      </div>
   
   </body>
</html>