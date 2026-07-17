<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Inquiries\InquiryResource;
use App\Models\Inquiry;
use Filament\Actions\Action;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables\Columns\TextColumn;

class RecentInquiriesWidget extends BaseWidget
{
    protected static ?int $sort = 2;
    
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Inquiry::query()->latest()->limit(5)
            )
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('subject')
                    ->searchable()
                    ->limit(50),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'danger',
                        'read' => 'warning',
                        'responded' => 'success',
                        default => 'gray',
                    }),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Date Received'),
            ])
            ->actions([
                Action::make('view')
                    ->url(fn (Inquiry $record): string => InquiryResource::getUrl('view', ['record' => $record]))
                    ->icon('heroicon-m-eye'),
            ])
            ->paginated(false);
    }
}
