import React, { useState, useEffect, useCallback } from 'react';

interface PushItem {
  id: string;
  sourceType: 'chat' | 'walkie-talkie' | 'system';
  sourceName: string;
  lastMessage: string;
  messageType: 'text' | 'image' | 'voice' | 'file' | 'system' | 'recalled';
  timestamp: Date;
  unreadCount: number;
}

interface LockScreenPushProps {
  onDismiss: () => void;
  onTapNotification: (sourceId: string) => void;
}

const LockScreenPush: React.FC<LockScreenPushProps> = ({ onDismiss, onTapNotification }) => {
  const [now, setNow] = useState(new Date());
  const [visibleScenario, setVisibleScenario] = useState(0);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [permissionBanner, setPermissionBanner] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Cycle through demo scenarios
  useEffect(() => {
    const t1 = setTimeout(() => setVisibleScenario(1), 600);
    const t2 = setTimeout(() => setVisibleScenario(2), 8000);
    const t3 = setTimeout(() => setVisibleScenario(3), 16000);
    const t4 = setTimeout(() => setPermissionBanner(true), 22000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const formatMessageContent = (msg: string, type: string): string => {
    switch (type) {
      case 'image': return '[Image]';
      case 'voice': return '[Voice Message]';
      case 'file': return '[File]';
      case 'recalled': return '[Message recalled]';
      case 'system': return msg;
      default: return msg;
    }
  };

  // Scenario 1: Single chat message
  const scenario1: PushItem[] = [
    { id: 's1-1', sourceType: 'chat', sourceName: 'Project Discussion Group', lastMessage: 'Meeting tomorrow moved to 3 PM. Please update your calendar.', messageType: 'text', timestamp: new Date(), unreadCount: 1 },
  ];

  // Scenario 2: 3 messages merged (within 10s window)
  const scenario2: PushItem[] = [
    { id: 's2-1', sourceType: 'walkie-talkie', sourceName: 'Warehouse Alpha Channel', lastMessage: 'Received, handling it.', messageType: 'text', timestamp: new Date(), unreadCount: 5 },
    { id: 's2-2', sourceType: 'chat', sourceName: 'Alexander Nicholas Williams...', lastMessage: 'Can you check dock 7? Shipment arrived early.', messageType: 'text', timestamp: new Date(Date.now() - 3000), unreadCount: 2 },
    { id: 's2-3', sourceType: 'walkie-talkie', sourceName: 'Loading Bay Team', lastMessage: '', messageType: 'voice', timestamp: new Date(Date.now() - 8000), unreadCount: 1 },
  ];

  // Scenario 3: Edge cases (image, recalled, system)
  const scenario3: PushItem[] = [
    { id: 's3-1', sourceType: 'chat', sourceName: 'Dispatcher Support', lastMessage: '', messageType: 'image', timestamp: new Date(), unreadCount: 1 },
    { id: 's3-2', sourceType: 'chat', sourceName: 'Tianhao Cui', lastMessage: '', messageType: 'recalled', timestamp: new Date(Date.now() - 2000), unreadCount: 1 },
    { id: 's3-3', sourceType: 'system', sourceName: 'Warehouse Team Channel', lastMessage: 'Eddie Yang has joined the channel', messageType: 'system', timestamp: new Date(Date.now() - 5000), unreadCount: 0 },
  ];

  const scenarios = [[], scenario1, scenario2, scenario3];
  const currentItems = scenarios[visibleScenario] || [];
  const visibleItems = currentItems.filter(item => !dismissed.has(item.id));

  const handleTap = useCallback((id: string) => {
    setDismissed(prev => new Set(prev).add(id));
    onTapNotification(id);
  }, [onTapNotification]);

  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const scenarioLabels = ['', 'Scenario 1: Single Chat Message', 'Scenario 2: 3 Merged Messages (within 10s)', 'Scenario 3: Edge Cases (Image, Recalled, System)'];

  return (
    <div style={{
      width: '100%', maxWidth: '480px', height: '100vh', margin: '0 auto',
      background: 'linear-gradient(180deg, #080818 0%, #141428 40%, #0a0a18 100%)',
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    }}>
      <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(ellipse at 50% 15%, rgba(80,60,140,0.2) 0%, transparent 60%)' }} />

      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 24px 0', zIndex: 1 }}>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}></span>
        <div style={{ display: 'flex', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>📶 🔋</div>
      </div>

      {/* Clock */}
      <div style={{ textAlign: 'center', padding: '32px 0 4px', zIndex: 1 }}>
        <h1 style={{ fontSize: '68px', fontWeight: '200', color: '#fff', margin: 0, letterSpacing: '-2px', lineHeight: 1 }}>{timeStr}</h1>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', margin: '6px 0 0', fontWeight: '300' }}>{dateStr}</p>
      </div>

      {/* Scenario label */}
      {visibleScenario > 0 && (
        <div style={{ textAlign: 'center', padding: '12px 16px 0', zIndex: 1 }}>
          <span style={{ fontSize: '11px', color: 'rgba(155,135,245,0.7)', backgroundColor: 'rgba(155,135,245,0.1)', padding: '4px 12px', borderRadius: '10px' }}>
            {scenarioLabels[visibleScenario]}
          </span>
        </div>
      )}

      {/* Notifications */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>

        {visibleItems.length > 0 && (
          <div style={{
            backgroundColor: 'rgba(35, 35, 50, 0.88)', backdropFilter: 'blur(24px)',
            borderRadius: '18px', overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)',
            animation: 'pushSlide 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            {/* Notification header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 14px 6px' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#9b87f5',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0,
              }}>💬</div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px' }}>WISE APP</span>
              {visibleItems.length > 1 && (
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: '4px' }}>
                  {visibleItems.length} conversations
                </span>
              )}
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>now</span>
            </div>

            {/* Merged source names (when multiple) */}
            {visibleItems.length > 1 && (
              <div style={{ padding: '0 14px 4px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.4' }}>
                  {visibleItems.map(item => {
                    const prefix = item.sourceType === 'walkie-talkie' ? '📻 ' : '';
                    return prefix + item.sourceName;
                  }).join(', ')}
                </p>
              </div>
            )}

            {/* Individual notification items */}
            {visibleItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleTap(item.id)}
                style={{
                  padding: '8px 14px 10px', cursor: 'pointer',
                  borderTop: index > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  {/* Source avatar */}
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                    backgroundColor: item.sourceType === 'walkie-talkie' ? '#e67e22' : item.sourceType === 'system' ? '#555' : '#9b87f5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', fontWeight: 'bold',
                  }}>
                    {item.sourceType === 'walkie-talkie' ? '📻' : item.sourceType === 'system' ? '⚙️' : item.sourceName.charAt(0).toUpperCase()}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{
                        margin: 0, fontSize: '15px', fontWeight: '600', color: '#fff',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                      }}>
                        {item.sourceType === 'walkie-talkie' && <span style={{ fontSize: '11px', color: '#e67e22', marginRight: '4px' }}>CHANNEL</span>}
                        {item.sourceName}
                      </p>
                      {item.unreadCount > 0 && (
                        <span style={{
                          backgroundColor: '#ff3b30', color: '#fff', borderRadius: '10px',
                          padding: '1px 7px', fontSize: '11px', fontWeight: '700', marginLeft: '8px', flexShrink: 0,
                        }}>
                          {item.unreadCount >= 99 ? '99+' : item.unreadCount}
                        </span>
                      )}
                    </div>
                    <p style={{
                      margin: '3px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.6)',
                      lineHeight: '1.35', display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
                    }}>
                      {formatMessageContent(item.lastMessage, item.messageType)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Swipe hint */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 10px' }}>
              <div style={{ width: '36px', height: '4px', borderRadius: '2px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
            </div>
          </div>
        )}

        {/* Permission banner */}
        {permissionBanner && (
          <div style={{
            backgroundColor: 'rgba(35, 35, 50, 0.88)', backdropFilter: 'blur(24px)',
            borderRadius: '16px', padding: '16px', marginTop: '8px',
            border: '1px solid rgba(255,255,255,0.06)',
            animation: 'pushSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#9b87f5',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0,
              }}>🔔</div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#fff' }}>Enable Notifications</p>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.4' }}>
                  Turn on notifications so you don't miss out on important messages from your team.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setPermissionBanner(false)} style={{
                padding: '8px 16px', borderRadius: '8px', border: 'none',
                backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)',
                fontSize: '13px', cursor: 'pointer',
              }}>Not Now</button>
              <button onClick={() => setPermissionBanner(false)} style={{
                padding: '8px 16px', borderRadius: '8px', border: 'none',
                backgroundColor: '#9b87f5', color: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: '500',
              }}>Open Settings</button>
            </div>
          </div>
        )}

        {/* Network recovery notice */}
        {visibleScenario >= 2 && (
          <div style={{
            textAlign: 'center', padding: '8px', marginTop: '4px',
            animation: 'pushSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
          }}>
            <span style={{
              fontSize: '12px', color: 'rgba(255,255,255,0.35)',
              backgroundColor: 'rgba(52,199,89,0.1)', padding: '4px 12px', borderRadius: '10px',
            }}>
              ✓ Network restored · Pending messages delivered
            </span>
          </div>
        )}
      </div>

      {/* Bottom */}
      <div style={{ textAlign: 'center', padding: '12px 0 28px', zIndex: 1 }}>
        <button onClick={onDismiss} style={{
          padding: '8px 24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
          backgroundColor: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '13px', cursor: 'pointer',
        }}>
          ← Back to App
        </button>
        <div style={{ width: '140px', height: '5px', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '16px auto 0' }} />
      </div>

      <style>{`
        @keyframes pushSlide {
          0% { transform: translateY(-30px) scale(0.96); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LockScreenPush;
