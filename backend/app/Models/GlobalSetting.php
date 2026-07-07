<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GlobalSetting extends Model
{
    protected $guarded = [];
    
    protected $casts = [
        'social_media_links' => 'array',
        'open_graph_data' => 'array',
        'twitter_card_data' => 'array',
    ];
}
