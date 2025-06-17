import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface StatItem {
  id: string;
  value: string;
  label: string;
  icon?: React.ElementType;
  tooltip?: string;
}

const statsData: StatItem[] = [
  { id: 'totalLeads', value: '900', label: 'total leads count' },
  {
    id: 'avgConversionTime',
    value: '12',
    label: 'days in average to convert lead',
  },
  {
    id: 'inactiveLeads',
    value: '30',
    label: 'inactive leads',
    icon: Info,
    tooltip: 'Leads with no activity in the last 30 days',
  },
];

interface StatsSummaryProps {
  className?: string;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Other data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="flex flex-col items-start">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  {IconComponent && stat.tooltip && (
                     <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0 text-muted-foreground hover:text-foreground">
                                    <IconComponent className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{stat.tooltip}</p>
                            </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsSummary;
