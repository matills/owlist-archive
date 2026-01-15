import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Eye, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaStatsProps {
  stats: {
    watching: number;
    completed: number;
    planToWatch: number;
  };
  className?: string;
}

export const MediaStats: React.FC<MediaStatsProps> = ({ stats, className }) => {
  const data = [
    { name: 'Watching', value: stats.watching, color: 'hsl(179, 60%, 32%)' },
    { name: 'Completed', value: stats.completed, color: 'hsl(38, 100%, 65%)' },
    { name: 'Plan to Watch', value: stats.planToWatch, color: 'hsl(355, 100%, 70%)' },
  ];

  const total = stats.watching + stats.completed + stats.planToWatch;

  const statCards = [
    {
      icon: Eye,
      label: 'Currently Watching',
      value: stats.watching.toLocaleString(),
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Check,
      label: 'Completed',
      value: stats.completed.toLocaleString(),
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      icon: Clock,
      label: 'Plan to Watch',
      value: stats.planToWatch.toLocaleString(),
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className={cn('space-y-6', className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-5 border border-border"
          >
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', stat.bgColor)}>
              <stat.icon className={cn('w-5 h-5', stat.color)} />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          User Distribution
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(36, 33%, 93%)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(74, 63, 53, 0.15)',
                }}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Total: {total.toLocaleString()} users tracking
        </p>
      </div>
    </div>
  );
};
