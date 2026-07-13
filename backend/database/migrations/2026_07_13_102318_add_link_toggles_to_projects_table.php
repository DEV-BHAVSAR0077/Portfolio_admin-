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
        Schema::table('projects', function (Blueprint $table) {
            $table->boolean('show_live_demo')->default(true);
            $table->boolean('show_github_link')->default(true);
            $table->boolean('show_case_study')->default(true);
            $table->string('case_study_link')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'show_live_demo',
                'show_github_link',
                'show_case_study',
                'case_study_link'
            ]);
        });
    }
};
