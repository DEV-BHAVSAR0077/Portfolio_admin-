<?php

namespace App\Filament\Pages\Settings;

use Filament\Pages\Page;

class GlobalSettings extends Page
{
    protected static string|\UnitEnum|null $navigationGroup = 'Contact';
    protected string $view = 'filament.pages.settings.global-settings';
}
