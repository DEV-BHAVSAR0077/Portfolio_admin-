<?php

namespace App\Filament\Pages\Settings;

use Filament\Pages\Page;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
// use Filament\Forms\Form;
use App\Models\HomePage;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Actions\Action;
use Filament\Notifications\Notification;

class HomePageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static \UnitEnum|string|null $navigationGroup = 'Home';
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationLabel = 'Home Page Settings';
    protected string $view = 'filament.pages.settings.home-page-settings';
    
    public ?array $data = [];
    
    public function mount(): void
    {
        $homePage = HomePage::first();
        if ($homePage) {
            $this->form->fill($homePage->toArray());
        }
    }
    
    public function form(\Filament\Schemas\Schema $form): \Filament\Schemas\Schema
    {
        return $form
            ->schema([
                Section::make('Hero Text')
                    ->description('Update the main text shown at the top of your portfolio.')
                    ->schema([
                        TextInput::make('hero_title')
                            ->label('Hero Title')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('hero_subtitle')
                            ->label('Hero Subtitle')
                            ->required()
                            ->maxLength(255),
                        Textarea::make('hero_description')
                            ->label('Hero Description')
                            ->required()
                            ->rows(3)
                            ->maxLength(1000),
                    ])
                    ->columns(1),
                    
                Section::make('Availability Status')
                    ->schema([
                        Toggle::make('available_for_hire')
                            ->label('Available for new opportunities')
                            ->helperText('Turn on to show the green "Available" badge, turn off to show the yellow "Booking" badge.')
                            ->default(true),
                    ]),
                    
                Section::make('Footer Content')
                    ->description('Edit the text shown in the footer of your portfolio.')
                    ->schema([
                        Textarea::make('footer_description')
                            ->label('Footer Description')
                            ->placeholder('e.g., Building AI-Powered Applications, Intelligent Automations, and Scalable Full-Stack Products.')
                            ->rows(3)
                            ->maxLength(1000),
                    ]),
                    
                Section::make('Resume')
                    ->description('Upload your resume as a PDF file.')
                    ->schema([
                        FileUpload::make('resume')
                            ->label('Resume Document')
                            ->disk('public')
                            ->acceptedFileTypes(['application/pdf'])
                            ->directory('resumes')
                            ->preserveFilenames()
                            ->maxSize(5120), // 5MB max
                    ]),
                    
                Section::make('Social Links')
                    ->description('Add social media icons and links to the Hero section.')
                    ->schema([
                        Repeater::make('social_links')
                            ->label('Social Media Buttons')
                            ->schema([
                                TextInput::make('name')
                                    ->label('Name')
                                    ->placeholder('e.g. GitHub')
                                    ->required(),
                                Select::make('icon')
                                    ->label('Icon')
                                    ->options([
                                        'Terminal' => 'Terminal (e.g. GitHub)',
                                        'Briefcase' => 'Briefcase (e.g. LinkedIn)',
                                        'Hash' => 'Hash (e.g. Twitter/X)',
                                        'Mail' => 'Mail (e.g. Email)',
                                    ])
                                    ->required(),
                                TextInput::make('href')
                                    ->label('URL')
                                    ->required(),
                            ])
                            ->columns(3)
                            ->defaultItems(0)
                            ->reorderableWithButtons()
                            ->collapsible(),
                    ]),
                    
                Section::make('Statistics')
                    ->description('Add or edit the statistics shown below the Hero section.')
                    ->schema([
                        Repeater::make('statistics')
                            ->label('Stats Fields')
                            ->schema([
                                TextInput::make('value')
                                    ->label('Number/Value (e.g. 5+)')
                                    ->required(),
                                TextInput::make('label')
                                    ->label('Subtitle (e.g. Years Experience)')
                                    ->required(),
                            ])
                            ->columns(2)
                            ->defaultItems(4)
                            ->reorderableWithButtons()
                            ->collapsible(),
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
        $homePage = HomePage::first() ?? new HomePage();
        $homePage->fill($data);
        $homePage->save();
        
        Notification::make()
            ->success()
            ->title('Settings saved')
            ->send();
    }
}
