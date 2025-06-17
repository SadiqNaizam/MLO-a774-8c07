import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

interface ChartDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: ChartDataPoint[] = [
  { month: 'March', closedWon: 85, closedLost: 68 },
  { month: 'April', closedWon: 60, closedLost: 35 },
  { month: 'May', closedWon: 95, closedLost: 70 },
  { month: 'June', closedWon: 65, closedLost: 5 },
  { month: 'July', closedWon: 80, closedLost: 45 },
  { month: 'August', closedWon: 55, closedLost: 90 },
];

const totalClosed = leadsTrackingData.reduce((sum, data) => sum + data.closedWon, 0);
const totalLost = leadsTrackingData.reduce((sum, data) => sum + data.closedLost, 0);

interface ChartCardProps {
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
        <div className="flex space-x-4 text-sm text-muted-foreground">
            <div><span className="text-2xl font-bold text-foreground">{totalClosed}</span> total closed</div>
            <div><span className="text-2xl font-bold text-foreground">{totalLost}</span> total lost</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#28A745" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#28A745" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC3545" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#DC3545" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="square"
                formatter={(value, entry) => <span className="text-muted-foreground">{value}</span>}
              />
              <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#28A745" fillOpacity={1} fill="url(#colorClosedWon)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#28A745' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#28A745' }} />
              <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#DC3545" fillOpacity={1} fill="url(#colorClosedLost)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#DC3545' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#DC3545' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
