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
}
