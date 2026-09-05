import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Sparkles, Radio, MessageSquare, Edit3, 
  Sprout, Bot, Cpu, GitBranch, Rocket, Award, 
  CheckCircle2, ArrowRight, Clock, Compass, Layers, 
  X, Check, Flame, ChevronRight, HelpCircle, ExternalLink, Zap
} from 'lucide-react';

const learningProblems = [
  { id: 'p1', emoji: '😞', text: 'Learning in isolation', tag: 'Community & Peer Support' },
  { id: 'p2', emoji: '🟡', text: 'No practical/hands-on experience', tag: 'Real Project Capstones' },
  { id: 'p3', emoji: '🟡', text: 'No peer support', tag: 'Collaborative Groups' },
  { id: 'p4', emoji: '🟡', text: 'Difficult to retain what was taught', tag: 'Spaced Recall & Practice' },
  { id: 'p5', emoji: '🟡', text: 'Hard to get across the finish line', tag: 'Accountability Mentorship' },
  { id: 'p6', emoji: '😭', text: 'No personal guidance and mentorship', tag: '1:1 Expert Matching' },
  { id: 'p7', emoji: '🟡', text: 'Outdated curriculum', tag: 'Live Industry Sourced' },
];

const recruitersHubPillars = [
  {
    id: 'pillar-1',
    icon: <Radio size={24} />,
    badgeColor: '#f59e0b',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    title: 'Live interactive sessions by industry experts',
    subtitle: 'Get valuable industry insights from our instructors who have dedicated years to learning and unlearning.',
    stats: '150+ Live Cohorts Hosted',
    highlights: ['Real-time code alongs', 'Industry guest speakers', 'Instant doubt clearing']
  },
  {
    id: 'pillar-2',
    icon: <MessageSquare size={24} />,
    badgeColor: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    title: 'Dedicated sessions to solve your queries',
    subtitle: 'We offer doubt-solving sessions with mentors to help you stay on track with the course.',
    stats: '1:1 Dedicated Hours',
    highlights: ['Zero backlog guarantee', 'Personalized feedback', 'Resume & code review']
  },
  {
    id: 'pillar-3',
    icon: <Edit3 size={24} />,
    badgeColor: '#3b82f6',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    title: 'Hands-on projects to apply your learnings',
    subtitle: 'Our programs prioritize hands-on learning, with projects at the end of each module to reinforce each topic.',
    stats: '5+ Production Capstones',
    highlights: ['Production ready repos', 'Real customer datasets', 'Deployment & CI/CD']
  },
  {
    id: 'pillar-4',
    icon: <Sprout size={24} />,
    badgeColor: '#a855f7',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    title: 'Active community to help you grow',
    subtitle: 'Our programs offer a college-like learning experience with a supportive community of like-minded individuals.',
    stats: '12,000+ Alumni Network',
    highlights: ['Exclusive Discord & Slack', 'Hackathon study squads', 'Referral channels']
  }
];

