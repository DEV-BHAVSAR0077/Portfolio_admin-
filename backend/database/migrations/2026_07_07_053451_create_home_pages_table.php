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
        Schema::create('home_pages', function (Blueprint $table) {
            $table->id();
            $table->string('hero_title')->nullable();
            $table->string('hero_subtitle')->nullable();
            $table->json('typing_text')->nullable();
            $table->text('hero_description')->nullable();
            $table->string('profile_photo')->nullable();
            $table->string('bg_image')->nullable();
            $table->json('hero_animation_settings')->nullable();
            $table->json('statistics')->nullable();
            $table->string('resume')->nullable();
            $table->json('social_links')->nullable();
            $table->json('cta_buttons')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_pages');
    }
};
