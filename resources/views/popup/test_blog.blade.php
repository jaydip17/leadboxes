<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>In House LeadBox Modal</title>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,400,300,600,700' rel='stylesheet' type='text/css'>
 <!--[if lt IE 9]>
   <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
 <![endif]-->

</head>
<body>
		<div class="container">
			<div class="row">
			<!-- Button trigger modal -->
				<div clas="col-md-4">
					<button class="btn btn-primary btn-md" data-toggle="modal" data-target="#myModalHorizontal">
						Get a free copy of Resource
					</button>
				</div>
			</div>
		</div>
		<!-- Modal -->
		<div class="modal fade" id="myModalHorizontal" tabindex="-1" role="dialog" 
			 aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<!-- Modal Header -->
					<div class="modal-header">
						<button type="button" class="close" 
						   data-dismiss="modal">
							   <span aria-hidden="true">&times;</span>
							   <span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">
							Interested in learning new Languages? 
						</h4>
					</div>
					<!-- Modal Body -->
					<div class="modal-body">					
					{!! Form::open(array('route' => 'emailtest', 'class' => 'form-horizontal','method' => 'POST')) !!}
							  <div class="form-group">
								{!! Form::label('user_email','Email',array('class' => 'control-label col-sm-2')) !!}
								<div class="col-sm-10">
									<input type="email" class="form-control" 
									id="inputEmail" name="user_email" placeholder="A Valid Email Address" required="required"/>
								</div>
							  </div>
							 <div class="form-group">
							   <div class="col-sm-4 pull-right">
								<input type="submit" value="Send me the resource" class="btn btn-primary">
							   </div>
							 </div>
						   <input type = "hidden" name = "Lboxid" value = "<?php echo $Lboxid; ?>">
						   <input type = "hidden" name = "_token" value = "<?php echo csrf_token(); ?>">
					{!! Form::close() !!}
					</div>
					<!-- Modal Footer -->
					<div class="modal-footer">
						<button type="button" class="btn btn-default"
								data-dismiss="modal">
									No, Thanks !!!
						</button>
					</div>			
				</div>
			</div>
		</div>
</body>
</html>