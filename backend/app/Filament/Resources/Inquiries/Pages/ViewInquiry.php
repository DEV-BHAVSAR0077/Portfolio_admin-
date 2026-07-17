<?php

namespace App\Filament\Resources\Inquiries\Pages;

use App\Filament\Resources\Inquiries\InquiryResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;
use Filament\Actions\Action;

class ViewInquiry extends ViewRecord
{
    protected static string $resource = InquiryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('back')
                ->label('Back')
                ->url(fn () => url()->previous() !== url()->current() ? url()->previous() : InquiryResource::getUrl('index'))
                ->color('gray')
                ->icon('heroicon-m-arrow-left'),
            EditAction::make(),
        ];
    }

    public function mount(int | string $record): void
    {
        parent::mount($record);

        if ($this->record->status === 'new') {
            $this->record->update(['status' => 'read']);
        }
    }
}
