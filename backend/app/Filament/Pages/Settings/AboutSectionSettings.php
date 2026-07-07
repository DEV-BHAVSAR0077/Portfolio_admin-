<?php

namespace App\Filament\Pages\Settings;

use Filament\Pages\Page;

class AboutSectionSettings extends Page
{
    protected static string|\UnitEnum|null $navigationGroup = 'About';
    protected string $view = 'filament.pages.settings.about-section-settings';
}
