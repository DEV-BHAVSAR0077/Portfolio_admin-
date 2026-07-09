<?php

namespace App\Filament\Pages\Settings;

use Filament\Pages\Page;

class GlobalSettings extends Page
{
    protected static \UnitEnum|string|null $navigationGroup = 'Contact';
    protected string $view = 'filament.pages.settings.global-settings';
}
