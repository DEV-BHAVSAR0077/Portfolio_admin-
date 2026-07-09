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

    // Replace ?string with \UnitEnum|string|null for $navigationGroup
    $content = preg_replace('/protected static \?string \$navigationGroup/', 'protected static \UnitEnum|string|null $navigationGroup', $content);
    // Replace ?string with \BackedEnum|string|null for $navigationIcon
    $content = preg_replace('/protected static \?string \$navigationIcon/', 'protected static \BackedEnum|string|null $navigationIcon', $content);

    if ($content !== $original) {
        file_put_contents($path, $content);
        echo "Fixed variance: $path\n";
    }
}
echo "Done.\n";
