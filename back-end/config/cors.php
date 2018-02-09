<?php
return [
  /*
  |--------------------------------------------------------------------------
  | Laravel CORS
  |--------------------------------------------------------------------------
  |
  | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
  | to accept any value.
  |
  */
 'allowedOrigins' => ['localhost'],
 'allowedHeaders' => ['Origin', 'Content-Type', 'Authorization'],
 'allowedMethods' => ['GET', 'POST', 'PUT',  'DELETE'],
];
