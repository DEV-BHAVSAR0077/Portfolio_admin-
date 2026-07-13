<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

\App\Models\ProjectSection::firstOrCreate([], [
    'title' => 'Featured Work',
    'subtitle' => 'A selection of my best projects spanning AI, full-stack web, and mobile development.'
]);
echo "Seeded ProjectSection.";
