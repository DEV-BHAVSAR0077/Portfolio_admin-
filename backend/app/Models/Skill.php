<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\SkillSection;

class Skill extends Model
{
    protected $guarded = [];

    protected $casts = [
        'certificates' => 'array',
    ];

    protected static function booted()
    {
        static::saved(function ($skill) {
            SkillSection::syncFromSkills();
        });

        static::deleted(function ($skill) {
            SkillSection::syncFromSkills();
        });
    }
}
