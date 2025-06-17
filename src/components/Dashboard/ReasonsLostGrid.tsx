import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReasonLostItem {
  id: string;
  percentage: string;
  description: string;
}

const reasonsLostData: ReasonLostItem[] = [
  { id: 'proposalUnclear1', percentage: '40%', description: 'The proposal is unclear' },
  { id: 'venturePursuit', percentage: '20%', description: 'However venture pursuit' },
  { id: 'other', percentage: '10%', description: 'Other' },
  { id: 'proposalUnclear2', percentage: '30%', description: 'The proposal is unclear' }, // Using as per image, can be modified for clarity
];

interface ReasonsLostGridProps {
  className?: string;
}

const ReasonsLostGrid: React.FC<ReasonsLostGridProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {reasonsLostData.map((reason) => (
            <div key={reason.id} className="flex flex-col">
              <p className="text-3xl font-bold text-foreground">{reason.percentage}</p>
              <p className="text-sm text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReasonsLostGrid;
