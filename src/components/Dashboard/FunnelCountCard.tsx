import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  days: number;
  color: string; // Tailwind color class e.g., 'bg-red-500'
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, days: 2, color: 'bg-red-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, days: 2, color: 'bg-yellow-400' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, days: 0, color: 'bg-indigo-500' }, // days 'average time on this stage' from image, so 0 can be placeholder
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, days: 8, color: 'bg-green-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, days: 10, color: 'bg-purple-500' },
];

const totalActiveLeads = funnelData.reduce((sum, stage) => sum + stage.count, 0);

interface FunnelCountCardProps {
  className?: string;
}

const FunnelCountCard: React.FC<FunnelCountCardProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold text-foreground">{totalActiveLeads}</span>
          <span className="ml-2 text-muted-foreground">active leads</span>
        </div>

        <div className="mb-6 h-3 flex rounded-full overflow-hidden">
          {funnelData.map((stage) => (
            <TooltipProvider key={stage.id}>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div
                    className={cn('h-full', stage.color)}
                    style={{ width: `${(stage.count / totalActiveLeads) * 100}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.count}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="space-y-3">
          {funnelData.map((stage) => (
            <div key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
              <div className={cn('w-3 h-3 rounded-sm', stage.color)} />
              <div className="text-foreground truncate">{stage.name}</div>
              <div className="text-muted-foreground justify-self-end font-medium">{stage.count}</div>
              <div className="text-muted-foreground justify-self-end">$ {stage.value}</div>
              <div className="text-muted-foreground justify-self-end">
                {stage.id === 'inConversation' ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="cursor-default">{stage.days > 0 ? `${stage.days} days` : '2 days'}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>average time on this stage</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span>{stage.days > 0 ? `${stage.days} days` : '-'}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelCountCard;
