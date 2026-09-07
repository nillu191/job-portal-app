import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  Briefcase, Building2, MapPin, DollarSign, Download, 
  Play, RefreshCw, Layers, TrendingUp, Filter, Search,
  UserPlus, Calendar, Sparkles, Star, Award, CheckCircle,
  Video, Clock, MessageSquare, ArrowRight, ShieldCheck,
  Check, HeartHandshake, Zap, Users, X, FileText, UploadCloud,
  Cpu, FileCheck, CheckCircle2, Target, AlertCircle, FileUp,
  Shield, Lock, ArrowLeft, Send, Eye, EyeOff, KeyRound, Key, ShieldAlert, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PromotionalAds } from './components/PromotionalAds';
import { AdminPortal } from './components/AdminPortal';
import { CareerArticlesHub } from './components/CareerArticlesHub';
import { Tech3DHomepage } from './components/Tech3DHomepage';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

const DEFAULT_MENTORS = [
  {
    id: 'm1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@google.com',
    role: 'Senior SDE-3',
    company: 'Google',
    exp: '7+ yrs',
    rating: 4.9,
    sessions: 142,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    tags: ['System Design', 'DSA', 'MAANG Prep'],
    rate: '₹2,000 / hr',
    hourlyRate: '₹2,000/hr',
    approved: true,
    active: true
  },
  {
    id: 'm2',
    name: 'Priya Mukherjee',
    email: 'priya.m@microsoft.com',
    role: 'Staff Engineer',
    company: 'Microsoft',
    exp: '9+ yrs',
    rating: 5.0,
    sessions: 198,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tags: ['Cloud / Azure', 'Resume Roast', 'Leadership'],
    rate: '₹2,500 / hr',
    hourlyRate: '₹2,500/hr',
    approved: true,
    active: true
  },
  {
    id: 'm3',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@amazon.com',
    role: 'Engineering Lead',
    company: 'Amazon',
    exp: '8+ yrs',
    rating: 4.9,
    sessions: 215,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    tags: ['Backend', 'Mock Interview', 'AWS'],
    rate: '₹1,800 / hr',
    hourlyRate: '₹1,800/hr',
    approved: true,
    active: true
  },
  {
    id: 'm4',
    name: 'Ananya Roy',
    email: 'ananya.roy@uber.com',
    role: 'Lead AI Engineer',
    company: 'Uber',
    exp: '6+ yrs',
    rating: 4.95,
    sessions: 110,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    tags: ['AI/ML', 'Python', 'Career Switch'],
    rate: '₹2,200 / hr',
    hourlyRate: '₹2,200/hr',
    approved: true,
    active: true
  }
];

const DOMAIN_ROLES = [
  'All domains',
  'Backend Development',
  'Frontend Development',
  'Full Stack Development',
  'Mobile Development',
  'Artificial Intelligence',
  'Data',
  'Cloud Computing',
  'DevOps',
  'Cybersecurity',
  'UI/UX',
  'Desktop Development',
  'Software Testing',
  'Embedded Systems & IoT',
  'Game Development',
  'Blockchain & Web3',
  'AR/VR/XR',
  'Database Engineering',
  'Enterprise Software',
  'Networking',
  'System Engineering',
  'Product Engineering',
  'Architecture',
  'Engineering Leadership',
  'Developer Relations',
  'Technical Writing',
  'Education',
  'Research',
  'FinTech',
  'HealthTech',
  'Robotics',
  'Quantum Computing',
  'Low-Code/No-Code',
  'ERP/CRM',
  'Emerging Careers'
];

const DOMAIN_SKILLS_MAP = {
  'Backend Development': ['Java', 'Node.js', 'Python', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Redis', 'AWS', 'REST API', 'System Design'],
  'Frontend Development': ['React', 'JavaScript', 'TypeScript', 'Next.js', 'HTML', 'CSS', 'Tailwind', 'Redux', 'Vue', 'UI Performance'],
  'Full Stack Development': ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'GraphQL', 'REST API', 'Tailwind'],
  'Mobile Development': ['Flutter', 'React Native', 'Android', 'iOS', 'Kotlin', 'Swift', 'Mobile UI', 'REST APIs', 'Firebase'],
  'Artificial Intelligence': ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'NLP', 'LLMs', 'Computer Vision', 'Generative AI', 'FastAPI'],
  'Data': ['Data Engineering', 'SQL', 'Python', 'Pandas', 'Spark', 'ETL', 'PostgreSQL', 'Snowflake', 'Tableau', 'Big Data'],
  'Cloud Computing': ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Cloud Architecture', 'Docker', 'Serverless', 'IAM', 'DevOps'],
  'DevOps': ['Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Terraform', 'Linux', 'AWS', 'Ansible', 'GitOps', 'Monitoring'],
  'Cybersecurity': ['Cybersecurity', 'Penetration Testing', 'SIEM', 'Network Security', 'SOC', 'Cryptography', 'Vulnerability Assessment', 'ISO 27001', 'Cloud Security'],
  'UI/UX': ['Figma', 'UI Design', 'UX Research', 'Wireframing', 'Prototyping', 'Design Systems', 'User Testing', 'Interaction Design'],
  'Desktop Development': ['C++', 'C#', '.NET', 'WPF', 'Qt', 'Electron', 'Rust', 'Windows API', 'macOS App'],
  'Software Testing': ['QA Automation', 'Selenium', 'Playwright', 'Cypress', 'API Testing', 'JUnit', 'Performance Testing', 'JMeter', 'Manual Testing'],
  'Embedded Systems & IoT': ['Embedded C', 'C++', 'RTOS', 'Microcontrollers', 'ARM', 'IoT Protocols', 'MQTT', 'Firmware', 'Raspberry Pi'],
  'Game Development': ['Unity', 'Unreal Engine', 'C#', 'C++', '3D Math', 'Shaders', 'Game Physics', 'Godot', 'Multiplayer'],
  'Blockchain & Web3': ['Solidity', 'Smart Contracts', 'Ethereum', 'Web3.js', 'Rust', 'DeFi', 'Hardhat', 'NFTs', 'Cryptography'],
  'AR/VR/XR': ['Unity', 'Unreal Engine', 'OpenXR', 'WebXR', 'ARKit', 'ARCore', '3D Modeling', 'Spatial Audio', 'Oculus SDK'],
  'Database Engineering': ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Database Administration', 'Query Optimization', 'SQL Tuning', 'Cassandra', 'Data Modeling'],
  'Enterprise Software': ['Java Enterprise', 'SAP', 'Salesforce', 'ServiceNow', 'Microservices', 'Enterprise Architecture', 'Integration', 'Oracle', 'Spring'],
  'Networking': ['TCP/IP', 'Routing & Switching', 'Cisco', 'Network Architecture', 'VPN', 'Firewalls', 'BGP', 'SDN', 'Wireshark'],
  'System Engineering': ['Linux Systems', 'C/C++', 'System Design', 'OS Internals', 'Concurrency', 'Distributed Systems', 'Kernel', 'Performance Profiling'],
  'Product Engineering': ['Product Architecture', 'Full Stack', 'Agile', 'System Design', 'User Metrics', 'Scalability', 'CI/CD', 'API First'],
  'Architecture': ['System Architecture', 'Microservices', 'Event-Driven', 'Cloud Native', 'Design Patterns', 'High Availability', 'Domain-Driven Design', 'Security Architecture'],
  'Engineering Leadership': ['Engineering Management', 'Tech Leadership', 'Hiring & Mentoring', 'Agile/Scrum', 'System Architecture', 'Delivery Management', 'Strategic Roadmap'],
  'Developer Relations': ['DevRel', 'Technical Evangelism', 'Community Building', 'Technical Content', 'SDK/APIs', 'Public Speaking', 'Open Source', 'Hackathons'],
  'Technical Writing': ['Technical Documentation', 'API Docs', 'Markdown', 'GitBook', 'Developer Guides', 'Release Notes', 'Swagger/OpenAPI', 'Content Strategy'],
  'Education': ['Tech Tutoring', 'Curriculum Design', 'Instructional Tech', 'Computer Science Teaching', 'Mentorship', 'Workshops', 'EdTech'],
  'Research': ['Computer Science Research', 'AI Research', 'Algorithm Design', 'Paper Publication', 'Data Modeling', 'Mathematical Modeling', 'Benchmarking'],
  'FinTech': ['FinTech', 'Payment Gateways', 'Trading Algorithms', 'Core Banking', 'Risk Modeling', 'PCI-DSS', 'Financial APIs', 'Blockchain', 'High-Frequency Trading'],
  'HealthTech': ['HealthTech', 'HIPAA Compliance', 'Medical Imaging', 'FHIR/HL7', 'Telehealth', 'Clinical Data Analysis', 'Biomedical AI', 'Healthcare Security'],
  'Robotics': ['ROS / ROS2', 'Robotics Control', 'C++', 'Python', 'Kinematics', 'Computer Vision', 'SLAM', 'Motion Planning', 'Sensors & Actuators'],
  'Quantum Computing': ['Qiskit', 'Quantum Algorithms', 'Python', 'Linear Algebra', 'Cirq', 'Quantum Cryptography', 'Q#', 'Quantum Mechanics'],
  'Low-Code/No-Code': ['Appian', 'OutSystems', 'Power Apps', 'Mendix', 'Zapier', 'Bubble', 'Workflow Automation', 'API Connectors'],
  'ERP/CRM': ['SAP S/4HANA', 'Salesforce CRM', 'Oracle ERP', 'Dynamics 365', 'ABAP', 'Apex', 'HubSpot', 'ERP Implementation'],
  'Emerging Careers': ['GenAI Engineering', 'Prompt Engineering', 'Spatial Computing', 'Bioinformatics', 'Edge Computing', 'Green Tech', 'Autonomous Systems']
};

