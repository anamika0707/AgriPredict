import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, TrendingUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const POPULAR_AG_TICKERS = [
  "MOO", "DBA", "CORN", "WEAT", "SOYB", "ADM", "BG", "TSN", "DE", "AGCO"
];

const DataInput = () => {
  const navigate = useNavigate();
  const [selectedTickers, setSelectedTickers] = useState<string[]>(["MOO", "ADM", "DE"]);
  const [startDate, setStartDate] = useState<Date>(new Date(2020, 0, 1));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [mlModel, setMlModel] = useState("xgboost");
  const [targetVolatility, setTargetVolatility] = useState([15]);
  const [minWeight, setMinWeight] = useState([5]);
  const [maxWeight, setMaxWeight] = useState([40]);
  const [isLoading, setIsLoading] = useState(false);
  const [tickerInput, setTickerInput] = useState("");

  const handleTickerSelect = (ticker: string) => {
    if (!selectedTickers.includes(ticker)) {
      setSelectedTickers([...selectedTickers, ticker]);
    }
  };

  const handleTickerRemove = (ticker: string) => {
    setSelectedTickers(selectedTickers.filter(t => t !== ticker));
  };

  const handleCustomTickerAdd = () => {
    const ticker = tickerInput.toUpperCase().trim();
    if (ticker && !selectedTickers.includes(ticker)) {
      setSelectedTickers([...selectedTickers, ticker]);
      setTickerInput("");
    }
  };

  const handleSubmit = async () => {
    if (selectedTickers.length < 2) {
      toast.error("Please select at least 2 tickers");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Portfolio analysis complete!");
    setIsLoading(false);
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Portfolio Configuration</h1>
          <p className="text-muted-foreground">
            Configure your analysis parameters and generate ML-powered portfolio recommendations
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Parameters</CardTitle>
            <CardDescription>
              Select your tickers, date range, and optimization preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Ticker Selection */}
            <div className="space-y-3">
              <Label>Select Tickers</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter ticker symbol..."
                  value={tickerInput}
                  onChange={(e) => setTickerInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleCustomTickerAdd()}
                  className="flex-1"
                />
                <Button onClick={handleCustomTickerAdd} variant="secondary">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_AG_TICKERS.map(ticker => (
                  <Button
                    key={ticker}
                    variant={selectedTickers.includes(ticker) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTickerSelect(ticker)}
                  >
                    {ticker}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedTickers.map(ticker => (
                  <Badge key={ticker} variant="secondary" className="text-sm px-3 py-1">
                    {ticker}
                    <button
                      onClick={() => handleTickerRemove(ticker)}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => date && setEndDate(date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* ML Model Selection */}
            <div className="space-y-2">
              <Label>ML Model</Label>
              <Select value={mlModel} onValueChange={setMlModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ML model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xgboost">XGBoost</SelectItem>
                  <SelectItem value="random_forest">Random Forest</SelectItem>
                  <SelectItem value="gradient_boosting">Gradient Boosting</SelectItem>
                  <SelectItem value="linear_regression">Linear Regression</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target Volatility */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Target Volatility</Label>
                <span className="text-sm text-muted-foreground">{targetVolatility[0]}%</span>
              </div>
              <Slider
                value={targetVolatility}
                onValueChange={setTargetVolatility}
                min={5}
                max={30}
                step={1}
                className="py-4"
              />
            </div>

            {/* Weight Constraints */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Min Weight</Label>
                  <span className="text-sm text-muted-foreground">{minWeight[0]}%</span>
                </div>
                <Slider
                  value={minWeight}
                  onValueChange={setMinWeight}
                  min={0}
                  max={20}
                  step={1}
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Max Weight</Label>
                  <span className="text-sm text-muted-foreground">{maxWeight[0]}%</span>
                </div>
                <Slider
                  value={maxWeight}
                  onValueChange={setMaxWeight}
                  min={20}
                  max={100}
                  step={5}
                  className="py-4"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full h-12 text-lg"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Running Analysis...
                </>
              ) : (
                <>
                  Generate Portfolio
                  <TrendingUp className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataInput;
