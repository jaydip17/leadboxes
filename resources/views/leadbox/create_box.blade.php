<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Create LeadBox</title>

{!! Html::style('css/bootstrap.css') !!}

 <!--[if lt IE 9]>
   <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
 <![endif]-->

</head>
<body>
	<div class="container" style="margin-top:50px;">
			<div class="flash-message">
			  @foreach (['danger', 'warning', 'success', 'info'] as $msg)
				@if(Session::has('alert-' . $msg))
				<center><p class="alert alert-{{ $msg }}">{{ Session::pull('alert-' . $msg) }}</p></center>
				@endif
			  @endforeach 
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="page-header">
						  <h1>Generate LeadBox Code</h1>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-10">
						{!! Form::open(array('route' => 'create_pdf', 'class' => 'form-horizontal','method' => 'POST')) !!}
							<div class="form-group">
								{!! Form::label('url','URL of the page',array('class' => 'control-label col-sm-3')) !!}
								<div class="col-sm-7">
									<input <?php if((isset($pdf_file) && !empty($pdf_file)) || isset($embed_code) ){ echo "disabled"; }?> type="text" class="form-control" id="URL" name="url" value="{{ old('url') }}<?php if(isset($blog_url) && !empty($blog_url)){ echo $blog_url; }?>" placeholder="Place the valid URL starting with HTTP or HTTPS" required>
								</div> 
								<div class="col-sm-2">
									<input  type = "hidden" name = "_token" value = "<?php echo csrf_token(); ?>">
									<input <?php if((isset($pdf_file) && !empty($pdf_file)) || isset($embed_code)){ echo "disabled"; }?> type="submit" value="Generate PDF" class="btn btn-primary btn-md" id="gen_pdf" name="gen_pdf" type="submit">
								</div> 					
							</div>
							<div class="form-group">
								{!! Form::label('email_id','Link to PDF File',array('class' => 'control-label col-sm-3')) !!}
								<div class="col-sm-9" style="margin-top:7px;">
									<a class="help-text" href="<?php if(isset($pdf_file) && !empty($pdf_file)){ echo asset('pdf_fluent/'.$pdf_file); }?>"><?php if(isset($pdf_file) && !empty($pdf_file)){ echo asset('pdf_fluent/'.$pdf_file); } else { echo "Generate The PDF Above"; }?></a>
								</div>  
							</div>	
						{!! Form::close() !!}
						{!! Form::open(array('route' => 'get_leadbox_code', 'class' => 'form-horizontal','method' => 'POST')) !!}
							<div class="form-group">
								{!! Form::label('redirect_url','Redirect URL',array('class' => 'control-label col-sm-3')) !!}
								<div class="col-sm-7">
									<input type="text" class="form-control" id="URL" name="redirect_url" value="<?php if((isset($redirect_url) && !empty($redirect_url))){ echo $redirect_url; }?>" placeholder="Place the valid URL starting with HTTP or HTTPS" <?php if((!isset($pdf_file) || empty($pdf_file)) || isset($embed_code) ) { echo "disabled"; }?>>
								</div> 
							</div>							
							<div class="form-group">
								<div class="col-sm-7 col-sm-offset-3">   
								  <input  type = "hidden" name = "_token" value = "<?php echo csrf_token(); ?>">
								  <input  type = "hidden" name = "pdf_file" value = "<?php if(isset($pdf_file) && !empty($pdf_file)){ echo $pdf_file; }?>">
								  <input  type = "hidden" name = "url" value = "<?php if(isset($blog_url) && !empty($blog_url)){ echo $blog_url; }?>">		  
								  <input type="submit" class="btn btn-primary" value="Get LeadBox Code!" <?php if(!isset($pdf_file) || empty($pdf_file) || isset($embed_code)){ echo "disabled"; }?>>
								</div>
							</div>   
						{!! Form::close() !!}
						{!! Form::open() !!}					
							<div class="form-group">
								<label for="full_name_id" class="control-label col-sm-3">Code to insert in Your Posts</label>
								<div class="col-sm-7">   
								<?php if(isset($embed_code)) { ?> 	<textarea rows="7" cols="70"> <?php echo ($embed_code);?> </textarea> <?php } ?>
							 	</div>
							</div>						
						{!! Form::close() !!}
				</div>		
			</div>	
	</div>	
{!! Html::script('js/bootstrap.min.js') !!}
</body>
</html>