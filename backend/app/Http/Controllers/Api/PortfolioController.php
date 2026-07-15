<?php

namespace App\Http\Controllers\Api;

use App\Models\HomePage;
use App\Models\AboutSection;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Service;
use App\Models\Achievement;
use App\Models\Blog;
use App\Models\SocialMedia;
use App\Models\GlobalSetting;

use App\Models\ExperienceSection;
use App\Models\ProjectSection;
use App\Models\SkillSection;
use App\Models\Inquiry;

class PortfolioController extends BaseController
{
    public function index()
    {
        $data = [
            'home' => HomePage::first(),
            'about' => AboutSection::first(),
            'skills' => Skill::where('is_active', true)->orderBy('display_order')->get(),
            'experience_section' => ExperienceSection::first(),
            'project_section' => ProjectSection::first(),
            'projects' => Project::orderBy('display_order')->get(),
            'services' => Service::where('is_active', true)->orderBy('display_order')->get(),
            'achievements' => Achievement::orderBy('display_order')->get(),
            'social_media' => SocialMedia::where('is_active', true)->orderBy('display_order')->get(),
            'settings' => GlobalSetting::first(),
            'skill_section' => SkillSection::first(),
        ];

        return $this->sendResponse($data, 'Portfolio data retrieved successfully.');
    }
    
    public function blogs()
    {
        $blogs = Blog::where('is_published', true)->orderBy('published_at', 'desc')->get();
        return $this->sendResponse($blogs, 'Blogs retrieved successfully.');
    }
    
    public function blog($slug)
    {
        $blog = Blog::where('slug', $slug)->where('is_published', true)->first();
        if (!$blog) return $this->sendError('Blog not found.');
        return $this->sendResponse($blog, 'Blog retrieved successfully.');
    }
    
    public function project($slug)
    {
        $project = Project::where('slug', $slug)->first();
        if (!$project) return $this->sendError('Project not found.');
        return $this->sendResponse($project, 'Project retrieved successfully.');
    }

    public function downloadResume()
    {
        $home = HomePage::first();
        if ($home && $home->resume) {
            $path = storage_path('app/public/' . $home->resume);
            if (file_exists($path)) {
                return response()->download($path, 'Resume.pdf');
            }
        }
        return response()->json(['error' => 'Resume not found'], 404);
    }

    public function submitInquiry(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $inquiry = Inquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'status' => 'new',
        ]);

        return $this->sendResponse($inquiry, 'Inquiry submitted successfully.');
    }
}