const roadmapArticles = [
  {
    id: 'article-1',
    step: '01',
    icon: <Bot size={22} />,
    title: 'How to identify and solve real-world problems using AI',
    summary: 'Use AI to solve meaningful challenges in your work, projects, or industry.',
    readTime: '4 min read',
    level: 'Foundational',
    color: '#6366f1',
    deepDive: {
      intro: 'Artificial Intelligence is only as powerful as the problem it solves. Instead of building superficial wrapper tools, high-earning developers and modern professionals identify friction points in business operations and engineer automated AI workflows.',
      takeaways: [
        'Frame business bottlenecks as structured inputs and deterministic outputs.',
        'Use chain-of-thought and structured reasoning prompts to parse unstructured documents.',
        'Identify high-impact ROI use cases: automated ticket triage, semantic resume ranking, custom RFP summaries.'
      ],
      actionPlan: 'Pick one manual task you do weekly (e.g. summarizing client notes or writing repetitive SQL queries) and build an automated prompt loop to execute it with 95% accuracy.',
      recommendedTopic: 'AI Product Strategy & Problem Framing'
    }
  },
  {
    id: 'article-2',
    step: '02',
    icon: <Sparkles size={22} />,
    title: 'How to use tools like ChatGPT, Claude, Midjourney, and more',
    summary: 'Get hands-on with ChatGPT, Claude, Midjourney, ElevenLabs, and more; no technical background needed.',
    readTime: '6 min read',
    level: 'Core Skills',
    color: '#8b5cf6',
    deepDive: {
      intro: 'Modern generative AI is a multi-modal superpower. Knowing when to choose Claude 3.5 Sonnet for precise code refactoring, ChatGPT o1 for complex multi-step reasoning, Midjourney for design prototyping, and ElevenLabs for voice cloning makes you 10x faster than traditional workers.',
      takeaways: [
        'Master System Prompts, Few-Shot examples, and markdown output enforcement.',
        'Combine Midjourney UI asset generation with frontend code scaffolds.',
        'Synthesize realistic audio narrations and dynamic interactive demos in minutes.'
      ],
      actionPlan: 'Create a full multimodal portfolio piece: Generate a brand concept with Claude, create visual assets with Midjourney, and generate an AI demo video pitch.',
      recommendedTopic: 'Mastering LLM Prompting & Multi-Modal AI Tools'
    }
  },
  {
    id: 'article-3',
    step: '03',
    icon: <GitBranch size={22} />,
    title: 'How to build AI-powered workflows for productivity and automation',
    summary: 'Design AI-powered systems to boost productivity and reduce manual tasks.',
    readTime: '5 min read',
    level: 'Advanced Automation',
    color: '#06b6d4',
    deepDive: {
      intro: 'Stand-alone chatbots only scratch the surface. The real enterprise value lies in connecting LLMs to webhooks, databases, and APIs using automation tools (n8n, Make, LangChain, or custom Python microservices).',
      takeaways: [
        'Build autonomous agents that listen to webhooks and trigger intelligent actions.',
        'Implement Retrieval-Augmented Generation (RAG) over company PDFs and internal docs.',
        'Implement automated quality assurance checkpoints and guardrails before sending live responses.'
      ],
      actionPlan: 'Deploy an automated workflow that connects a Google Sheet or database to an LLM API to process incoming job leads or customer support tickets automatically.',
      recommendedTopic: 'Building Autonomous AI Workflows & RAG Systems'
    }
  },
  {
    id: 'article-4',
    step: '04',
    icon: <Rocket size={22} />,
    title: 'How to launch projects, build a public portfolio, and monetize your ideas',
    summary: 'Turn ideas into shipped projects, grow your portfolio, and explore revenue opportunities.',
    readTime: '5 min read',
    level: 'Monetization & Career',
    color: '#ec4899',
    deepDive: {
      intro: 'A project hidden on your local machine brings zero career growth. Packaging your solutions with live demo URLs, clean GitHub READMEs, and case study breakdowns attracts top recruiters and high-paying freelance clients.',
      takeaways: [
        'Publish interactive web apps with free hosting (Vercel, Render, GitHub Pages).',
        'Record 90-second crisp demo videos highlighting the business value created.',
        'Package recurring AI consulting or micro-SaaS subscriptions for niche businesses.'
      ],
      actionPlan: 'Ship a public GitHub repository with live deployment and post a 3-slide visual case study breakdown on LinkedIn and Twitter/X tagging potential hiring leads.',
      recommendedTopic: 'AI Freelancing, Micro-SaaS & Career Portfolio Launch'
    }
  },
  {
    id: 'article-5',
    step: '05',
    icon: <Award size={22} />,
    title: 'Demo Day: Present your capstone to expert industry leaders',
    summary: 'Compete to be the cohort\'s top performer by presenting your capstone to expert industry leaders.',
    readTime: '3 min read',
    level: 'Grand Finale & Placement',
    color: '#10b981',
    deepDive: {
      intro: 'Demo Day is the culmination of your journey. Present your live AI application to engineering directors, product managers, and venture investors to receive direct recruitment opportunities and feedback.',
      takeaways: [
        '5-minute pitch format: Problem, Solution, Live Architecture, and Impact Metrics.',
        'Direct referral fast-track with partner tech hiring firms.',
        'Top performers receive certification badges and featured spotlight on Recruiters Hub AI.'
      ],
      actionPlan: 'Prepare a 5-minute slide deck and live interactive deployment ready for testing under real-world traffic conditions.',
      recommendedTopic: 'Capstone Project Review & Mock Demo Pitch'
    }
  }
];

