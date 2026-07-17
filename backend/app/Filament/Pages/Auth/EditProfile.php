<?php

namespace App\Filament\Pages\Auth;

use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;
use Filament\Auth\Pages\EditProfile as BaseEditProfile;
use Filament\Actions\Action;

class EditProfile extends BaseEditProfile
{
    public function backAction(): Action
    {
        return parent::backAction()->label('Back');
    }

    protected function getHeaderActions(): array
    {
        return [
            $this->backAction(),
        ];
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([

                $this->getNameFormComponent(),
                $this->getEmailFormComponent(),
                $this->getPasswordFormComponent(),
                $this->getPasswordConfirmationFormComponent(),
            ]);
    }
}
