<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomePage extends Model
{
    protected $guarded = [];
    
    protected $casts = [
        'typing_text' => 'array',
        'hero_animation_settings' => 'array',
        'statistics' => 'array',
        'social_links' => 'array',
        'cta_buttons' => 'array',
        'available_for_hire' => 'boolean',
    ];
}
