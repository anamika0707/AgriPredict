import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockPerformanceData = [
  { date: "2020-01", mvo: 100, blackLitterman: 100, unoptimized: 100 },
  { date: "2020-04", mvo: 108, blackLitterman: 112, unoptimized: 105 },
  { date: "2020-07", mvo: 115, blackLitterman: 125, unoptimized: 108 },
  { date: "2020-10", mvo: 122, blackLitterman: 135, unoptimized: 110 },
  { date: "2021-01", mvo: 130, blackLitterman: 148, unoptimized: 115 },
  { date: "2021-04", mvo: 125, blackLitterman: 152, unoptimized: 112 },
  { date: "2021-07", mvo: 135, blackLitterman: 165, unoptimized: 118 },
  { date: "2021-10", mvo: 142, blackLitterman: 178, unoptimized: 122 },
  { date: "2022-01", mvo: 138, blackLitterman: 175, unoptimized: 119 },
  { date: "2022-04", mvo: 145, blackLitterman: 185, unoptimized: 125 },
];

const mockPortfolioWeights = [
  { ticker: "MOO", predicted_return: "12.5%", confidence: "0.85", bl_weight: "25%", mvo_weight: "22%", equal_weight: "10%" },
  { ticker: "ADM", predicted_return: "10.2%", confidence: "0.82", bl_weight: "20%", mvo_weight: "18%", equal_weight: "10%" },
  { ticker: "DE", predicted_return: "15.8%", confidence: "0.88", bl_weight: "28%", mvo_weight: "25%", equal_weight: "10%" },
  { ticker: "BG", predicted_return: "8.5%", confidence: "0.79", bl_weight: "12%", mvo_weight: "15%", equal_weight: "10%" },
  { ticker: "TSN", predicted_return: "9.7%", confidence: "0.81", bl_weight: "15%", mvo_weight: "20%", equal_weight: "10%" },
];

const Results = () => {
  const handleDownloadJSON = () => {
    const data = { portfolioWeights: mockPortfolioWeights, performanceData: mockPerformanceData };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "agripredict-results.json";
    a.click();
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">Portfolio Analysis Results</h1>
            <p className="text-muted-foreground">
              ML-powered predictions and optimized portfolio recommendations
            </p>
          </div>
          <Button onClick={handleDownloadJSON} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Results
          </Button>
        </div>

        {/* Performance Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cumulative Returns Comparison</CardTitle>
            <CardDescription>
              Historical backtest performance across different optimization strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="blackLitterman" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2.5}
                  name="Black-Litterman (ML)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="mvo" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="MVO" 
                />
                <Line 
                  type="monotone" 
                  dataKey="unoptimized" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Equal Weight" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recommended Portfolio */}
        <Card className="mb-8 border-primary">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <CardTitle>Recommended Portfolio (Black-Litterman + ML)</CardTitle>
            </div>
            <CardDescription>
              Optimized using ML-predicted returns and Black-Litterman framework
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Predicted Return</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Recommended Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPortfolioWeights.map((stock) => (
                  <TableRow key={stock.ticker}>
                    <TableCell className="font-semibold">{stock.ticker}</TableCell>
                    <TableCell className="text-success font-medium">{stock.predicted_return}</TableCell>
                    <TableCell>
                      <Badge variant={parseFloat(stock.confidence) > 0.85 ? "default" : "secondary"}>
                        {stock.confidence}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-primary">{stock.bl_weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Portfolio Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Weights Comparison</CardTitle>
            <CardDescription>
              Compare allocations across different optimization methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Black-Litterman</TableHead>
                  <TableHead>MVO</TableHead>
                  <TableHead>Equal Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPortfolioWeights.map((stock) => (
                  <TableRow key={stock.ticker}>
                    <TableCell className="font-semibold">{stock.ticker}</TableCell>
                    <TableCell>{stock.bl_weight}</TableCell>
                    <TableCell>{stock.mvo_weight}</TableCell>
                    <TableCell>{stock.equal_weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
