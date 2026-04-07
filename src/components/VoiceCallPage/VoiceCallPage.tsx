import React, { useEffect, useState } from 'react';
import { theme } from '../../styles/theme';

interface VoiceCallPageProps {
  contactName: string;
  callDuration: number;
  isMuted: boolean;
  isSpeakerOn: boolean;
  callStatus: string;
  role: string;
  onMuteToggle: () => void;
  onSpeakerToggle: () => void;
  onEndCall: () => void;
}

const VoiceCallPage: React.FC<VoiceCallPageProps> = ({
  contactName,
  callDuration,
  isMuted,
  isSpeakerOn,
  callStatus,
  role,
  onMuteToggle,
  onSpeakerToggle,
  onEndCall,
}) => {
  const [duration, setDuration] = useState(callDuration);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const controlButtonStyle = (isActive: boolean, color?: string): React.CSSProperties => ({
    width: '64px',
    height: '64px',
    minWidth: theme.touchTarget.minimum,
    minHeight: theme.touchTarget.minimum,
    borderRadius: theme.borderRadius.full,
    backgroundColor: isActive ? color || theme.colors.primary : theme.colors.surfaceElevated,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
  });

  const [isWaiting, setIsWaiting] = React.useState(callStatus === 'connecting');

  React.useEffect(() => {
    if (callStatus === 'connecting' && role === 'caller') {
      const timer = setTimeout(() => {
        setIsWaiting(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (callStatus === 'active') {
      setIsWaiting(false);
    }
  }, [callStatus, role]);

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
        padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
        color: theme.colors.textPrimary,
      }}
    >
      {/* Top section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Avatar */}
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: theme.borderRadius.full,
            backgroundColor: theme.colors.surfaceElevated,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
            marginBottom: theme.spacing.lg,
          }}
        >
          👨
        </div>
        
        <h2 style={{ fontSize: '26px', fontWeight: '500', marginBottom: theme.spacing.sm, textAlign: 'center' }}>
          {contactName}
        </h2>
        
        {isWaiting ? (
          <p style={{ fontSize: '16px', color: theme.colors.textSecondary, textAlign: 'center', marginTop: theme.spacing.md }}>
            {role === 'caller' ? 'Calling...' : 'Connected'}
          </p>
        ) : (
          <p style={{ fontSize: '16px', color: theme.colors.textSecondary }}>
            {formatDuration(duration)}
          </p>
        )}
      </div>

      {/* Control buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg, alignItems: 'center', width: '100%', maxWidth: '360px' }}>
        <div style={{ display: 'flex', gap: theme.spacing.xl, justifyContent: 'center', width: '100%' }}>
          {/* Mute button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.xs }}>
            <button
              onClick={onMuteToggle}
              style={controlButtonStyle(isMuted, theme.colors.error)}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
                {isMuted ? (
                  <>
                    <line x1="1" y1="1" x2="23" y2="23" strokeWidth={2} strokeLinecap="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                    <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" strokeWidth={2} />
                    <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" strokeWidth={2} />
                  </>
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" strokeWidth={2} />
                    <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" strokeWidth={2} />
                  </>
                )}
              </svg>
            </button>
            <span style={{ fontSize: '11px', color: theme.colors.textSecondary, textAlign: 'center' }}>
              {isMuted ? 'Mic Off' : 'Mic On'}
            </span>
          </div>

          {/* End call button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.xs }}>
            <button
              onClick={onEndCall}
              style={{
                width: '64px',
                height: '64px',
                minWidth: theme.touchTarget.minimum,
                minHeight: theme.touchTarget.minimum,
                borderRadius: theme.borderRadius.full,
                backgroundColor: theme.colors.error,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: 'none',
              }}
              aria-label="End call"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
                <line x1="18" y1="6" x2="6" y2="18" strokeWidth={2} strokeLinecap="round" />
              </svg>
            </button>
            <span style={{ fontSize: '11px', color: theme.colors.textSecondary, textAlign: 'center' }}>
              End Call
            </span>
          </div>

          {/* Speaker button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.xs }}>
            <button
              onClick={onSpeakerToggle}
              style={controlButtonStyle(isSpeakerOn, '#007AFF')}
              aria-label={isSpeakerOn ? 'Speaker off' : 'Speaker on'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                {isSpeakerOn && (
                  <>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </>
                )}
              </svg>
            </button>
            <span style={{ fontSize: '11px', color: theme.colors.textSecondary, textAlign: 'center' }}>
              {isSpeakerOn ? 'Speaker On' : 'Speaker Off'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCallPage;
