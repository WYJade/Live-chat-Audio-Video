import React from 'react';
import { theme } from '../../styles/theme';

interface IncomingCallScreenProps {
  callerName: string;
  callType: 'voice' | 'video';
  onAccept: () => void;
  onDecline: () => void;
}

const IncomingCallScreen: React.FC<IncomingCallScreenProps> = ({
  callerName,
  callType,
  onAccept,
  onDecline,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: theme.colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `60px ${theme.spacing.lg} 80px`,
        color: theme.colors.textPrimary,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated ring effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -70%)',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        border: `2px solid ${theme.colors.primary}`,
        opacity: 0.2,
        animation: 'ringPulse 2s ease-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -70%)',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        border: `2px solid ${theme.colors.primary}`,
        opacity: 0.1,
        animation: 'ringPulse 2s ease-out infinite 0.5s',
      }} />

      {/* Top section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.md }}>
        <p style={{ fontSize: '16px', color: theme.colors.textSecondary, textTransform: 'uppercase', letterSpacing: '2px' }}>
          Incoming {callType === 'voice' ? 'Voice' : 'Video'} Call
        </p>
      </div>

      {/* Center - Avatar and name */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.lg }}>
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            backgroundColor: theme.colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '56px',
            border: `4px solid rgba(155, 135, 245, 0.3)`,
          }}
        >
          D
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: '600', textAlign: 'center' }}>
          {callerName}
        </h2>
        <p style={{ fontSize: '15px', color: theme.colors.textSecondary, animation: 'blink 1.5s ease-in-out infinite' }}>
          {callType === 'video' ? 'wants to video call you...' : 'wants to voice call you...'}
        </p>
      </div>

      {/* Bottom - Accept / Decline buttons */}
      <div style={{ display: 'flex', gap: '80px', alignItems: 'center' }}>
        {/* Decline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.sm }}>
          <button
            onClick={onDecline}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#ff3b30',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 4px 16px rgba(255,59,48,0.4)',
            }}
            aria-label="Decline call"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
            </svg>
          </button>
          <span style={{ fontSize: '13px', color: theme.colors.textSecondary }}>Decline</span>
        </div>

        {/* Accept */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.sm }}>
          <button
            onClick={onAccept}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#34c759',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 4px 16px rgba(52,199,89,0.4)',
            }}
            aria-label="Accept call"
          >
            {callType === 'video' ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            )}
          </button>
          <span style={{ fontSize: '13px', color: theme.colors.textSecondary }}>Accept</span>
        </div>
      </div>

      <style>{`
        @keyframes ringPulse {
          0% { transform: translate(-50%, -70%) scale(1); opacity: 0.2; }
          100% { transform: translate(-50%, -70%) scale(1.5); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default IncomingCallScreen;
