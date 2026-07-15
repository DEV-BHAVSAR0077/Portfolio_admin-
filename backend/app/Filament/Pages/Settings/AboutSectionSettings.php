<?php

namespace App\Filament\Pages\Settings;

use Filament\Pages\Page;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use App\Models\AboutSection;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Actions\Action;
use Filament\Notifications\Notification;

class AboutSectionSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static \UnitEnum|string|null $navigationGroup = 'About';
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-user';
    protected static ?string $navigationLabel = 'About Section Settings';
    protected string $view = 'filament.pages.settings.about-section-settings';
    
    public ?array $data = [];
    
    public function mount(): void
    {
        $aboutSection = AboutSection::first();
        if ($aboutSection) {
            $this->form->fill($aboutSection->toArray());
        }
    }
    
    public function form(\Filament\Schemas\Schema $form): \Filament\Schemas\Schema
    {
        return $form
            ->schema([
                Section::make('Dynamic About Cards')
                    ->description('Create, edit, and organize the cards shown in the About section. Icons are automatically generated based on the title.')
                    ->schema([
                        Repeater::make('about_cards')
                            ->label('About Cards')
                            ->schema([
                                TextInput::make('title')
                                    ->label('Card Title (e.g. Current Focus)')
                                    ->required()
                                    ->maxLength(255),
                                Select::make('type')
                                    ->label('Content Type')
                                    ->options([
                                        'text' => 'Plain Text',
                                        'bullets' => 'Bullet Points',
                                        'pills' => 'Pills / Tags',
                                    ])
                                    ->required()
                                    ->default('text')
                                    ->reactive(),
                                Select::make('width')
                                    ->label('Card Width')
                                    ->options([
                                        'full' => 'Full Width (spanning across)',
                                        'half' => 'Half Width (side by side)',
                                    ])
                                    ->default('half')
                                    ->required(),
                                Textarea::make('content_text')
                                    ->label('Text Content')
                                    ->rows(4)
                                    ->visible(fn ($get) => $get('type') === 'text')
                                    ->required(fn ($get) => $get('type') === 'text'),
                                Repeater::make('content_bullets')
                                    ->label('Bullet Points')
                                    ->simple(
                                        TextInput::make('text')->required()
                                    )
                                    ->visible(fn ($get) => $get('type') === 'bullets')
                                    ->required(fn ($get) => $get('type') === 'bullets'),
                                TagsInput::make('content_pills')
                                    ->label('Pills / Tags (press enter to add)')
                                    ->visible(fn ($get) => $get('type') === 'pills')
                                    ->required(fn ($get) => $get('type') === 'pills'),
                            ])
                            ->columns(1)
                            ->defaultItems(0)
                            ->reorderableWithButtons()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
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
        $aboutSection = AboutSection::first() ?? new AboutSection();
        $aboutSection->fill($data);
        $aboutSection->save();
        
        Notification::make()
            ->success()
            ->title('Settings saved')
            ->send();
    }
}
