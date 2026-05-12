from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from scraper import JobScraper
from processor import DataProcessor
from apscheduler.schedulers.background import BackgroundScheduler
import os
import atexit

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

scraper = JobScraper()
processor = DataProcessor()

# Store latest data in memory for quick access
latest_data = {
    "jobs": [],
    "analytics": {},
    "last_updated": None,
    "last_updated_excel": None,
    "next_run": None
}
latest_df = None

def scheduled_pipeline():
    """Function to be run by the scheduler."""
    with app.app_context():
        print("Running scheduled pipeline...")
        run_pipeline_internal()

def run_pipeline_internal():
    """Internal logic for running the pipeline."""
    global latest_df
    try:
        app.logger.info("Starting pipeline run...")
        jobs = scraper.fetch_all_jobs()
        if not jobs:
            app.logger.warning("No jobs fetched from sources.")
            return None

        app.logger.info(f"Fetched {len(jobs)} jobs. Processing...")
        df, csv_path, excel_path = processor.process_jobs(jobs)
        analytics = processor.get_analytics(df)
        latest_df = df

        latest_data["jobs"] = df.head(150).to_dict(orient='records') 
        latest_data["analytics"] = analytics
        latest_data["last_updated"] = os.path.basename(csv_path)
        latest_data["last_updated_excel"] = os.path.basename(excel_path)
        
        app.logger.info("Pipeline completed successfully.")
        return {
            "count": len(jobs),
            "analytics": analytics,
            "csv_file": os.path.basename(csv_path),
            "excel_file": os.path.basename(excel_path)
        }
    except Exception as e:
        app.logger.error(f"Critical Pipeline error: {e}")
        return None

@app.route('/api/pipeline/run', methods=['POST'])
def run_pipeline():
    """Trigger the full scraping and processing pipeline."""
    result = run_pipeline_internal()
    if result:
        return jsonify({
            "message": "Pipeline completed successfully",
            **result
        })
    return jsonify({"error": "Pipeline failed"}), 500

# Setup Scheduler - Only if NOT on Vercel (Serverless doesn't support background tasks)
if not os.environ.get('VERCEL'):
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=scheduled_pipeline, trigger="interval", hours=24)
    scheduler.start()
    # Shutdown scheduler when app exits
    atexit.register(lambda: scheduler.shutdown())

@app.route('/api/jobs/search', methods=['GET'])
def search_jobs():
    """Search within the latest dataset."""
    query = request.args.get('q', '').lower()
    if latest_df is None or latest_df.empty:
        return jsonify({"jobs": []})
    
    if not query:
        return jsonify({"jobs": latest_df.head(150).to_dict(orient='records')})

    results = latest_df[
        latest_df['title'].str.lower().str.contains(query) | 
        latest_df['company'].str.lower().str.contains(query) |
        latest_df['location'].str.lower().str.contains(query)
    ].head(100)
    
    return jsonify({"jobs": results.to_dict(orient='records')})

@app.route('/api/data', methods=['GET'])
def get_data():
    """Fetch the latest processed data."""
    return jsonify(latest_data)

@app.route('/api/download/<filename>', methods=['GET'])
def download_file(filename):
    """Download reports."""
    file_path = os.path.join(processor.data_dir, filename)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    return jsonify({"error": "File not found"}), 404

import glob
import pandas as pd

def load_initial_data():
    """Load the most recent data from disk on startup to prevent empty dashboards."""
    global latest_df, latest_data
    try:
        data_files = glob.glob(os.path.join(processor.data_dir, "*.csv"))
        if data_files:
            latest_csv = max(data_files, key=os.path.getctime)
            app.logger.info(f"Loading initial data from {latest_csv}")
            
            df = pd.read_csv(latest_csv)
            df = df.astype(object).where(pd.notnull(df), None)
            analytics = processor.get_analytics(df)
            
            latest_df = df
            latest_data["jobs"] = df.head(150).to_dict(orient='records')
            latest_data["analytics"] = analytics
            latest_data["last_updated"] = os.path.basename(latest_csv)
            
            # Find corresponding excel
            excel_files = glob.glob(os.path.join(processor.data_dir, "*.xlsx"))
            if excel_files:
                latest_excel = max(excel_files, key=os.path.getctime)
                latest_data["last_updated_excel"] = os.path.basename(latest_excel)
                
            app.logger.info("Initial data loaded successfully.")
    except Exception as e:
        app.logger.error(f"Failed to load initial data: {e}")

if __name__ == '__main__':
    load_initial_data()
    app.run(debug=True, port=5000)
else:
    # This is for production/Vercel
    load_initial_data()
