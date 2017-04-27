<?php

namespace practise\Models;
use DB;
use Illuminate\Database\Eloquent\Model;

class SubscribersModel extends Model
{
    //
	protected $primaryKey = 'sub_id';
    protected $table = 'subscribers';
	protected $fillable = array('email_address', 'login_box_id', 'mail_status','time_stmap');

}
?>