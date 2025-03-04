export type StatsCardProps = {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down';
  trendValue: string;
  subtitle: string;
};

export type QuickAction = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
  route: string;
};
