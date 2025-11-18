# In agrisense-backend/app.py
import main5  # Import your main pipeline script
import os
# Import 'request' to handle incoming data
from flask import Flask, jsonify, send_file, abort, request
from flask_cors import CORS

app = Flask(__name__)
# This is CRITICAL. It allows your React app (on port 5173) 
# to talk to your Python server (on port 5000).
CORS(app) 

# --- The hard-coded CONFIG variable has been REMOVED ---

# --- API Endpoint to RUN the analysis ---
@app.route('/run-analysis', methods=['POST'])
def run_analysis():
    
    # --- THIS IS THE NEW PART ---
    # 1. Get the JSON data sent by the frontend
    user_config = request.get_json()

    # 2. Validate the incoming data (basic check)
    if not user_config:
        return jsonify({"status": "error", "message": "No input data provided"}), 400
    
    required_keys = [
        "tickers", "allocations", "market_rep", 
        "start_date", "end_date", "backtest_start", 
        "backtest_end", "post_bt_end"
    ]
    
    for key in required_keys:
        if key not in user_config:
            # If a key is missing, send a clear error message back
            return jsonify({"status": "error", "message": f"Missing required input: {key}"}), 400
    # ---------------------------

    try:
        print("Starting full pipeline with USER-PROVIDED config...")
        
        # 3. Use the USER'S config instead of the old hard-coded one
        results = main5.full_pipeline(
            tickers=user_config["tickers"],
            allocations=user_config["allocations"],
            market_rep=user_config["market_rep"],
            start_date=user_config["start_date"],
            end_date=user_config["end_date"],
            backtest_start=user_config["backtest_start"],
            backtest_end=user_config["backtest_end"],
            post_bt_end=user_config["post_bt_end"]
        )
        
        print("Pipeline finished.")
        return jsonify({"status": "success", "message": "Analysis complete. Files generated."})
    
    except Exception as e:
        print(f"Error during analysis: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

# --- API Endpoint to GET the results ---
@app.route('/results', methods=['GET'])
def get_results():
    results_path = "portfolio_results.json"
    if not os.path.exists(results_path):
        return abort(404, description="Results file not found. Run the analysis first.")
    return send_file(results_path, mimetype='application/json')

# --- API Endpoint to GET the chart ---
@app.route('/chart', methods=['GET'])
def get_chart():
    chart_path = "portfolio_comparison.png"
    if not os.path.exists(chart_path):
        return abort(404, description="Chart file not found. Run the analysis first.")
    return send_file(chart_path, mimetype='image/png')

if __name__ == '__main__':
    print("Starting Python backend server at http://127.0.0.1:5000")
    app.run(debug=True, port=5000)