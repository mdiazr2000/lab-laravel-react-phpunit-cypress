<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files_users', function (Blueprint $table) {
            $table->id();
            $table->string('name');


            $table->string('status');
            $table->integer('size');

            $table->string('saved_name');
            $table->string('path');

            $table->string('zip_name')->nullable();
            $table->string('path_zip')->nullable();

            $table->unsignedBigInteger('user_id')->index('FKaccounting409712');

            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files_users');
    }
}
