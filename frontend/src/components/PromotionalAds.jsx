import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Star, ArrowRight, Video, ChevronLeft, ChevronRight, Megaphone, ShieldCheck } from 'lucide-react';

export const PromotionalAds = ({ ads = [], onConsultMentor, onBookSession }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (ads.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [ads.length]);

  if (!ads || ads.length === 0) return null;

  const currentAd = ads[currentIndex] || ads[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const handleAdClick = () => {
    if (currentAd.ctaAction === 'consult_mentor' && currentAd.mentorId) {
      onConsultMentor(currentAd.mentorId);
    } else {
      onBookSession({
        serviceTopic: currentAd.title,
        mentorPreference: currentAd.mentorName ? `${currentAd.mentorName} (${currentAd.mentorCompany})` : 'Top Recommended Mentor'
      });
    }
  };

  return (
    <div className="promo-ads-container">
      <div className="promo-ad-bar">
        <div className="ad-badge-live">
          <Megaphone size={14} className="pulse-icon" />
          <span>SPONSORED MENTOR CAMPAIGN</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentAd.id || currentIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="promo-ad-card"
            style={{ background: currentAd.bannerBg || 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)' }}
          >
            <div className="ad-content-left">
              <div className="ad-tag-pill">
                <Sparkles size={13} /> {currentAd.tag || '🔥 FEATURED AD'}
              </div>
              <h3 className="ad-headline">{currentAd.headline}</h3>
              <p className="ad-desc">{currentAd.description}</p>
              
              <div className="ad-meta-row">
                {currentAd.mentorName && (
                  <div className="ad-mentor-pill">
                    <ShieldCheck size={14} color="#10b981" />
                    <span>Mentor: <strong>{currentAd.mentorName}</strong> ({currentAd.mentorCompany})</span>
                  </div>
                )}
                {currentAd.rateBadge && (
                  <div className="ad-rate-badge">
                    <Zap size={13} color="#f59e0b" /> {currentAd.rateBadge}
                  </div>
                )}
              </div>
            </div>

            <div className="ad-action-right">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ad-cta-btn"
                onClick={handleAdClick}
              >
                <Video size={16} />
                <span>{currentAd.ctaText || 'Consult & Connect Now'}</span>
                <ArrowRight size={16} />
              </motion.button>
              <div className="ad-counter">
                {currentIndex + 1} of {ads.length} Ads
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {ads.length > 1 && (
          <div className="ad-nav-controls">
            <button className="ad-nav-btn" onClick={handlePrev} title="Previous ad">
              <ChevronLeft size={16} />
            </button>
            <div className="ad-dots">
              {ads.map((_, idx) => (
                <button
                  key={idx}
                  className={`ad-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
            <button className="ad-nav-btn" onClick={handleNext} title="Next ad">
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .promo-ads-container {
          margin-bottom: 2.5rem;
        }
        .promo-ad-bar {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 24px;
          padding: 1.25rem;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.06);
          position: relative;
        }
        .ad-badge-live {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #5b3ce8;
          background: rgba(91, 60, 232, 0.08);
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 0.75rem;
        }
        .pulse-icon {
          animation: pulse 1.5s infinite;
        }
        .promo-ad-card {
          border-radius: 18px;
          padding: 1.75rem 2rem;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          box-shadow: 0 15px 35px -5px rgba(30, 27, 75, 0.35);
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 800px) {
          .promo-ad-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem;
          }
        }
        .ad-content-left {
          flex: 1;
        }
        .ad-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(8px);
          color: #fef08a;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }
        .ad-headline {
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.4rem;
          line-height: 1.3;
        }
        .ad-desc {
          color: #e2e8f0;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 0.85rem;
          max-width: 680px;
        }
        .ad-meta-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .ad-mentor-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 0, 0, 0.25);
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.8rem;
          color: #f1f5f9;
        }
        .ad-rate-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid rgba(245, 158, 11, 0.4);
          color: #fef08a;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 8px;
        }
        .ad-action-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .ad-cta-btn {
          background: #ffffff;
          color: #1e1b4b;
          border: none;
          font-weight: 800;
          font-size: 0.95rem;
          padding: 0.85rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .ad-cta-btn:hover {
          background: #f8fafc;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
        }
        .ad-counter {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }
        .ad-nav-controls {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 0.75rem;
        }
        .ad-nav-btn {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ad-nav-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .ad-dots {
          display: flex;
          gap: 4px;
        }
        .ad-dot {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          border: none;
          background: #cbd5e1;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ad-dot.active {
          width: 20px;
          background: #5b3ce8;
        }
      `}</style>
    </div>
  );
};
