<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/students', 'StudentController@index');           // Lista todos os estudantes
$router->post('/students', 'StudentController@store');          // Cria um novo estudante
$router->patch('/students/{id}', 'StudentController@update');   // Atualiza um estudante com id {id}
$router->delete('/students/{id}', 'StudentController@destroy'); // Remove um estudante com um id {id}
