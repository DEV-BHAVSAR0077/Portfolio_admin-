<?php

$map = [
    'app/Filament/Pages/Settings/HomePageSettings.php' => 'Home',
    'app/Filament/Pages/Settings/AboutSectionSettings.php' => 'About',
    'app/Filament/Resources/Education/EducationResource.php' => 'About',
    'app/Filament/Resources/Certificates/CertificateResource.php' => 'About',
    'app/Filament/Resources/Skills/SkillResource.php' => 'Skills',
    'app/Filament/Resources/Achievements/AchievementResource.php' => 'Skills',
    'app/Filament/Resources/Experiences/ExperienceResource.php' => 'Experience',
    'app/Filament/Resources/Projects/ProjectResource.php' => 'Project',
    'app/Filament/Resources/Blogs/BlogResource.php' => 'Project',
    'app/Filament/Resources/Services/ServiceResource.php' => 'Project',
    'app/Filament/Pages/Settings/GlobalSettings.php' => 'Contact',
    'app/Filament/Resources/SocialMedia/SocialMediaResource.php' => 'Contact',
    'app/Filament/Resources/Testimonials/TestimonialResource.php' => 'Contact',
];

foreach ($map as $file => $group) {
    $path = __DIR__ . '/' . $file;
    if (!file_exists($path)) {
        continue;
    }

    $content = file_get_contents($path);

    // Replace the specific type I injected earlier
    $content = str_replace(
        'protected static ?string $navigationGroup =',
        'protected static string|\UnitEnum|null $navigationGroup =',
        $content
    );

    file_put_contents($path, $content);
    echo "Fixed $file\n";
}
