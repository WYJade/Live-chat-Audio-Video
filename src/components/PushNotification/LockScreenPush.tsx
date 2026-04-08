import React, { useState, useEffect } from 'react';

interface LockScreenPushProps {
  onDismiss: () => void;
}

const LockScreenPush: React.FC<LockScreenPushProps> = ({ onDismiss }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Stagger notification appearance
  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleCount(1), 400),
      setTimeout(() => setVisibleCount(2), 900),
      setTimeout(() => setVisibleCount(3), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const notifications = [
    {
      id: 1, appIcon: '💬', appName: 'Wise App', time: 'now',
      title: 'Dispatcher Support',
      body: 'Your delivery route for today has been updated. Please review the new schedule before your next stop.',
    },
    {
      id: 2, appIcon: '💬', appName: 'Wise App', time: '2m ago',
      title: 'Alexander Nicholas Williams',
      body: 'Hey, are you available for a pickup at dock 5? The shipment is ready.',
      badge: '3',
    },
    {
      id: 3, appIcon: '📻', appName: 'Wise App · Walkie-Talkie', time: '5m ago',
      title: 'Warehouse Team Channel',
      body: '📢 Shift change reminder: Evening crew starts at 6 PM. Please confirm your availability.',
      badge: '+2',
    },
  ];

  return (
    <div style={{
      width: '100%', maxWidth: '480px', height: '100vh', margin: '0 auto',
      background: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 40%, #0d0d1a 100%)',
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    }}>
      {/* Lock screen wallpaper overlay */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(ellipse at 50% 20%, rgba(60,60,120,0.3) 0%, transparent 70%)' }} />

      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 24px 0', zIndex: 1 }}>
        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}></span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>📶 🔋</span>
        </div>
      </div>

      {/* Clock */}
      <div style={{ textAlign: 'center', padding: '40px 0 8px', zIndex: 1 }}>
        <h1 style={{ fontSize: '72px', fontWeight: '200', color: '#fff', margin: 0, letterSpacing: '-2px', lineHeight: 1 }}>
          {timeStr}
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', margin: '8px 0 0', fontWeight: '300' }}>
          {dateStr}
        </p>
      </div>

      {/* Notifications */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 16px', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {notifications.slice(0, visibleCount).map((n, i) => (
          <div
            key={n.id}
            onClick={onDismiss}
            style={{
              backgroundColor: 'rgba(40, 40, 55, 0.85)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px', padding: '14px 16px', cursor: 'pointer',
              animation: `notifSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s both`,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Header: app icon + name + time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span style={{ fontSize: '14px' }}>{n.appIcon}</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontWeight: '500', letterSpacing: '0.3px' }}>
                {n.appName}
              </span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>{n.time}</span>
            </div>
            {/* Content */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#fff', lineHeight: '1.3' }}>
                  {n.title}
                </p>
                <p style={{
                  margin: '4px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.65)',
                  lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                }}>
                  {n.body}
                </p>
              </div>
              {n.badge && (
                <div style={{
                  backgroundColor: '#ff3b30', color: '#fff', borderRadius: '12px',
                  padding: '2px 8px', fontSize: '12px', fontWeight: '600',
                  height: 'fit-content', marginTop: '2px', flexShrink: 0,
                }}>
                  {n.badge}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom hint */}
      <div style={{ textAlign: 'center', padding: '16px 0 32px', zIndex: 1 }}>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: '0 0 12px' }}>Tap notification to open app</p>
        <div style={{ width: '140px', height: '5px', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.25)', margin: '0 auto' }} />
      </div>

      <style>{`
        @keyframes notifSlideIn {
          0% { transform: translateY(-30px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LockScreenPush;
