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
        Schema::create('global_settings', function (Blueprint $table) {
            $table->id();
            $table->string('website_title')->nullable();
            $table->string('website_logo')->nullable();
            $table->string('favicon')->nullable();
            $table->string('seo_meta_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->text('seo_keywords')->nullable();
            $table->json('social_media_links')->nullable();
            $table->string('google_analytics_code')->nullable();
            $table->string('google_search_console_verification')->nullable();
            $table->json('open_graph_data')->nullable();
            $table->json('twitter_card_data')->nullable();
            $table->text('footer_content')->nullable();
            $table->string('copyright')->nullable();
            $table->boolean('maintenance_mode')->default(false);
            $table->string('contact_email')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('location')->nullable();
            $table->string('resume_upload')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('global_settings');
    }
};
