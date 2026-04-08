import React, { useEffect } from 'react';
import { PushNotification } from '../../types/models';
import { theme } from '../../styles/theme';

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
  useEffect(() => {
    // Auto-dismiss after 5 seconds
    notifications.forEach((n) => {
      const timer = setTimeout(() => onDismiss(n.id), 5000);
      return () => clearTimeout(timer);
    });
  }, [notifications, onDismiss]);

  if (notifications.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '8px 12px',
      pointerEvents: 'none',
    }}>
      {notifications.slice(0, 3).map((notification) => (
        <div
          key={notification.id}
          onClick={() => onTap(notification.id)}
          style={{
            pointerEvents: 'auto',
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            animation: 'slideDown 0.3s ease-out',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* App icon */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: theme.colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0,
          }}>
            💬
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                {notification.chatName}
              </span>
              <span style={{ fontSize: '11px', color: theme.colors.textSecondary, flexShrink: 0, marginLeft: '8px' }}>
                now
              </span>
            </div>
            <p style={{
              margin: 0,
              fontSize: '13px',
              color: theme.colors.textSecondary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {notification.lastMessage}
            </p>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PushNotificationOverlay;
