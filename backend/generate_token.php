<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$u = App\Models\User::first() ?? App\Models\User::create(["name"=>"Admin", "email"=>"admin@admin.com", "password"=>bcrypt("password")]);
echo "TOKEN_RESULT:" . $u->createToken("nextjs")->plainTextToken . "\n";
