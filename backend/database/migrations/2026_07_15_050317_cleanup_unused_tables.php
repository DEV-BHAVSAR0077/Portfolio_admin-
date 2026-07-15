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
        Schema::dropIfExists('certificates');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('education');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('service_sections');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // For a cleanup migration, the down method is empty or recreates the tables.
        // We will leave it empty as the original tables are orphaned.
    }
};
