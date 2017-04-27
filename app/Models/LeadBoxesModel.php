<?php

namespace practise\Models;
use DB;
use Illuminate\Database\Eloquent\Model;

class LeadBoxesModel extends Model
{
	protected $primaryKey = 'lead_box_id';
    protected $table = 'leadboxes';
	protected $fillable = array('blog_id', 'include_file', 'blog_url','redirect_url','customer_id');

	
} ?>
