<?php

namespace practise\Http\Middleware;

use Closure;

class Rolemiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
  public function handle($request, Closure $next) {
      echo "Second middleware";
      return $next($request);
   }
}
