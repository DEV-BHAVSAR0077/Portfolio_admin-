<?php

$dir = __DIR__ . '/app/Filament';

$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));

foreach ($iterator as $file) {
    if ($file->isDir()) {
        continue;
    }

    $path = $file->getPathname();
    $content = file_get_contents($path);
    $original = $content;

    // Fix UnitEnum
    $content = str_replace('string|\UnitEnum|null', '?string', $content);
    
    // Fix Filament\Schemas\Schema -> Filament\Forms\Form
    $content = str_replace('Filament\Schemas\Schema', 'Filament\Forms\Form', $content);
    $content = str_replace('Filament\Schemas\Components', 'Filament\Forms\Components', $content);
    
    // Fix AchievementForm.php, etc: `public static function configure(Schema $schema): Schema` -> `public static function configure(Form $form): Form`
    $content = str_replace('public static function configure(Schema $schema): Schema', 'public static function configure(Form $form): Form', $content);
    $content = str_replace('use Filament\Schemas\Schema;', 'use Filament\Forms\Form;', $content);
    $content = str_replace('Schema $schema', 'Form $form', $content);
    $content = preg_replace('/function form\(Schema \$/', 'function form(Form $', $content);
    $content = preg_replace('/: Schema/', ': Form', $content);
    $content = preg_replace('/\$schema->components\(/', '$form->schema(', $content);
    
    // Specifically for HomePageSettings.php
    $content = str_replace('\Filament\Schemas\Schema $form', '\Filament\Forms\Form $form', $content);
    $content = str_replace(': \Filament\Schemas\Schema', ': \Filament\Forms\Form', $content);

    if ($content !== $original) {
        file_put_contents($path, $content);
        echo "Fixed: $path\n";
    }
}
echo "Done.\n";
