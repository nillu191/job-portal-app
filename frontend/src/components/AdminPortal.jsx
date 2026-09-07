import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageSquare, Megaphone, Plus, CheckCircle, XCircle, 
  Trash2, Mail, ExternalLink, ShieldCheck, Clock, Star, 
  AlertCircle, ArrowRight, RefreshCw, Send, Check, Play, Pause,
  Layers, UserCheck, Shield, Sparkles, Calendar, DollarSign,
  Lock, Key, KeyRound, Eye, EyeOff, LogOut, ShieldAlert
} from 'lucide-react';

export const AdminPortal = ({
  mentors = [],
  consultations = [],
  ads = [],
  onApproveMentor,
  onAddMentor,
  onDeleteMentor,
  onToggleMentorActive,
  onUpdateConsultationStatus,
  onDeleteConsultation,
  onCreateAd,
  onToggleAdActive,
  onDeleteAd,
  onRefresh,
  onLockAdmin,
  onPasswordChanged,
  loading = false
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [inboxFilter, setInboxFilter] = useState('All');

  const [newMentor, setNewMentor] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    exp: '5+ yrs',
    rating: '5.0',
    sessions: '25',
    hourlyRate: '₹2,000 / hr',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    tags: 'System Design, DSA, Mock Interview',
    bio: '',
    linkedin: ''
  });
  const [showAddMentorForm, setShowAddMentorForm] = useState(false);

  const [newAd, setNewAd] = useState({
    title: 'Top Tier-1 Mock Interview Sprint',
    tag: '🔥 HOT SPONSORED',
    badgeColor: 'purple',
    headline: 'Crack Google, Amazon & Microsoft with 1:1 Live Coding Prep',
    description: 'Get evaluated by verified Bar Raisers and receive detailed interview clearing strategies.',
    mentorName: 'Aarav Sharma & Priya Mukherjee',
    mentorCompany: 'Google & Microsoft',
    rateBadge: 'Flat 30% OFF',
    ctaText: 'Consult & Connect Now',
    ctaAction: 'book_session',
    bannerBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
    active: true
  });
  const [showAddAdForm, setShowAddAdForm] = useState(false);

  const pendingMentors = mentors.filter(m => !m.approved || m.status === 'pending');
  const liveMentors = mentors.filter(m => m.approved && m.status !== 'rejected');
  
  const filteredConsultations = consultations.filter(c => {
    if (inboxFilter === 'All') return true;
    return c.status === inboxFilter;
  });

  // Master Owner Password Management State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [securityMessage, setSecurityMessage] = useState('');
  const [securityError, setSecurityError] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isCustomPassword, setIsCustomPassword] = useState(false);
  const [lastUpdatedPassword, setLastUpdatedPassword] = useState(null);

  useEffect(() => {
    fetchSecurityStatus();
  }, []);

  const fetchSecurityStatus = async () => {
    try {
      const res = await fetch('/api/admin/status');
      if (res.ok) {
        const data = await res.json();
        setIsCustomPassword(data.is_custom);
        setLastUpdatedPassword(data.last_updated);
      } else {
        const stored = localStorage.getItem('owner_admin_pin');
        setIsCustomPassword(Boolean(stored));
      }
    } catch {
      const stored = localStorage.getItem('owner_admin_pin');
      setIsCustomPassword(Boolean(stored));
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setSecurityError('');
    setSecurityMessage('');

    if (!newPassword || newPassword.trim().length < 4) {
      setSecurityError('New password must be at least 4 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityError('New password and confirmation do not match.');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: currentPassword.trim(),
          new_password: newPassword.trim()
        })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('owner_admin_pin', newPassword.trim());
        setSecurityMessage('✅ Master Owner Password updated successfully! Only this password will now unlock the Admin section.');
        setIsCustomPassword(true);
        setLastUpdatedPassword(data.last_updated || new Date().toISOString());
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        if (onPasswordChanged) onPasswordChanged(newPassword.trim());
      } else {
        setSecurityError(data.error || 'Failed to update owner password.');
      }
    } catch {
      // LocalStorage fallback
      localStorage.setItem('owner_admin_pin', newPassword.trim());
      setSecurityMessage('✅ Master Owner Password updated successfully! Only your new password will unlock the admin section.');
      setIsCustomPassword(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      if (onPasswordChanged) onPasswordChanged(newPassword.trim());
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleAddMentorSubmit = (e) => {
    e.preventDefault();
    if (!newMentor.name || !newMentor.role || !newMentor.company) {
      alert('Please fill in Mentor Name, Role and Company');
      return;
    }
    const tagsArray = newMentor.tags.split(',').map(t => t.trim()).filter(Boolean);
    onAddMentor({
      ...newMentor,
      tags: tagsArray,
      rating: parseFloat(newMentor.rating) || 5.0,
      sessions: parseInt(newMentor.sessions) || 0
    });
    setNewMentor({
      name: '',
      email: '',
      role: '',
      company: '',
      exp: '5+ yrs',
      rating: '5.0',
      sessions: '25',
      hourlyRate: '₹2,000 / hr',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      tags: 'System Design, DSA, Mock Interview',
      bio: '',
      linkedin: ''
    });
    setShowAddMentorForm(false);
  };

  const handleCreateAdSubmit = (e) => {
    e.preventDefault();
    if (!newAd.headline) {
      alert('Please provide an ad headline');
      return;
    }
    onCreateAd(newAd);
    setShowAddAdForm(false);
  };

  return (
    <div className="admin-portal-wrapper">
      <div className="admin-nav-bar">
        <div className="admin-tabs">
          <button 
            className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Layers size={18} />
            <span>Dashboard Overview</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setActiveTab('inbox')}
          >
            <MessageSquare size={18} />
            <span>Consultation Messages</span>
            {consultations.filter(c => c.status === 'Pending').length > 0 && (
              <span className="admin-badge-count">{consultations.filter(c => c.status === 'Pending').length}</span>
            )}
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'mentors' ? 'active' : ''}`}
            onClick={() => setActiveTab('mentors')}
          >
            <Users size={18} />
            <span>Mentors & Approvals</span>
            {pendingMentors.length > 0 && (
              <span className="admin-badge-count bg-amber">{pendingMentors.length}</span>
            )}
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'ads' ? 'active' : ''}`}
            onClick={() => setActiveTab('ads')}
          >
            <Megaphone size={18} />
            <span>Ad Campaigns ({ads.length})</span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('security');
              setSecurityError('');
              setSecurityMessage('');
              fetchSecurityStatus();
            }}
          >
            <Lock size={18} />
            <span>Security & Password</span>
            {!isCustomPassword && (
              <span className="admin-badge-count bg-amber" title="Custom password not set">Set Key</span>
            )}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm" onClick={onRefresh} disabled={loading}>
            <RefreshCw size={15} className={loading ? 'spin' : ''} />
            <span>Sync Data</span>
          </button>
          {onLockAdmin && (
            <button 
              className="btn btn-sm btn-lock-exit" 
              onClick={onLockAdmin}
              title="Lock Admin Portal and exit"
            >
              <LogOut size={15} />
              <span>Lock & Exit</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="stat-icon-box bg-purple-light">
                <Users size={24} color="#5b3ce8" />
              </div>
              <div>
                <div className="stat-label">Live Active Mentors</div>
                <div className="stat-num">{liveMentors.length}</div>
                <div className="stat-sub">Pushed directly on live site</div>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="stat-icon-box bg-amber-light">
                <UserCheck size={24} color="#d97706" />
              </div>
              <div>
                <div className="stat-label">Pending Mentor Applications</div>
                <div className="stat-num">{pendingMentors.length}</div>
                <div className="stat-sub">Requires owner approval</div>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="stat-icon-box bg-green-light">
                <MessageSquare size={24} color="#10b981" />
              </div>
              <div>
                <div className="stat-label">Consultation Inquiries</div>
                <div className="stat-num">{consultations.length}</div>
                <div className="stat-sub">{consultations.filter(c => c.status === 'Pending').length} pending reply</div>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="stat-icon-box bg-blue-light">
                <Megaphone size={24} color="#2563eb" />
              </div>
              <div>
                <div className="stat-label">Active Ad Campaigns</div>
                <div className="stat-num">{ads.filter(a => a.active).length}</div>
                <div className="stat-sub">Running dynamically on website</div>
              </div>
            </div>
          </div>

          <div className="admin-quick-grid">
            <div className="admin-panel-card">
              <div className="panel-card-header">
                <h3>📬 Recent Consultation Inquiries Sent to Owner</h3>
                <button className="panel-view-all-btn" onClick={() => setActiveTab('inbox')}>
                  View All ({consultations.length})
                </button>
              </div>

              <div className="recent-list">
                {consultations.slice(0, 3).map(item => (
                  <div key={item.id} className="inquiry-compact-item">
                    <div className="inquiry-compact-top">
                      <strong>{item.name}</strong>
                      <span className={`status-pill pill-${(item.status || 'pending').toLowerCase()}`}>
                        {item.status || 'Pending'}
                      </span>
                    </div>
                    <div className="inquiry-compact-meta">
                      <span>{item.email}</span> • <span>{item.serviceTopic}</span>
                    </div>
                    <div className="inquiry-compact-slot">
                      <Clock size={12} /> {item.preferredSlot}
                    </div>
                  </div>
                ))}
                {consultations.length === 0 && (
                  <p className="empty-text">No consultation messages received yet.</p>
                )}
              </div>
            </div>

            <div className="admin-panel-card">
              <div className="panel-card-header">
                <h3>👥 Pending Mentor Applications</h3>
                <button className="panel-view-all-btn" onClick={() => setActiveTab('mentors')}>
                  Review ({pendingMentors.length})
                </button>
              </div>

              <div className="recent-list">
                {pendingMentors.slice(0, 3).map(m => (
                  <div key={m.id} className="mentor-compact-item">
                    <img src={m.avatar} alt={m.name} className="mentor-mini-avatar" />
                    <div style={{ flex: 1 }}>
                      <strong>{m.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{m.role} @ {m.company}</div>
                    </div>
                    <button 
                      className="btn-approve-sm"
                      onClick={() => onApproveMentor(m.id)}
                    >
                      Approve & Push
                    </button>
                  </div>
                ))}
                {pendingMentors.length === 0 && (
                  <p className="empty-text">No pending mentor applications. All caught up!</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'inbox' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inbox-header-row">
            <div>
              <h2>Consultation Requests & Messages</h2>
              <p>All 1:1 consultation bookings and inquiry messages sent directly to the owner.</p>
            </div>

            <div className="filter-pills">
              {['All', 'Pending', 'Confirmed', 'Contacted', 'Completed'].map(status => (
                <button
                  key={status}
                  className={`filter-pill ${inboxFilter === status ? 'active' : ''}`}
                  onClick={() => setInboxFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="inbox-cards-list">
            {filteredConsultations.map((item) => (
              <div key={item.id} className="consult-inquiry-card">
                <div className="consult-card-top">
                  <div>
                    <div className="consult-user-name">{item.name}</div>
                    <div className="consult-user-email">{item.email}</div>
                  </div>
                  <div className="consult-card-status">
                    <select
                      className={`status-dropdown dropdown-${(item.status || 'pending').toLowerCase()}`}
                      value={item.status || 'Pending'}
                      onChange={(e) => onUpdateConsultationStatus(item.id, e.target.value)}
                    >
                      <option value="Pending">🟡 Pending</option>
                      <option value="Confirmed">🟢 Confirmed</option>
                      <option value="Contacted">🔵 Contacted</option>
                      <option value="Completed">🟣 Completed</option>
                    </select>
                  </div>
                </div>

                <div className="consult-details-grid">
                  <div><strong>Consultation Topic:</strong> {item.serviceTopic}</div>
                  <div><strong>Target Role:</strong> {item.targetRole || 'Not specified'}</div>
                  <div><strong>Preferred Slot:</strong> {item.preferredSlot}</div>
                  <div><strong>Mentor Preference:</strong> {item.mentorPreference || 'Any Top Mentor'}</div>
                </div>

                {item.notes && (
                  <div className="consult-notes-box">
                    <strong>Client Notes / Question:</strong> {item.notes}
                  </div>
                )}

                <div className="consult-card-footer">
                  <span className="timestamp-text">
                    <Calendar size={13} /> Received: {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Recent'}
                  </span>
                  <div className="consult-actions">
                    <a 
                      href={`mailto:${item.email}?subject=Regarding Your Mentorship Consultation&body=Hi ${item.name},%0D%0A%0D%0AThank you for booking a consultation session for "${item.serviceTopic}".`}
                      className="btn-action-outline"
                    >
                      <Mail size={14} /> Email Client
                    </a>
                    <button 
                      className="btn-action-delete"
                      onClick={() => onDeleteConsultation(item.id)}
                      title="Delete entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredConsultations.length === 0 && (
              <div className="empty-state-box">
                <MessageSquare size={48} color="#cbd5e1" />
                <h3>No inquiries found for "{inboxFilter}"</h3>
                <p>When users click "Consult" or "Book a Session", their messages appear here in real-time.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {activeTab === 'mentors' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inbox-header-row">
            <div>
              <h2>Mentors Management & Approvals</h2>
              <p>Approve incoming mentor applications or manually add mentors to push directly to your live site.</p>
            </div>

            <button 
              className="btn btn-primary"
              onClick={() => setShowAddMentorForm(!showAddMentorForm)}
            >
              <Plus size={18} />
              {showAddMentorForm ? 'Close Form' : 'Add & Push New Mentor'}
            </button>
          </div>

          <AnimatePresence>
            {showAddMentorForm && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="add-mentor-form-box"
              >
                <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>➕ Add Mentor (Instant Push to Live Site)</h3>
                <form onSubmit={handleAddMentorSubmit} className="mentor-form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Vikramaditya Singha"
                      value={newMentor.name}
                      onChange={(e) => setNewMentor({ ...newMentor, name: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Work Email</label>
                    <input 
                      type="email" 
                      placeholder="e.g. vikram@company.com"
                      value={newMentor.email}
                      onChange={(e) => setNewMentor({ ...newMentor, email: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Current Role *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Principal Architect / Staff SDE"
                      value={newMentor.role}
                      onChange={(e) => setNewMentor({ ...newMentor, role: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Current Company *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Google / Microsoft / Uber"
                      value={newMentor.company}
                      onChange={(e) => setNewMentor({ ...newMentor, company: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Experience</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 8+ yrs"
                      value={newMentor.exp}
                      onChange={(e) => setNewMentor({ ...newMentor, exp: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Hourly Rate</label>
                    <input 
                      type="text" 
                      placeholder="e.g. ₹2,500 / hr"
                      value={newMentor.hourlyRate}
                      onChange={(e) => setNewMentor({ ...newMentor, hourlyRate: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Avatar Photo URL</label>
                    <input 
                      type="url" 
                      placeholder="https://..."
                      value={newMentor.avatar}
                      onChange={(e) => setNewMentor({ ...newMentor, avatar: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Expertise Tags (comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="System Design, Mock Interview, Cloud"
                      value={newMentor.tags}
                      onChange={(e) => setNewMentor({ ...newMentor, tags: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Short Bio / Value Proposition</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mentored 150+ engineers to crack FAANG Tier-1 firms."
                      value={newMentor.bio}
                      onChange={(e) => setNewMentor({ ...newMentor, bio: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-actions full-width">
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
                      <Sparkles size={16} /> Publish & Push to Live Website
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setShowAddMentorForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {pendingMentors.length > 0 && (
            <div className="pending-approvals-box">
              <div className="pending-title">
                <AlertCircle size={20} color="#d97706" />
                <h3>Pending Mentor Applications ({pendingMentors.length})</h3>
              </div>
              <p className="pending-sub">Review candidate submissions from the "Become a Mentor" public form:</p>

              <div className="pending-cards-grid">
                {pendingMentors.map((m) => (
                  <div key={m.id} className="pending-mentor-card">
                    <div className="pending-card-top">
                      <img src={m.avatar} alt={m.name} className="pending-avatar" />
                      <div>
                        <h4 style={{ margin: 0 }}>{m.name}</h4>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{m.role} @ <strong>{m.company}</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{m.email}</div>
                      </div>
                    </div>

                    <div className="pending-meta">
                      <div><strong>Exp:</strong> {m.exp || '3+ yrs'}</div>
                      <div><strong>Rate:</strong> {m.rate || m.hourlyRate || '₹1,500/hr'}</div>
                      {m.linkedin && (
                        <div>
                          <a href={m.linkedin} target="_blank" rel="noreferrer" className="link-text">
                            <ExternalLink size={12} /> LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>

                    {m.tags && (
                      <div className="pending-tags">
                        {m.tags.map(t => (
                          <span key={t} className="mini-tag">{t}</span>
                        ))}
                      </div>
                    )}

                    <div className="pending-actions-row">
                      <button 
                        className="btn-approve-lg"
                        onClick={() => onApproveMentor(m.id)}
                      >
                        <Check size={16} /> Approve & Push to Live Site
                      </button>
                      <button 
                        className="btn-reject-lg"
                        onClick={() => onDeleteMentor(m.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="live-mentors-section">
            <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>
              🌟 Live Mentors on Website ({liveMentors.length})
            </h3>

            <div className="live-mentors-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Mentor</th>
                    <th>Role & Company</th>
                    <th>Exp & Rate</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {liveMentors.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={m.avatar} alt={m.name} className="table-avatar" />
                          <div>
                            <strong>{m.name}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>{m.role}</div>
                        <div style={{ fontSize: '0.8rem', color: '#5b3ce8', fontWeight: '700' }}>@{m.company}</div>
                      </td>
                      <td>
                        <div>{m.exp}</div>
                        <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '700' }}>{m.rate || m.hourlyRate}</div>
                      </td>
                      <td>
                        <button 
                          className={`btn-toggle-active ${m.active ? 'active' : 'paused'}`}
                          onClick={() => onToggleMentorActive(m.id, !m.active)}
                        >
                          {m.active ? '🟢 Live on Site' : '⚪ Paused'}
                        </button>
                      </td>
                      <td>
                        <button 
                          className="btn-action-delete"
                          onClick={() => {
                            if (confirm(`Are you sure you want to remove mentor ${m.name}?`)) {
                              onDeleteMentor(m.id);
                            }
                          }}
                          title="Remove Mentor"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'ads' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inbox-header-row">
            <div>
              <h2>Ad Campaigns & Promotional Banners</h2>
              <p>Create and run live promotional ads on your job portal for visitors to surf and connect with mentors.</p>
            </div>

            <button 
              className="btn btn-primary"
              onClick={() => setShowAddAdForm(!showAddAdForm)}
            >
              <Plus size={18} />
              {showAddAdForm ? 'Close Ad Creator' : 'Create & Run New Ad'}
            </button>
          </div>

          <AnimatePresence>
            {showAddAdForm && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="add-mentor-form-box"
              >
                <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>📢 Create Ad Campaign</h3>
                <form onSubmit={handleCreateAdSubmit} className="mentor-form-grid">
                  <div className="form-group">
                    <label>Ad Campaign Title</label>
                    <input 
                      type="text" 
                      required 
                      value={newAd.title}
                      onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Ad Tag / Badge Label</label>
                    <input 
                      type="text" 
                      value={newAd.tag}
                      onChange={(e) => setNewAd({ ...newAd, tag: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Main Headline *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Crack Tier-1 Product Companies with 1:1 Live Coding Prep"
                      value={newAd.headline}
                      onChange={(e) => setNewAd({ ...newAd, headline: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea 
                      rows={2}
                      value={newAd.description}
                      onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                      className="modal-input"
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Featured Mentors / Companies</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aarav Sharma (Google)"
                      value={newAd.mentorName}
                      onChange={(e) => setNewAd({ ...newAd, mentorName: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Discount / Special Offer Badge</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Flat 30% OFF / Free 15-min Roast"
                      value={newAd.rateBadge}
                      onChange={(e) => setNewAd({ ...newAd, rateBadge: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>CTA Button Text</label>
                    <input 
                      type="text" 
                      value={newAd.ctaText}
                      onChange={(e) => setNewAd({ ...newAd, ctaText: e.target.value })}
                      className="modal-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Banner Gradient Style</label>
                    <select 
                      className="modal-input"
                      value={newAd.bannerBg}
                      onChange={(e) => setNewAd({ ...newAd, bannerBg: e.target.value })}
                    >
                      <option value="linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)">Deep Purple Galaxy</option>
                      <option value="linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)">Emerald Green Glow</option>
                      <option value="linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)">Midnight Cyber Slate</option>
                      <option value="linear-gradient(135deg, #831843 0%, #9d174d 50%, #be185d 100%)">Ruby Passion</option>
                    </select>
                  </div>

                  <div className="full-width" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
                      Live Preview on Public Site:
                    </div>
                    <div className="ad-live-preview-box" style={{ background: newAd.bannerBg }}>
                      <div className="preview-tag">{newAd.tag}</div>
                      <div className="preview-head">{newAd.headline || 'Your Headline Here'}</div>
                      <div className="preview-desc">{newAd.description}</div>
                      <div className="preview-cta-row">
                        <span className="preview-btn">{newAd.ctaText} →</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions full-width">
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
                      <Megaphone size={16} /> Launch & Run Ad on Website
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setShowAddAdForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="running-ads-grid">
            {ads.map((ad) => (
              <div key={ad.id} className="ad-card-manage">
                <div className="ad-manage-preview" style={{ background: ad.bannerBg || 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)' }}>
                  <div className="preview-tag">{ad.tag}</div>
                  <div className="preview-head">{ad.headline}</div>
                  <div className="preview-desc">{ad.description}</div>
                </div>

                <div className="ad-manage-meta">
                  <div><strong>Title:</strong> {ad.title}</div>
                  <div><strong>Clicks:</strong> {ad.clicks || 0} clicks</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                    <button 
                      className={`btn-toggle-active ${ad.active ? 'active' : 'paused'}`}
                      onClick={() => onToggleAdActive(ad.id, !ad.active)}
                    >
                      {ad.active ? '🟢 Running on Site' : '⚪ Paused'}
                    </button>
                    <button 
                      className="btn-action-delete"
                      onClick={() => onDeleteAd(ad.id)}
                      title="Delete Campaign"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {ads.length === 0 && (
              <div className="empty-state-box full-width">
                <Megaphone size={48} color="#cbd5e1" />
                <h3>No active ad campaigns</h3>
                <p>Click "Create & Run New Ad" above to launch promotional mentor ads.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {activeTab === 'security' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inbox-header-row">
            <div>
              <h2>🔐 Owner Security & Master Password</h2>
              <p>Choose and control your private master password. Once set, only you with this password can unlock the Admin section.</p>
            </div>
          </div>

          <div className="security-dashboard-grid">
            {/* Form Box */}
            <div className="security-form-panel">
              <div className="security-panel-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="security-icon-circle">
                    <KeyRound size={22} color="#5b3ce8" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>
                      {isCustomPassword ? 'Change Master Password' : 'Set Your Custom Owner Password'}
                    </h3>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                      {isCustomPassword 
                        ? 'Update your secret password anytime' 
                        : 'Choose your own custom password so nobody else can open the admin section'}
                    </p>
                  </div>
                </div>

                <div className={`security-status-pill ${isCustomPassword ? 'active' : 'warning'}`}>
                  {isCustomPassword ? '🛡️ Custom Password Enforced' : '⚠️ Default PIN Active'}
                </div>
              </div>

              {securityMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="security-alert-box alert-success"
                >
                  <CheckCircle size={18} />
                  <span>{securityMessage}</span>
                </motion.div>
              )}

              {securityError && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="security-alert-box alert-danger"
                >
                  <AlertCircle size={18} />
                  <span>{securityError}</span>
                </motion.div>
              )}

              <form onSubmit={handleUpdatePassword} style={{ marginTop: '1.25rem' }}>
                {isCustomPassword && (
                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label>Current Master Password *</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        required
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="modal-input"
                      />
                      <button
                        type="button"
                        className="toggle-pass-btn"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        tabIndex={-1}
                      >
                        {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label>
                    {isCustomPassword ? 'New Master Password *' : 'Choose Your Master Password *'}
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      required
                      placeholder="Minimum 4 characters (e.g. MySecretPass#2026)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="modal-input"
                    />
                    <button
                      type="button"
                      className="toggle-pass-btn"
                      onClick={() => setShowNewPass(!showNewPass)}
                      tabIndex={-1}
                    >
                      {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <small style={{ display: 'block', marginTop: '4px', color: '#64748b', fontSize: '0.78rem' }}>
                    💡 Choose a strong, memorable password that only you (the owner) know.
                  </small>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label>Confirm Master Password *</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      required
                      placeholder="Re-type new master password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="modal-input"
                    />
                    <button
                      type="button"
                      className="toggle-pass-btn"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      tabIndex={-1}
                    >
                      {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ padding: '0.85rem 2rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                    disabled={isUpdatingPassword}
                  >
                    {isUpdatingPassword ? <RefreshCw className="spin" size={16} /> : <ShieldCheck size={18} />}
                    <span>{isCustomPassword ? 'Update Master Password' : 'Save & Protect Admin Section'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Security Guidelines & Lock Side Panel */}
            <div className="security-side-panel">
              <div className="security-info-box">
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={18} color="#10b981" />
                  Owner-Only Security Enforced
                </h4>
                <ul className="security-rules-list">
                  <li>
                    <Check size={14} color="#10b981" />
                    <span><strong>100% Restricted:</strong> Public users cannot access or view mentor applications, inbox, or ad controls.</span>
                  </li>
                  <li>
                    <Check size={14} color="#10b981" />
                    <span><strong>Custom Passwords:</strong> Once set, all default passwords are permanently revoked.</span>
                  </li>
                  <li>
                    <Check size={14} color="#10b981" />
                    <span><strong>Encrypted & Persistent:</strong> Secured with SHA-256 hash in backend database and synced with local storage.</span>
                  </li>
                </ul>

                {lastUpdatedPassword && (
                  <div className="security-last-updated">
                    <Clock size={13} />
                    <span>Last Updated: {new Date(lastUpdatedPassword).toLocaleString()}</span>
                  </div>
                )}
              </div>

              {onLockAdmin && (
                <div className="lock-now-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                    <div className="lock-icon-box">
                      <Lock size={20} color="#dc2626" />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.98rem', color: '#0f172a' }}>Finished working?</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Lock the admin portal so nobody on this device can view it.</p>
                    </div>
                  </div>
                  <button 
                    className="btn-lock-full"
                    onClick={onLockAdmin}
                  >
                    <LogOut size={16} />
                    <span>Lock & Exit Admin Portal</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        .admin-portal-wrapper {
          background: #f8fafc;
          border-radius: 28px;
          padding: 2rem;
          border: 1.5px solid #e2e8f0;
          margin-bottom: 3rem;
          box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.08);
        }
        .admin-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 1.25rem;
        }
        .admin-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .admin-tab-btn {
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #475569;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 8px 16px;
          border-radius: 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .admin-tab-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }
        .admin-tab-btn.active {
          background: #5b3ce8;
          color: white;
          border-color: #5b3ce8;
          box-shadow: 0 4px 15px rgba(91, 60, 232, 0.25);
        }
        .admin-badge-count {
          background: #ef4444;
          color: white;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 10px;
        }
        .admin-badge-count.bg-amber {
          background: #d97706;
        }

        .btn-lock-exit {
          background: #fee2e2;
          color: #dc2626;
          border: 1.5px solid #fecaca;
          font-weight: 700;
          border-radius: 10px;
          padding: 6px 14px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .btn-lock-exit:hover {
          background: #fca5a5;
          color: #991b1b;
        }

        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        .admin-stat-card {
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.04);
        }
        .stat-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bg-purple-light { background: rgba(91, 60, 232, 0.1); }
        .bg-amber-light { background: rgba(217, 119, 6, 0.1); }
        .bg-green-light { background: rgba(16, 185, 129, 0.1); }
        .bg-blue-light { background: rgba(37, 99, 235, 0.1); }
        .stat-label { font-size: 0.8rem; font-weight: 700; color: #64748b; }
        .stat-num { font-size: 1.6rem; font-weight: 800; color: #0f172a; line-height: 1.2; }
        .stat-sub { font-size: 0.72rem; color: #94a3b8; }

        .admin-quick-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .admin-quick-grid { grid-template-columns: 1fr; }
        }
        .admin-panel-card {
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          padding: 1.5rem;
        }
        .panel-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .panel-card-header h3 { font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0; }
        .panel-view-all-btn {
          background: none;
          border: none;
          color: #5b3ce8;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
        }

        .recent-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .inquiry-compact-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.85rem;
        }
        .inquiry-compact-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .inquiry-compact-meta { font-size: 0.8rem; color: #64748b; margin-bottom: 4px; }
        .inquiry-compact-slot { font-size: 0.75rem; color: #5b3ce8; font-weight: 600; display: flex; align-items: center; gap: 4px; }

        .status-pill {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 8px;
        }
        .pill-pending { background: #fef3c7; color: #b45309; }
        .pill-confirmed { background: #d1fae5; color: #047857; }
        .pill-contacted { background: #dbeafe; color: #1d4ed8; }
        .pill-completed { background: #f3e8ff; color: #7e22ce; }

        .mentor-compact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.75rem 1rem;
        }
        .mentor-mini-avatar { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; }
        .btn-approve-sm {
          background: #10b981;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .inbox-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .inbox-header-row h2 { font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0 0 4px 0; }
        .inbox-header-row p { font-size: 0.9rem; color: #64748b; margin: 0; }

        .filter-pills { display: flex; gap: 6px; flex-wrap: wrap; }
        .filter-pill {
          background: white;
          border: 1.5px solid #cbd5e1;
          font-size: 0.8rem;
          font-weight: 700;
          color: #475569;
          padding: 6px 12px;
          border-radius: 10px;
          cursor: pointer;
        }
        .filter-pill.active {
          background: #0f172a;
          color: white;
          border-color: #0f172a;
        }

        .consult-inquiry-card {
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }
        .consult-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .consult-user-name { font-size: 1.1rem; font-weight: 800; color: #0f172a; }
        .consult-user-email { font-size: 0.85rem; color: #64748b; }
        .status-dropdown {
          padding: 5px 10px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.82rem;
          border: 1.5px solid #cbd5e1;
          outline: none;
          cursor: pointer;
        }
        .dropdown-pending { background: #fef3c7; border-color: #f59e0b; color: #92400e; }
        .dropdown-confirmed { background: #d1fae5; border-color: #10b981; color: #065f46; }
        .dropdown-contacted { background: #dbeafe; border-color: #3b82f6; color: #1e40af; }
        .dropdown-completed { background: #f3e8ff; border-color: #a855f7; color: #6b21a8; }

        .consult-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem 1rem;
          font-size: 0.88rem;
          color: #334155;
          margin-bottom: 0.75rem;
        }
        .consult-notes-box {
          background: #f8fafc;
          border-left: 3px solid #5b3ce8;
          padding: 0.65rem 1rem;
          border-radius: 0 8px 8px 0;
          font-size: 0.85rem;
          color: #475569;
          margin-bottom: 1rem;
        }
        .consult-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #f1f5f9;
          padding-top: 0.75rem;
        }
        .timestamp-text { font-size: 0.75rem; color: #94a3b8; display: flex; align-items: center; gap: 4px; }
        .consult-actions { display: flex; gap: 8px; }
        .btn-action-outline {
          background: white;
          border: 1px solid #cbd5e1;
          color: #334155;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 5px 10px;
          border-radius: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .btn-action-delete {
          background: #fee2e2;
          color: #dc2626;
          border: none;
          padding: 5px 8px;
          border-radius: 8px;
          cursor: pointer;
        }

        .add-mentor-form-box {
          background: white;
          border: 2px solid #5b3ce8;
          border-radius: 20px;
          padding: 1.75rem;
          margin-bottom: 2rem;
        }
        .mentor-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-group label { display: block; font-weight: 700; font-size: 0.82rem; margin-bottom: 4px; color: #334155; }
        .full-width { grid-column: span 2; }
        .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }

        .pending-approvals-box {
          background: #fffbeb;
          border: 2px solid #fcd34d;
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        .pending-title { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .pending-title h3 { margin: 0; color: #92400e; font-size: 1.15rem; }
        .pending-sub { font-size: 0.85rem; color: #b45309; margin: 0 0 1.25rem 0; }
        .pending-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.25rem;
        }
        .pending-mentor-card {
          background: white;
          border: 1.5px solid #fbbf24;
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .pending-card-top { display: flex; align-items: center; gap: 12px; }
        .pending-avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; }
        .pending-meta { font-size: 0.82rem; color: #475569; display: flex; flex-direction: column; gap: 2px; }
        .pending-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .mini-tag { background: #f1f5f9; font-size: 0.7rem; font-weight: 600; padding: 2px 6px; border-radius: 4px; }
        .pending-actions-row { display: flex; gap: 8px; margin-top: auto; }
        .btn-approve-lg {
          flex: 1;
          background: #10b981;
          color: white;
          border: none;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 8px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .btn-reject-lg {
          background: #fee2e2;
          color: #dc2626;
          border: none;
          font-weight: 700;
          font-size: 0.82rem;
          padding: 8px 12px;
          border-radius: 10px;
          cursor: pointer;
        }

        .live-mentors-table-wrap {
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          overflow-x: auto;
        }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th { background: #f8fafc; padding: 12px 16px; text-align: left; font-size: 0.82rem; color: #64748b; font-weight: 700; }
        .admin-table td { padding: 14px 16px; border-top: 1px solid #f1f5f9; font-size: 0.88rem; vertical-align: middle; }
        .table-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
        .btn-toggle-active {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .btn-toggle-active.active { background: #d1fae5; color: #047857; border-color: #10b981; }
        .btn-toggle-active.paused { background: #f1f5f9; color: #64748b; border-color: #cbd5e1; }

        .ad-live-preview-box {
          padding: 1.25rem 1.5rem;
          border-radius: 16px;
          color: white;
        }
        .preview-tag { font-size: 0.72rem; font-weight: 800; color: #fef08a; margin-bottom: 4px; }
        .preview-head { font-size: 1.15rem; font-weight: 800; margin-bottom: 4px; }
        .preview-desc { font-size: 0.82rem; color: #e2e8f0; margin-bottom: 8px; }
        .preview-cta-row { margin-top: 4px; }
        .preview-btn { background: white; color: #1e1b4b; font-size: 0.78rem; font-weight: 800; padding: 4px 12px; border-radius: 8px; }

        .running-ads-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .ad-card-manage {
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          overflow: hidden;
        }
        .ad-manage-preview { padding: 1.25rem; color: white; }
        .ad-manage-meta { padding: 1rem; font-size: 0.85rem; color: #334155; }

        .empty-state-box {
          text-align: center;
          padding: 3rem 1rem;
          background: white;
          border-radius: 18px;
          border: 1.5px dashed #cbd5e1;
        }
        .empty-state-box h3 { margin: 1rem 0 0.25rem 0; font-size: 1.15rem; color: #0f172a; }
        .empty-state-box p { color: #64748b; font-size: 0.88rem; margin: 0; }
        .empty-text { color: #94a3b8; font-size: 0.85rem; font-style: italic; margin: 0.5rem 0; }

        /* Security Dashboard Styles */
        .security-dashboard-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .security-dashboard-grid { grid-template-columns: 1fr; }
        }
        .security-form-panel {
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          padding: 1.75rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        }
        .security-panel-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .security-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(91, 60, 232, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .security-status-pill {
          font-size: 0.78rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 12px;
        }
        .security-status-pill.active {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }
        .security-status-pill.warning {
          background: #fef3c7;
          color: #92400e;
          border: 1px solid #fde68a;
        }
        .security-alert-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }
        .alert-success {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }
        .alert-danger {
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }
        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .password-input-wrapper input {
          width: 100%;
          padding-right: 42px;
        }
        .toggle-pass-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        .toggle-pass-btn:hover {
          color: #334155;
        }

        .security-side-panel {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .security-info-box {
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        }
        .security-rules-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .security-rules-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.4;
        }
        .security-last-updated {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #94a3b8;
          padding-top: 0.75rem;
          border-top: 1px solid #f1f5f9;
        }
        .lock-now-card {
          background: #fff1f2;
          border: 1.5px solid #fecdd3;
          border-radius: 20px;
          padding: 1.25rem 1.5rem;
        }
        .lock-icon-box {
          width: 38px;
          height: 38px;
          background: #fee2e2;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-lock-full {
          width: 100%;
          background: #e11d48;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .btn-lock-full:hover {
          background: #be123c;
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.25);
        }
      `}</style>
    </div>
  );
};
