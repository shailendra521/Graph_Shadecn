import React, { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  ComposedChart,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  ZAxis,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';

const data = [
  { month: 'Jan', sales: 5000, revenue: 2400, profit: 1600 },
  { month: 'Feb', sales: 10000, revenue: 1398, profit: 1602 },
  { month: 'Mar', sales: 2000, revenue: 9800, profit: -7800 },
  { month: 'Apr', sales: 2780, revenue: 3908, profit: -1128 },
  { month: 'May', sales: 1890, revenue: 4800, profit: -2910 },
  { month: 'Jun', sales: 2390, revenue: 3800, profit: -1410 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#8884d8', '#82ca9d', '#ffc658'];


// 👇 Added "bar" to chartTypes
const chartTypes = ['line', 'area', 'bar', "pie", "radar", 'composed', "scatter", "radialBar"] as const;
type ChartType = typeof chartTypes[number];

export function AnalyticsChart() {
  const [chartType, setChartType] = useState<ChartType>('line');

  const renderChart  = (): React.ReactElement => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    const commonElements = (
      <>
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
      </>
    );

    if (chartType === 'line') {
      return (
        <LineChart {...commonProps}>
          {commonElements}
          <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} dot />
          <Line type="monotone" dataKey="revenue" stroke="hsl(var(--secondary))" strokeWidth={2} dot />
          <Line type="monotone" dataKey="profit" stroke="hsl(var(--accent))" strokeWidth={2} dot />
        </LineChart>
      );
    }

    if (chartType === 'area') {
      return (
        <AreaChart {...commonProps}>
          {commonElements}
          <Area type="monotone" dataKey="sales" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/.2)" />
          <Area type="monotone" dataKey="revenue" stackId="1" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary)/.2)" />
          <Area type="monotone" dataKey="profit" stackId="1" stroke="hsl(var(--accent))" fill="hsl(var(--accent)/.2)" />
        </AreaChart>
      );
    }

    if(chartType === "bar"){
      return(
      <BarChart {...commonProps}>
      {commonElements}
      <Bar dataKey="sales" fill="hsl(var(--primary))" />
      <Bar dataKey="revenue" fill="hsl(var(--secondary))" />
      <Bar dataKey="profit" fill="hsl(var(--accent))" />
    </BarChart>
      );
    }

  if(chartType === "pie"){
  return (
   <PieChart>
    <Tooltip />
    <Legend/>
    <Pie data={data} dataKey="sales" nameKey="month" cx="50%" cy="50%" outerRadius={120} label >
      {data.map((entry, index)=>{
        return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      })}
   </Pie>
   </PieChart>
  );
}
  if (chartType === 'composed') {
    return (
      <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
        <Area type="monotone" dataKey="profit" fill="hsl(var(--accent)/.3)" stroke="hsl(var(--accent))" />
        <Bar dataKey="revenue" barSize={20} fill="hsl(var(--secondary))" />
        <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" />
      </ComposedChart>
    );
  }
  if (chartType === 'scatter') {
    return (
      <ScatterChart
        margin={{ top: 5, right: 30, bottom: 5, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <XAxis dataKey="sales" name="Sales" stroke="hsl(var(--foreground))" />
        <YAxis dataKey="revenue" name="Revenue" stroke="hsl(var(--foreground))" />
        <ZAxis dataKey="profit" range={[100, 300]} name="Profit" />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--foreground))',
          }}
        />
        <Legend />
        <Scatter name="Performance" data={data} fill="hsl(var(--primary))" />
      </ScatterChart>
    );
  }
  if (chartType === 'radialBar') {
    return (
      <RadialBarChart
        width={500}
        height={400}
        cx="50%"
        cy="50%"
        innerRadius="20%"
        outerRadius="90%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--foreground))',
          }}
        />
        <RadialBar
          dataKey="sales"
          fill="hsl(var(--primary))"
          background
          label={{ fill: 'hsl(var(--foreground))', position: 'insideStart' }}
        />
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={{
            top: 0,
            right: 0,
            lineHeight: '24px',
          }}
        />
      </RadialBarChart>
    );
  }
  
  return (
        <RadarChart outerRadius={120} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="month" stroke="hsl(var(--foreground))" />
          <PolarRadiusAxis stroke="hsl(var(--muted))" />
          <Tooltip />
          <Legend />
          <Radar
            name="Sales"
            dataKey="sales"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary)/.2)"
            fillOpacity={0.6}
          />
          <Radar
            name="Revenue"
            dataKey="revenue"
            stroke="hsl(var(--secondary))"
            fill="hsl(var(--secondary)/.2)"
            fillOpacity={0.6}
          />
          <Radar
            name="Profit"
            dataKey="profit"
            stroke="hsl(var(--accent))"
            fill="hsl(var(--accent)/.2)"
            fillOpacity={0.6}
          />
        </RadarChart>
  );
};

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales Analytics</CardTitle>
        <CardDescription>A detailed view of sales, revenue, and profit over time</CardDescription>
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
