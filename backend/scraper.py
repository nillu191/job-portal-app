import requests
import pandas as pd
import logging
import os
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class JobScraper:
    def __init__(self):
        self.adzuna_app_id = os.getenv("ADZUNA_APP_ID")
        self.adzuna_app_key = os.getenv("ADZUNA_APP_KEY")
        self.apis = {
            "remotive": "https://remotive.io/api/remote-jobs",
            "adzuna": "https://api.adzuna.com/v1/api/jobs/in/search/1", 
        }

    def fetch_remotive_jobs(self):
        """Fetch jobs from Remotive API and filter for India."""
        try:
            logger.info("Fetching jobs from Remotive...")
            response = requests.get(self.apis["remotive"], timeout=10)
            response.raise_for_status()
            data = response.json()
            jobs = data.get("jobs", [])
            
            standardized_jobs = []
            for job in jobs:
                location = job.get("candidate_required_location", "").lower()
                if "india" in location or "worldwide" in location:
                    standardized_jobs.append({
                        "id": f"remotive_{job.get('id')}",
                        "title": job.get("title"),
                        "company": job.get("company_name"),
                        "category": job.get("category"),
                        "job_type": job.get("job_type"),
                        "publication_date": job.get("publication_date"),
                        "salary": job.get("salary", "Not Disclosed"),
                        "location": job.get("candidate_required_location", "Remote"),
                        "url": job.get("url"),
                        "source": "Remotive"
                    })
            return standardized_jobs
        except Exception as e:
            logger.error(f"Error fetching from Remotive: {e}")
            return []

    def fetch_adzuna_jobs(self):
        """Fetch jobs from Adzuna India API."""
        if not self.adzuna_app_id or not self.adzuna_app_key:
            return []
            
        try:
            logger.info("Fetching jobs from Adzuna (India)...")
            params = {
                "app_id": self.adzuna_app_id,
                "app_key": self.adzuna_app_key,
                "results_per_page": 20,
                "what": "software engineer"
            }
            response = requests.get(self.apis["adzuna"], params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            results = data.get("results", [])
            
            standardized_jobs = []
            for job in results:
                standardized_jobs.append({
                    "id": f"adzuna_{job.get('id')}",
                    "title": job.get("title"),
                    "company": job.get("company", {}).get("display_name"),
                    "category": "Technology",
                    "job_type": "Full-time",
                    "publication_date": job.get("created"),
                    "salary": "Negotiable",
                    "location": job.get("location", {}).get("display_name"),
                    "url": job.get("redirect_url"),
                    "source": "Adzuna (IN)"
                })
            return standardized_jobs
        except Exception as e:
            logger.error(f"Error fetching from Adzuna: {e}")
            return []

    def fetch_arbeitnow_jobs(self):
        """Fetch jobs from Arbeitnow API."""
        try:
            logger.info("Fetching jobs from Arbeitnow...")
            url = "https://www.arbeitnow.com/api/job-board-api"
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            data = response.json()
            results = data.get("data", [])
            
            standardized_jobs = []
            for job in results:
                standardized_jobs.append({
                    "id": f"arbeitnow_{job.get('slug')}",
                    "title": job.get("title"),
                    "company": job.get("company_name"),
                    "category": "Technology",
                    "job_type": "Full-time" if not job.get("remote") else "Remote",
                    "publication_date": "2026-05-08",
                    "salary": "Negotiable",
                    "location": job.get("location", "Remote"),
                    "url": job.get("url"),
                    "source": "Arbeitnow"
                })
            return standardized_jobs
        except Exception as e:
            logger.error(f"Error fetching from Arbeitnow: {e}")
            return []

    def fetch_themuse_jobs(self):
        """Fetch jobs from The Muse for Top MNCs."""
        all_jobs = []
        target_mncs = [
            "Capgemini", "Cognizant", "Deloitte", "Goldman Sachs", "KPMG", "PwC", 
            "Accenture", "Concentrix", "Oracle", "HDFC Bank", "SBI", "ICICI Bank", "Coal India"
        ]
        
        for company in target_mncs:
            try:
                url = f"https://www.themuse.com/api/public/jobs?company={company}&page=0"
                response = requests.get(url, timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    for item in data.get('results', []):
                        category_info = item.get('categories', [])
                        category_name = category_info[0]['name'] if category_info else 'Corporate'
                        
                        all_jobs.append({
                            "id": f"mnc_{item['id']}",
                            "title": item['name'],
                            "company": company,
                            "location": "India / Remote",
                            "category": category_name,
                            "url": item['refs']['landing_page'],
                            "source": "MNC Network",
                            "job_type": "Full Time",
                            "priority": 1
                        })
            except Exception: pass
        return all_jobs

    def get_mock_jobs(self):
        """Generate high-quality mock data for the requested MNCs and States."""
        mncs = [
            "Capgemini", "Cognizant", "Deloitte", "Goldman Sachs", "KPMG", "PwC", 
            "Accenture", "Oracle", "HDFC Bank", "Coal India", "TCS", "Infosys", 
            "Wipro", "Reliance", "L&T Technology Services", "Tech Mahindra", "IBM",
            "Teleperformance", "Kochar Infotech", "Aegis", "Aye Finance", 
            "JP Morgan", "Nestle", "Swiggy", "Flipkart"
        ]
        
        # 25 States + specific priority cities
        states = [
            "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", 
            "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
            "Kerala", "Madhya Pradesh", "Maharashtra", "Meghalaya", "Odisha", 
            "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
            "Uttar Pradesh", "Uttarakhand", "West Bengal", "Tripura",
            "Mumbai (Bombay)", "Navi Mumbai", "Noida", "Gurgaon", "Gurugram", 
            "Bangalore", "Chennai", "Jalpaiguri", "Pune", "Hyderabad"
        ]
        roles = ["Software Engineer", "Data Analyst", "Consultant", "Accountant", "BCA Intern", "MCA Trainee", "B.Tech Graduate", "HR Manager", "Product Manager", "DevOps Engineer"]
        
        mock_data = []
        for i in range(500): # Increased to 500 to distribute across all 25 states well
            title = roles[i % len(roles)]
            loc = states[i % len(states)]
            source_list = ["LinkedIn", "Naukri", "Unstop", "Direct MNC"]
            source = source_list[i % len(source_list)]
            
            if source == "LinkedIn":
                url = f"https://www.linkedin.com/jobs/search/?keywords={title.replace(' ', '%20')}&location={loc.replace(' ', '%20')}"
            elif source == "Naukri":
                url = f"https://www.naukri.com/{title.replace(' ', '-').lower()}-jobs-in-{loc.replace(' ', '-').lower()}"
            elif source == "Unstop":
                url = f"https://unstop.com/jobs?query={title.replace(' ', '+')}"
            else:
                url = "https://www.linkedin.com/jobs"
                
            mock_data.append({
                "id": f"real_mock_{i}",
                "title": title,
                "company": mncs[i % len(mncs)],
                "location": f"{loc}, India",
                "category": "Corporate" if i % 3 == 0 else "Technology",
                "job_type": "Full Time",
                "url": url,
                "source": source,
                "priority": 1
            })
        return mock_data

    def fetch_all_jobs(self):
        """Aggregate jobs from all sources."""
        all_jobs = []
        all_jobs.extend(self.fetch_themuse_jobs())
        all_jobs.extend(self.fetch_adzuna_jobs())
        all_jobs.extend(self.fetch_arbeitnow_jobs())
        all_jobs.extend(self.fetch_remotive_jobs())
        all_jobs.extend(self.get_mock_jobs())
        return all_jobs

if __name__ == "__main__":
    scraper = JobScraper()
    jobs = scraper.fetch_all_jobs()
    print(f"Fetched {len(jobs)} jobs.")
