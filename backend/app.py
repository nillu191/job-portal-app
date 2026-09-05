from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from scraper import JobScraper
from processor import DataProcessor
from apscheduler.schedulers.background import BackgroundScheduler
import os
import atexit
import json
import uuid
from datetime import datetime

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

# ==========================================
# Persistent Store for Mentors, Inquiries & Ads
# ==========================================
STORE_FILE = os.path.join(processor.data_dir, "mentor_store.json")

INITIAL_STORE = {
    "mentors": [
        {
            "id": "m1",
            "name": "Aarav Sharma",
            "email": "aarav.sharma@google.com",
            "role": "Senior SDE-3",
            "company": "Google",
            "exp": "7+ yrs",
            "rating": 4.9,
            "sessions": 142,
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            "tags": ["System Design", "DSA", "MAANG Prep"],
            "rate": "₹2,000 / hr",
            "hourlyRate": "₹2,000/hr",
            "status": "approved",
            "approved": True,
            "active": True,
            "bio": "Helped 100+ engineers crack Google, Meta & Amazon. Expert in high-scale distributed architecture.",
            "linkedin": "https://linkedin.com/in/aarav-sharma",
            "createdAt": "2026-08-01T10:00:00Z"
        },
        {
            "id": "m2",
            "name": "Priya Mukherjee",
            "email": "priya.m@microsoft.com",
            "role": "Staff Engineer",
            "company": "Microsoft",
            "exp": "9+ yrs",
            "rating": 5.0,
            "sessions": 198,
            "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
            "tags": ["Cloud / Azure", "Resume Roast", "Leadership"],
            "rate": "₹2,500 / hr",
            "hourlyRate": "₹2,500/hr",
            "status": "approved",
            "approved": True,
            "active": True,
            "bio": "Staff Architect at Azure Core. Passionate about empowering women in tech and mentoring tech leads.",
            "linkedin": "https://linkedin.com/in/priya-mukherjee",
            "createdAt": "2026-08-05T10:00:00Z"
        },
        {
            "id": "m3",
            "name": "Rohan Mehta",
            "email": "rohan.mehta@amazon.com",
            "role": "Engineering Lead",
            "company": "Amazon",
            "exp": "8+ yrs",
            "rating": 4.9,
            "sessions": 215,
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            "tags": ["Backend", "Mock Interview", "AWS"],
            "rate": "₹1,800 / hr",
            "hourlyRate": "₹1,800/hr",
            "status": "approved",
            "approved": True,
            "active": True,
            "bio": "Ex-Bar Raiser at Amazon. Specializing in Low-Level & High-Level design interview clearance.",
            "linkedin": "https://linkedin.com/in/rohan-mehta",
            "createdAt": "2026-08-10T10:00:00Z"
        },
        {
            "id": "m4",
            "name": "Ananya Roy",
            "email": "ananya.roy@uber.com",
            "role": "Lead AI Engineer",
            "company": "Uber",
            "exp": "6+ yrs",
            "rating": 4.95,
            "sessions": 110,
            "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
            "tags": ["AI/ML", "Python", "Career Switch"],
            "rate": "₹2,200 / hr",
            "hourlyRate": "₹2,200/hr",
            "status": "approved",
            "approved": True,
            "active": True,
            "bio": "Deep learning researcher & production LLM deployment specialist at Uber Marketplace.",
            "linkedin": "https://linkedin.com/in/ananya-roy",
            "createdAt": "2026-08-15T10:00:00Z"
        }
    ],
    "consultations": [
        {
            "id": "c101",
            "name": "Sameer Kulkarni",
            "email": "sameer.k@gmail.com",
            "serviceTopic": "1:1 Mock Interview & Coding",
            "targetRole": "SDE-2 at Google / Microsoft",
            "preferredSlot": "Tomorrow • 7:00 PM - 8:00 PM",
            "mentorId": "m1",
            "mentorPreference": "Aarav Sharma (Senior SDE-3 @ Google)",
            "notes": "Looking for advice on Distributed Caching & Dynamic Programming mock rounds.",
            "status": "Pending",
            "createdAt": "2026-09-04T18:30:00Z"
        },
        {
            "id": "c102",
            "name": "Divya Nair",
            "email": "divya.nair@outlook.com",
            "serviceTopic": "ATS Resume Review & Roast",
            "targetRole": "Staff / Lead Architect",
            "preferredSlot": "Saturday • 11:00 AM - 12:00 PM",
            "mentorId": "m2",
            "mentorPreference": "Priya Mukherjee (Staff Engineer @ Microsoft)",
            "notes": "Have 8 years backend experience, transitioning to Tier-1 Cloud Architect roles.",
            "status": "Confirmed",
            "createdAt": "2026-09-05T09:15:00Z"
        }
    ],
    "ads": [
        {
            "id": "ad1",
            "title": "⚡ FAANG Mock Interview Sprint 2026",
            "tag": "🔥 HOT SPONSORED",
            "badgeColor": "purple",
            "headline": "Crack Tier-1 Product Companies with 1:1 Live Coding & System Design Roasts",
            "description": "Book a dedicated 60-min session with Bar Raisers from Google, Amazon & Microsoft. Get direct actionable feedback.",
            "mentorName": "Aarav Sharma & Priya Mukherjee",
            "mentorCompany": "Google & Microsoft",
            "rateBadge": "Flat 30% OFF Today",
            "ctaText": "Consult & Connect Now",
            "ctaAction": "book_session",
            "bannerBg": "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
            "active": True,
            "clicks": 348,
            "createdAt": "2026-08-20T10:00:00Z"
        },
        {
            "id": "ad2",
            "title": "🎯 100% Free 15-Min Resume Roast Drive",
            "tag": "✨ COMMUNITY EXCLUSIVE",
            "badgeColor": "green",
            "headline": "Make your resume pass 99% ATS Filters & Stand Out to Hiring Managers",
            "description": "Over 500+ candidates placed this year. Get your bullet points rewritten with quantified impact metrics.",
            "mentorName": "Priya Mukherjee",
            "mentorCompany": "Microsoft",
            "rateBadge": "100% Free Initial Consult",
            "ctaText": "Book Free Review",
            "ctaAction": "book_session",
            "bannerBg": "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
            "active": True,
            "clicks": 521,
            "createdAt": "2026-08-25T10:00:00Z"
        },
        {
            "id": "ad3",
            "title": "🤖 GenAI & LLM Career Accelerator",
            "tag": "⚡ NEW TRACK",
            "badgeColor": "blue",
            "headline": "Transition into $150k+ AI Engineer & Machine Learning Roles",
            "description": "Hands-on PyTorch, LLM fine-tuning, RAG pipelines, and Vector DB architecture roadmaps with Lead AI practitioners.",
            "mentorName": "Ananya Roy",
            "mentorCompany": "Uber",
            "rateBadge": "High Demand Track",
            "ctaText": "Connect With Ananya",
            "ctaAction": "consult_mentor",
            "mentorId": "m4",
            "bannerBg": "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
            "active": True,
            "clicks": 219,
            "createdAt": "2026-09-01T12:00:00Z"
        }
    ]
}

