import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import FunnelCountCard from '@/components/Dashboard/FunnelCountCard';
import SourcesCard from '@/components/Dashboard/SourcesCard';
import ChartCard from '@/components/Dashboard/ChartCard';
import ReasonsLostGrid from '@/components/Dashboard/ReasonsLostGrid';
import StatsSummary from '@/components/Dashboard/StatsSummary';

/**
 * IndexPage serves as the main dashboard overview page.
 * It utilizes MainAppLayout to provide the overall structure (sidebar, header)
 * and arranges various dashboard organism components within the main content area.
 * The layout of these organisms is responsive, adapting to screen sizes based on
 * Tailwind CSS classes managed by MainAppLayout and specific components.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard Overview">
      {/* 
        The MainAppLayout's children are placed into a CSS grid container 
        that is `grid-cols-1 lg:grid-cols-2 gap-6`.
        Components will flow into this grid. 
        - FunnelCountCard will take the first column on large screens.
        - SourcesCard will take the second column on large screens.
        - ChartCard is explicitly set to span two columns on large screens.
        - ReasonsLostGrid will take the first column in the next row on large screens.
        - StatsSummary will take the second column in the next row on large screens.
        On smaller screens (less than lg breakpoint), they will stack in a single column.
      */}

      {/* Row 1 */}
      <FunnelCountCard />
      <SourcesCard />

      {/* Row 2 - ChartCard spans full width on large screens */}
      <ChartCard className="lg:col-span-2" />

      {/* Row 3 */}
      <ReasonsLostGrid />
      <StatsSummary />
    </MainAppLayout>
  );
};

export default IndexPage;
