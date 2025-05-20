import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';

const data = [
  { month: 'Jan', sales: 4000, revenue: 2400, profit: 1600 },
  { month: 'Feb', sales: 3000, revenue: 1398, profit: 1602 },
  { month: 'Mar', sales: 2000, revenue: 9800, profit: -7800 },
  { month: 'Apr', sales: 2780, revenue: 3908, profit: -1128 },
  { month: 'May', sales: 1890, revenue: 4800, profit: -2910 },
  { month: 'Jun', sales: 2390, revenue: 3800, profit: -1410 },
];

const chartTypes = ['line', 'area'] as const;
type ChartType = typeof chartTypes[number];

export function AnalyticsChart() {
  const [chartType, setChartType] = useState<ChartType>('line');

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
          <YAxis stroke="hsl(var(--foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              color: 'hsl(var(--foreground))',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))' }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--secondary))' }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--accent))' }}
          />
        </LineChart>
      );
    }

    return (
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
        <YAxis stroke="hsl(var(--foreground))" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--foreground))',
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="sales"
          stackId="1"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary)/.2)"
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stackId="1"
          stroke="hsl(var(--secondary))"
          fill="hsl(var(--secondary)/.2)"
        />
        <Area
          type="monotone"
          dataKey="profit"
          stackId="1"
          stroke="hsl(var(--accent))"
          fill="hsl(var(--accent)/.2)"
        />
      </AreaChart>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales Analytics</CardTitle>
        <CardDescription>
          A detailed view of sales, revenue, and profit over time
        </CardDescription>
        <div className="flex gap-2 mt-2">
          {chartTypes.map((type) => (
            <Button
              key={type}
              variant={chartType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType(type)}
              className="capitalize"
            >
              {type} Chart
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 