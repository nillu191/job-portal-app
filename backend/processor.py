import pandas as pd
import os
import numpy as np
from datetime import datetime

class DataProcessor:
    def __init__(self, data_dir=None):
        if data_dir is None:
            # Use /tmp on Vercel as it's the only writable directory
            if os.environ.get('VERCEL'):
                self.data_dir = "/tmp/data"
            else:
                self.data_dir = "data"
        else:
            self.data_dir = data_dir
            
        if not os.path.exists(self.data_dir):
            try:
                os.makedirs(self.data_dir)
            except Exception:
                pass # Might be read-only in some environments

    def process_jobs(self, jobs):
        """Process and standardize job data with educational tagging and filters."""
        df = pd.DataFrame(jobs)
        
        # Add educational tagging for smart filtering
        def tag_education(row):
            title = str(row.get('title', '')).upper()
            tags = []
            if any(k in title for k in ['BCA', 'MCA', 'BSC', 'MSC', 'B.TECH', 'BTECH', 'M.TECH', 'MTECH']):
                if 'BCA' in title: tags.append('BCA')
                if 'MCA' in title: tags.append('MCA')
                if 'BSC' in title: tags.append('BSC')
                if 'MSC' in title: tags.append('MSC')
                if 'BTECH' in title or 'B.TECH' in title: tags.append('BTECH')
                if 'MTECH' in title or 'M.TECH' in title: tags.append('MTECH')
            else:
                # Default tags based on common roles
                if any(k in title for k in ['SOFTWARE', 'DEVELOPER', 'ENGINEER']):
                    tags.extend(['BTECH', 'MCA', 'BCA'])
                if any(k in title for k in ['DATA', 'ANALYST', 'SCIENCE']):
                    tags.extend(['BSC', 'MSC', 'BTECH'])
                if any(k in title for k in ['HR', 'MARKETING', 'SALES', 'BANKING']):
                    tags.append('NON-TECH')
            return ", ".join(list(set(tags))) if tags else "General"

        # Add experience level tagging
        def tag_experience(row):
            title = str(row.get('title', '')).lower()
            if any(k in title for k in ['intern', 'trainee', 'fresher', 'junior', 'graduate', 'entry', '0-1 year', '0-2 years']):
                return "Fresher"
            return "Experienced"

        # Normalize job type
        def normalize_job_type(row):
            jt = str(row.get('job_type', '')).lower()
            loc = str(row.get('location', '')).lower()
            
            if 'remote' in jt or 'remote' in loc:
                return "Remote"
            if 'hybrid' in jt or 'hybrid' in loc:
                return "Hybrid"
            return "On-site"

        df['education'] = df.apply(tag_education, axis=1)
        df['experience_level'] = df.apply(tag_experience, axis=1)
        df['job_type'] = df.apply(normalize_job_type, axis=1)
        
        # Simulate placements and packages for top MNCs
        mncs = ["Capgemini", "Cognizant", "Deloitte", "Goldman Sachs", "KPMG", "PwC", "Accenture", "Oracle"]
        df['is_mnc'] = df['company'].apply(lambda x: any(m.lower() in str(x).lower() for m in mncs))
        
        # Simulated stats for dashboard
        df['placements'] = df['is_mnc'].apply(lambda x: np.random.randint(50, 200) if x else np.random.randint(5, 50))
        
        # Ensure package is always a numeric value (LPA)
        def get_package(row):
            if 'package' in row and row['package'] is not None:
                return row['package']
            return np.random.randint(6, 25) if row['is_mnc'] else np.random.randint(3, 8)
            
        df['package'] = df.apply(get_package, axis=1)
        
        # Ensure directories exist
        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)
            
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        csv_path = os.path.join(self.data_dir, f"jobs_{timestamp}.csv")
        excel_path = os.path.join(self.data_dir, f"jobs_{timestamp}.xlsx")
        
        try:
            df.to_csv(csv_path, index=False)
            df.to_excel(excel_path, index=False)
        except Exception as e:
            print(f"Warning: Could not save files: {e}")
        
        df = df.astype(object).where(pd.notnull(df), None)
        
        return df, csv_path, excel_path

    def get_company_logo(self, company_name):
        """Get a placeholder logo URL for a company."""
        # Use Clearbit Logo API or a similar service
        domain_map = {
            "TCS": "tcs.com",
            "Infosys": "infosys.com",
            "Wipro": "wipro.com",
            "HCLTech": "hcltech.com",
            "Zomato": "zomato.com",
            "Swiggy": "swiggy.com",
            "Paytm": "paytm.com",
            "Flipkart": "flipkart.com",
            "Google": "google.com",
            "Microsoft": "microsoft.com",
            "Amazon": "amazon.com"
        }
        domain = domain_map.get(company_name, f"{company_name.lower().replace(' ', '')}.com")
        return f"https://logo.clearbit.com/{domain}"

    def get_analytics(self, df):
        """Generate enhanced analytics from the cleaned dataframe."""
        if df.empty:
            return {}

        top_companies_names = df['company'].value_counts().head(10).index.tolist()
        top_companies_with_logos = []
        top_packages = []
        
        for name in top_companies_names:
            count = int(df[df['company'] == name].shape[0])
            is_big_tech = name in ["TCS", "Infosys", "Google", "Microsoft", "Amazon", "Flipkart"]
            base = 20 if is_big_tech else 10
            pkg = base + (hash(name) % 25)
            
            top_companies_with_logos.append({
                "name": name, 
                "count": count, 
                "logo": self.get_company_logo(name),
                "placements": count * 5,
                "top_package": f"{pkg} LPA"
            })
            top_packages.append({"name": name, "package": pkg, "placements": count * 5})

        # Market Growth Trend (Multi-year) - Increasing to Decreasing wise ordering
        years = ["2021", "2022", "2023", "2024", "2025"]
        # Values: 450, 780, 1200, 950, 600 (Bell curve shape)
        trend_values = [450, 780, 1200, 950, 600]
        market_growth_trend = []
        for i, year in enumerate(years):
            market_growth_trend.append({
                "year": year,
                "placements": trend_values[i],
                "total_recruitments": trend_values[i] + np.random.randint(100, 300)
            })

        # Ensure 6+ categories
        categories = df['category'].value_counts().to_dict()
        default_categories = ["Technology", "Healthcare", "Finance", "Education", "Marketing", "Operations"]
        for cat in default_categories:
            if cat not in categories:
                categories[cat] = np.random.randint(10, 50)
        
        # Take top 6-8 categories
        category_distribution = dict(sorted(categories.items(), key=lambda x: x[1], reverse=True)[:8])

        # Generate 1-year historical data for top mass recruiters
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        mass_recruiter_history = []
        top_5_names = top_companies_names[:5]
        
        for i, month in enumerate(months):
            month_data = {"month": month}
            for name in top_5_names:
                base_vol = 150 + (hash(name) % 300)
                seasonal_multiplier = 1.5 if month in ["Aug", "Sep", "Jan"] else 1.0
                vol = int(base_vol * seasonal_multiplier + np.random.randint(-20, 50))
                month_data[name] = max(50, vol)
            mass_recruiter_history.append(month_data)
            
        average_salaries = {}
        for name in top_5_names:
             is_big_tech = name in ["TCS", "Infosys", "Google", "Microsoft", "Amazon", "Flipkart"]
             base = 8 if is_big_tech else 5
             avg_lpa = base + (hash(name) % 7) + 0.5
             average_salaries[name] = f"{avg_lpa} LPA"

        analytics = {
            "total_jobs": len(df),
            "top_companies_list": top_companies_with_logos,
            "top_packages": sorted(top_packages, key=lambda x: x['package'], reverse=True)[:6],
            "top_companies": df['company'].value_counts().head(10).to_dict(),
            "category_distribution": category_distribution,
            "location_stats": df['location'].value_counts().head(10).to_dict(),
            "job_types": df['job_type'].value_counts().to_dict(),
            "mass_recruiter_history": mass_recruiter_history,
            "market_growth_trend": market_growth_trend,
            "average_salaries": average_salaries
        }
        return analytics
