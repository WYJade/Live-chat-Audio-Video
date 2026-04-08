import React, { useEffect, useCallback } from 'react';
import { PushNotification } from '../../types/models';

interface PushNotificationOverlayProps {
  notifications: PushNotification[];
  onDismiss: (id: string) => void;
  onTap: (id: string) => void;
}

const PushNotificationOverlay: React.FC<PushNotificationOverlayProps> = ({
  notifications,
  onDismiss,
  onTap,
}) => {
  const autoDismiss = useCallback((id: string) => {
    const timer = setTimeout(() => onDismiss(id), 6000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  useEffect(() => {
    const cleanups = notifications.map((n) => autoDismiss(n.id));
    return () => cleanups.forEach((c) => c());
  }, [notifications, autoDismiss]);

  if (notifications.length === 0) return null;

  // Group up to 3 notifications into a single banner
  const visible = notifications.slice(0, 3);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      padding: '8px', pointerEvents: 'none',
    }}>
      <div style={{
        pointerEvents: 'auto',
        maxWidth: '420px', margin: '0 auto',
        backgroundColor: 'rgba(28, 28, 30, 0.97)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '20px', overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
        animation: 'pushSlideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Header bar - mimics iOS notification header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '12px 16px 8px',
        }}>
          {/* App icon */}
          <div style={{
            width: '22px', height: '22px', borderRadius: '5px',
            backgroundColor: '#9b87f5', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '12px', flexShrink: 0,
          }}>💬</div>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3px' }}>
            WISE APP
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>now</span>
        </div>

        {/* Notification items */}
        {visible.map((notification, index) => (
          <div
            key={notification.id}
            onClick={() => onTap(notification.id)}
            style={{
              padding: index === 0 ? '4px 16px 10px' : '8px 16px 10px',
              cursor: 'pointer',
              borderTop: index > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              {/* Contact avatar */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: index === 0 ? '#9b87f5' : index === 1 ? '#e74c3c' : '#3498db',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '14px', fontWeight: 'bold', flexShrink: 0,
                marginTop: '2px',
              }}>
                {notification.chatName.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0, fontSize: '15px', fontWeight: '600', color: '#fff',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {notification.chatName}
                </p>
                <p style={{
                  margin: '3px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.7)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  lineHeight: '1.3',
                }}>
                  {notification.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Swipe hint bar */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 10px' }}>
          <div style={{ width: '36px', height: '4px', borderRadius: '2px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>

      <style>{`
        @keyframes pushSlideDown {
          0% { transform: translateY(-120%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PushNotificationOverlay;
