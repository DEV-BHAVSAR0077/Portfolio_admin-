<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExperienceSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'subtitle',
        'timeline_items',
    ];

    protected $casts = [
        'timeline_items' => 'array',
    ];
}
