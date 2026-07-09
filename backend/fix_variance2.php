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

    // The parent uses UnitEnum|string|null
    $content = str_replace('string|\UnitEnum|null', '\UnitEnum|string|null', $content);
    $content = str_replace('string|BackedEnum|null', '\BackedEnum|string|null', $content);

    if ($content !== $original) {
        file_put_contents($path, $content);
        echo "Fixed variance: $path\n";
    }
}
echo "Done.\n";
