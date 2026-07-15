<?php

namespace App\Filament\Widgets;

use App\Models\Blog;
use App\Models\Inquiry;
use App\Models\Project;
use App\Models\Skill;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStatsWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $newInquiriesCount = Inquiry::where('status', 'new')->count();
        
        $inquiriesStat = Stat::make('New Inquiries', $newInquiriesCount)
            ->icon('heroicon-o-envelope');
            
        if ($newInquiriesCount > 0) {
            $inquiriesStat->description($newInquiriesCount . ' unread message(s)')
                ->descriptionIcon('heroicon-m-exclamation-circle')
                ->color('danger');
        } else {
            $inquiriesStat->description('All caught up')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success');
        }

        return [
            $inquiriesStat,
            Stat::make('Published Blogs', Blog::where('is_published', true)->count())
                ->description('Active posts on the site')
                ->descriptionIcon('heroicon-m-document-text')
                ->icon('heroicon-o-document-text')
                ->color('primary'),
            Stat::make('Total Projects', Project::count())
                ->description('Showcased in portfolio')
                ->descriptionIcon('heroicon-m-folder-open')
                ->icon('heroicon-o-folder-open')
                ->color('success'),
            Stat::make('Total Skills', Skill::count())
                ->description('Technical skills listed')
                ->descriptionIcon('heroicon-m-wrench')
                ->icon('heroicon-o-wrench')
                ->color('info'),
        ];
    }
}
