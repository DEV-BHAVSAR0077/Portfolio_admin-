<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $guarded = [];

    protected $casts = [
        'certificates' => 'array',
    ];

    protected static function booted()
    {
        static::saved(function ($skill) {
            \App\Models\SkillSection::syncFromSkills();
        });

        static::deleted(function ($skill) {
            \App\Models\SkillSection::syncFromSkills();
        });
    }
}
