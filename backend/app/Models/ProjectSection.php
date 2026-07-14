<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectSection extends Model
{
    protected $guarded = [];

    protected $casts = [
        'stats' => 'array',
    ];
}
