<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HomePage;
use App\Models\AboutSection;
use App\Models\Skill;
use App\Models\Project;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        HomePage::truncate();
        HomePage::create([
            'hero_title' => "Hi, I'm Dev Bhavsar",
            'hero_subtitle' => 'AI/ML Engineer',
            'hero_description' => 'Building AI-Powered Applications, Intelligent Automations, and Scalable Full-Stack Products.',
            'statistics' => [
                ['label' => 'Years Experience', 'value' => '5+'],
                ['label' => 'Projects Completed', 'value' => '40+'],
                ['label' => 'Happy Clients', 'value' => '25+'],
                ['label' => 'Technologies', 'value' => '15+'],
            ],
            'social_links' => [
                ['icon' => 'Terminal', 'href' => 'https://github.com/devbhavsar0077'],
                ['icon' => 'Briefcase', 'href' => 'https://linkedin.com/in/devbhavsar'],
                ['icon' => 'Hash', 'href' => 'https://twitter.com/devbhavsar'],
                ['icon' => 'Mail', 'href' => 'mailto:devbhavsar.ds@gmail.com'],
            ],
            'resume' => '/resume.pdf'
        ]);

        AboutSection::truncate();
        AboutSection::create([
            'biography' => 'I am an AI/ML Engineer and Full Stack Developer passionate about creating intelligent software that solves real-world problems. I specialize in AI-powered applications, SaaS platforms, automation systems, and scalable web technologies. I enjoy transforming ideas into production-ready products with beautiful user experiences.',
            'mission' => 'To democratize access to powerful AI tools by building intuitive interfaces, and to envision a future where intelligent automation empowers human creativity.',
            'work_philosophy' => 'Clean code, user-centric design, and continuous learning. I believe the best products emerge from a deep empathy for the end-user.',
            'current_focus' => json_encode([
                'Architecting scalable LLM applications',
                'Optimizing Full-Stack SaaS platforms',
                'Building intelligent automation agents',
                'Refining modern UI/UX design systems'
            ]),
            'learning' => json_encode([
                'Advanced RAG Techniques & Vector DBs',
                'Three.js & WebGL for immersive web',
                'Distributed Systems & Cloud Architecture',
                'Generative UI with AI Models'
            ]),
            'personal_interests' => ['Open Source', 'Hackathons', 'Writing Tech Blogs', 'Sci-Fi Books', 'UI Design']
        ]);

        Skill::truncate();
        $skillCategories = [
            ['title' => 'Artificial Intelligence', 'skills' => ['Machine Learning', 'Generative AI', 'LLMs', 'Prompt Engineering', 'AI Agents', 'NLP', 'OpenAI API', 'Python']],
            ['title' => 'Full Stack', 'skills' => ['PHP', 'Laravel', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'REST APIs', 'JWT', 'MVC']],
            ['title' => 'Frontend', 'skills' => ['HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Responsive Design', 'Modern UI']],
            ['title' => 'Backend & Databases', 'skills' => ['Laravel', 'Node.js', 'MySQL', 'PostgreSQL', 'Database Design', 'Optimization']],
            ['title' => 'Cloud & DevOps', 'skills' => ['Git', 'GitHub', 'Linux', 'VPS', 'Cron Jobs', 'cPanel', 'Deployment']],
            ['title' => 'Mobile & UI/UX', 'skills' => ['Flutter', 'Android Basics', 'Figma', 'Canva', 'Wireframing', 'Design Systems']],
            ['title' => 'Software Engineering', 'skills' => ['OOP', 'Clean Code', 'Debugging', 'Performance Optimization', 'Architecture']],
            ['title' => 'Product & Soft Skills', 'skills' => ['Leadership', 'Communication', 'Problem Solving', 'Product Thinking', 'Requirement Analysis']],
        ];
        $order = 0;
        foreach ($skillCategories as $category) {
            foreach ($category['skills'] as $skillName) {
                Skill::create([
                    'category' => $category['title'],
                    'name' => $skillName,
                    'display_order' => $order++,
                    'is_active' => true,
                    'percentage' => 90
                ]);
            }
        }
        
        Project::truncate();
        Project::create([
            'name' => 'Dinely - Restaurant SaaS Platform',
            'slug' => 'dinely',
            'project_type' => 'Full Stack SaaS',
            'description' => 'A comprehensive restaurant management system that streamlines operations, from digital QR menus to billing and analytics.',
            'problem_statement' => 'Restaurants struggle with fragmented systems for menus, orders, billing, and analytics, leading to inefficiencies.',
            'solution' => 'An all-in-one scalable platform that unifies operations into a single intuitive dashboard.',
            'features' => ['Dynamic QR Menu', 'Real-time Order Management', 'Automated Billing', 'Advanced Analytics', 'Multi-tenant Architecture'],
            'tech_stack' => ['Next.js', 'Laravel', 'MySQL', 'Tailwind CSS', 'WebSockets'],
            'is_featured' => true,
            'display_order' => 0
        ]);
        
        $otherProjects = [
            [
                'title' => 'AI Automation Agent',
                'category' => 'Artificial Intelligence',
                'description' => 'An autonomous agent that handles customer inquiries and triggers workflows based on intent classification.',
                'technologies' => ['Python', 'LangChain', 'OpenAI API', 'FastAPI'],
            ],
            [
                'title' => 'E-Commerce Mobile App',
                'category' => 'Flutter Development',
                'description' => 'A cross-platform mobile application for seamless online shopping with integrated payment gateways.',
                'technologies' => ['Flutter', 'Dart', 'Firebase', 'Stripe'],
            ],
            [
                'title' => 'Financial Dashboard',
                'category' => 'React / Dashboard',
                'description' => 'A real-time analytics dashboard visualizing financial data with interactive charts and reports.',
                'technologies' => ['React', 'TypeScript', 'Recharts', 'Node.js'],
            ],
            [
                'title' => 'Booking System',
                'category' => 'Laravel Application',
                'description' => 'A robust appointment booking and scheduling system with email reminders and calendar integrations.',
                'technologies' => ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS'],
            ]
        ];
        
        foreach ($otherProjects as $index => $project) {
            Project::create([
                'name' => $project['title'],
                'slug' => 'project-' . $index,
                'project_type' => $project['category'],
                'description' => $project['description'],
                'tech_stack' => $project['technologies'],
                'display_order' => $index + 1
            ]);
        }
    }
}
