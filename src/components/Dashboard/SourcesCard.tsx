import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip as ShadTooltip,
  TooltipContent as ShadTooltipContent,
  TooltipProvider as ShadTooltipProvider,
  TooltipTrigger as ShadTooltipTrigger,
} from "@/components/ui/tooltip"

interface SourceData {
  name: string;
  leadsCame: number;
  leadsConverted: number;
  totalDealsSize: number;
  color: string; // Hex color for chart
}

type TabKey = 'leadsCame' | 'leadsConverted' | 'totalDealsSize';

const sourcesData: SourceData[] = [
  { name: 'Clutch', leadsCame: 500, leadsConverted: 150, totalDealsSize: 3000, color: '#EF4444' }, // red-500
  { name: 'Behance', leadsCame: 400, leadsConverted: 100, totalDealsSize: 1000, color: '#F59E0B' }, // amber-500
  { name: 'Instagram', leadsCame: 100, leadsConverted: 20, totalDealsSize: 1000, color: '#14B8A6' }, // teal-500
  { name: 'Dribbble', leadsCame: 100, leadsConverted: 30, totalDealsSize: 1000, color: '#22C55E' }, // green-500
];

interface SourcesCardProps {
  className?: string;
}

const SourcesCard: React.FC<SourcesCardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('leadsConverted');

  const chartData = sourcesData.map(source => ({ 
    name: source.name, 
    value: source[activeTab],
    color: source.color 
  }));
  const totalValueForTab = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-2 border border-border rounded-md shadow-lg">
          <p className="text-sm text-foreground">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">Sources</CardTitle>
        {/* Date range could be here, but it's in TopHeader */} 
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as TabKey)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="leadsCame">Leads came</TabsTrigger>
            <TabsTrigger value="leadsConverted">Leads Converted</TabsTrigger>
            <TabsTrigger value="totalDealsSize">Total deals size</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-[200px] w-full md:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={50} // For Donut chart
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {sourcesData.map((source) => {
                  const value = source[activeTab];
                  const percentage = totalValueForTab > 0 ? ((value / totalValueForTab) * 100).toFixed(0) : 0;
                  return (
                    <div key={source.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <span style={{ backgroundColor: source.color }} className="w-3 h-3 rounded-sm mr-2"></span>
                        <span className="text-foreground">{source.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {activeTab === 'totalDealsSize' && <span className="text-muted-foreground">$ {value}</span>}
                        {activeTab !== 'totalDealsSize' && <span className="text-muted-foreground">{value}</span>}
                        <Badge variant="secondary" className="w-12 justify-center">{percentage}%</Badge>
                        {source.name === 'Dribbble' && activeTab === 'leadsConverted' && (
                          <ShadTooltipProvider>
                            <ShadTooltip delayDuration={100}>
                              <ShadTooltipTrigger asChild>
                                <span className="text-xs text-muted-foreground cursor-default">(from leads total)</span>
                              </ShadTooltipTrigger>
                              <ShadTooltipContent>
                                <p>This percentage is based on the total leads.</p>
                              </ShadTooltipContent>
                            </ShadTooltip>
                          </ShadTooltipProvider>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SourcesCard;
