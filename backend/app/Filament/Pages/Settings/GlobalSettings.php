<?php

namespace App\Filament\Pages\Settings;

use Filament\Pages\Page;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use App\Models\GlobalSetting;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Actions\Action;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Notifications\Notification;
use Filament\Schemas\Schema;

class GlobalSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static \UnitEnum|string|null $navigationGroup = 'Contact';
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-globe-alt';
    protected static ?string $navigationLabel = 'Global Settings';
    protected string $view = 'filament.pages.settings.home-page-settings'; // using default view to render form
    
    public ?array $data = [];
    
    public function mount(): void
    {
        $globalSetting = GlobalSetting::first();
        if ($globalSetting) {
            $this->form->fill($globalSetting->toArray());
        } else {
            $this->form->fill();
        }
    }
    
    public function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Contact Settings')
                    ->description('Edit the global contact settings.')
                    ->schema([
                        TextInput::make('contact_subtitle')
                            ->label('Contact Subtitle')
                            ->placeholder('e.g., Have a project in mind or looking for technical consultation?')
                            ->columnSpanFull(),
                    ]),
                
                Section::make('Contact Information')
                    ->description('Edit the content displayed in the Contact Information section.')
                    ->schema([
                        Toggle::make('is_available')
                            ->label('Available for Hire')
                            ->default(true)
                            ->columnSpanFull(),
                        Textarea::make('contact_info_text')
                            ->label('Contact Info Description')
                            ->placeholder("e.g., I'm currently open for new opportunities...")
                            ->columnSpanFull(),
                        TextInput::make('contact_email')
                            ->label('Email Address')
                            ->email(),
                        TextInput::make('phone_number')
                            ->label('Phone Number')
                            ->tel(),
                        TextInput::make('location')
                            ->label('Location'),
                        TextInput::make('availability_status')
                            ->label('Availability Status')
                            ->placeholder('e.g., Available for hire'),
                    ])->columns(2)
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
        
        $globalSetting = GlobalSetting::first();
        if ($globalSetting) {
            $globalSetting->update($data);
        } else {
            GlobalSetting::create($data);
        }
        
        Notification::make()
            ->title('Saved successfully')
            ->success()
            ->send();
    }
}
