<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkillSection extends Model
{
    protected $fillable = [
        'subtitle',
        'cards',
    ];

    protected $casts = [
        'cards' => 'array',
    ];

    public static function syncFromSkills()
    {
        $section = self::first();
        if (!$section) {
            $section = self::create([]);
        }

        $skills = \App\Models\Skill::orderBy('display_order')->get();
        $grouped = [];
        foreach ($skills as $skill) {
            $cat = $skill->category ?: 'Other';
            if (!isset($grouped[$cat])) {
                $grouped[$cat] = [];
            }
            $grouped[$cat][] = $skill->name;
        }

        $existingCards = $section->cards ?? [];
        $newCards = [];

        // Preserve order of existing categories
        foreach ($existingCards as $card) {
            $cat = $card['title'] ?? '';
            if ($cat && isset($grouped[$cat])) {
                $newCards[] = [
                    'title' => $cat,
                    'skills' => $grouped[$cat]
                ];
                unset($grouped[$cat]);
            }
        }

        // Add any new categories at the end
        foreach ($grouped as $cat => $catSkills) {
            if ($cat) {
                $newCards[] = [
                    'title' => $cat,
                    'skills' => $catSkills
                ];
            }
        }

        $section->cards = $newCards;
        $section->saveQuietly();
    }

    public static function syncToSkills($cards)
    {
        if (!is_array($cards)) {
            $cards = [];
        }

        $activeIds = [];
        $order = 0;
        foreach ($cards as $card) {
            $category = $card['title'] ?? '';
            $skills = $card['skills'] ?? [];
            
            if (!$category) continue;

            foreach ($skills as $skillName) {
                $skill = \App\Models\Skill::firstOrCreate([
                    'name' => $skillName,
                    'category' => $category,
                ]);
                $skill->display_order = $order++;
                $skill->is_active = true;
                $skill->saveQuietly(); 
                
                $activeIds[] = $skill->id;
            }
        }
        
        \App\Models\Skill::whereNotIn('id', $activeIds)->delete();
    }
}
