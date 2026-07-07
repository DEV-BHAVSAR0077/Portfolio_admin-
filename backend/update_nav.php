<?php

$map = [
    'app/Filament/Resources/Education/EducationResource.php' => 'About',
    'app/Filament/Resources/Certificates/CertificateResource.php' => 'About',
    'app/Filament/Resources/Skills/SkillResource.php' => 'Skills',
    'app/Filament/Resources/Achievements/AchievementResource.php' => 'Skills',
    'app/Filament/Resources/Experiences/ExperienceResource.php' => 'Experience',
    'app/Filament/Resources/Projects/ProjectResource.php' => 'Project',
    'app/Filament/Resources/Blogs/BlogResource.php' => 'Project',
    'app/Filament/Resources/Services/ServiceResource.php' => 'Project',
    'app/Filament/Resources/SocialMedia/SocialMediaResource.php' => 'Contact',
    'app/Filament/Resources/Testimonials/TestimonialResource.php' => 'Contact',
];

foreach ($map as $file => $group) {
    $path = __DIR__ . '/' . $file;
    if (!file_exists($path)) {
        echo "File not found: $path\n";
        continue;
    }

    $content = file_get_contents($path);

    // If already has navigationGroup, replace it
    if (preg_match('/protected static \?string \$navigationGroup = \'.*?\';/', $content)) {
        $content = preg_replace('/protected static \?string \$navigationGroup = \'.*?\';/', "protected static ?string \$navigationGroup = '$group';", $content);
    } else {
        // Insert after navigationIcon
        if (preg_match('/protected static \?string \$navigationIcon = \'(.*?)\';/', $content, $matches)) {
            $content = str_replace($matches[0], $matches[0] . "\n\n    protected static ?string \$navigationGroup = '$group';", $content);
        } else {
            // Insert after class declaration
            $content = preg_replace('/(class \w+ extends \w+\n\{)/', "$1\n    protected static ?string \$navigationGroup = '$group';", $content);
        }
    }

    file_put_contents($path, $content);
    echo "Updated $file\n";
}
