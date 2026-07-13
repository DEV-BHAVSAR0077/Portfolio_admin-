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
                FileUpload::make('banner_image')
                    ->image()
                    ->disk('public')
                    ->directory('projects'),
                Textarea::make('description')
                    ->columnSpanFull(),
                Textarea::make('problem_statement')
                    ->columnSpanFull(),
                Textarea::make('solution')
                    ->columnSpanFull(),
                TextInput::make('tech_stack'),
                TextInput::make('project_type'),
                TextInput::make('github_link'),
                TextInput::make('live_demo'),
                TextInput::make('case_study_link'),
                Toggle::make('show_live_demo')->default(true),
                Toggle::make('show_github_link')->default(true),
                Toggle::make('show_case_study')->default(true),
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
