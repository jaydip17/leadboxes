<?php
namespace Tests;

use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PdfTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
	 
    public function testItFetchesPosts()
    {
         $crawler = $this->client->request('GET', '/');
        $this->assertTrue($this->client->getResponse()->isOk());	
			 
    }
}
