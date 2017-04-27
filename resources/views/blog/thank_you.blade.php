<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Thank You For Joining The List</title>

	
	{!! Html::style('http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,400,300,600,700') !!}
	{!! Html::style('css/bootstrap.css') !!}
	{!! Html::style('css/font-awesome.min.css') !!}
 

	 <!--[if lt IE 9]>
	   <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	 <![endif]-->

</head>
<body>
	<div class="container" style="margin-top:60px;">
			<div class="jumbotron text-xs-center">
			
			  <h1 class="display-2">Thank You!</h1>
			  <p class="lead"><strong>Please check your email</strong> for further instructions on how to download the resource.</p>
			  <hr>
			  <p>
				Having trouble? <a href="#">Contact us</a>
			  </p>
			  <p class="lead">
				<a class="btn btn-primary btn-sm" href="<?php echo $current_leadbox_info->blog_url; ?>" role="button">Continue to Post</a>
			  </p>
			</div>

	</div>

	{!! Html::script('http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js') !!}
	{!! Html::script('js/bootstrap.min.js') !!}
</body>
</html>