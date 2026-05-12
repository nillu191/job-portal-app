import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  Briefcase, Building2, MapPin, DollarSign, Download, 
  Play, RefreshCw, Layers, TrendingUp, Filter, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

const App = () => {
  const [data, setData] = useState({ jobs: [], analytics: {}, last_updated: null });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState('All');
  const [userSkills, setUserSkills] = useState('');
  const [userLocation, setUserLocation] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('Backend not responding');
      const result = await response.json();
      setData(result);
      setJobs(result.jobs || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Clear previous timeout
    if (window.searchTimeout) clearTimeout(window.searchTimeout);
    
    // Set new timeout for debouncing (300ms)
    window.searchTimeout = setTimeout(async () => {
      try {
        const response = await fetch(`/api/jobs/search?q=${query}`);
        if (!response.ok) throw new Error('Search failed');
        const result = await response.json();
        setJobs(result.jobs);
      } catch (err) {
        console.error('Search failed:', err);
      }
    }, 300);
  };

  const runPipeline = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pipeline/run', { method: 'POST' });
      if (!response.ok) throw new Error('Pipeline failed to start');
      fetchData();
    } catch (err) {
      console.error('Pipeline failed:', err);
      alert('Pipeline failed to run. Check if your API keys are added to Vercel.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    { title: 'Total Jobs', value: data.analytics.total_jobs || 0, icon: <Briefcase size={20} />, color: 'blue' },
    { title: 'Top Category', value: Object.keys(data.analytics.category_distribution || {})[0] || 'N/A', icon: <Layers size={20} />, color: 'purple' },
    { title: 'Top Company', value: Object.keys(data.analytics.top_companies || {})[0] || 'N/A', icon: <Building2 size={20} />, color: 'green' },
    { title: 'Locations', value: Object.keys(data.analytics.location_stats || {}).length || 0, icon: <MapPin size={20} />, color: 'yellow' },
  ];

  const chartData = data.analytics.category_distribution 
    ? Object.entries(data.analytics.category_distribution).map(([name, value]) => ({ name, value }))
    : [];

  const companyData = data.analytics.top_companies
    ? Object.entries(data.analytics.top_companies).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <div className="dashboard-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Classroom Job Portal <span style={{ color: 'var(--accent-primary)' }}>AI</span>
          </motion.h1>
          <p className="subtitle">Professional hiring intelligence and market analytics for India.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={fetchData}>
            <RefreshCw size={18} />
            Refresh
          </button>
          <button className="btn" onClick={runPipeline} disabled={loading}>
            {loading ? <RefreshCw className="spin" size={18} /> : <Play size={18} />}
            {loading ? 'Processing...' : 'Run Pipeline'}
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.title}
            className="glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ color: `var(--accent-${stat.color === 'blue' ? 'primary' : 'secondary'})` }}>{stat.icon}</div>
              <div className={`badge badge-${stat.color}`}>+12%</div>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{stat.title}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Hiring by Category</h3>
            <TrendingUp size={18} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="url(#colorGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel company-bg-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="company-bg-overlay"></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Top Hiring Companies</h3>
            <div className="company-logos-container" style={{ overflowX: 'auto', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'nowrap' }}>
                {(data.analytics.top_companies_list || []).map((company, i) => (
                  <div key={i} className="company-insight-card" style={{ flexShrink: 0 }}>
                    <img src={company.logo} alt={company.name} onError={(e) => e.target.src = 'https://via.placeholder.com/40?text=C'} />
                    <div>
                      <div className="name" style={{ color: 'white' }}>{company.name}</div>
                      <div className="count" style={{ color: '#e2e8f0' }}>{company.count} Openings</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rotating-pie-container" style={{ height: '220px', marginTop: '1rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={companyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name }) => name}
                    labelLine={false}
                  >
                  {companyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: 'none', color: 'white', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spotlight section removed as requested */}

      {/* Placement Analysis Grid */}
      <div className="charts-grid" style={{ marginBottom: '2.5rem' }}>
        <motion.div 
          className="glass-panel package-bg-panel"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="package-bg-overlay"></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e1b4b' }}>Package vs Placements Analysis</h3>
              <DollarSign size={22} style={{ color: '#4338ca' }} />
            </div>
            <div style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.analytics.top_packages || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ background: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="package" name="Package (LPA)" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="placements" name="Total Placements" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="glass-panel market-bg-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="market-bg-overlay"></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'white', marginBottom: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Market Placement Growth</h3>
            <div style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.analytics.top_packages || []}>
                  <defs>
                    <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" fontSize={10} stroke="#cbd5e1" />
                  <YAxis fontSize={10} stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '12px', color: 'white' }} />
                  <Area type="monotone" dataKey="placements" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorPlacements)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mass Recruiter 1-Year Historical Trend */}
      <motion.div 
        className="glass-panel recruiter-bg-panel"
        style={{ marginBottom: '2.5rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="recruiter-bg-overlay"></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Mass Recruiters: 1-Year Historical Hiring Volume</h3>
              <p style={{ color: '#e2e8f0', fontSize: '0.95rem', marginTop: '0.4rem', fontWeight: '500' }}>Tracking monthly recruitment drives and average offered salaries.</p>
            </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {data.analytics.average_salaries && Object.entries(data.analytics.average_salaries).map(([comp, sal], idx) => (
              <div key={comp} className="badge" style={{ fontSize: '0.8rem', padding: '6px 12px', background: COLORS[idx % COLORS.length] + '20', color: COLORS[idx % COLORS.length], border: `1px solid ${COLORS[idx % COLORS.length]}50` }}>
                {comp}: {sal}
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ height: '380px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.analytics.mass_recruiter_history || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="month" stroke="#cbd5e1" fontSize={13} fontWeight="600" tickLine={false} axisLine={false} />
              <YAxis stroke="#cbd5e1" fontSize={13} fontWeight="600" tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: 'white' }}
              />
              {data.analytics.average_salaries && Object.keys(data.analytics.average_salaries).map((comp, idx) => (
                <Line 
                  key={comp} 
                  type="monotone" 
                  dataKey={comp} 
                  stroke={COLORS[idx % COLORS.length]} 
                  strokeWidth={3}
                  dot={{ r: 4, fill: COLORS[idx % COLORS.length], strokeWidth: 0 }} 
                  activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>

      {/* Jobs Table */}
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Live Job Board</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="badge badge-green" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RefreshCw size={12} className="spin" />
              Daily Auto-Sync Active
            </div>
            
            {/* Smart Career Filter Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              onClick={() => setShowSkillModal(true)}
            >
              <Filter size={16} />
              Smart Career Filter
            </motion.button>

            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                placeholder="Search by title, company or location..." 
                className="btn-outline" 
                style={{ padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: '10px', width: '280px', outline: 'none' }}
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            {data.last_updated && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a href={`/api/download/${data.last_updated}`} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }} download>
                  <Download size={16} />
                  CSV
                </a>
                {data.last_updated_excel && (
                  <a href={`/api/download/${data.last_updated_excel}`} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }} download>
                    <Download size={16} />
                    Excel
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="data-table-container">
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Category</th>
                <th>Education</th>
                <th>Type</th>
                <th>Source</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode='popLayout'>
                {jobs.map((job, i) => (
                  <motion.tr 
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <td style={{ fontWeight: '600' }}>{job.title}</td>
                    <td>{job.company}</td>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} color="#71717a" /> {job.location}</div></td>
                    <td><span className="badge badge-blue">{job.category}</span></td>
                    <td><span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{job.education || 'General'}</span></td>
                    <td>{job.job_type}</td>
                    <td><span className="badge badge-purple">{job.source}</span></td>
                    <td>
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                        Apply Now
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {loading && (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <RefreshCw className="spin" size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-secondary)' }}>Loading job intelligence data...</p>
            </div>
          )}
          {!loading && jobs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
              <Layers size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              {searchQuery ? (
                <>
                  <h3>No matches found</h3>
                  <p style={{ marginTop: '0.5rem' }}>We couldn't find any jobs matching "{searchQuery}" in our database.</p>
                  <button className="btn btn-outline" style={{ marginTop: '1.5rem' }} onClick={() => { setSearchQuery(''); fetchData(); }}>
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <h3>No data available yet</h3>
                  <p style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>The system needs to run the first data collection. Please click the button below to start fetching live job data.</p>
                  <button className="btn" onClick={runPipeline}>
                    <Play size={18} />
                    Run First Data Pipeline
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>


      {/* Footer / Developer Credits */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="dev-info">
            <div className="dev-name">Developed by <span className="highlight">Niladri Majumder</span></div>
            <div className="dev-meta">
              <span className="meta-item"><MapPin size={14} /> Kolkata, India</span>
              <span className="meta-item"><Search size={14} /> niladrim826@gmail.com</span>
              <span className="meta-item"><Briefcase size={14} /> +91 7003284680</span>
            </div>
          </div>
          <div className="system-status">
            <div className="status-dot"></div>
            System Operational • Last Updated: {data.last_updated ? data.last_updated.split('_')[0] : 'Today'}
          </div>
        </div>
      </footer>

      <style>{`
        :root {
          --accent-primary: #4f46e5;
          --accent-secondary: #10b981;
          --bg-main: #f8fafc;
          --text-primary: #0f172a;
          --text-secondary: #64748b;
          --glass-bg: rgba(255, 255, 255, 0.9);
          --shadow-premium: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
        }

        /* Spotlight CSS removed */

        /* Rest of UI Styles */
        .dashboard-container { padding: 2.5rem; background: var(--bg-main); min-height: 100vh; font-family: 'Inter', sans-serif; }
        .glass-panel { background: white; padding: 2rem; border-radius: 30px; box-shadow: var(--shadow-premium); border: 1px solid #f1f5f9; }
        .btn { padding: 0.8rem 1.5rem; border-radius: 14px; font-weight: 700; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
        .btn-primary { background: var(--accent-primary); color: white; border: none; box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2); }
        .btn-outline { background: white; border: 1px solid #e2e8f0; color: var(--text-primary); }
        .badge { padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .badge-blue { background: rgba(59, 130, 246, 0.1); color: #2563eb; }
        .badge-green { background: rgba(16, 185, 129, 0.1); color: #059669; }
        .badge-purple { background: rgba(139, 92, 246, 0.1); color: #7c3aed; }
        
        .company-bg-panel {
          position: relative;
          overflow: hidden;
          background-image: url('/top_companies_bg.png');
          background-size: cover;
          background-position: center;
          border: none;
        }
        .company-bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(2px);
          z-index: 1;
        }
        .company-insight-card {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          padding: 0.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .company-insight-card img {
          width: 32px;
          height: 32px;
          border-radius: 8px;
        }
        .rotating-pie-container {
          animation: spin 30s linear infinite;
        }
        .recharts-pie-label-text {
          fill: white !important;
          font-weight: 600;
          font-size: 11px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        }

        .package-bg-panel {
          position: relative;
          overflow: hidden;
          background-image: url('/package_analysis_bg.png');
          background-size: cover;
          background-position: center;
          border: none;
        }
        .package-bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(1px);
          z-index: 1;
        }

        .recruiter-bg-panel {
          position: relative;
          overflow: hidden;
          background-image: url('/mass_recruiter_bg.png');
          background-size: cover;
          background-position: center;
          border: none;
        }
        .recruiter-bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(1px);
          z-index: 1;
        }

        .market-bg-panel {
          position: relative;
          overflow: hidden;
          background-image: url('/market_growth_bg.png');
          background-size: cover;
          background-position: center;
          border: none;
        }
        .market-bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(2px);
          z-index: 1;
        }
        
        .dashboard-footer { margin-top: 5rem; padding: 3rem; border-top: 1px solid #e2e8f0; text-align: center; }
        .highlight { color: var(--accent-primary); font-weight: 800; }
        .dev-meta { display: flex; justify-content: center; gap: 2rem; margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem; }
        .meta-item { display: flex; align-items: center; gap: 8px; }
        
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      {/* Smart Career Filter Modal */}
      <AnimatePresence>
        {showSkillModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowSkillModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="premium-modal"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Smart Career Matching</h3>
                <button className="close-btn" onClick={() => setShowSkillModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="input-group">
                  <label>Select Your Degree / Qualification</label>
                  <div className="degree-grid">
                    {['All', 'BCA', 'MCA', 'BSC', 'MSC', 'BTECH', 'MTECH', 'NON-TECH'].map(deg => (
                      <button 
                        key={deg}
                        className={`deg-chip ${selectedDegree === deg ? 'active' : ''}`}
                        onClick={() => setSelectedDegree(deg)}
                      >
                        {deg}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="input-group">
                  <label>Enter Your Top Skills (comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Python, React, Java, Accounting..." 
                    value={userSkills}
                    onChange={(e) => setUserSkills(e.target.value)}
                    className="modal-input"
                  />
                </div>
                <div className="input-group">
                  <label>Enter Preferred Location (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mumbai, Bangalore, Remote..." 
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    className="modal-input"
                  />
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
                  onClick={() => {
                    // Trigger filter logic
                    let filtered = data.jobs.filter(job => {
                      const jobEdu = job.education || 'General';
                      const matchesDegree = selectedDegree === 'All' || jobEdu.includes(selectedDegree);
                      const skillsArr = userSkills.toLowerCase().split(',').map(s => s.trim()).filter(s => s);
                      const matchesSkills = skillsArr.length === 0 || skillsArr.some(s => 
                        (job.title && job.title.toLowerCase().includes(s)) || 
                        (job.category && job.category.toLowerCase().includes(s))
                      );
                      const locQuery = userLocation.trim().toLowerCase();
                      const matchesLocation = !locQuery || (job.location && job.location.toLowerCase().includes(locQuery));
                      return matchesDegree && matchesSkills && matchesLocation;
                    });

                    // Ensure dynamic direct access to LinkedIn & Naukri for real daily openings
                    if (userSkills.trim() !== '') {
                        const skillsArr = userSkills.toLowerCase().split(',').map(s => s.trim()).filter(s => s);
                        const primarySkill = skillsArr[0];
                        const locName = userLocation.trim() ? userLocation.trim() : 'India';
                        
                        filtered.unshift({
                            id: 'dyn_linkedin_' + Date.now(),
                            title: `All ${primarySkill} Jobs (Live Search)`,
                            company: 'LinkedIn Network',
                            location: locName,
                            category: 'Technology',
                            education: selectedDegree !== 'All' ? selectedDegree : 'Any Degree',
                            job_type: 'Full Time',
                            source: 'LinkedIn',
                            url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(primarySkill)}&location=${encodeURIComponent(locName)}`
                        });

                        filtered.unshift({
                            id: 'dyn_naukri_' + Date.now(),
                            title: `Latest ${primarySkill} Openings (Live Search)`,
                            company: 'Naukri Network',
                            location: locName === 'India' ? 'Pan India' : locName,
                            category: 'Technology',
                            education: selectedDegree !== 'All' ? selectedDegree : 'Any Degree',
                            job_type: 'Full Time',
                            source: 'Naukri',
                            url: `https://www.naukri.com/${encodeURIComponent(primarySkill.replace(/\s+/g, '-'))}-jobs-in-${encodeURIComponent(locName.replace(/\s+/g, '-').toLowerCase())}`
                        });
                    }

                    setJobs(filtered);
                    setShowSkillModal(false);
                  }}
                >
                  Match My Career Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .premium-modal {
          background: white;
          width: 100%;
          max-width: 500px;
          border-radius: 32px;
          padding: 2.5rem;
          box-shadow: 0 30px 60px -12px rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.8);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .modal-header h3 { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.03em; }
        .close-btn { background: #f1f5f9; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; }
        
        .input-group { margin-bottom: 1.5rem; }
        .input-group label { display: block; font-weight: 700; margin-bottom: 0.75rem; font-size: 0.9rem; color: var(--text-secondary); }
        
        .degree-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .deg-chip { 
          padding: 8px 16px; 
          border-radius: 12px; 
          border: 1px solid #e2e8f0; 
          background: white; 
          font-weight: 600; 
          font-size: 0.85rem; 
          cursor: pointer;
          transition: all 0.2s;
        }
        .deg-chip.active { background: var(--accent-primary); color: white; border-color: var(--accent-primary); }
        
        .modal-input {
          width: 100%;
          padding: 1rem;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          outline: none;
          font-weight: 500;
        }
        .modal-input:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }
      `}</style>
    </div>
  );
};

export default App;
