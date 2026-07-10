<?php

namespace App\Filament\Pages\Settings;

use Filament\Pages\Page;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use App\Models\ExperienceSection;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Schemas\Schema;

class ExperienceSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-briefcase';
    protected static string | \UnitEnum | null $navigationGroup = 'Experience';
    protected static ?string $navigationLabel = 'Experiences';
    protected static ?string $title = 'Experience & Education Settings';
    protected static ?string $slug = 'experience-settings';
    
    protected string $view = 'filament.pages.settings.home-page-settings'; // Reusing the same view since it just renders the form
    
    public ?array $data = [];
    
    public function mount(): void
    {
        $experienceSection = ExperienceSection::first();
        if ($experienceSection) {
            $this->form->fill($experienceSection->toArray());
        }
    }
    
    public function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Section::make('Section Subtitle')
                    ->description('Update the subtitle for the Experience & Education section.')
                    ->schema([
                        TextInput::make('subtitle')
                            ->label('Subtitle')
                            ->default('My professional journey and academic background.')
                            ->maxLength(255),
                    ]),
                    
                Section::make('Timeline Items')
                    ->description('Add and manage your work experience and education history.')
                    ->schema([
                        Repeater::make('timeline_items')
                            ->label('Items')
                            ->schema([
                                Select::make('type')
                                    ->label('Category')
                                    ->options([
                                        'work' => 'Experience',
                                        'education' => 'Education',
                                    ])
                                    ->required(),
                                TextInput::make('title')
                                    ->label('Role / Degree')
                                    ->required()
                                    ->placeholder('e.g. Senior AI Engineer or B.S. Computer Science'),
                                TextInput::make('organization')
                                    ->label('Company / Institution')
                                    ->required()
                                    ->placeholder('e.g. Tech Corp or University of Tech'),
                                DatePicker::make('start_date')
                                    ->label('Start Date')
                                    ->displayFormat('M Y')
                                    ->native(false)
                                    ->required(),
                                DatePicker::make('end_date')
                                    ->label('End Date')
                                    ->displayFormat('M Y')
                                    ->native(false),
                                Toggle::make('is_current')
                                    ->label('Present / Currently Working Here'),
                                Textarea::make('description')
                                    ->label('Short Description')
                                    ->rows(4)
                                    ->required(),
                                Toggle::make('enable_modal')
                                    ->label('Enable Modal for this Item')
                                    ->default(false),
                                Toggle::make('show_media')
                                    ->label('Show Media in Modal')
                                    ->default(false),
                                RichEditor::make('details')
                                    ->label('Detailed Description')
                                    ->columnSpanFull(),
                                FileUpload::make('media')
                                    ->label('Media (Images/PDFs)')
                                    ->disk('public')
                                    ->directory('experience-media')
                                    ->multiple()
                                    ->acceptedFileTypes(['image/*', 'application/pdf'])
                                    ->columnSpanFull(),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
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
        $experienceSection = ExperienceSection::first() ?? new ExperienceSection();
        $experienceSection->fill($data);
        $experienceSection->save();
        
        Notification::make()
            ->success()
            ->title('Settings saved')
            ->send();
    }
}
