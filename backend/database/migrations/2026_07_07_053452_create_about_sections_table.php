<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('about_sections', function (Blueprint $table) {
            $table->id();
            $table->string('profile_image')->nullable();
            $table->text('biography')->nullable();
            $table->text('mission')->nullable();
            $table->text('vision')->nullable();
            $table->longText('journey')->nullable();
            $table->json('timeline')->nullable();
            $table->text('work_philosophy')->nullable();
            $table->text('current_focus')->nullable();
            $table->text('learning')->nullable();
            $table->json('personal_interests')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_sections');
    }
};
