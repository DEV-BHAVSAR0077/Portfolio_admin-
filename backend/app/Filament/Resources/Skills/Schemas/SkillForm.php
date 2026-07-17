<?php

namespace App\Filament\Resources\Skills\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;

class SkillForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('category'),
                Select::make('color')
                    ->options([
                        'red' => 'Red',
                        'blue' => 'Blue',
                        'green' => 'Green',
                        'purple' => 'Purple',
                        'yellow' => 'Yellow',
                        'grey' => 'Grey',
                        'cyan' => 'Cyan',
                        'orange' => 'Orange',
                        'brown' => 'Brown',
                    ])
                    ->label('Pill Color'),
                FileUpload::make('certificates')
                    ->multiple()
                    ->acceptedFileTypes(['image/*', 'application/pdf'])
                    ->disk('public')
                    ->directory('skill-certificates')
                    ->label('Certificates')
                    ->columnSpanFull(),
                Textarea::make('description')
                    ->columnSpanFull(),
                Toggle::make('is_active')
                    ->required()
                    ->default(true),
            ]);
    }
}
