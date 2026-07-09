<?php

namespace App\Filament\Pages\Settings;

use Filament\Pages\Page;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use App\Models\SkillSection;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Repeater;
use Filament\Actions\Action;
use Filament\Notifications\Notification;

class SkillSectionSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static \UnitEnum|string|null $navigationGroup = 'Skills';
    protected static ?string $title = 'Technical Section';
    protected string $view = 'filament.pages.settings.skill-section-settings';
    
    public ?array $data = [];
    
    public function mount(): void
    {
        $skillSection = SkillSection::first();
        if ($skillSection) {
            $this->form->fill($skillSection->toArray());
        }
    }
    
    public function form(\Filament\Schemas\Schema $form): \Filament\Schemas\Schema
    {
        return $form
            ->schema([
                Section::make('Technical Section Subtitle')
                    ->description('Modify the subtitle for the technical skills section.')
                    ->schema([
                        Textarea::make('subtitle')
                            ->label('Subtitle')
                            ->rows(3)
                            ->maxLength(500),
                    ]),
                Section::make('Skill Cards')
                    ->description('Manage the skill categories and pills displayed in this section.')
                    ->schema([
                        Repeater::make('cards')
                            ->label('Skill Cards')
                            ->schema([
                                TextInput::make('title')
                                    ->label('Card Title (e.g. Frontend)')
                                    ->required()
                                    ->maxLength(255),
                                TagsInput::make('skills')
                                    ->label('Skills (Pills)')
                                    ->placeholder('Type a skill and press Enter')
                                    ->required(),
                            ])
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                            ->defaultItems(1),
                    ]),
            ])
            ->statePath('data');
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Changes')
                ->action('save')
                ->color('primary'),
        ];
    }
    
    public function save(): void
    {
        $data = $this->form->getState();
        
        $skillSection = SkillSection::first();
        
        if ($skillSection) {
            $skillSection->update($data);
        } else {
            SkillSection::create($data);
        }
        
        Notification::make()
            ->title('Saved successfully')
            ->success()
            ->send();
    }
}
