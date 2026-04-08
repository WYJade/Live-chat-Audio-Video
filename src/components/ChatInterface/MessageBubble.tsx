import React from 'react';
import { Message } from '../../types/models';
import { theme } from '../../styles/theme';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isOwnMessage = message.senderId === 'me';
  const isSystem = message.senderId === 'system';

  if (isSystem) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: theme.spacing.sm }}>
        <span style={{
          fontSize: '12px', color: theme.colors.textSecondary,
          backgroundColor: theme.colors.surfaceElevated, padding: '4px 12px',
          borderRadius: theme.borderRadius.lg,
        }}>
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: isOwnMessage ? 'flex-end' : 'flex-start', marginBottom: theme.spacing.sm }}>
      <div style={{
        maxWidth: '75%',
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        borderRadius: theme.borderRadius.md,
        backgroundColor: isOwnMessage ? theme.colors.primary : theme.colors.surfaceElevated,
        color: theme.colors.textPrimary,
        position: 'relative',
      }}>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>{message.content}</p>
        <div style={{
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
          marginTop: theme.spacing.xs, gap: '4px',
        }}>
          <span style={{ fontSize: '11px', color: isOwnMessage ? 'rgba(255,255,255,0.7)' : theme.colors.textSecondary }}>
            {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>

          {/* Read/Unread indicator for own messages */}
          {isOwnMessage && (
            <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '2px' }}>
              {message.isRead ? (
                // Double blue check - Read
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <path d="M1 6l3.5 4L11 2" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6l3.5 4L16 2" stroke="#34c759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                // Single gray check - Sent but unread
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                  <path d="M1 6l4 4L13 2" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          )}

          {message.canReEdit && (
            <button style={{
              background: 'none', border: `1px solid ${theme.colors.success}`,
              color: theme.colors.success, padding: '2px 8px',
              borderRadius: theme.borderRadius.sm, fontSize: '11px', cursor: 'pointer', marginLeft: '4px',
            }}
              onClick={() => console.log('Re-edit message:', message.id)}
            >
              Re-edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
