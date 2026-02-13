import React from 'react';
import { Message } from '../../types/models';
import { theme } from '../../styles/theme';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isOwnMessage = message.senderId === 'me';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
        marginBottom: theme.spacing.sm,
      }}
    >
      <div
        style={{
          maxWidth: '75%',
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          borderRadius: theme.borderRadius.md,
          backgroundColor: isOwnMessage ? theme.colors.primary : theme.colors.surfaceElevated,
          color: theme.colors.textPrimary,
          position: 'relative',
        }}
      >
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>{message.content}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: theme.spacing.xs,
            gap: theme.spacing.sm,
          }}
        >
          <span style={{ fontSize: '11px', color: theme.colors.textSecondary }}>
            {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
          {message.canReEdit && (
            <button
              style={{
                background: 'none',
                border: `1px solid ${theme.colors.success}`,
                color: theme.colors.success,
                padding: '2px 8px',
                borderRadius: theme.borderRadius.sm,
                fontSize: '11px',
                cursor: 'pointer',
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
