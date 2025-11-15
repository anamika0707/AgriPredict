import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, BarChart3, Brain, Target } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Brain className="w-4 h-4" />
              AI-Powered Portfolio Optimization
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            AgriPredict
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Leverage machine learning and advanced portfolio optimization to make data-driven 
            investment decisions in agriculture stocks and ETFs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/input">
              <Button size="lg" className="text-lg px-8 h-14">
                Start Prediction
                <TrendingUp className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/results">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                View Demo Results
                <BarChart3 className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-xl shadow-md border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ML-Powered Predictions</h3>
            <p className="text-muted-foreground">
              XGBoost, Random Forest, and Gradient Boosting models trained on historical data
              to predict future returns with confidence scores.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-md border border-border">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Black-Litterman Optimization</h3>
            <p className="text-muted-foreground">
              Combine market equilibrium with ML-predicted views for robust portfolio
              construction that balances risk and return.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-md border border-border">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Backtesting</h3>
            <p className="text-muted-foreground">
              Evaluate portfolio performance with Sharpe, Sortino, Calmar ratios, and
              maximum drawdown analysis.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to optimize your agriculture portfolio?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Start with your tickers, select your ML model, and let AgriPredict generate
            data-driven investment recommendations.
          </p>
          <Link to="/input">
            <Button size="lg" variant="secondary" className="text-lg px-8 h-14">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
