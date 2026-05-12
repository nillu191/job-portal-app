import pandas as pd
import os
import numpy as np
from datetime import datetime

class DataProcessor:
    def __init__(self, data_dir="data"):
        self.data_dir = data_dir
        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)

    def process_jobs(self, jobs):
        """Process and standardize job data with educational tagging."""
        df = pd.DataFrame(jobs)
        
        # Add educational tagging for smart filtering
        def tag_education(row):
            title = str(row['title']).upper()
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

        df['education'] = df.apply(tag_education, axis=1)
        
        # Simulate placements and packages for top MNCs
        mncs = ["Capgemini", "Cognizant", "Deloitte", "Goldman Sachs", "KPMG", "PwC", "Accenture", "Oracle"]
        df['is_mnc'] = df['company'].apply(lambda x: any(m.lower() in str(x).lower() for m in mncs))
        
        # Simulated stats for dashboard
        df['placements'] = df['is_mnc'].apply(lambda x: np.random.randint(50, 200) if x else np.random.randint(5, 50))
        df['package'] = df['is_mnc'].apply(lambda x: np.random.randint(6, 25) if x else np.random.randint(3, 8))
        
        # Ensure directories exist
        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)
            
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        csv_path = os.path.join(self.data_dir, f"jobs_{timestamp}.csv")
        excel_path = os.path.join(self.data_dir, f"jobs_{timestamp}.xlsx")
        
        df.to_csv(csv_path, index=False)
        df.to_excel(excel_path, index=False)
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
        """Generate analytics from the cleaned dataframe."""
        if df.empty:
            return {}

        top_companies_names = df['company'].value_counts().head(10).index.tolist()
        top_companies_with_logos = []
        top_packages = []
        
        for name in top_companies_names:
            count = int(df[df['company'] == name].shape[0])
            # Heuristic for top package: Random between 18-45 LPA for top tech, else 10-25
            is_big_tech = name in ["TCS", "Infosys", "Google", "Microsoft", "Amazon", "Flipkart"]
            base = 20 if is_big_tech else 10
            pkg = base + (hash(name) % 25)
            
            top_companies_with_logos.append({
                "name": name, 
                "count": count, 
                "logo": self.get_company_logo(name),
                "placements": count * 5, # Simulated placements
                "top_package": f"{pkg} LPA"
            })
            top_packages.append({"name": name, "package": pkg, "placements": count * 5})

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
                month_data[name] = max(50, vol) # Ensure no negative/too small values
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
            "category_distribution": df['category'].value_counts().head(10).to_dict(),
            "location_stats": df['location'].value_counts().head(10).to_dict(),
            "job_types": df['job_type'].value_counts().to_dict(),
            "mass_recruiter_history": mass_recruiter_history,
            "average_salaries": average_salaries
        }
        return analytics
