<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$categories = [
    ['title' => 'Artificial Intelligence', 'skills' => ['Machine Learning', 'Generative AI', 'LLMs', 'Prompt Engineering', 'AI Agents', 'NLP', 'OpenAI API', 'Python']],
    ['title' => 'Full Stack', 'skills' => ['PHP', 'Laravel', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'REST APIs', 'JWT', 'MVC']],
    ['title' => 'Frontend', 'skills' => ['HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Responsive Design', 'Modern UI']],
    ['title' => 'Backend & Databases', 'skills' => ['Laravel', 'Node.js', 'MySQL', 'PostgreSQL', 'Database Design', 'Optimization']],
    ['title' => 'Cloud & DevOps', 'skills' => ['Git', 'GitHub', 'Linux', 'VPS', 'Cron Jobs', 'cPanel', 'Deployment']],
    ['title' => 'Mobile & UI/UX', 'skills' => ['Flutter', 'Android Basics', 'Figma', 'Canva', 'Wireframing', 'Design Systems']],
    ['title' => 'Software Engineering', 'skills' => ['OOP', 'Clean Code', 'Debugging', 'Performance Optimization', 'Architecture']],
    ['title' => 'Product & Soft Skills', 'skills' => ['Leadership', 'Communication', 'Problem Solving', 'Product Thinking', 'Requirement Analysis']]
];

echo "Syncing to skills...\n";
\App\Models\SkillSection::syncToSkills($categories);

echo "Syncing from skills...\n";
\App\Models\SkillSection::syncFromSkills();

echo "Done. Count: " . \App\Models\Skill::count() . "\n";
