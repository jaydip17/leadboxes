<?php

namespace practise\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use practise\Http\Requests;
use practise\Http\Controllers\Controller;

use View;
use practise\Models\LeadBoxesModel;
use Redirect;
use Session;
use Illuminate\Support\Facades\Input;


class AddLeadboxController extends Controller
{
	// Leadboxes  specific events and operations
	
	public function create_leadbox()
	{
		return View::make('leadbox.create_box');
		
	}
	

	public function create_pdf(Request $request)
	{
		$url_received = $request->input('url');
		
		$pdf_file_saved = $this->get_pdf($url_received);

		
		if($pdf_file_saved==FALSE) {
			
		Session::flash('alert-danger', 'pdf creation failed. check the url.');
		
		return Redirect::back()->withInput(Input::all());
		
		}
		else{
			
		Session::flash('alert-success', 'pdf creation success.');
	
		return View::make('leadbox.create_box',array('pdf_file'=>$pdf_file_saved,'blog_url'=>$url_received));
		
		}
		
	}
	

	public function get_leadbox_code(Request $request)
	{
		$blog_id = 1;
		$customer_id = 1;
		
		$url_received = $request->input('url');
		$redirect_url = $request->input('redirect_url');
		$file_name_received = $request->input('pdf_file');
		
		if(empty($redirect_url) or $redirect_url=="" or !isset($url_received))
		{
		$redirect_url = 'site_default';	
		}
		
		$leadBoxes = new LeadBoxesModel();
		$return_data = $leadBoxes::create(array('blog_id' => $blog_id, 'include_file'=> $file_name_received, 'blog_url'=> $url_received,'redirect_url'=> $redirect_url,'customer_id'=> $customer_id));
		$return_id = $return_data->lead_box_id;
		
		$embed_code = "<script type=\"text/javascript\">var Lboxid = '".$return_id."';</script><script src=\"".asset('/js/widget/script.js')."\" type=\"text/javascript\"></script><div id=\"example-widget-container\"></div>";
		//$embed_code = "<script type=\"text/javascript\">var Lboxid = '".$return_id."';</script><script src=\"http://heppihealth.com/js/widget/script.js\" type=\"text/javascript\"></script><div id=\"example-widget-container\"></div>";
		
		return View::make('leadbox.create_box',array('gen_code'=> TRUE, 'embed_code' =>$embed_code,'blog_id' => $blog_id, 'pdf_file'=> $file_name_received, 'blog_url'=> $url_received,'redirect_url'=> $redirect_url,'customer_id'=> $customer_id));
		
	}
	
	
	public function get_pdf($url)
	{
					$curl = curl_init();
					   
					// authentication token generated from postman

					  curl_setopt_array($curl, array(
					  CURLOPT_URL => "https://api.printfriendly.com/v1/pdfs/create?page_url=".$url,
					  CURLOPT_SSL_VERIFYPEER => false,
					  CURLOPT_RETURNTRANSFER => true,
					  CURLOPT_ENCODING => "",
					  CURLOPT_HEADER => 1,
					  CURLOPT_MAXREDIRS => 10,
					  CURLOPT_TIMEOUT => 300,
					  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
					  CURLOPT_CUSTOMREQUEST => "POST",
					  CURLOPT_HTTPHEADER => array(
						"authorization: Basic YjdhOTA2ZmMzZWM5OWE3NTEwY2Q5NmUxMzk1Mzc0NzY6",
						"cache-control: no-cache",
						"content-length :0", 
						),
					));
					
					$response = curl_exec($curl);
					$err = curl_error($curl);
					curl_close($curl);
					
					list($headers, $res) = explode("\r\n\r\n", $response, 2);
					$headers = explode("\n", $headers);
					
					foreach($headers as $header) {
						if (stripos($header, 'Location:') !== false) {
							
							$file_location = $header;
						}
					}
					
					if ($err) {
						  //$err_message = "cURL Error #:" . $err;
						  //echo $err_message;
						  return False;
						} 
					else {
						  $file_name = str_replace('Location: ','',$file_location);
						  
						 
						$trimmed_file_name = trim($file_name);
						$pdf_content =	file_get_contents($trimmed_file_name);
						
						$file_saved_name = 'saved_file_'.str_random(12).'.pdf';
						
						$saved_flag = file_put_contents('pdf_fluent/'.$file_saved_name,$pdf_content);
						
						return $file_saved_name;

						}
					
	}
 
}
?>