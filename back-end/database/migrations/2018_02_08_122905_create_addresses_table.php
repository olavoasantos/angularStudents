<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('postal_code');
            $table->string('street', 120);
            $table->integer('number');
            $table->string('complement', 50);
            $table->string('neighborhood', 100);
            $table->string('city');
            $table->string('state');
            $table->timestamps();
            // Relacionamento com a tabela de estudantes
			$table->unsignedInteger('student_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addresses');
    }
}
