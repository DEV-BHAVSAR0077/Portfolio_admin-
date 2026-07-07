<?php

namespace App\Filament\Resources\Experiences\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ExperienceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('company')
                    ->required(),
                TextInput::make('role')
                    ->required(),
                TextInput::make('duration'),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('technologies'),
                TextInput::make('achievements'),
                TextInput::make('company_logo'),
                TextInput::make('location'),
                Toggle::make('is_current')
                    ->required(),
                TextInput::make('display_order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
