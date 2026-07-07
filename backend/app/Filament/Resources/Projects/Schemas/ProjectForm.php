<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('thumbnail'),
                TextInput::make('gallery'),
                FileUpload::make('banner_image')
                    ->image(),
                Textarea::make('description')
                    ->columnSpanFull(),
                Textarea::make('problem_statement')
                    ->columnSpanFull(),
                Textarea::make('solution')
                    ->columnSpanFull(),
                TextInput::make('features'),
                TextInput::make('tech_stack'),
                TextInput::make('project_type'),
                TextInput::make('status'),
                TextInput::make('github_link'),
                TextInput::make('live_demo'),
                Toggle::make('is_featured')
                    ->required(),
                TextInput::make('seo_title'),
                Textarea::make('seo_description')
                    ->columnSpanFull(),
                TextInput::make('display_order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
