<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::any('/','EmailController@get_iframe');


Route::any('/create_leadbox','AddLeadboxController@create_leadbox');
Route::post('/create_pdf',['as' => 'create_pdf', 'uses' => 'AddLeadboxController@create_pdf']);
Route::post('/get_leadbox_code',['as'=>'get_leadbox_code','uses'=>'AddLeadboxController@get_leadbox_code']);
Route::any('/pdf_test','AddLeadboxController@get_pdf');

Route::any('/emailtest',['as' => 'emailtest', 'uses' => 'EmailController@emailtest']);
Route::any('/iframe_test','EmailController@get_iframe');
Route::any('/jsonp/{Lboxid}','EmailController@jsonpFunction');

