import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Target } from "lucide-react";

// Mock metrics data
const mockMetrics = {
  blackLitterman: {
    sharpe: 1.85,
    sortino: 2.42,
    calmar: 1.67,
    maxDrawdown: -12.5,
    totalReturn: 85.2,
    annualizedReturn: 18.3,
  },
  mvo: {
    sharpe: 1.52,
    sortino: 2.01,
    calmar: 1.45,
    maxDrawdown: -15.2,
    totalReturn: 68.5,
    annualizedReturn: 15.1,
  },
  equalWeight: {
    sharpe: 1.21,
    sortino: 1.68,
    calmar: 1.15,
    maxDrawdown: -18.7,
    totalReturn: 52.3,
    annualizedReturn: 11.8,
  },
};

const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description 
}: { 
  title: string; 
  value: string | number; 
  icon: any; 
  trend?: "up" | "down"; 
  description: string;
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start justify-between mb-2">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {trend && (
          <div className={`flex items-center ${trend === "up" ? "text-success" : "text-destructive"}`}>
            {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm font-medium text-muted-foreground mb-1">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </CardContent>
  </Card>
);

const Backtesting = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Backtesting Metrics</h1>
          <p className="text-muted-foreground">
            Comprehensive performance analysis across different portfolio optimization strategies
          </p>
        </div>

        {/* Black-Litterman Metrics */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg"></div>
            <h2 className="text-2xl font-bold">Black-Litterman + ML</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Sharpe Ratio"
              value={mockMetrics.blackLitterman.sharpe.toFixed(2)}
              icon={Activity}
              trend="up"
              description="Risk-adjusted return metric"
            />
            <MetricCard
              title="Sortino Ratio"
              value={mockMetrics.blackLitterman.sortino.toFixed(2)}
              icon={Target}
              trend="up"
              description="Downside risk-adjusted return"
            />
            <MetricCard
              title="Calmar Ratio"
              value={mockMetrics.blackLitterman.calmar.toFixed(2)}
              icon={TrendingUp}
              trend="up"
              description="Return vs max drawdown"
            />
            <MetricCard
              title="Max Drawdown"
              value={`${mockMetrics.blackLitterman.maxDrawdown.toFixed(1)}%`}
              icon={TrendingDown}
              trend="down"
              description="Largest peak-to-trough decline"
            />
            <MetricCard
              title="Total Return"
              value={`${mockMetrics.blackLitterman.totalReturn.toFixed(1)}%`}
              icon={TrendingUp}
              trend="up"
              description="Cumulative return over period"
            />
            <MetricCard
              title="Annualized Return"
              value={`${mockMetrics.blackLitterman.annualizedReturn.toFixed(1)}%`}
              icon={Activity}
              trend="up"
              description="Yearly average return"
            />
          </div>
        </div>

        {/* MVO Metrics */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent rounded-lg"></div>
            <h2 className="text-2xl font-bold">Mean-Variance Optimization</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Sharpe Ratio"
              value={mockMetrics.mvo.sharpe.toFixed(2)}
              icon={Activity}
              description="Risk-adjusted return metric"
            />
            <MetricCard
              title="Sortino Ratio"
              value={mockMetrics.mvo.sortino.toFixed(2)}
              icon={Target}
              description="Downside risk-adjusted return"
            />
            <MetricCard
              title="Calmar Ratio"
              value={mockMetrics.mvo.calmar.toFixed(2)}
              icon={TrendingUp}
              description="Return vs max drawdown"
            />
            <MetricCard
              title="Max Drawdown"
              value={`${mockMetrics.mvo.maxDrawdown.toFixed(1)}%`}
              icon={TrendingDown}
              description="Largest peak-to-trough decline"
            />
            <MetricCard
              title="Total Return"
              value={`${mockMetrics.mvo.totalReturn.toFixed(1)}%`}
              icon={TrendingUp}
              description="Cumulative return over period"
            />
            <MetricCard
              title="Annualized Return"
              value={`${mockMetrics.mvo.annualizedReturn.toFixed(1)}%`}
              icon={Activity}
              description="Yearly average return"
            />
          </div>
        </div>

        {/* Equal Weight Metrics */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-muted rounded-lg"></div>
            <h2 className="text-2xl font-bold">Equal Weight Baseline</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Sharpe Ratio"
              value={mockMetrics.equalWeight.sharpe.toFixed(2)}
              icon={Activity}
              description="Risk-adjusted return metric"
            />
            <MetricCard
              title="Sortino Ratio"
              value={mockMetrics.equalWeight.sortino.toFixed(2)}
              icon={Target}
              description="Downside risk-adjusted return"
            />
            <MetricCard
              title="Calmar Ratio"
              value={mockMetrics.equalWeight.calmar.toFixed(2)}
              icon={TrendingUp}
              description="Return vs max drawdown"
            />
            <MetricCard
              title="Max Drawdown"
              value={`${mockMetrics.equalWeight.maxDrawdown.toFixed(1)}%`}
              icon={TrendingDown}
              description="Largest peak-to-trough decline"
            />
            <MetricCard
              title="Total Return"
              value={`${mockMetrics.equalWeight.totalReturn.toFixed(1)}%`}
              icon={TrendingUp}
              description="Cumulative return over period"
            />
            <MetricCard
              title="Annualized Return"
              value={`${mockMetrics.equalWeight.annualizedReturn.toFixed(1)}%`}
              icon={Activity}
              description="Yearly average return"
            />
          </div>
        </div>

        {/* Summary Card */}
        <Card className="mt-8 border-primary">
          <CardHeader className="bg-primary/5">
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Key takeaways from backtesting analysis</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                <span className="text-sm">
                  Black-Litterman with ML predictions shows superior risk-adjusted returns 
                  (Sharpe: {mockMetrics.blackLitterman.sharpe.toFixed(2)}) compared to traditional MVO
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                <span className="text-sm">
                  ML-enhanced portfolio achieved {mockMetrics.blackLitterman.totalReturn.toFixed(1)}% 
                  total return with {mockMetrics.blackLitterman.maxDrawdown.toFixed(1)}% max drawdown
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                <span className="text-sm">
                  Sortino ratio of {mockMetrics.blackLitterman.sortino.toFixed(2)} indicates 
                  strong downside risk management
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Backtesting;
