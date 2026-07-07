<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $guarded = [];
    
    protected $casts = [
        'technologies' => 'array',
        'achievements' => 'array',
        'is_current' => 'boolean',
    ];
}
