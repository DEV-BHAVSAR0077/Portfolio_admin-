<?php

namespace App\Filament\Pages\Settings;

use Filament\Pages\Page;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use App\Models\ProjectSection;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Tabs;
use Filament\Forms\Components\Repeater;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Schemas\Schema;

class ProjectSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-cog';
    protected static string | \UnitEnum | null $navigationGroup = 'Project';
    protected static ?string $navigationLabel = 'Project Settings';
    protected static ?string $title = 'Project Section Settings';
    protected static ?string $slug = 'project-settings';
    
    protected string $view = 'filament.pages.settings.home-page-settings';
    
    public ?array $data = [];
    
    public function mount(): void
    {
        $projectSection = ProjectSection::first();
        if ($projectSection) {
            $this->form->fill($projectSection->toArray());
        } else {
            $this->form->fill();
        }
    }
    
    public function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Tabs::make('ProjectSettingsTabs')
                    ->tabs([
                        Tabs\Tab::make('Header Settings')
                            ->schema([
                                Section::make('Section Header')
                                    ->description('Edit the title and subtitle of the Projects section.')
                                    ->schema([
                                        TextInput::make('title')
                                            ->label('Section Title')
                                            ->placeholder('e.g., Featured Work'),
                                        TextInput::make('subtitle')
                                            ->label('Section Subtitle')
                                            ->placeholder('e.g., A selection of my best projects...')
                                            ->maxLength(255)
                                            ->columnSpanFull(),
                                    ])
                            ]),
                        Tabs\Tab::make('Stats')
                            ->schema([
                                Section::make('Project Stats')
                                    ->description('Add numbers and details to display in the stats section.')
                                    ->schema([
                                        Repeater::make('stats')
                                            ->label('Statistics')
                                            ->schema([
                                                TextInput::make('number')
                                                    ->label('Number')
                                                    ->placeholder('e.g., 12+')
                                                    ->required(),
                                                TextInput::make('detail')
                                                    ->label('Detail')
                                                    ->placeholder('e.g., Awards Won')
                                                    ->required(),
                                            ])
                                            ->columns(2)
                                            ->defaultItems(4)
                                            ->addActionLabel('Add Stat')
                                            ->columnSpanFull(),
                                    ])
                            ]),
                    ])
                    ->columnSpanFull()
            ])
            ->statePath('data');
    }
    
    protected function getHeaderActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Changes')
                ->action('save')
                ->color('primary')
                ->keyBindings(['mod+s'])
        ];
    }
    
    public function save(): void
    {
        $data = $this->form->getState();
        
        $projectSection = ProjectSection::first();
        if ($projectSection) {
            $projectSection->update($data);
        } else {
            ProjectSection::create($data);
        }
        
        Notification::make()
            ->title('Saved successfully')
            ->success()
            ->send();
    }
}
