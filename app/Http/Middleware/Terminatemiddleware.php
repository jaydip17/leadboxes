<?php

namespace practise\Http\Middleware;

use Closure;

class Terminatemiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
   public function handle($request, Closure $next) {
      echo "First middleware";
      return $next($request);
   }
   
}
