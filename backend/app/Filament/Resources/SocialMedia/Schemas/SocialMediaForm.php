<?php

namespace App\Filament\Resources\SocialMedia\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SocialMediaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('platform')
                    ->required(),
                TextInput::make('url')
                    ->required(),
                TextInput::make('icon'),
                TextInput::make('color'),
                TextInput::make('display_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
