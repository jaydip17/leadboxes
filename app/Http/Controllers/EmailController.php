<?php

namespace practise\Http\Controllers; 
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use practise\Http\Requests;
use practise\Http\Controllers\Controller;

use View;
use Mail;
use practise\Models\LeadBoxesModel;
use practise\Models\SubscribersModel;
use Illuminate\Support\Facades\Input;
use Newsletter;

class EmailController extends Controller
{
	// Editors specific events and operations
	
 
	public function get_iframe() {
		
			return View::make('blog.test_iframe');

	}
	
	public function jsonpFunction(Request $request,$Lboxid) {
		
		
		return response()->json(array('body' => View::make('popup.test_blog',array('Lboxid'=>$Lboxid))->render(), 'title' => 'My Title', 'Lboxid' =>$Lboxid ))
		->setCallback($request->input('callback'));


	}
	
	public function emailtest(Request $request) {
		
			$to_address = $request->input('user_email');
			$Lboxid = $request->input('Lboxid');
			$internalErrors = libxml_use_internal_errors(true);
			
			if(isset($to_address)) {
				
										
					$leadBoxes = new LeadBoxesModel();
					$current_leadbox_info = $leadBoxes::where('lead_box_id', '=', $Lboxid)->firstOrFail();
					
						Mail::send('emails.email_test', array('template'=>"Thank you for your order!",'current_leadbox_info'=>$current_leadbox_info), function($message) use ($to_address,$current_leadbox_info){
								$message->to($to_address)->subject('Alan from FluentU')->attach('pdf_fluent/'.$current_leadbox_info->include_file);
						});
					
					$subscribermodel = new SubscribersModel();
						
					$return_data = $subscribermodel::create(array('email_address' => $to_address, 'login_box_id'=> $Lboxid,'mail_status'=> "Mail Sent"));
						
						Newsletter::subscribe($to_address,'','Site_common');
			
						// check for ssl cert. issue if on local development for various network calls
						
					return view::make('blog.thank_you',array('return_url'=>"#",'current_leadbox_info'=>$current_leadbox_info));
					
				}
				else
				{
					echo "Please enter email address";
					 
				}
				
			}
			
}
?>