export const CareerArticlesHub = ({ onBookTopic }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'problems' | 'roadmap'
  const [solvedProblemId, setSolvedProblemId] = useState(null);

  return (
    <div className="career-articles-hub-container" style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
      {/* Top Banner Header */}
      <div className="hub-top-header">
        <div className="hub-tag-badge">
          <Sparkles size={14} style={{ color: '#f59e0b' }} />
          <span>CAREER MASTERY & KNOWLEDGE ACCELERATOR</span>
        </div>
        <h2 className="hub-title">
          Master Modern Skills. <span className="gradient-text">The Recruiters Hub Way</span>
        </h2>
        <p className="hub-subtitle">
          From diagnosing common learning bottlenecks to executing a 5-step AI blueprint — explore high-impact guides and actionable roadmaps built for ambitious professionals.
        </p>

        {/* Filter Navigation Tabs */}
        <div className="hub-nav-tabs">
          <button 
            className={`hub-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <Layers size={16} /> All Masterclass Insights
          </button>
          <button 
            className={`hub-tab-btn ${activeTab === 'problems' ? 'active' : ''}`}
            onClick={() => setActiveTab('problems')}
          >
            <HelpCircle size={16} /> The Recruiters Hub Way
          </button>
          <button 
            className={`hub-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <Compass size={16} /> 5-Step AI Mastery Roadmap
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: LEARNING PROBLEMS & THE RECRUITERS HUB WAY (Image 1 Content)
         ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'problems') && (
        <motion.div 
          className="glass-panel hub-section-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="problems-header-box">
            <h3 className="section-subheading">Learning problems we've all faced</h3>
            <p className="section-subtext">Click on any obstacle to see how Recruiters Hub AI mentors help you overcome it.</p>
            
            {/* Dark Problem Pills Grid */}
            <div className="problem-chips-grid">
              {learningProblems.map((prob) => {
                const isSelected = solvedProblemId === prob.id;
                return (
                  <motion.button
                    key={prob.id}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`problem-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSolvedProblemId(isSelected ? null : prob.id)}
                  >
                    <span className="chip-emoji">{prob.emoji}</span>
                    <span className="chip-text">{prob.text}</span>
                    {isSelected && (
                      <span className="chip-solve-tag">
                        <Check size={12} /> {prob.tag}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Central Divider / Breakthrough Banner */}
          <div className="recruiters-hub-breakthrough-divider">
            <div className="divider-line"></div>
            <div className="breakthrough-badge">
              <span className="badge-light-text">PRESENTING THE</span>
              <h4 className="badge-main-text">Recruiters Hub WAY!</h4>
            </div>
            <div className="divider-line"></div>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="pillars-grid">
            {recruitersHubPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                className="pillar-card"
                whileHover={{ y: -6, boxShadow: '0 20px 35px -10px rgba(91, 60, 232, 0.25)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="pillar-card-top">
                  <div className="pillar-icon-wrap" style={{ background: pillar.badgeBg, color: pillar.badgeColor }}>
                    {pillar.icon}
                  </div>
                  <span className="pillar-stat-chip" style={{ color: pillar.badgeColor, borderColor: pillar.badgeBg }}>
                    {pillar.stats}
                  </span>
                </div>

                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.subtitle}</p>

                <div className="pillar-highlights-list">
                  {pillar.highlights.map((h, i) => (
                    <div key={i} className="highlight-item">
                      <CheckCircle2 size={13} style={{ color: pillar.badgeColor, flexShrink: 0 }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className="pillar-action-btn"
                  onClick={() => onBookTopic && onBookTopic({ serviceTopic: pillar.title, mentorPreference: 'Any Top Recommended Mentor' })}
                >
                  <span>Experience this in 1:1 Session</span>
                  <ChevronRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          SECTION 2: 5-STEP AI MASTERY ARTICLES & ROADMAP (Image 2 Content)
         ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'roadmap') && (
        <motion.div 
          className="glass-panel hub-section-panel roadmap-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{ marginTop: '2rem' }}
        >
          <div className="roadmap-header-row">
            <div>
              <div className="hub-tag-badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                <Cpu size={14} />
                <span>PRACTICAL AI ACCELERATION CURRICULUM</span>
              </div>
              <h3 className="section-subheading" style={{ marginTop: '0.4rem' }}>
                5-Step AI Mastery & Career Acceleration Roadmap
              </h3>
              <p className="section-subtext">
                Explore each actionable milestone. Click any module to read the deep dive breakdown, core takeaways, and hands-on execution steps.
              </p>
            </div>

            <button 
              className="btn btn-outline"
              onClick={() => onBookTopic && onBookTopic({ serviceTopic: 'Comprehensive AI Career Roadmap Session' })}
              style={{ alignSelf: 'center', whiteSpace: 'nowrap' }}
            >
              <Zap size={16} style={{ color: '#f59e0b' }} />
              Book Full Roadmap Review
            </button>
          </div>

          {/* Timeline / Roadmap List */}
          <div className="timeline-articles-container">
            <div className="timeline-vertical-bar"></div>
            
            {roadmapArticles.map((article, index) => (
              <motion.div 
                key={article.id}
                className="roadmap-step-card"
                whileHover={{ x: 6 }}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline Node Icon */}
                <div className="timeline-node-circle" style={{ borderColor: article.color, boxShadow: `0 0 16px ${article.color}55` }}>
                  <span className="node-step-num">{article.step}</span>
                </div>

                {/* Main Card Content */}
                <div className="step-card-content" style={{ borderLeft: `3px solid ${article.color}` }}>
                  <div className="step-meta-row">
                    <span className="step-badge" style={{ background: `${article.color}18`, color: article.color }}>
                      Module {article.step} • {article.level}
                    </span>
                    <span className="read-time-tag">
                      <Clock size={12} /> {article.readTime}
                    </span>
                  </div>

                  <h4 className="step-title">{article.title}</h4>
                  <p className="step-summary">{article.summary}</p>

                  <div className="step-actions-row">
                    <button 
                      className="btn-read-article"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <BookOpen size={14} />
                      <span>Read Deep Dive Guide</span>
                      <ArrowRight size={14} />
                    </button>

                    <button 
                      className="btn-practice-topic"
                      onClick={() => onBookTopic && onBookTopic({ serviceTopic: article.title, mentorPreference: 'Specialist Mentor in AI' })}
                    >
                      <Sparkles size={14} />
                      <span>Practice with Mentor</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          INTERACTIVE ARTICLE DEEP DIVE MODAL
         ========================================================================= */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
            <motion.div 
              className="premium-modal article-reader-modal"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
            >
              {/* Header */}
              <div className="article-modal-header">
                <div className="article-header-meta">
                  <span className="article-chip" style={{ background: `${selectedArticle.color}22`, color: selectedArticle.color }}>
                    Module {selectedArticle.step} • {selectedArticle.level}
                  </span>
                  <span className="read-time-pill">
                    <Clock size={12} /> {selectedArticle.readTime}
                  </span>
                </div>
                <button className="close-btn" onClick={() => setSelectedArticle(null)}>
                  <X size={18} />
                </button>
              </div>

              {/* Title */}
              <h3 className="article-modal-title">{selectedArticle.title}</h3>
              <p className="article-modal-summary">{selectedArticle.summary}</p>

              {/* Body Content */}
              <div className="article-modal-body">
                <div className="article-intro-box">
                  <p>{selectedArticle.deepDive.intro}</p>
                </div>

                <div className="article-takeaways-section">
                  <h4 className="article-section-heading">
                    <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                    Key Core Insights & Best Practices
                  </h4>
                  <ul className="takeaways-list">
                    {selectedArticle.deepDive.takeaways.map((item, i) => (
                      <li key={i} className="takeaway-bullet">
                        <span className="bullet-dot" style={{ background: selectedArticle.color }}></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="action-plan-box">
                  <div className="action-plan-header">
                    <Flame size={18} style={{ color: '#f59e0b' }} />
                    <span className="action-plan-title">Actionable Practice Challenge</span>
                  </div>
                  <p className="action-plan-desc">{selectedArticle.deepDive.actionPlan}</p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="article-modal-footer">
                <button 
                  className="btn btn-outline" 
                  onClick={() => setSelectedArticle(null)}
                >
                  Close Article
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    const topic = selectedArticle.title;
                    setSelectedArticle(null);
                    if (onBookTopic) onBookTopic({ serviceTopic: topic, mentorPreference: 'Specialist Mentor in AI' });
                  }}
                  style={{ gap: '8px' }}
                >
                  <Sparkles size={16} />
                  <span>Book 1:1 Mentorship on This Topic</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scoped CSS styling for Career Articles Hub */}
      <style>{`
        .career-articles-hub-container {
          position: relative;
          width: 100%;
        }

        .hub-top-header {
          text-align: center;
          max-width: 840px;
          margin: 0 auto 2.5rem auto;
        }

        .hub-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(91, 60, 232, 0.1);
          color: #5b3ce8;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid rgba(91, 60, 232, 0.2);
          margin-bottom: 0.85rem;
        }

        .hub-title {
          font-size: 2.25rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.25;
          margin-bottom: 0.75rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #5b3ce8 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hub-subtitle {
          font-size: 1.05rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }

        .hub-nav-tabs {
          display: inline-flex;
          background: #f1f5f9;
          padding: 5px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          gap: 4px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hub-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.85rem;
          color: #64748b;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hub-tab-btn:hover {
          color: #0f172a;
        }

        .hub-tab-btn.active {
          background: #ffffff;
          color: #5b3ce8;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .hub-section-panel {
          padding: 2.5rem;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
        }

        .problems-header-box {
          text-align: center;
          margin-bottom: 2.25rem;
        }

        .section-subheading {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.4rem;
        }

        .section-subtext {
          font-size: 0.95rem;
          color: #64748b;
        }

        .problem-chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 1.5rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .problem-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1e1b4b;
          color: #e2e8f0;
          padding: 8px 16px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .problem-chip:hover {
          background: #2e1065;
          border-color: #8b5cf6;
          color: #ffffff;
        }

        .problem-chip.selected {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          border-color: #a78bfa;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.35);
        }

        .chip-solve-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(16, 185, 129, 0.25);
          color: #6ee7b7;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 12px;
          margin-left: 4px;
        }

        .recruiters-hub-breakthrough-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 2.75rem 0;
        }

        .divider-line {
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(91, 60, 232, 0.3), transparent);
        }

        .breakthrough-badge {
          text-align: center;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          background: #0f172a;
          color: white;
          border: 1.5px solid rgba(139, 92, 246, 0.4);
          box-shadow: 0 8px 25px rgba(91, 60, 232, 0.25);
        }

        .badge-light-text {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #94a3b8;
          display: block;
        }

        .badge-main-text {
          font-size: 1.25rem;
          font-weight: 900;
          margin: 0;
          background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .pillar-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 22px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pillar-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .pillar-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pillar-stat-chip {
          font-size: 0.75rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 8px;
          border: 1px solid;
        }

        .pillar-title {
          font-size: 1.12rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.35;
          margin-bottom: 0.6rem;
        }

        .pillar-desc {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }

        .pillar-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 1.5rem;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #334155;
          font-weight: 600;
        }

        .pillar-action-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          color: #5b3ce8;
          font-weight: 700;
          font-size: 0.82rem;
          padding: 0.7rem 1rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .pillar-action-btn:hover {
          background: #5b3ce8;
          color: #ffffff;
          border-color: #5b3ce8;
        }

        /* Roadmap Styling */
        .roadmap-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2.25rem;
        }

        .timeline-articles-container {
          position: relative;
          padding-left: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .timeline-vertical-bar {
          position: absolute;
          left: 17px;
          top: 20px;
          bottom: 20px;
          width: 3px;
          background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 40%, #06b6d4 70%, #10b981 100%);
          border-radius: 9999px;
        }

        .roadmap-step-card {
          position: relative;
          display: flex;
          align-items: flex-start;
        }

        .timeline-node-circle {
          position: absolute;
          left: -2rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #0f172a;
          border: 2.5px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          color: white;
          font-weight: 900;
          font-size: 0.82rem;
        }

        .step-card-content {
          margin-left: 1.25rem;
          flex: 1;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          padding: 1.5rem 1.75rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
          transition: all 0.25s ease;
        }

        .step-card-content:hover {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }

        .step-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .step-badge {
          font-size: 0.75rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 8px;
          letter-spacing: 0.03em;
        }

        .read-time-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 600;
        }

        .step-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.4rem;
          line-height: 1.35;
        }

        .step-summary {
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }

        .step-actions-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .btn-read-article {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #0f172a;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.82rem;
          padding: 0.6rem 1.2rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-read-article:hover {
          background: #1e293b;
          transform: translateY(-1px);
        }

        .btn-practice-topic {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(91, 60, 232, 0.08);
          color: #5b3ce8;
          font-weight: 700;
          font-size: 0.82rem;
          padding: 0.6rem 1.2rem;
          border-radius: 10px;
          border: 1px solid rgba(91, 60, 232, 0.2);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-practice-topic:hover {
          background: #5b3ce8;
          color: #ffffff;
        }

        /* Article Deep Dive Reader Modal */
        .article-reader-modal {
          max-width: 680px;
          max-height: 88vh;
        }

        .article-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .article-header-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .article-chip {
          font-size: 0.75rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 8px;
        }

        .read-time-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
        }

        .article-modal-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.3;
          margin-bottom: 0.5rem;
        }

        .article-modal-summary {
          font-size: 0.95rem;
          color: #64748b;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .article-intro-box {
          background: #f8fafc;
          border-left: 4px solid #5b3ce8;
          padding: 1rem 1.25rem;
          border-radius: 0 12px 12px 0;
          font-size: 0.92rem;
          line-height: 1.6;
          color: #334155;
          margin-bottom: 1.5rem;
        }

        .article-takeaways-section {
          margin-bottom: 1.5rem;
        }

        .article-section-heading {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.85rem;
        }

        .takeaways-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .takeaway-bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: #334155;
          line-height: 1.5;
        }

        .bullet-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .action-plan-box {
          background: #fffbeb;
          border: 1.5px solid #fde68a;
          border-radius: 14px;
          padding: 1.1rem 1.25rem;
          margin-bottom: 1.5rem;
        }

        .action-plan-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 0.4rem;
        }

        .action-plan-title {
          font-size: 0.88rem;
          font-weight: 800;
          color: #92400e;
        }

        .action-plan-desc {
          font-size: 0.85rem;
          color: #78350f;
          line-height: 1.5;
          margin: 0;
        }

        .article-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid #e2e8f0;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hub-title { font-size: 1.75rem; }
          .hub-section-panel { padding: 1.5rem; }
          .timeline-articles-container { padding-left: 1.5rem; }
          .timeline-node-circle { left: -1.5rem; width: 32px; height: 32px; font-size: 0.75rem; }
          .step-card-content { margin-left: 0.75rem; padding: 1.25rem; }
        }
      `}</style>
    </div>
  );
};

export default CareerArticlesHub;