# In-memory store fallback for fast serverless & state preservation
memory_store = json.loads(json.dumps(INITIAL_STORE))

def load_store():
    global memory_store
    try:
        if os.path.exists(STORE_FILE):
            with open(STORE_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                memory_store = data
                return data
    except Exception as e:
        app.logger.warning(f"Could not read store file, using in-memory store: {e}")
    return memory_store

def save_store(data):
    global memory_store
    memory_store = data
    try:
        os.makedirs(os.path.dirname(STORE_FILE), exist_ok=True)
        with open(STORE_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        app.logger.warning(f"Could not save store to file: {e}")

# Load store at startup
load_store()

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

@app.route('/pipeline/run', methods=['POST'])
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

@app.route('/jobs/search', methods=['GET'])
def search_jobs():
    """Search within the latest dataset with filters."""
    query = request.args.get('q', '').lower()
    job_type = request.args.get('type', 'All')
    experience = request.args.get('experience', 'All')
    min_salary = request.args.get('min_salary')
    max_salary = request.args.get('max_salary')
    
    # If no data is loaded (common on Vercel startup), force a load/seed
    if latest_df is None or latest_df.empty:
        load_initial_data()
        
    if latest_df is None or latest_df.empty:
        return jsonify({"jobs": []})
    
    results = latest_df.copy()

    # Apply search query
    if query:
        results = results[
            results['title'].str.lower().str.contains(query, na=False, regex=False) | 
            results['company'].str.lower().str.contains(query, na=False, regex=False) |
            results['location'].str.lower().str.contains(query, na=False, regex=False)
        ]

    # Apply job type filter
    if job_type != 'All':
        results = results[results['job_type'] == job_type]

    # Apply experience level filter
    if experience != 'All':
        results = results[results['experience_level'] == experience]

    # Apply salary range filters
    if min_salary:
        try:
            results = results[results['package'] >= float(min_salary)]
        except (ValueError, TypeError): pass
    if max_salary:
        try:
            results = results[results['package'] <= float(max_salary)]
        except (ValueError, TypeError): pass
    
    return jsonify({"jobs": results.head(100).to_dict(orient='records')})

@app.route('/data', methods=['GET'])
def get_data():
    """Fetch the latest processed data."""
    return jsonify(latest_data)

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    """Download reports."""
    file_path = os.path.join(processor.data_dir, filename)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    return jsonify({"error": "File not found"}), 404

# ==========================================
# MENTORS & APPROVAL REST APIS
# ==========================================
@app.route('/api/mentors', methods=['GET'])
@app.route('/mentors', methods=['GET'])
def get_mentors():
    """Get mentors. Public receives active & approved. Admin (?all=true) receives all."""
    store = load_store()
    include_all = request.args.get('all', 'false').lower() == 'true'
    
    if include_all:
        return jsonify({"mentors": store.get("mentors", [])})
    
    # Public view: Only approved and active mentors
    approved_mentors = [
        m for m in store.get("mentors", []) 
        if m.get("approved", True) and m.get("active", True) and m.get("status") != "rejected"
    ]
    return jsonify({"mentors": approved_mentors})

@app.route('/api/mentors', methods=['POST'])
@app.route('/mentors', methods=['POST'])
def add_mentor():
    """Admin manually adds a mentor, directly approved and pushed to live site."""
    store = load_store()
    data = request.get_json() or {}
    
    new_mentor = {
        "id": f"m_{uuid.uuid4().hex[:8]}",
        "name": data.get("name", "").strip(),
        "email": data.get("email", "").strip(),
        "role": data.get("role", "").strip(),
        "company": data.get("company", "").strip(),
        "exp": data.get("exp", data.get("experience", "3+ yrs")),
        "rating": float(data.get("rating", 5.0)),
        "sessions": int(data.get("sessions", 0)),
        "avatar": data.get("avatar") or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "tags": data.get("tags") or data.get("expertise") or ["Mock Interview", "Career Guidance"],
        "rate": data.get("rate") or data.get("hourlyRate") or "₹1,500 / hr",
        "hourlyRate": data.get("hourlyRate") or data.get("rate") or "₹1,500/hr",
        "bio": data.get("bio", ""),
        "linkedin": data.get("linkedin", ""),
        "status": "approved",
        "approved": True,
        "active": True,
        "createdAt": datetime.now().isoformat()
    }
    
    if not new_mentor["name"]:
        return jsonify({"error": "Mentor name is required"}), 400
        
    store.setdefault("mentors", []).insert(0, new_mentor)
    save_store(store)
    return jsonify({"message": "Mentor added and pushed to live site successfully!", "mentor": new_mentor}), 201

@app.route('/api/mentors/apply', methods=['POST'])
@app.route('/mentors/apply', methods=['POST'])
def apply_mentor():
    """User applies to 'Become a Mentor'. Stored as pending for Owner review."""
    store = load_store()
    data = request.get_json() or {}
    
    application = {
        "id": f"app_{uuid.uuid4().hex[:8]}",
        "name": data.get("name", "").strip(),
        "email": data.get("email", "").strip(),
        "role": data.get("role", "").strip(),
        "company": data.get("company", "").strip(),
        "exp": data.get("experience", "3-5 years"),
        "rating": 5.0,
        "sessions": 0,
        "avatar": data.get("avatar") or "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        "tags": data.get("expertise") or ["Tech Mentorship", "Interview Prep"],
        "rate": data.get("hourlyRate") or "₹1,500 / hr",
        "hourlyRate": data.get("hourlyRate") or "₹1,500 / hr",
        "bio": data.get("bio", ""),
        "linkedin": data.get("linkedin", ""),
        "status": "pending",
        "approved": False,
        "active": False,
        "createdAt": datetime.now().isoformat()
    }
    
    if not application["name"] or not application["email"]:
        return jsonify({"error": "Name and email are required"}), 400
        
    store.setdefault("mentors", []).insert(0, application)
    save_store(store)
    return jsonify({"message": "Application submitted to Owner for review", "application": application}), 201

@app.route('/api/mentors/<mentor_id>/approve', methods=['POST'])
@app.route('/mentors/<mentor_id>/approve', methods=['POST'])
def approve_mentor(mentor_id):
    """Owner approves a mentor application, pushing them directly to the live site."""
    store = load_store()
    mentors = store.get("mentors", [])
    
    for m in mentors:
        if m.get("id") == mentor_id:
            m["status"] = "approved"
            m["approved"] = True
            m["active"] = True
            m["approvedAt"] = datetime.now().isoformat()
            save_store(store)
            return jsonify({"message": f"Mentor {m['name']} approved & pushed to live site!", "mentor": m})
            
    return jsonify({"error": "Mentor not found"}), 404

@app.route('/api/mentors/<mentor_id>', methods=['PATCH', 'DELETE'])
@app.route('/mentors/<mentor_id>', methods=['PATCH', 'DELETE'])
def manage_mentor(mentor_id):
    """Update or delete a mentor profile."""
    store = load_store()
    mentors = store.get("mentors", [])
    
    if request.method == 'DELETE':
        new_mentors = [m for m in mentors if m.get("id") != mentor_id]
        if len(new_mentors) == len(mentors):
            return jsonify({"error": "Mentor not found"}), 404
        store["mentors"] = new_mentors
        save_store(store)
        return jsonify({"message": "Mentor removed successfully"})
        
    if request.method == 'PATCH':
        updates = request.get_json() or {}
        for m in mentors:
            if m.get("id") == mentor_id:
                m.update(updates)
                save_store(store)
                return jsonify({"message": "Mentor updated successfully", "mentor": m})
        return jsonify({"error": "Mentor not found"}), 404

# ==========================================
# CONSULTATIONS & INQUIRY MESSAGING TO OWNER
# ==========================================
@app.route('/api/consultations', methods=['GET', 'POST'])
@app.route('/consultations', methods=['GET', 'POST'])
def handle_consultations():
    """Create consultation message to owner or retrieve consultation inbox."""
    store = load_store()
    
    if request.method == 'POST':
        data = request.get_json() or {}
        new_consultation = {
            "id": f"c_{uuid.uuid4().hex[:8]}",
            "name": data.get("name", "").strip(),
            "email": data.get("email", "").strip(),
            "serviceTopic": data.get("serviceTopic", "1:1 Tech Consultation"),
            "targetRole": data.get("targetRole", "Not specified"),
            "preferredSlot": data.get("preferredSlot", "Flexible"),
            "mentorId": data.get("mentorId"),
            "mentorPreference": data.get("mentorPreference", "Any Top Mentor"),
            "notes": data.get("notes", ""),
            "status": "Pending",
            "createdAt": datetime.now().isoformat()
        }
        
        if not new_consultation["name"] or not new_consultation["email"]:
            return jsonify({"error": "Name and email are required"}), 400
            
        store.setdefault("consultations", []).insert(0, new_consultation)
        save_store(store)
        return jsonify({
            "message": "Consultation request sent to owner & confirmed!",
            "consultation": new_consultation
        }), 201

    # GET: return all consultations
    return jsonify({"consultations": store.get("consultations", [])})

@app.route('/api/consultations/<consult_id>', methods=['PATCH', 'DELETE'])
@app.route('/consultations/<consult_id>', methods=['PATCH', 'DELETE'])
def update_consultation(consult_id):
    """Update consultation status or delete entry."""
    store = load_store()
    consultations = store.get("consultations", [])
    
    if request.method == 'DELETE':
        new_list = [c for c in consultations if c.get("id") != consult_id]
        if len(new_list) == len(consultations):
            return jsonify({"error": "Consultation not found"}), 404
        store["consultations"] = new_list
        save_store(store)
        return jsonify({"message": "Consultation deleted successfully"})
        
    if request.method == 'PATCH':
        updates = request.get_json() or {}
        for c in consultations:
            if c.get("id") == consult_id:
                c.update(updates)
                save_store(store)
                return jsonify({"message": "Consultation updated successfully", "consultation": c})
        return jsonify({"error": "Consultation not found"}), 404

# ==========================================
# ADS & PROMOTIONS MANAGEMENT
# ==========================================
@app.route('/api/ads', methods=['GET', 'POST'])
@app.route('/ads', methods=['GET', 'POST'])
def handle_ads():
    """Retrieve active ads for site or create new ad campaign."""
    store = load_store()
    
    if request.method == 'POST':
        data = request.get_json() or {}
        new_ad = {
            "id": f"ad_{uuid.uuid4().hex[:8]}",
            "title": data.get("title", "Featured Career Boost").strip(),
            "tag": data.get("tag", "🔥 FEATURED AD").strip(),
            "badgeColor": data.get("badgeColor", "purple"),
            "headline": data.get("headline", "").strip(),
            "description": data.get("description", "").strip(),
            "mentorName": data.get("mentorName", ""),
            "mentorCompany": data.get("mentorCompany", ""),
            "rateBadge": data.get("rateBadge", "Special Discount"),
            "ctaText": data.get("ctaText", "Consult & Connect Now"),
            "ctaAction": data.get("ctaAction", "book_session"),
            "mentorId": data.get("mentorId"),
            "bannerBg": data.get("bannerBg", "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)"),
            "active": data.get("active", True),
            "clicks": 0,
            "createdAt": datetime.now().isoformat()
        }
        
        if not new_ad["headline"]:
            return jsonify({"error": "Ad headline is required"}), 400
            
        store.setdefault("ads", []).insert(0, new_ad)
        save_store(store)
        return jsonify({"message": "Ad campaign created and running on site!", "ad": new_ad}), 201

    include_all = request.args.get('all', 'false').lower() == 'true'
    if include_all:
        return jsonify({"ads": store.get("ads", [])})
        
    active_ads = [ad for ad in store.get("ads", []) if ad.get("active", True)]
    return jsonify({"ads": active_ads})

@app.route('/api/ads/<ad_id>', methods=['PATCH', 'DELETE'])
@app.route('/ads/<ad_id>', methods=['PATCH', 'DELETE'])
def manage_ad(ad_id):
    """Update or remove an ad campaign."""
    store = load_store()
    ads = store.get("ads", [])
    
    if request.method == 'DELETE':
        new_ads = [a for a in ads if a.get("id") != ad_id]
        if len(new_ads) == len(ads):
            return jsonify({"error": "Ad not found"}), 404
        store["ads"] = new_ads
        save_store(store)
        return jsonify({"message": "Ad deleted successfully"})
        
    if request.method == 'PATCH':
        updates = request.get_json() or {}
        for a in ads:
            if a.get("id") == ad_id:
                a.update(updates)
                save_store(store)
                return jsonify({"message": "Ad updated successfully", "ad": a})
        return jsonify({"error": "Ad not found"}), 404

# ==========================================
# DATA SEEDING & SERVER START
# ==========================================
import glob
import pandas as pd

def load_initial_data():
    """Load data from disk or auto-seed with mock data to ensure dashboard is never empty."""
    global latest_df, latest_data
    try:
        data_files = glob.glob(os.path.join(processor.data_dir, "*.csv"))
        if data_files:
            latest_csv = max(data_files, key=os.path.getctime)
            app.logger.info(f"Loading initial data from {latest_csv}")
            df = pd.read_csv(latest_csv)
        else:
            app.logger.info("No data found. Auto-seeding dashboard with MNC and State data...")
            jobs = scraper.get_mock_jobs()
            df, _, _ = processor.process_jobs(jobs)
            
        df = df.astype(object).where(pd.notnull(df), None)
        analytics = processor.get_analytics(df)
        
        latest_df = df
        latest_data["jobs"] = df.head(150).to_dict(orient='records')
        latest_data["analytics"] = analytics
        
        app.logger.info("Initial data loaded/seeded successfully.")
    except Exception as e:
        app.logger.error(f"Failed to load/seed initial data: {e}")

if __name__ == '__main__':
    load_initial_data()
    app.run(debug=True, port=5000)
else:
    load_initial_data()