const App = () => {
  const [data, setData] = useState({ jobs: [], analytics: {}, last_updated: null });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState('All');
  const [userSkills, setUserSkills] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 50 });
  const [selectedDomainRole, setSelectedDomainRole] = useState('All domains');

  // Dynamic Mentors, Consultations & Ads States
  const [mentors, setMentors] = useState(DEFAULT_MENTORS);
  const [allMentors, setAllMentors] = useState(DEFAULT_MENTORS);
  const [consultations, setConsultations] = useState([]);
  const [ads, setAds] = useState([]);
  const [allAds, setAllAds] = useState([]);

  // 3D Homepage View & User Session State
  const [currentView, setCurrentView] = useState('home'); // 'home' (3D Homepage) or 'hub' (Main Portal)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('recruiters_hub_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleUserLogout = () => {
    localStorage.removeItem('recruiters_hub_user');
    setCurrentUser(null);
    setCurrentView('home');
  };

  // Admin View & Master Password Authentication
  const [isAdminView, setIsAdminView] = useState(false);
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState('');
  const [isAuthenticatingAdmin, setIsAuthenticatingAdmin] = useState(false);
  const [showAdminPasswordInput, setShowAdminPasswordInput] = useState(false);
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);
  const [setupNewPin, setSetupNewPin] = useState('');
  const [setupConfirmPin, setSetupConfirmPin] = useState('');
  const [showSetupPins, setShowSetupPins] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'setup'

  // Mentor & Consultation Modals State
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentorSubmitted, setMentorSubmitted] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isSubmittingConsultation, setIsSubmittingConsultation] = useState(false);
  const [isSubmittingMentorApp, setIsSubmittingMentorApp] = useState(false);

  const [mentorForm, setMentorForm] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    experience: '3-5 years',
    expertise: ['System Design', 'Mock Interview'],
    hourlyRate: '₹1,500/hr',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    linkedin: '',
    bio: ''
  });

  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    serviceTopic: '1:1 Mock Interview & Coding',
    targetRole: '',
    preferredSlot: 'Tomorrow • 7:00 PM - 8:00 PM',
    mentorPreference: 'Any Top Recommended Mentor',
    mentorId: null,
    notes: ''
  });

  // AI Resume Matcher States
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isScanningResume, setIsScanningResume] = useState(false);
  const [resumeScanStep, setResumeScanStep] = useState(0);
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeSkills, setResumeSkills] = useState([]);
  const [isResumeActive, setIsResumeActive] = useState(false);
  const [resumeMatchTab, setResumeMatchTab] = useState('all');
  const [resumeInputText, setResumeInputText] = useState('');

  const KNOWN_SKILLS = [
    'react', 'node.js', 'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'golang', 'rust',
    'sql', 'postgresql', 'mongodb', 'mysql', 'redis', 'aws', 'azure', 'gcp', 'docker', 'kubernetes',
    'system design', 'machine learning', 'ai', 'data science', 'deep learning', 'nlp', 'pytorch', 'tensorflow',
    'django', 'flask', 'fastapi', 'spring boot', 'html', 'css', 'tailwind', 'devops', 'ci/cd', 'git',
    'microservices', 'graphql', 'rest api', 'agile', 'qa', 'testing', 'salesforce', 'ui/ux', 'figma'
  ];

  const SAMPLE_RESUMES = [
    {
      title: 'Full-Stack React & Node.js Developer',
      role: 'Full Stack Engineer',
      fileName: 'Alex_Fullstack_SDE_Resume.pdf',
      text: 'Senior Full Stack Developer with 4 years of experience building scalable web apps using React, Node.js, TypeScript, PostgreSQL, MongoDB, Docker, AWS, GraphQL, REST APIs, and Tailwind CSS.',
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'System Design', 'REST API', 'Tailwind']
    },
    {
      title: 'AI & Machine Learning Specialist',
      role: 'AI / Data Science Engineer',
      fileName: 'Sarah_AI_ML_Resume.pdf',
      text: 'Data Scientist & Machine Learning Engineer with expertise in Python, PyTorch, TensorFlow, NLP, Deep Learning, SQL, Pandas, NumPy, Scikit-Learn, FastAPI, and AWS Cloud AI pipelines.',
      skills: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'NLP', 'SQL', 'Data Science', 'FastAPI', 'AWS']
    },
    {
      title: 'Cloud Backend / Java Architect',
      role: 'Backend SDE',
      fileName: 'Vikram_Java_Cloud_Resume.pdf',
      text: 'Lead Backend Developer proficient in Java, Spring Boot, Microservices, Kubernetes, Docker, AWS, Redis, PostgreSQL, Distributed Systems, CI/CD, and System Architecture.',
      skills: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes', 'AWS', 'Docker', 'Redis', 'PostgreSQL', 'System Design', 'CI/CD']
    },
    {
      title: 'Fresher / Entry Tech Graduate',
      role: 'Fresher / Associate SDE',
      fileName: 'Aniket_Fresher_BTech_Resume.pdf',
      text: 'Recent Computer Science B.Tech graduate skilled in Python, Java, Data Structures & Algorithms (DSA), SQL, React, HTML, CSS, JavaScript, Git, Problem Solving.',
      skills: ['Java', 'Python', 'DSA', 'SQL', 'React', 'JavaScript', 'HTML', 'Git', 'Problem Solving']
    }
  ];

  // Fetch all backend data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      if (response.ok) {
        const result = await response.json();
        setData(result);
        setJobs(result.jobs || []);
      }
    } catch (err) {
      console.warn('Jobs API call error (offline/fallback mode):', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMentorsAndAds = async () => {
    try {
      // 1. Fetch public mentors
      const mRes = await fetch('/api/mentors');
      if (mRes.ok) {
        const mData = await mRes.json();
        if (mData.mentors && mData.mentors.length > 0) {
          setMentors(mData.mentors);
        }
      }

      // 2. Fetch all mentors (for admin)
      const allMRes = await fetch('/api/mentors?all=true');
      if (allMRes.ok) {
        const allMData = await allMRes.json();
        if (allMData.mentors) {
          setAllMentors(allMData.mentors);
        }
      }

      // 3. Fetch public ads
      const adRes = await fetch('/api/ads');
      if (adRes.ok) {
        const adData = await adRes.json();
        if (adData.ads) {
          setAds(adData.ads);
        }
      }

      // 4. Fetch all ads (for admin)
      const allAdRes = await fetch('/api/ads?all=true');
      if (allAdRes.ok) {
        const allAdData = await allAdRes.json();
        if (allAdData.ads) {
          setAllAds(allAdData.ads);
        }
      }

      // 5. Fetch consultations for owner
      const cRes = await fetch('/api/consultations');
      if (cRes.ok) {
        const cData = await cRes.json();
        if (cData.consultations) {
          setConsultations(cData.consultations);
        }
      }
    } catch (e) {
      console.warn('Mentor/Ad backend endpoints error:', e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMentorsAndAds();
  }, []);

  // Handle User Consultation Booking Submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email) {
      alert('Please fill in your Name and Email for the consultation.');
      return;
    }

    setIsSubmittingConsultation(true);
    try {
      const payload = {
        name: bookingForm.name,
        email: bookingForm.email,
        serviceTopic: bookingForm.serviceTopic,
        targetRole: bookingForm.targetRole,
        preferredSlot: bookingForm.preferredSlot,
        mentorId: selectedMentor ? selectedMentor.id : null,
        mentorPreference: selectedMentor 
          ? `${selectedMentor.name} (${selectedMentor.role} @ ${selectedMentor.company})` 
          : bookingForm.mentorPreference,
        notes: bookingForm.notes
      };

      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setConsultations(prev => [data.consultation || payload, ...prev]);
      } else {
        // Fallback local state
        setConsultations(prev => [{ ...payload, id: 'c_' + Date.now(), status: 'Pending', createdAt: new Date().toISOString() }, ...prev]);
      }

      setBookingSubmitted(true);
    } catch (err) {
      console.error('Failed to submit consultation booking:', err);
      setBookingSubmitted(true);
    } finally {
      setIsSubmittingConsultation(false);
    }
  };

  // Handle User "Become a Mentor" Submit
  const handleMentorApplicationSubmit = async (e) => {
    e.preventDefault();
    if (!mentorForm.name || !mentorForm.email) {
      alert('Please provide your Name and Work Email.');
      return;
    }

    setIsSubmittingMentorApp(true);
    try {
      const res = await fetch('/api/mentors/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mentorForm)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.application) {
          setAllMentors(prev => [data.application, ...prev]);
        }
      }
      setMentorSubmitted(true);
      fetchMentorsAndAds();
    } catch (err) {
      console.error('Failed to apply as mentor:', err);
      setMentorSubmitted(true);
    } finally {
      setIsSubmittingMentorApp(false);
    }
  };

  // Admin Actions
  const handleApproveMentor = async (mentorId) => {
    try {
      const res = await fetch(`/api/mentors/${mentorId}/approve`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        alert(data.message || 'Mentor approved & pushed to live site!');
      } else {
        // Local fallback
        setAllMentors(prev => prev.map(m => m.id === mentorId ? { ...m, approved: true, active: true, status: 'approved' } : m));
        const approvedM = allMentors.find(m => m.id === mentorId);
        if (approvedM) {
          setMentors(prev => [{ ...approvedM, approved: true, active: true, status: 'approved' }, ...prev]);
        }
      }
      fetchMentorsAndAds();
    } catch (err) {
      console.error('Error approving mentor:', err);
    }
  };

  const handleAdminAddMentor = async (newMentorData) => {
    try {
      const res = await fetch('/api/mentors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMentorData)
      });
      if (res.ok) {
        const data = await res.json();
        alert('🎉 Mentor published and pushed to Live Website!');
      }
      fetchMentorsAndAds();
    } catch (err) {
      console.error('Error adding mentor:', err);
    }
  };

  const handleDeleteMentor = async (mentorId) => {
    try {
      await fetch(`/api/mentors/${mentorId}`, { method: 'DELETE' });
      fetchMentorsAndAds();
    } catch (err) {
      console.error('Error deleting mentor:', err);
    }
  };

  const handleToggleMentorActive = async (mentorId, active) => {
    try {
      await fetch(`/api/mentors/${mentorId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active })
      });
      fetchMentorsAndAds();
    } catch (err) {
      console.error('Error updating mentor:', err);
    }
  };

  const handleUpdateConsultationStatus = async (consultId, status) => {
    try {
      await fetch(`/api/consultations/${consultId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setConsultations(prev => prev.map(c => c.id === consultId ? { ...c, status } : c));
    } catch (err) {
      console.error('Error updating consultation status:', err);
    }
  };

  const handleDeleteConsultation = async (consultId) => {
    if (!confirm('Are you sure you want to delete this consultation message?')) return;
    try {
      await fetch(`/api/consultations/${consultId}`, { method: 'DELETE' });
      setConsultations(prev => prev.filter(c => c.id !== consultId));
    } catch (err) {
      console.error('Error deleting consultation:', err);
    }
  };

  const handleCreateAd = async (newAdData) => {
    try {
      const res = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdData)
      });
      if (res.ok) {
        alert('🚀 Ad Campaign launched and running on website!');
      }
      fetchMentorsAndAds();
    } catch (err) {
      console.error('Error creating ad:', err);
    }
  };

  const handleToggleAdActive = async (adId, active) => {
    try {
      await fetch(`/api/ads/${adId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active })
      });
      fetchMentorsAndAds();
    } catch (err) {
      console.error('Error toggling ad:', err);
    }
  };

  const handleDeleteAd = async (adId) => {
    if (!confirm('Delete this ad campaign?')) return;
    try {
      await fetch(`/api/ads/${adId}`, { method: 'DELETE' });
      fetchMentorsAndAds();
    } catch (err) {
      console.error('Error deleting ad:', err);
    }
  };

  // Quick Open Modal from Ad or Mentor Card
  const openConsultModalForMentor = (mentorObj) => {
    setSelectedMentor(mentorObj);
    setBookingForm(prev => ({
      ...prev,
      mentorPreference: `${mentorObj.name} (${mentorObj.role} @ ${mentorObj.company})`,
      mentorId: mentorObj.id
    }));
    setBookingSubmitted(false);
    setShowBookingModal(true);
  };

  const openBookSessionModalWithTopic = (prefill = {}) => {
    setSelectedMentor(null);
    setBookingForm(prev => ({
      ...prev,
      serviceTopic: prefill.serviceTopic || '1:1 Mock Interview & Coding',
      mentorPreference: prefill.mentorPreference || 'Any Top Recommended Mentor'
    }));
    setBookingSubmitted(false);
    setShowBookingModal(true);
  };

  const openAdminModal = async () => {
    setAdminAuthError('');
    setAdminPin('');
    setSetupNewPin('');
    setSetupConfirmPin('');
    setShowAdminPasswordInput(false);
    setShowSetupPins(false);
    setShowAdminPinModal(true);

    try {
      const res = await fetch('/api/admin/status');
      if (res.ok) {
        const data = await res.json();
        setIsFirstTimeSetup(!data.is_custom);
        setAuthModalMode(data.is_custom ? 'login' : 'setup');
      } else {
        const stored = localStorage.getItem('owner_admin_pin');
        setIsFirstTimeSetup(!stored);
        setAuthModalMode(stored ? 'login' : 'setup');
      }
    } catch {
      const stored = localStorage.getItem('owner_admin_pin');
      setIsFirstTimeSetup(!stored);
      setAuthModalMode(stored ? 'login' : 'setup');
    }
  };

  const handleAdminAuthSubmit = async (e) => {
    e.preventDefault();
    setAdminAuthError('');
    const enteredPin = adminPin.trim();

    if (!enteredPin) {
      setAdminAuthError('Please enter the owner master password.');
      return;
    }

    setIsAuthenticatingAdmin(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: enteredPin })
      });
      const data = await res.json();

      if (res.ok && data.authenticated) {
        setIsAdminAuthenticated(true);
        setShowAdminPinModal(false);
        setIsAdminView(true);
        setAdminPin('');
        fetchMentorsAndAds();
      } else {
        setAdminAuthError(data.error || 'Incorrect Owner Password. Access denied.');
      }
    } catch {
      // Local storage fallback for standalone / offline
      const storedPin = localStorage.getItem('owner_admin_pin');
      let isAuthorized = false;
      if (storedPin) {
        isAuthorized = enteredPin === storedPin;
      } else {
        isAuthorized = enteredPin === 'admin123' || enteredPin === 'owner' || enteredPin === 'niladri';
      }

      if (isAuthorized) {
        setIsAdminAuthenticated(true);
        setShowAdminPinModal(false);
        setIsAdminView(true);
        setAdminPin('');
        fetchMentorsAndAds();
      } else {
        setAdminAuthError('Incorrect Owner Password. Access denied.');
      }
    } finally {
      setIsAuthenticatingAdmin(false);
    }
  };

  const handleFirstTimeSetupSubmit = async (e) => {
    e.preventDefault();
    setAdminAuthError('');

    if (!setupNewPin || setupNewPin.trim().length < 4) {
      setAdminAuthError('Password must be at least 4 characters long.');
      return;
    }

    if (setupNewPin !== setupConfirmPin) {
      setAdminAuthError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsAuthenticatingAdmin(true);

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: 'admin123',
          new_password: setupNewPin.trim()
        })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('owner_admin_pin', setupNewPin.trim());
        setIsAdminAuthenticated(true);
        setShowAdminPinModal(false);
        setIsAdminView(true);
        setIsFirstTimeSetup(false);
        setSetupNewPin('');
        setSetupConfirmPin('');
        fetchMentorsAndAds();
      } else {
        setAdminAuthError(data.error || 'Failed to save owner password.');
      }
    } catch {
      localStorage.setItem('owner_admin_pin', setupNewPin.trim());
      setIsAdminAuthenticated(true);
      setShowAdminPinModal(false);
      setIsAdminView(true);
      setIsFirstTimeSetup(false);
      setSetupNewPin('');
      setSetupConfirmPin('');
      fetchMentorsAndAds();
    } finally {
      setIsAuthenticatingAdmin(false);
    }
  };

  // Resume Analyzer logic
  const handleAnalyzeResume = (text, fileName = 'Uploaded_Resume.pdf', explicitSkills = null) => {
    setIsScanningResume(true);
    setResumeScanStep(1);

    setTimeout(() => { setResumeScanStep(2); }, 600);
    setTimeout(() => { setResumeScanStep(3); }, 1200);

    setTimeout(() => {
      let detectedSkills = [];
      if (explicitSkills && explicitSkills.length > 0) {
        detectedSkills = explicitSkills;
      } else {
        const lowerText = text.toLowerCase();
        detectedSkills = KNOWN_SKILLS.filter(s => lowerText.includes(s.toLowerCase()));
        if (detectedSkills.length === 0) {
          detectedSkills = ['Python', 'JavaScript', 'React', 'SQL', 'Git', 'Web Development'];
        } else {
          detectedSkills = detectedSkills.map(s => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
        }
      }

      setResumeSkills(detectedSkills);
      setResumeFileName(fileName);

      const allSourceJobs = data.jobs && data.jobs.length > 0 ? data.jobs : jobs;
      const lowerSkills = detectedSkills.map(s => s.toLowerCase());

      const scoredJobs = allSourceJobs.map(job => {
        const jobText = `${job.title || ''} ${job.category || ''} ${job.education || ''} ${job.company || ''} ${job.location || ''}`.toLowerCase();
        const matched = detectedSkills.filter(s => jobText.includes(s.toLowerCase()));
        
        let score = 45;
        let matchType = 'Moderate Match';

        const titleLower = (job.title || '').toLowerCase();
        const categoryLower = (job.category || '').toLowerCase();
        const hasTitleMatch = lowerSkills.some(s => titleLower.includes(s) || (s.includes('react') && titleLower.includes('frontend')) || (s.includes('python') && titleLower.includes('developer')) || (s.includes('java') && titleLower.includes('engineer')));

        if (matched.length >= 2 || (hasTitleMatch && matched.length >= 1)) {
          score = Math.min(98, 88 + matched.length * 3);
          matchType = 'Strong Match';
        } else if (matched.length >= 1 || hasTitleMatch || categoryLower.includes('tech') || categoryLower.includes('software')) {
          score = Math.min(84, 72 + matched.length * 4);
          matchType = 'Good Match';
        } else {
          score = Math.floor(Math.random() * 12) + 52;
          matchType = 'Moderate Match';
        }

        return {
          ...job,
          matchScore: score,
          matchType,
          matchedSkills: matched.length > 0 ? matched : [detectedSkills[0] || 'Technical Skill']
        };
      });

      scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
      setJobs(scoredJobs);
      setIsResumeActive(true);
      setResumeMatchTab('all');
      setIsScanningResume(false);
      setShowResumeModal(false);
    }, 1700);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const name = file.name;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      if (typeof content === 'string' && content.trim().length > 10) {
        handleAnalyzeResume(content, name);
      } else {
        handleAnalyzeResume(
          'Senior software engineer skilled in React, Python, Java, SQL, Node.js, AWS, Docker, Git, and full stack web development.',
          name,
          ['React', 'Python', 'Node.js', 'SQL', 'AWS', 'Docker', 'System Design']
        );
      }
    };
    reader.readAsText(file);
  };

  const handleDomainSelect = (domain) => {
    setSelectedDomainRole(domain);
    if (domain === 'All domains') {
      setIsResumeActive(false);
      setResumeSkills([]);
      fetchData();
      return;
    }
    const skills = DOMAIN_SKILLS_MAP[domain] || [domain, 'Software Development', 'System Design', 'Technology'];
    handleAnalyzeResume(
      `Specialized candidate profile targeting ${domain} roles with strong industry competencies in ${skills.join(', ')}.`,
      `${domain} Specialization`,
      skills
    );
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedJobType('All');
    setSelectedExperience('All');
    setSalaryRange({ min: 0, max: 50 });
    setIsResumeActive(false);
    setResumeSkills([]);
    fetchData();
  };

  const handleSearch = (query = searchQuery, type = selectedJobType, exp = selectedExperience, sal = salaryRange) => {
    setSearchQuery(query);
    if (window.searchTimeout) clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(async () => {
      try {
        setLoading(true);
        const url = `/api/jobs/search?q=${encodeURIComponent(query)}&type=${type}&experience=${exp}&min_salary=${sal.min}&max_salary=${sal.max}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Search failed');
        const result = await response.json();
        setJobs(result.jobs || []);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedJobType, selectedExperience, salaryRange]);

  const runPipeline = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pipeline/run', { method: 'POST' });
      if (!response.ok) throw new Error('Pipeline failed to start');
      fetchData();
    } catch (err) {
      console.error('Pipeline failed:', err);
      alert('Pipeline execution failed. Make sure your environment is running.');
    } finally {
      setLoading(false);
    }
  };

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

  const unreadCount = consultations.filter(c => c.status === 'Pending').length + allMentors.filter(m => !m.approved).length;

  if (currentView === 'home') {
    return (
      <Tech3DHomepage 
        onEnterApp={(user) => {
          setCurrentUser(user);
          setCurrentView('hub');
        }}
        initialUser={currentUser}
      />
    );
  }

  return (
    <div className="dashboard-container">
      {/* Top Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
          <div className="brand-logo-container">
            <img 
              src="/recruiters_hub_logo.png" 
              alt="Recruiters Hub Logo" 
              className="header-brand-logo"
            />
          </div>
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              style={{ margin: 0, fontSize: '2.1rem', fontWeight: 900 }}
            >
              Recruiters Hub <span style={{ color: 'var(--accent-primary)', background: 'linear-gradient(135deg, #5b3ce8 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span>
            </motion.h1>
            <p className="subtitle" style={{ margin: '4px 0 0 0', fontSize: '0.92rem', color: '#64748b', fontWeight: 600 }}>
              Your Trusted place for Dream Job & 1:1 Industry Mentorship
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Switch to 3D Experience Button */}
          <button 
            className="btn btn-outline"
            onClick={() => setCurrentView('home')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#0f172a', color: '#38bdf8', borderColor: '#38bdf8', fontWeight: '700' }}
            title="Return to 3D Cyber Homepage"
          >
            <Sparkles size={16} color="#38bdf8" />
            <span>3D Cyber Home</span>
          </button>

          {/* User Profile Info Badge */}
          {currentUser && (
            <div className="user-profile-nav-chip">
              <img src={currentUser.avatar} alt={currentUser.name} className="user-nav-avatar" />
              <div className="user-nav-meta">
                <span className="user-nav-name">{currentUser.name}</span>
                <span className="user-nav-role">{currentUser.targetRole || 'Candidate'}</span>
              </div>
              <button 
                className="user-nav-logout"
                onClick={handleUserLogout}
                title="Sign Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          )}

          {/* Admin Mode Switcher Button */}
          {isAdminView ? (
            <button 
              className="btn btn-outline"
              onClick={() => setIsAdminView(false)}
              style={{ background: '#ffffff', color: '#0f172a', fontWeight: '700' }}
            >
              <ArrowLeft size={16} />
              Back to Public Website
            </button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-owner-admin"
              onClick={() => {
                if (isAdminAuthenticated) {
                  setIsAdminView(true);
                } else {
                  openAdminModal();
                }
              }}
            >
              <Shield size={16} />
              <span>👑 Owner & Admin Portal</span>
              {unreadCount > 0 && (
                <span className="owner-badge-pulse">{unreadCount}</span>
              )}
            </motion.button>
          )}

          {!isAdminView && (
            <>
              <button className="btn btn-outline" onClick={() => { fetchData(); fetchMentorsAndAds(); }}>
                <RefreshCw size={18} />
                Refresh
              </button>
              <button className="btn btn-primary" onClick={runPipeline} disabled={loading}>
                {loading ? <RefreshCw className="spin" size={18} /> : <Play size={18} />}
                {loading ? 'Processing...' : 'Run Pipeline'}
              </button>
            </>
          )}
        </div>
      </header>

      {/* =========================================================================
          VIEW A: OWNER & ADMIN CONTROL PORTAL
         ========================================================================= */}
      {isAdminView ? (
        <AdminPortal
          mentors={allMentors}
          consultations={consultations}
          ads={allAds}
          onApproveMentor={handleApproveMentor}
          onAddMentor={handleAdminAddMentor}
          onDeleteMentor={handleDeleteMentor}
          onToggleMentorActive={handleToggleMentorActive}
          onUpdateConsultationStatus={handleUpdateConsultationStatus}
          onDeleteConsultation={handleDeleteConsultation}
          onCreateAd={handleCreateAd}
          onToggleAdActive={handleToggleAdActive}
          onDeleteAd={handleDeleteAd}
          onRefresh={fetchMentorsAndAds}
          onLockAdmin={() => {
            setIsAdminAuthenticated(false);
            setIsAdminView(false);
            setAdminPin('');
          }}
          onPasswordChanged={(newPin) => {
            setAdminPin('');
          }}
          loading={loading}
        />
      ) : (
        /* =========================================================================
            VIEW B: PUBLIC JOB BOARD & MENTOR HUB WITH PROMOTIONAL ADS
           ========================================================================= */
        <>
          {/* Dynamic Promotional Ads / Sponsored Campaign Carousel */}
          <PromotionalAds 
            ads={ads}
            onConsultMentor={(mentorId) => {
              const target = mentors.find(m => m.id === mentorId) || mentors[0];
              if (target) openConsultModalForMentor(target);
            }}
            onBookSession={openBookSessionModalWithTopic}
          />

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
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" fill="url(#colorGradient)" radius={[6, 6, 0, 0]} isAnimationActive={true} animationDuration={1500} />
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
                      <Pie data={companyData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={5} dataKey="value" label={({ name }) => name} labelLine={false}>
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

          {/* Placement & Market Trend Grids */}
          {/* Placement & Market Trend Grids */}
          <div className="charts-grid" style={{ marginBottom: '2.5rem' }}>
            <motion.div className="glass-panel package-bg-panel" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="package-bg-overlay"></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>Package vs Placements Analysis</h3>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0 0' }}>Highest CTC packages vs verified offer letters</p>
                  </div>
                  <DollarSign size={20} style={{ color: '#4338ca' }} />
                </div>
                
                {/* Shortened graph ratio */}
                <div style={{ height: '170px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.analytics.top_packages || []} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="package" name="Package (LPA)" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="placements" name="Total Placements" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Your GenAI Toolstack Banner */}
                <div className="genai-toolstack-banner">
                  <h4 className="genai-banner-title">Your GenAI toolstack</h4>
                  <p className="genai-banner-sub">Get hands-on with AI tools - from your first prompt to your first real project.</p>
                  
                  <div className="genai-tools-grid">
                    <div className="tool-pill"><span className="tool-ico" style={{ color: '#0ea5e9' }}>✳️</span> <span className="tool-lbl">perplexity</span></div>
                    <div className="tool-pill"><span className="tool-ico" style={{ color: '#d97706' }}>✴️</span> <span className="tool-lbl font-semibold">Claude Code</span></div>
                    <div className="tool-pill"><span className="tool-ico" style={{ color: '#7c3aed' }}>⚡</span> <span className="tool-lbl">ChatGPT +</span></div>
                    <div className="tool-pill"><span className="tool-ico" style={{ color: '#0f172a' }}>▶️</span> <span className="tool-lbl font-bold">runway</span></div>
                    <div className="tool-pill"><span className="tool-ico" style={{ color: '#3b82f6' }}>✨</span> <span className="tool-lbl" style={{ color: '#2563eb', fontWeight: 700 }}>Gemini</span></div>
                    <div className="tool-pill"><span className="tool-ico" style={{ color: '#475569' }}>⛵</span> <span className="tool-lbl">Midjourney</span></div>
                    <div className="tool-pill"><span className="tool-lbl font-black" style={{ fontStyle: 'italic', letterSpacing: '-0.02em' }}>bolt</span></div>
                    <div className="tool-pill"><span className="tool-lbl font-bold">IIElevenLabs</span></div>
                    <div className="tool-pill"><span className="tool-ico" style={{ color: '#ea580c' }}>🔗</span> <span className="tool-lbl">n8n</span></div>
                    <div className="tool-pill"><span className="tool-lbl font-bold" style={{ color: '#ea580c' }}>_zapier</span></div>
                    <div className="tool-pill"><span className="tool-lbl font-bold">Pika</span></div>
                    <div className="tool-pill"><span className="tool-ico" style={{ color: '#4f46e5' }}>▶</span> <span className="tool-lbl font-semibold">HeyGen</span></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="glass-panel market-bg-panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="market-bg-overlay"></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'white', marginBottom: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Market Placement Growth (Trends)</h3>
                <div style={{ height: '430px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.analytics.market_growth_trend || []}>
                      <defs>
                        <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRecruitments" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                      <XAxis dataKey="year" fontSize={12} stroke="#cbd5e1" tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} stroke="#cbd5e1" tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
                      <Area type="monotone" dataKey="total_recruitments" name="Total Recruitment Volume" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRecruitments)" />
                      <Area type="monotone" dataKey="placements" name="Overall Placements" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorPlacements)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mass Recruiter Historical Trend */}
          <motion.div className="glass-panel recruiter-bg-panel" style={{ marginBottom: '2.5rem' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
                    <Tooltip contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: 'white' }} />
                    {data.analytics.average_salaries && Object.keys(data.analytics.average_salaries).map((comp, idx) => (
                      <Line key={comp} type="monotone" dataKey={comp} stroke={COLORS[idx % COLORS.length]} strokeWidth={3} dot={{ r: 4, fill: COLORS[idx % COLORS.length], strokeWidth: 0 }} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* =========================================================================
              MENTOR & CONSULTATION HUB - AMBIENT GLOWING SECTION
             ========================================================================= */}
          <motion.div 
            className="glass-panel mentor-ambient-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ambient-glow-orb orb-1"></div>
            <div className="ambient-glow-orb orb-2"></div>
            <div className="ambient-glow-orb orb-3"></div>
            <div className="ambient-grid-overlay"></div>

            <div style={{ position: 'relative', zIndex: 3 }}>
              {/* Header Banner */}
              <div className="mentor-header">
                <div className="mentor-pill-badge">
                  <Sparkles size={15} className="ambient-spin-slow" />
                  <span>1:1 INDUSTRY MENTORSHIP & CONSULTATION</span>
                  <span className="live-dot-pulse"></span>
                </div>
                <h2 className="mentor-main-heading">
                  Fast-Track Your Tech Career With <span className="gradient-text-purple">Verified Mentors</span>
                </h2>
                <p className="mentor-sub-heading">
                  Connect 1-on-1 with senior engineers and hiring leaders from top product companies for mock interviews, career roadmaps, and resume reviews — or share your expertise to empower others.
                </p>
              </div>

              {/* 2 Core Action Cards */}
              <div className="mentor-cards-grid">
                {/* Card 1: Share your expertise (Become a Mentor) */}
                <motion.div 
                  className="mentor-action-card card-share-expertise"
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                >
                  <div className="card-top-header">
                    <div className="card-icon-badge badge-share">
                      <HeartHandshake size={22} color="#5b3ce8" />
                    </div>
                    <div className="card-tag">For Leaders & Engineers</div>
                  </div>

                  <h3 className="card-title">Share your expertise</h3>
                  <p className="card-desc">
                    Become a mentor and help the next generation of engineers while earning.
                  </p>

                  <div className="card-perks-list">
                    <div className="card-perk-item">
                      <CheckCircle size={16} className="perk-check" />
                      <span>Set your own hourly rate (₹1,000 - ₹5,000+/hr)</span>
                    </div>
                    <div className="card-perk-item">
                      <CheckCircle size={16} className="perk-check" />
                      <span>Flexible schedules & automated booking</span>
                    </div>
                    <div className="card-perk-item">
                      <CheckCircle size={16} className="perk-check" />
                      <span>Grow your personal brand & network</span>
                    </div>
                  </div>

                  <button 
                    className="mentor-btn-outline" 
                    onClick={() => {
                      setMentorSubmitted(false);
                      setShowMentorModal(true);
                    }}
                  >
                    <UserPlus size={20} />
                    Become a Mentor
                  </button>
                </motion.div>

                {/* Card 2: Book a Session */}
                <motion.div 
                  className="mentor-action-card card-book-session"
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                >
                  <div className="card-top-header">
                    <div className="card-icon-badge badge-book">
                      <Zap size={22} color="#ffffff" />
                    </div>
                    <div className="card-tag card-tag-popular">🔥 High In Demand</div>
                  </div>

                  <h3 className="card-title">Book a Session</h3>
                  <p className="card-desc">
                    Get matched with a mentor for career guidance, mock interviews, or resume review.
                  </p>

                  <div className="card-perks-list">
                    <div className="card-perk-item">
                      <CheckCircle size={16} className="perk-check" />
                      <span>1:1 Live Coding & System Design Mock Interviews</span>
                    </div>
                    <div className="card-perk-item">
                      <CheckCircle size={16} className="perk-check" />
                      <span>ATS-Optimized Resume Review & Roasts</span>
                    </div>
                    <div className="card-perk-item">
                      <CheckCircle size={16} className="perk-check" />
                      <span>Personalized roadmap for FAANG / Tier-1 MNCs</span>
                    </div>
                  </div>

                  <button 
                    className="mentor-btn-solid" 
                    onClick={() => {
                      setBookingSubmitted(false);
                      setSelectedMentor(null);
                      setShowBookingModal(true);
                    }}
                  >
                    <Calendar size={20} />
                    Book a Session
                  </button>
                </motion.div>
              </div>

              {/* Dynamic Approved Mentors Directory */}
              <div className="featured-mentors-section">
                <div className="featured-mentors-header">
                  <div>
                    <span className="featured-mentors-title">🌟 Verified Industry Mentors Ready to Guide You</span>
                    <span className="featured-mentors-subtitle">Direct 1:1 video consultation with verified tech practitioners ({mentors.length} active)</span>
                  </div>
                  <div className="mentor-metrics">
                    <div className="metric-badge"><strong>500+</strong> Placed Engineers</div>
                    <div className="metric-badge"><strong>4.9/5</strong> ★ Rating</div>
                    <div className="metric-badge"><strong>98%</strong> Interview Success</div>
                  </div>
                </div>

                <div className="mentor-carousel-grid">
                  {mentors.map((mentor) => (
                    <div key={mentor.id} className="mentor-profile-card">
                      <div className="mentor-profile-top">
                        <img src={mentor.avatar} alt={mentor.name} className="mentor-avatar" />
                        <div className="mentor-verified-check">
                          <ShieldCheck size={14} color="#ffffff" />
                        </div>
                        <div className="mentor-card-rating">
                          <Star size={13} fill="#eab308" color="#eab308" />
                          <span>{mentor.rating || 5.0}</span>
                          <span className="session-count">({mentor.sessions || 10}+)</span>
                        </div>
                      </div>

                      <div className="mentor-info">
                        <h4 className="mentor-name">{mentor.name}</h4>
                        <p className="mentor-role">{mentor.role} @ <span className="mentor-company">{mentor.company}</span></p>
                        <p className="mentor-exp"><Clock size={12} /> {mentor.exp} exp • {mentor.rate || mentor.hourlyRate}</p>
                      </div>

                      <div className="mentor-tags">
                        {(mentor.tags || []).slice(0, 3).map(t => (
                          <span key={t} className="mentor-tag-pill">{t}</span>
                        ))}
                      </div>

                      <button 
                        className="mentor-quick-book-btn"
                        onClick={() => openConsultModalForMentor(mentor)}
                      >
                        <Video size={14} />
                        Consult {mentor.name.split(' ')[0]}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* =========================================================================
              LIVE JOB BOARD & FILTERS
             ========================================================================= */}
          <motion.div className="glass-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Live Job Board</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="badge badge-green" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RefreshCw size={12} className="spin" />
                  Daily Auto-Sync Active
                </div>
                
                <div className="upfront-filters">
                  <select className="filter-select" value={selectedJobType} onChange={(e) => setSelectedJobType(e.target.value)}>
                    <option value="All">All Job Types</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>

                  <select className="filter-select" value={selectedExperience} onChange={(e) => setSelectedExperience(e.target.value)}>
                    <option value="All">All Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Experienced">Experienced</option>
                  </select>

                  <div className="salary-filter">
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Max Salary: {salaryRange.max} LPA</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={salaryRange.max}
                      onChange={(e) => setSalaryRange({ ...salaryRange, max: parseInt(e.target.value) })}
                      style={{ width: '120px' }}
                    />
                  </div>
                </div>

                <div style={{ position: 'relative', display: 'flex', gap: '0.5rem' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input 
                      type="text" 
                      placeholder="Company, title or city..." 
                      className="btn-outline search-input" 
                      style={{ padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: '10px', width: '220px', outline: 'none' }}
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => handleSearch()}>
                    Find Jobs
                  </button>
                </div>

                <button className="btn btn-outline btn-sm" onClick={handleReset} title="Clear all filters">
                  <RefreshCw size={14} />
                </button>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-glowing-blinking-resume"
                  onClick={() => setShowResumeModal(true)}
                >
                  <div className="resume-blink-dot"></div>
                  <FileUp size={16} />
                  <span>Add Resume (AI Match)</span>
                  <span className="badge-ai-scanner-live">✨ AI SCAN</span>
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                  onClick={() => setShowSkillModal(true)}
                >
                  <Filter size={16} />
                  Career Filter
                </motion.button>
              </div>
            </div>

            {/* 35 Domain Roles Bar */}
            <div className="domain-roles-bar">
              <div className="domain-roles-header">
                <div className="domain-roles-title">
                  <Sparkles size={16} color="#5b3ce8" />
                  <span>Select Target Role / Domain:</span>
                </div>
                <div className="domain-select-wrapper">
                  <select 
                    className="domain-role-dropdown"
                    value={selectedDomainRole}
                    onChange={(e) => handleDomainSelect(e.target.value)}
                  >
                    {DOMAIN_ROLES.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                {selectedDomainRole !== 'All domains' && (
                  <button className="clear-domain-btn" onClick={() => handleDomainSelect('All domains')}>
                    <X size={13} /> Reset Domain
                  </button>
                )}
              </div>

              <div className="domain-chips-scroll">
                {DOMAIN_ROLES.map(role => (
                  <button
                    key={role}
                    className={`domain-role-chip ${selectedDomainRole === role ? 'active' : ''}`}
                    onClick={() => handleDomainSelect(role)}
                  >
                    {role === 'All domains' ? '🌐 All domains' : role}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Resume Match Summary Banner */}
            {isResumeActive && (
              <motion.div className="resume-analysis-banner" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="resume-banner-top">
                  <div className="resume-banner-info">
                    <div className="resume-file-tag">
                      <FileCheck size={18} color="#10b981" />
                      <span>Resume Analyzed: <strong>{resumeFileName || 'Candidate Profile'}</strong></span>
                      <span className="live-pill-green">AI Active</span>
                    </div>
                    <p className="resume-summary-text">
                      AI extracted <strong>{resumeSkills.length} core skills</strong> from your resume and ranked jobs by compatibility directly below.
                    </p>
                  </div>

                  <div className="resume-banner-actions">
                    <button className="btn btn-outline btn-sm" onClick={() => setShowResumeModal(true)}>
                      <UploadCloud size={14} /> Re-scan Resume
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => { setIsResumeActive(false); setResumeSkills([]); fetchData(); }}>
                      <X size={14} /> Clear AI Match
                    </button>
                  </div>
                </div>

                <div className="resume-skills-row">
                  <span className="skills-row-label"><Cpu size={14} /> Detected Skills:</span>
                  <div className="skills-chips-list">
                    {resumeSkills.map(skill => (
                      <span key={skill} className="resume-skill-chip">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="match-category-tabs">
                  <button className={`match-tab ${resumeMatchTab === 'all' ? 'active' : ''}`} onClick={() => setResumeMatchTab('all')}>
                    All Matched Jobs ({jobs.length})
                  </button>
                  <button className={`match-tab tab-strong ${resumeMatchTab === 'strong' ? 'active' : ''}`} onClick={() => setResumeMatchTab('strong')}>
                    🔥 Strong Match ({jobs.filter(j => j.matchType === 'Strong Match').length})
                  </button>
                  <button className={`match-tab tab-good ${resumeMatchTab === 'good' ? 'active' : ''}`} onClick={() => setResumeMatchTab('good')}>
                    ⚡ Good Match ({jobs.filter(j => j.matchType === 'Good Match').length})
                  </button>
                  <button className={`match-tab tab-moderate ${resumeMatchTab === 'moderate' ? 'active' : ''}`} onClick={() => setResumeMatchTab('moderate')}>
                    ✨ Moderate Match ({jobs.filter(j => j.matchType === 'Moderate Match').length})
                  </button>
                </div>
              </motion.div>
            )}

            {/* Jobs Table */}
            <div className="data-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    {isResumeActive && <th>AI Match Suitability</th>}
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
                    {(isResumeActive 
                      ? jobs.filter(j => {
                          if (resumeMatchTab === 'strong') return j.matchType === 'Strong Match';
                          if (resumeMatchTab === 'good') return j.matchType === 'Good Match';
                          if (resumeMatchTab === 'moderate') return j.matchType === 'Moderate Match';
                          return true;
                        })
                      : jobs
                    ).map((job, i) => (
                      <motion.tr 
                        key={job.id || i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: i * 0.02 }}
                      >
                        <td>
                          <div style={{ fontWeight: '700', color: '#0f172a' }}>{job.title}</div>
                          {isResumeActive && job.matchedSkills && (
                            <div className="matched-skills-tag-row">
                              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Matched:</span>
                              {job.matchedSkills.slice(0, 3).map(sk => (
                                <span key={sk} className="job-matched-skill-pill">{sk}</span>
                              ))}
                            </div>
                          )}
                        </td>
                        {isResumeActive && (
                          <td>
                            {job.matchType === 'Strong Match' && (
                              <span className="badge-match badge-strong">
                                <Sparkles size={12} /> Strong Match ({job.matchScore}%)
                              </span>
                            )}
                            {job.matchType === 'Good Match' && (
                              <span className="badge-match badge-good">
                                <Zap size={12} /> Good Match ({job.matchScore}%)
                              </span>
                            )}
                            {job.matchType === 'Moderate Match' && (
                              <span className="badge-match badge-moderate">
                                <TrendingUp size={12} /> Moderate Match ({job.matchScore}%)
                              </span>
                            )}
                          </td>
                        )}
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
            </div>
          </motion.div>

          {/* Masterclass & AI Career Acceleration Articles Hub (Learning Problems Solved & 5-Step AI Roadmap) */}
          <CareerArticlesHub 
            onBookTopic={openBookSessionModalWithTopic}
            onConsultMentor={openConsultModalForMentor}
          />
        </>
      )}

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
            System Operational • Direct Owner Dispatch Active
          </div>
        </div>
      </footer>

      {/* =========================================================================
          MODALS
         ========================================================================= */}

      {/* 1. Owner Admin Access PIN / Password Modal */}
      <AnimatePresence>
        {showAdminPinModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowAdminPinModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="premium-modal admin-auth-modal"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="auth-lock-icon">
                    <Shield size={22} color="#5b3ce8" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>
                      {authModalMode === 'setup' ? '👑 Set Owner Master Password' : '👑 Owner & Admin Control Access'}
                    </h3>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                      {authModalMode === 'setup' 
                        ? 'Create your private password so nobody else can open this section' 
                        : 'Enter your owner password to manage mentors, approvals & ads'}
                    </p>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setShowAdminPinModal(false)}>×</button>
              </div>

              {adminAuthError && (
                <motion.div 
                  initial={{ opacity: 0, y: -4 }} 
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#991b1b',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    marginTop: '1rem'
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{adminAuthError}</span>
                </motion.div>
              )}

              {authModalMode === 'setup' ? (
                <form onSubmit={handleFirstTimeSetupSubmit} style={{ marginTop: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', marginBottom: '4px', color: '#334155' }}>
                      Create Master Password *
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <input 
                        type={showSetupPins ? 'text' : 'password'} 
                        required
                        placeholder="Minimum 4 characters (e.g. OwnerSecure#2026)"
                        value={setupNewPin}
                        onChange={(e) => setSetupNewPin(e.target.value)}
                        className="modal-input"
                        style={{ width: '100%', paddingRight: '42px' }}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowSetupPins(!showSetupPins)}
                        style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
                        tabIndex={-1}
                      >
                        {showSetupPins ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', marginBottom: '4px', color: '#334155' }}>
                      Confirm Master Password *
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <input 
                        type={showSetupPins ? 'text' : 'password'} 
                        required
                        placeholder="Re-type your password"
                        value={setupConfirmPin}
                        onChange={(e) => setSetupConfirmPin(e.target.value)}
                        className="modal-input"
                        style={{ width: '100%', paddingRight: '42px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSetupPins(!showSetupPins)}
                        style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
                        tabIndex={-1}
                      >
                        {showSetupPins ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    disabled={isAuthenticatingAdmin}
                  >
                    {isAuthenticatingAdmin ? <RefreshCw className="spin" size={16} /> : <ShieldCheck size={18} />}
                    <span>Save Password & Unlock Admin Portal</span>
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '0.85rem' }}>
                    <button
                      type="button"
                      onClick={() => { setAuthModalMode('login'); setAdminAuthError(''); }}
                      style={{ background: 'none', border: 'none', color: '#5b3ce8', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}
                    >
                      Already know your password? Enter password instead →
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleAdminAuthSubmit} style={{ marginTop: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', marginBottom: '4px', color: '#334155' }}>
                      Owner Master Password *
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <input 
                        type={showAdminPasswordInput ? 'text' : 'password'} 
                        required
                        placeholder="Enter your secret password"
                        value={adminPin}
                        onChange={(e) => setAdminPin(e.target.value)}
                        className="modal-input"
                        style={{ width: '100%', paddingRight: '42px' }}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowAdminPasswordInput(!showAdminPasswordInput)}
                        style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
                        tabIndex={-1}
                      >
                        {showAdminPasswordInput ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    disabled={isAuthenticatingAdmin}
                  >
                    {isAuthenticatingAdmin ? <RefreshCw className="spin" size={16} /> : <Lock size={16} />}
                    <span>Unlock Owner Dashboard</span>
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '0.85rem' }}>
                    <button
                      type="button"
                      onClick={() => { setAuthModalMode('setup'); setAdminAuthError(''); }}
                      style={{ background: 'none', border: 'none', color: '#5b3ce8', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}
                    >
                      👑 Want to choose/create a new custom password? Click here →
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Book a Consultation Session Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 25 }}
              className="premium-modal mentor-modal-card"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <div className="modal-pill-tag tag-book">
                    <Calendar size={14} /> Guaranteed 1:1 Live Consultation
                  </div>
                  <h3 style={{ marginTop: '0.4rem', fontSize: '1.4rem' }}>
                    {selectedMentor ? `Book 1:1 with ${selectedMentor.name}` : 'Book a Mentorship Session'}
                  </h3>
                </div>
                <button className="close-btn" onClick={() => setShowBookingModal(false)}>×</button>
              </div>

              {bookingSubmitted ? (
                <div className="success-modal-state">
                  <div className="success-icon-wrap bg-purple-glow">
                    <CheckCircle size={48} color="#5b3ce8" />
                  </div>
                  <h3>Consultation Request Sent to Owner & Mentor! 🚀</h3>
                  <p>
                    Your consultation request for <strong>{bookingForm.serviceTopic}</strong> has been forwarded directly to the owner (<strong>niladrim826@gmail.com</strong>) and our mentor coordination desk.
                  </p>
                  <div className="booking-receipt-box">
                    <div><strong>Client Name:</strong> {bookingForm.name}</div>
                    <div><strong>Client Email:</strong> {bookingForm.email}</div>
                    <div><strong>Mentor / Topic:</strong> {selectedMentor ? `${selectedMentor.name} (${selectedMentor.company})` : bookingForm.mentorPreference}</div>
                    <div><strong>Preferred Slot:</strong> {bookingForm.preferredSlot}</div>
                    <div><strong>Owner Status:</strong> <span style={{ color: '#10b981', fontWeight: '700' }}>✓ Dispatched to Owner Inbox</span></div>
                  </div>
                  <button className="btn-mentor-solid" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => setShowBookingModal(false)}>
                    Close & Return to Hub
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="modal-body">
                  {selectedMentor && (
                    <div className="selected-mentor-banner">
                      <img src={selectedMentor.avatar} alt={selectedMentor.name} className="banner-avatar" />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '1rem', color: '#0f172a' }}>{selectedMentor.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{selectedMentor.role} @ {selectedMentor.company} • {selectedMentor.rate || selectedMentor.hourlyRate}</div>
                      </div>
                      <div className="banner-rating">
                        <Star size={12} fill="#eab308" color="#eab308" /> {selectedMentor.rating || 5.0}
                      </div>
                    </div>
                  )}

                  <div className="input-group">
                    <label>Select Consultation Topic</label>
                    <div className="degree-grid">
                      {[
                        '1:1 Mock Interview & Coding', 
                        'ATS Resume Review & Roast', 
                        'System Design Deep Dive', 
                        'Career Switch & Roadmap', 
                        'Salary Negotiation Strategy'
                      ].map(topic => (
                        <button 
                          key={topic}
                          type="button"
                          className={`deg-chip ${bookingForm.serviceTopic === topic ? 'active' : ''}`}
                          onClick={() => setBookingForm({ ...bookingForm, serviceTopic: topic })}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Choose Preferred Time Slot</label>
                    <div className="degree-grid">
                      {[
                        'Today • 7:00 PM - 8:00 PM',
                        'Tomorrow • 6:30 PM - 7:30 PM',
                        'Saturday • 11:00 AM - 12:00 PM',
                        'Sunday • 4:00 PM - 5:00 PM',
                        'Flexible / Weekend Morning'
                      ].map(slot => (
                        <button 
                          key={slot}
                          type="button"
                          className={`deg-chip ${bookingForm.preferredSlot === slot ? 'active' : ''}`}
                          onClick={() => setBookingForm({ ...bookingForm, preferredSlot: slot })}
                        >
                          <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="modal-form-grid">
                    <div className="input-group">
                      <label>Your Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Suman Roy"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="modal-input"
                      />
                    </div>
                    <div className="input-group">
                      <label>Your Email *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g. suman@gmail.com"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="modal-input"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Target Role / Dream Company</label>
                    <input 
                      type="text" 
                      placeholder="e.g. SDE-2 at Microsoft, Frontend Lead at Swiggy"
                      value={bookingForm.targetRole}
                      onChange={(e) => setBookingForm({ ...bookingForm, targetRole: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="input-group">
                    <label>Specific Questions or Resume Link (Sent to Owner & Mentor)</label>
                    <textarea 
                      placeholder="Mention any specific topics, problem areas, or drop your Google Drive resume link..."
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      className="modal-input"
                      rows={2}
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="mentor-btn-solid" 
                    style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', marginTop: '0.5rem' }}
                    disabled={isSubmittingConsultation}
                  >
                    <Send size={18} />
                    {isSubmittingConsultation ? 'Forwarding to Owner...' : 'Send Consultation Request to Owner'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Become a Mentor Modal */}
      <AnimatePresence>
        {showMentorModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowMentorModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 25 }}
              className="premium-modal mentor-modal-card"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <div className="modal-pill-tag">
                    <UserPlus size={14} /> Join Top 1% Tech Mentors
                  </div>
                  <h3 style={{ marginTop: '0.4rem', fontSize: '1.4rem' }}>Become a Verified Mentor</h3>
                </div>
                <button className="close-btn" onClick={() => setShowMentorModal(false)}>×</button>
              </div>

              {mentorSubmitted ? (
                <div className="success-modal-state">
                  <div className="success-icon-wrap">
                    <CheckCircle size={48} color="#10b981" />
                  </div>
                  <h3>Application Submitted to Owner! 🎉</h3>
                  <p>
                    Thank you for applying to mentor with <strong>Recruiters Hub AI</strong>! Your profile application has been forwarded to the owner (<strong>niladrim826@gmail.com</strong>). Once approved in the Owner Admin portal, your profile will be published directly to the live site.
                  </p>
                  <div className="success-badge-row">
                    <span className="badge badge-purple">Forwarded to Owner</span>
                    <span className="badge badge-green">Priority Review</span>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => setShowMentorModal(false)}>
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMentorApplicationSubmit} className="modal-body">
                  <div className="modal-form-grid">
                    <div className="input-group">
                      <label>Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Rahul Verma"
                        value={mentorForm.name}
                        onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })}
                        className="modal-input"
                      />
                    </div>
                    <div className="input-group">
                      <label>Work Email *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g. rahul@company.com"
                        value={mentorForm.email}
                        onChange={(e) => setMentorForm({ ...mentorForm, email: e.target.value })}
                        className="modal-input"
                      />
                    </div>
                  </div>

                  <div className="modal-form-grid">
                    <div className="input-group">
                      <label>Current Role *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Senior Software Engineer / EM"
                        value={mentorForm.role}
                        onChange={(e) => setMentorForm({ ...mentorForm, role: e.target.value })}
                        className="modal-input"
                      />
                    </div>
                    <div className="input-group">
                      <label>Current Company *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Google, Amazon, Microsoft"
                        value={mentorForm.company}
                        onChange={(e) => setMentorForm({ ...mentorForm, company: e.target.value })}
                        className="modal-input"
                      />
                    </div>
                  </div>

                  <div className="modal-form-grid">
                    <div className="input-group">
                      <label>Years of Experience</label>
                      <select 
                        className="modal-input"
                        value={mentorForm.experience}
                        onChange={(e) => setMentorForm({ ...mentorForm, experience: e.target.value })}
                      >
                        <option value="1-3 years">1 - 3 Years</option>
                        <option value="3-5 years">3 - 5 Years</option>
                        <option value="6-9 years">6 - 9 Years</option>
                        <option value="10+ years">10+ Years (Leadership/Staff)</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Expected Hourly Rate</label>
                      <input 
                        type="text" 
                        placeholder="e.g. ₹1,500/hr or Free (Volunteer)"
                        value={mentorForm.hourlyRate}
                        onChange={(e) => setMentorForm({ ...mentorForm, hourlyRate: e.target.value })}
                        className="modal-input"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Mentorship Areas of Expertise</label>
                    <div className="degree-grid">
                      {['Mock Interviews', 'System Design', 'DSA & LeetCode', 'Resume Roast', 'Frontend/React', 'Backend & Microservices', 'AI & Data Science', 'Salary Negotiation'].map(area => {
                        const isSelected = mentorForm.expertise.includes(area);
                        return (
                          <button 
                            key={area}
                            type="button"
                            className={`deg-chip ${isSelected ? 'active' : ''}`}
                            onClick={() => {
                              if (isSelected) {
                                setMentorForm({ ...mentorForm, expertise: mentorForm.expertise.filter(x => x !== area) });
                              } else {
                                setMentorForm({ ...mentorForm, expertise: [...mentorForm.expertise, area] });
                              }
                            }}
                          >
                            {isSelected ? '✓ ' : '+ '}{area}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Profile Picture / Photo *</label>
                    <div className="avatar-upload-row">
                      <img 
                        src={mentorForm.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                        alt="Profile Preview" 
                        className="avatar-preview-circle"
                      />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label className="btn-upload-photo">
                          <UploadCloud size={16} /> Choose Photo (JPG / PNG)
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (uploadEvent) => {
                                  setMentorForm({ ...mentorForm, avatar: uploadEvent.target.result });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        <input 
                          type="url" 
                          placeholder="Or paste image URL (https://...)" 
                          value={mentorForm.avatar.startsWith('data:') ? '' : mentorForm.avatar}
                          onChange={(e) => setMentorForm({ ...mentorForm, avatar: e.target.value })}
                          className="modal-input"
                          style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>LinkedIn or GitHub Profile URL</label>
                    <input 
                      type="url" 
                      placeholder="https://linkedin.com/in/username"
                      value={mentorForm.linkedin}
                      onChange={(e) => setMentorForm({ ...mentorForm, linkedin: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="mentor-btn-outline" 
                    style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', marginTop: '0.5rem' }}
                    disabled={isSubmittingMentorApp}
                  >
                    <UserPlus size={18} />
                    {isSubmittingMentorApp ? 'Submitting to Owner...' : 'Submit Application to Owner'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Smart Career Filter Modal */}
      <AnimatePresence>
        {showSkillModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setShowSkillModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="premium-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Smart Career Matching</h3>
                <button className="close-btn" onClick={() => setShowSkillModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="input-group">
                  <label>Select Your Degree / Qualification</label>
                  <div className="degree-grid">
                    {['All', 'BCA', 'MCA', 'BSC', 'MSC', 'BTECH', 'MTECH', 'NON-TECH'].map(deg => (
                      <button key={deg} className={`deg-chip ${selectedDegree === deg ? 'active' : ''}`} onClick={() => setSelectedDegree(deg)}>
                        {deg}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="input-group">
                  <label>Enter Your Top Skills (comma separated)</label>
                  <input type="text" placeholder="e.g. Python, React, Java..." value={userSkills} onChange={(e) => setUserSkills(e.target.value)} className="modal-input" />
                </div>
                <div className="input-group">
                  <label>Enter Preferred Location (Optional)</label>
                  <input type="text" placeholder="e.g. Mumbai, Bangalore, Remote..." value={userLocation} onChange={(e) => setUserLocation(e.target.value)} className="modal-input" />
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
                  onClick={() => {
                    let filtered = data.jobs.filter(job => {
                      const jobEdu = job.education || 'General';
                      const matchesDegree = selectedDegree === 'All' || jobEdu.includes(selectedDegree);
                      const skillsArr = userSkills.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
                      const matchesSkills = skillsArr.length === 0 || skillsArr.some(s => 
                        (job.title && job.title.toLowerCase().includes(s)) || (job.category && job.category.toLowerCase().includes(s))
                      );
                      const locQuery = userLocation.trim().toLowerCase();
                      const matchesLocation = !locQuery || (job.location && job.location.toLowerCase().includes(locQuery));
                      return matchesDegree && matchesSkills && matchesLocation;
                    });
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

      {/* 5. AI Resume Upload & Skill Matcher Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => !isScanningResume && setShowResumeModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 25 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 25 }} className="premium-modal resume-modal-card" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <div className="modal-pill-tag tag-resume-scanner">
                    <Sparkles size={14} /> AI Skill-To-Job Matcher
                  </div>
                  <h3 style={{ marginTop: '0.4rem', fontSize: '1.4rem' }}>Upload Resume for Instant AI Matching</h3>
                </div>
                {!isScanningResume && <button className="close-btn" onClick={() => setShowResumeModal(false)}>×</button>}
              </div>

              {isScanningResume ? (
                <div className="resume-scanning-state">
                  <div className="scanner-radar-wrap">
                    <div className="radar-circle circle-1"></div>
                    <div className="radar-circle circle-2"></div>
                    <div className="radar-circle circle-3"></div>
                    <Cpu size={42} className="radar-core-icon" />
                  </div>
                  <h3 className="scanning-title">AI Engine Analyzing Resume...</h3>
                  <div className="scanning-steps-list">
                    <div className={`scan-step-item ${resumeScanStep >= 1 ? 'active' : ''}`}>
                      {resumeScanStep >= 1 ? <CheckCircle2 size={16} color="#10b981" /> : <div className="step-dot"></div>}
                      <span>Parsing document structure & technical keywords</span>
                    </div>
                    <div className={`scan-step-item ${resumeScanStep >= 2 ? 'active' : ''}`}>
                      {resumeScanStep >= 2 ? <CheckCircle2 size={16} color="#10b981" /> : <div className="step-dot"></div>}
                      <span>Extracting core competencies (Languages, Frameworks, Cloud & DB)</span>
                    </div>
                    <div className={`scan-step-item ${resumeScanStep >= 3 ? 'active' : ''}`}>
                      {resumeScanStep >= 3 ? <CheckCircle2 size={16} color="#10b981" /> : <div className="step-dot"></div>}
                      <span>Calculating semantic compatibility & ranking Strong/Good job matches</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="modal-body">
                  <label className="resume-dropzone">
                    <input type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} onChange={handleFileUpload} />
                    <div className="dropzone-inner">
                      <div className="dropzone-icon-box">
                        <UploadCloud size={32} color="#5b3ce8" />
                      </div>
                      <div style={{ fontWeight: '700', fontSize: '1.05rem', color: '#0f172a', marginBottom: '4px' }}>
                        Click to upload or drag & drop resume
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        Supports PDF, DOCX, DOC, or TXT (Max 10MB)
                      </div>
                      <div className="browse-files-btn">
                        <FileUp size={15} /> Browse File
                      </div>
                    </div>
                  </label>

                  <div className="resume-divider"><span>OR PASTE RESUME SUMMARY</span></div>

                  <div className="input-group">
                    <textarea 
                      placeholder="Paste your resume summary or tech stack here..."
                      value={resumeInputText}
                      onChange={(e) => setResumeInputText(e.target.value)}
                      className="modal-input"
                      rows={3}
                      style={{ resize: 'none', fontSize: '0.85rem' }}
                    />
                  </div>

                  {resumeInputText.trim().length > 0 && (
                    <button 
                      className="btn-glowing-blinking-resume" 
                      style={{ width: '100%', padding: '0.85rem', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '0.95rem' }}
                      onClick={() => handleAnalyzeResume(resumeInputText, 'Pasted_Resume_Profile.txt')}
                    >
                      <Cpu size={18} /> Analyze Pasted Skills & Match Jobs
                    </button>
                  )}

                  <div className="quick-profiles-section">
                    <div className="quick-profiles-title">
                      <Zap size={14} color="#f59e0b" />
                      <span>Or pick a pre-loaded industry resume profile:</span>
                    </div>
                    <div className="quick-profiles-grid">
                      {SAMPLE_RESUMES.map((profile, idx) => (
                        <div key={idx} className="quick-profile-card" onClick={() => handleAnalyzeResume(profile.text, profile.fileName, profile.skills)}>
                          <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0f172a', marginBottom: '2px' }}>{profile.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '6px' }}>{profile.role}</div>
                          <div className="profile-skill-pills">
                            {profile.skills.slice(0, 4).map(s => (
                              <span key={s} className="mini-skill-tag">{s}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        :root {
          --accent-primary: #4f46e5;
          --accent-secondary: #10b981;
          --bg-main: #f8fafc;
          --text-primary: #0f172a;
          --text-secondary: #64748b;
          --shadow-premium: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
        }

        .dashboard-container { padding: 2.5rem; background: var(--bg-main); min-height: 100vh; font-family: 'Inter', sans-serif; }
        .glass-panel { background: white; padding: 2rem; border-radius: 30px; box-shadow: var(--shadow-premium); border: 1px solid #f1f5f9; }
        .btn { padding: 0.8rem 1.5rem; border-radius: 14px; font-weight: 700; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
        .btn-primary { background: var(--accent-primary); color: white; border: none; box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2); }
        .btn-outline { background: white; border: 1px solid #e2e8f0; color: var(--text-primary); }
        .badge { padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .badge-blue { background: rgba(59, 130, 246, 0.1); color: #2563eb; }
        .badge-green { background: rgba(16, 185, 129, 0.1); color: #059669; }
        .badge-purple { background: rgba(139, 92, 246, 0.1); color: #7c3aed; }
        
        .btn-owner-admin {
          background: linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%);
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          font-weight: 800;
          font-size: 0.88rem;
          padding: 0.75rem 1.4rem;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          position: relative;
          box-shadow: 0 10px 25px rgba(30, 27, 75, 0.25);
          transition: all 0.25s ease;
        }
        .btn-owner-admin:hover {
          box-shadow: 0 15px 30px rgba(67, 56, 202, 0.4);
          transform: translateY(-2px);
        }
        .owner-badge-pulse {
          background: #ef4444;
          color: white;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 10px;
          animation: pulse 1.5s infinite;
        }

        .auth-lock-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(91, 60, 232, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upfront-filters {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          background: #f1f5f9;
          padding: 0.4rem 1rem;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }
        .filter-select { background: transparent; border: none; font-weight: 600; color: var(--text-primary); font-size: 0.85rem; outline: none; cursor: pointer; }
        .salary-filter { display: flex; flex-direction: column; gap: 2px; border-left: 1px solid #cbd5e1; padding-left: 0.75rem; }
        .search-input:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }
        
        .company-bg-panel { position: relative; overflow: hidden; background-image: url('/top_companies_bg.png'); background-size: cover; background-position: center; border: none; }
        .company-bg-overlay { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(2px); z-index: 1; }
        .company-insight-card { background: rgba(255, 255, 255, 0.1) !important; backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.15) !important; padding: 0.75rem; border-radius: 12px; display: flex; align-items: center; gap: 0.75rem; }
        .company-insight-card img { width: 32px; height: 32px; border-radius: 8px; }
        .rotating-pie-container { animation: spin 30s linear infinite; }
        
        .package-bg-panel { position: relative; overflow: hidden; background-image: url('/package_analysis_bg.png'); background-size: cover; background-position: center; border: none; }
        .package-bg-overlay { position: absolute; inset: 0; background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(1px); z-index: 1; }

        .recruiter-bg-panel { position: relative; overflow: hidden; background-image: url('/mass_recruiter_bg.png'); background-size: cover; background-position: center; border: none; }
        .recruiter-bg-overlay { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(1px); z-index: 1; }

        .market-bg-panel { position: relative; overflow: hidden; background-image: url('/market_growth_bg.png'); background-size: cover; background-position: center; border: none; }
        .market-bg-overlay { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(2px); z-index: 1; }
        
        .dashboard-footer { margin-top: 5rem; padding: 3rem; border-top: 1px solid #e2e8f0; text-align: center; }
        .highlight { color: var(--accent-primary); font-weight: 800; }
        .dev-meta { display: flex; justify-content: center; gap: 2rem; margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem; }
        .meta-item { display: flex; align-items: center; gap: 8px; }

        /* Mentorship Ambient Section */
        .mentor-ambient-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #ffffff 0%, #faf8ff 45%, #f4f0ff 100%) !important;
          border: 2px solid rgba(91, 60, 232, 0.25) !important;
          border-radius: 36px !important;
          padding: 3.5rem 3rem !important;
          margin-bottom: 3rem !important;
          box-shadow: 0 25px 60px -15px rgba(91, 60, 232, 0.18), 0 0 50px -10px rgba(147, 51, 234, 0.15) !important;
          animation: borderGlowAmbient 8s ease-in-out infinite alternate;
        }
        .ambient-glow-orb { position: absolute; border-radius: 50%; filter: blur(65px); pointer-events: none; z-index: 1; }
        .orb-1 { width: 380px; height: 380px; background: radial-gradient(circle, rgba(91, 60, 232, 0.28) 0%, rgba(147, 51, 234, 0.12) 60%, transparent 80%); top: -120px; left: -80px; }
        .orb-2 { width: 420px; height: 420px; background: radial-gradient(circle, rgba(236, 72, 153, 0.22) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 80%); bottom: -150px; right: -80px; }
        .orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.1) 60%, transparent 80%); top: 30%; right: 35%; }
        .ambient-grid-overlay { position: absolute; inset: 0; background-image: radial-gradient(rgba(91, 60, 232, 0.08) 1px, transparent 1px); background-size: 24px 24px; pointer-events: none; z-index: 1; opacity: 0.65; }

        .mentor-header { text-align: center; max-width: 780px; margin: 0 auto 2.75rem auto; }
        .mentor-pill-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(91, 60, 232, 0.08); border: 1px solid rgba(91, 60, 232, 0.25); color: #5b3ce8; font-weight: 800; font-size: 0.78rem; padding: 6px 14px; border-radius: 999px; letter-spacing: 0.06em; margin-bottom: 1rem; }
        .live-dot-pulse { width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block; animation: pulse 1.8s infinite; }
        .ambient-spin-slow { animation: spin 12s linear infinite; }
        .mentor-main-heading { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.03em; color: #0f172a; line-height: 1.25; margin-bottom: 0.85rem; }
        .gradient-text-purple { background: linear-gradient(135deg, #5b3ce8 0%, #8b5cf6 50%, #d946ef 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .mentor-sub-heading { color: #475569; font-size: 1.05rem; line-height: 1.6; margin: 0; }

        .mentor-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
        .mentor-action-card { background: #ffffff; border-radius: 28px; padding: 2.25rem; border: 1.5px solid rgba(226, 232, 240, 0.9); box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.05); display: flex; flex-direction: column; position: relative; z-index: 2; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .mentor-action-card:hover { box-shadow: 0 25px 50px -10px rgba(91, 60, 232, 0.22); border-color: rgba(91, 60, 232, 0.4); }

        .card-top-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .card-icon-badge { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .badge-share { background: rgba(91, 60, 232, 0.1); border: 1px solid rgba(91, 60, 232, 0.2); }
        .badge-book { background: linear-gradient(135deg, #5b3ce8 0%, #7c3aed 100%); box-shadow: 0 6px 16px rgba(91, 60, 232, 0.35); }
        .card-tag { font-size: 0.75rem; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 4px 10px; border-radius: 8px; }
        .card-tag-popular { background: rgba(239, 68, 68, 0.1); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.2); }

        .card-title { font-size: 1.45rem; font-weight: 800; color: #0f172a; margin-bottom: 0.65rem; }
        .card-desc { color: #475569; font-size: 0.98rem; line-height: 1.55; margin-bottom: 1.5rem; }
        .card-perks-list { display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 2rem; margin-top: auto; }
        .card-perk-item { display: flex; align-items: center; gap: 8px; font-size: 0.88rem; color: #334155; font-weight: 500; }
        .perk-check { color: #5b3ce8; flex-shrink: 0; }

        .mentor-btn-outline { border: 2px solid #5b3ce8; color: #5b3ce8; background: transparent; font-weight: 700; border-radius: 14px; padding: 0.95rem 1.5rem; width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 1.05rem; cursor: pointer; transition: all 0.25s; }
        .mentor-btn-outline:hover { background: #5b3ce8; color: #ffffff; box-shadow: 0 10px 25px rgba(91, 60, 232, 0.3); transform: translateY(-2px); }

        .mentor-btn-solid { background: #5b3ce8; color: #ffffff; border: none; font-weight: 700; border-radius: 14px; padding: 0.95rem 1.5rem; width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 1.05rem; cursor: pointer; box-shadow: 0 10px 25px rgba(91, 60, 232, 0.35); transition: all 0.25s; }
        .mentor-btn-solid:hover { background: #4a2ec9; box-shadow: 0 14px 30px rgba(91, 60, 232, 0.45); transform: translateY(-2px); }

        .featured-mentors-section { background: rgba(255, 255, 255, 0.75); border: 1.5px solid rgba(226, 232, 240, 0.8); border-radius: 24px; padding: 1.75rem 2rem; backdrop-filter: blur(8px); }
        .featured-mentors-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; }
        .featured-mentors-title { font-size: 1.1rem; font-weight: 800; color: #0f172a; display: block; }
        .featured-mentors-subtitle { font-size: 0.85rem; color: #64748b; display: block; margin-top: 2px; }
        .mentor-metrics { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .metric-badge { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 4px 10px; font-size: 0.78rem; color: #475569; }
        .metric-badge strong { color: #5b3ce8; }

        .mentor-carousel-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 1.25rem; }
        .mentor-profile-card { background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 18px; padding: 1.25rem; display: flex; flex-direction: column; transition: all 0.25s ease; }
        .mentor-profile-card:hover { border-color: #818cf8; box-shadow: 0 10px 25px -5px rgba(91, 60, 232, 0.15); transform: translateY(-3px); }
        .mentor-profile-top { display: flex; align-items: center; gap: 10px; margin-bottom: 0.75rem; position: relative; }
        .mentor-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid #5b3ce8; }
        .mentor-verified-check { position: absolute; left: 32px; bottom: 0px; background: #10b981; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; border: 2px solid #ffffff; }
        .mentor-card-rating { margin-left: auto; display: flex; align-items: center; gap: 3px; font-size: 0.8rem; font-weight: 700; color: #0f172a; }
        .session-count { color: #94a3b8; font-weight: 500; font-size: 0.75rem; }
        .mentor-name { font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0 0 2px 0; }
        .mentor-role { font-size: 0.8rem; color: #64748b; margin: 0 0 4px 0; }
        .mentor-company { color: #5b3ce8; font-weight: 700; }
        .mentor-exp { font-size: 0.78rem; color: #94a3b8; margin: 0 0 0.75rem 0; display: flex; align-items: center; gap: 4px; }
        .mentor-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 1rem; margin-top: auto; }
        .mentor-tag-pill { background: #f1f5f9; color: #475569; font-size: 0.7rem; font-weight: 600; padding: 2px 8px; border-radius: 6px; }
        .mentor-quick-book-btn { width: 100%; padding: 0.6rem 0.8rem; border-radius: 10px; background: rgba(91, 60, 232, 0.08); border: 1.5px solid rgba(91, 60, 232, 0.2); color: #5b3ce8; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s; }
        .mentor-quick-book-btn:hover { background: #5b3ce8; color: #ffffff; border-color: #5b3ce8; }

        /* Domain Bar & Modals */
        .domain-roles-bar { background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; }
        .domain-roles-header { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 0.85rem; }
        .domain-roles-title { font-size: 0.88rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 6px; }
        .domain-role-dropdown { background: #f8fafc; border: 1.5px solid #cbd5e1; color: #0f172a; font-weight: 700; font-size: 0.88rem; padding: 6px 14px; border-radius: 12px; outline: none; cursor: pointer; min-width: 220px; }
        .clear-domain-btn { background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); color: #dc2626; font-size: 0.78rem; font-weight: 700; padding: 4px 10px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
        .domain-chips-scroll { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; }
        .domain-role-chip { background: #f8fafc; border: 1px solid #e2e8f0; color: #475569; font-size: 0.78rem; font-weight: 600; padding: 5px 12px; border-radius: 10px; white-space: nowrap; cursor: pointer; }
        .domain-role-chip.active { background: #5b3ce8; color: white; border-color: #5b3ce8; }

        .btn-glowing-blinking-resume { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%) !important; color: white !important; font-weight: 800 !important; padding: 0.55rem 1.25rem !important; font-size: 0.85rem !important; border-radius: 14px !important; display: inline-flex !important; align-items: center !important; gap: 8px !important; cursor: pointer !important; animation: blinkResumeGlow 2.2s infinite !important; }
        .resume-blink-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: dotRadarBlink 1.2s infinite alternate; }
        .badge-ai-scanner-live { background: rgba(255, 255, 255, 0.22); font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 6px; }

        .resume-analysis-banner { background: linear-gradient(135deg, #f0fdf4 0%, #faf5ff 50%, #eff6ff 100%); border: 2px solid rgba(16, 185, 129, 0.35); border-radius: 20px; padding: 1.5rem; margin-bottom: 1.5rem; }
        .resume-banner-top { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem; }
        .resume-file-tag { display: inline-flex; align-items: center; gap: 8px; font-size: 0.95rem; color: #0f172a; }
        .live-pill-green { background: #10b981; color: white; font-size: 0.68rem; font-weight: 800; padding: 2px 8px; border-radius: 12px; }
        .resume-skills-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 1.25rem; padding-top: 0.75rem; border-top: 1px solid rgba(226, 232, 240, 0.8); }
        .skills-row-label { font-size: 0.82rem; font-weight: 700; color: #334155; display: inline-flex; align-items: center; gap: 4px; }
        .skills-chips-list { display: flex; flex-wrap: wrap; gap: 6px; }
        .resume-skill-chip { background: #ffffff; border: 1px solid #cbd5e1; color: #4338ca; font-weight: 700; font-size: 0.75rem; padding: 3px 10px; border-radius: 8px; }
        .match-category-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .match-tab { background: #ffffff; border: 1.5px solid #e2e8f0; padding: 6px 14px; border-radius: 12px; font-size: 0.82rem; font-weight: 700; color: #475569; cursor: pointer; }
        .match-tab.active { background: #0f172a; color: #ffffff; border-color: #0f172a; }

        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55); backdrop-filter: blur(10px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
        .premium-modal { background: white; width: 100%; max-width: 540px; max-height: 90vh; overflow-y: auto; border-radius: 28px; padding: 2.2rem; box-shadow: 0 30px 70px -15px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.9); }
        .mentor-modal-card { max-width: 580px; }
        .admin-auth-modal { max-width: 440px; }
        .modal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .close-btn { background: #f1f5f9; border: none; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 1.4rem; display: flex; align-items: center; justify-content: center; color: #64748b; }
        .close-btn:hover { background: #e2e8f0; color: #0f172a; }

        .modal-pill-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(91, 60, 232, 0.1); color: #5b3ce8; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
        .modal-pill-tag.tag-book { background: rgba(16, 185, 129, 0.1); color: #059669; }
        .modal-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 600px) { .modal-form-grid { grid-template-columns: 1fr; } }
        .input-group { margin-bottom: 1.25rem; }
        .input-group label { display: block; font-weight: 700; margin-bottom: 0.5rem; font-size: 0.85rem; color: #334155; }
        .modal-input { width: 100%; padding: 0.85rem 1rem; border-radius: 12px; border: 1.5px solid #e2e8f0; outline: none; font-weight: 500; font-size: 0.9rem; background: #ffffff; font-family: inherit; }
        .modal-input:focus { border-color: #5b3ce8; box-shadow: 0 0 0 4px rgba(91, 60, 232, 0.12); }

        .degree-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .deg-chip { padding: 8px 14px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: #f8fafc; font-weight: 600; font-size: 0.82rem; color: #475569; cursor: pointer; display: inline-flex; align-items: center; }
        .deg-chip.active { background: #5b3ce8; color: white; border-color: #5b3ce8; }

        .selected-mentor-banner { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 0.85rem 1rem; margin-bottom: 1.25rem; }
        .banner-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid #5b3ce8; }
        .banner-rating { margin-left: auto; display: flex; align-items: center; gap: 4px; background: #fef9c3; color: #a16207; font-weight: 700; font-size: 0.8rem; padding: 4px 8px; border-radius: 8px; }

        .success-modal-state { text-align: center; padding: 1.5rem 0.5rem; }
        .success-icon-wrap { width: 72px; height: 72px; border-radius: 50%; background: rgba(16, 185, 129, 0.12); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; }
        .success-icon-wrap.bg-purple-glow { background: rgba(91, 60, 232, 0.12); }
        .booking-receipt-box { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 1rem; text-align: left; font-size: 0.9rem; margin-top: 1.25rem; display: flex; flex-direction: column; gap: 6px; }

        .resume-dropzone { display: block; border: 2px dashed #cbd5e1; border-radius: 20px; padding: 2.25rem 1.5rem; text-align: center; background: #f8fafc; cursor: pointer; margin-bottom: 1.25rem; }
        .dropzone-icon-box { width: 60px; height: 60px; border-radius: 50%; background: rgba(91, 60, 232, 0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem auto; }
        .browse-files-btn { display: inline-flex; align-items: center; gap: 6px; background: #5b3ce8; color: white; font-size: 0.85rem; font-weight: 700; padding: 6px 16px; border-radius: 10px; margin-top: 1rem; }
        .resume-divider { display: flex; align-items: center; text-align: center; margin: 1.25rem 0; color: #94a3b8; font-size: 0.75rem; font-weight: 700; }
        .resume-divider::before, .resume-divider::after { content: ''; flex: 1; border-bottom: 1px solid #e2e8f0; }
        .resume-divider span { padding: 0 10px; }
        .quick-profiles-section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.25rem; margin-top: 1rem; }
        .quick-profiles-title { font-size: 0.82rem; font-weight: 800; color: #334155; display: flex; align-items: center; gap: 6px; margin-bottom: 0.75rem; }
        .quick-profiles-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .quick-profile-card { background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 0.75rem; cursor: pointer; }
        .mini-skill-tag { background: #f1f5f9; font-size: 0.65rem; font-weight: 600; color: #475569; padding: 1px 6px; border-radius: 4px; margin-right: 4px; }

        .brand-logo-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          padding: 3px;
          border-radius: 18px;
          box-shadow: 0 8px 24px -4px rgba(91, 60, 232, 0.22), 0 2px 6px rgba(0, 0, 0, 0.05);
          border: 2px solid rgba(91, 60, 232, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }
        .brand-logo-container:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 12px 30px -4px rgba(91, 60, 232, 0.35);
          border-color: #5b3ce8;
        }
        .header-brand-logo {
          width: 58px;
          height: 58px;
          border-radius: 14px;
          object-fit: cover;
          display: block;
        }

        .genai-toolstack-banner {
          background: radial-gradient(circle at 50% 0%, #261658 0%, #120c30 100%);
          border: 1.5px solid rgba(139, 92, 246, 0.4);
          border-radius: 20px;
          padding: 1.1rem 1rem;
          margin-top: 1rem;
          color: white;
          box-shadow: 0 10px 25px -5px rgba(18, 12, 48, 0.45);
          text-align: center;
        }
        .genai-banner-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          letter-spacing: -0.01em;
        }
        .genai-banner-sub {
          font-size: 0.78rem;
          color: #cbd5e1;
          margin: 0 0 0.85rem 0;
          line-height: 1.35;
        }
        .genai-tools-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 7px;
        }
        .tool-pill {
          background: #ffffff;
          color: #0f172a;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
          cursor: pointer;
        }
        .tool-pill:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 14px rgba(91, 60, 232, 0.3);
          border-color: #8b5cf6;
        }
        .tool-ico {
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
        }
        .tool-lbl {
          display: inline-block;
          white-space: nowrap;
        }

        .avatar-upload-row { display: flex; align-items: center; gap: 1rem; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 0.85rem 1rem; }
        .avatar-preview-circle { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2.5px solid #5b3ce8; flex-shrink: 0; box-shadow: 0 4px 10px rgba(91, 60, 232, 0.2); }
        .btn-upload-photo { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #5b3ce8; color: white; padding: 0.55rem 1rem; border-radius: 10px; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .btn-upload-photo:hover { background: #4a2ec9; }

        /* User Profile Nav Chip */
        .user-profile-nav-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f1f5f9;
          border: 1.5px solid #cbd5e1;
          padding: 4px 10px 4px 4px;
          border-radius: 999px;
        }
        .user-nav-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid #5b3ce8;
        }
        .user-nav-meta {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
          text-align: left;
        }
        .user-nav-name {
          font-size: 0.82rem;
          font-weight: 800;
          color: #0f172a;
        }
        .user-nav-role {
          font-size: 0.68rem;
          color: #64748b;
          font-weight: 600;
        }
        .user-nav-logout {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.2s;
        }
        .user-nav-logout:hover {
          color: #dc2626;
          background: #fee2e2;
        }

        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes borderGlowAmbient {
          0% { border-color: rgba(91, 60, 232, 0.25); }
          50% { border-color: rgba(147, 51, 234, 0.55); }
          100% { border-color: rgba(91, 60, 232, 0.35); }
        }
      `}</style>
    </div>
  );
};

export default App;
