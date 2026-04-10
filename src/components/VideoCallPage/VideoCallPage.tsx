import React, { useEffect, useState } from 'react';
import { theme } from '../../styles/theme';

interface VideoCallPageProps {
  contactName: string;
  callDuration: number;
  isMuted: boolean;
  isSpeakerOn: boolean;
  isCameraOn: boolean;
  callStatus: string;
  role: string;
  onMuteToggle: () => void;
  onSpeakerToggle: () => void;
  onCameraToggle: () => void;
  onEndCall: () => void;
}

const VideoCallPage: React.FC<VideoCallPageProps> = ({
  contactName,
  callDuration,
  isMuted,
  isSpeakerOn,
  isCameraOn,
  callStatus,
  role,
  onMuteToggle,
  onSpeakerToggle,
  onCameraToggle,
  onEndCall,
}) => {
  const [duration, setDuration] = useState(callDuration);
  const [isWaiting, setIsWaiting] = React.useState(callStatus === 'connecting');
  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const controlButtonStyle = (isActive: boolean, color?: string): React.CSSProperties => ({
    width: '68px',
    height: '68px',
    minWidth: theme.touchTarget.minimum,
    minHeight: theme.touchTarget.minimum,
    borderRadius: theme.borderRadius.full,
    backgroundColor: isActive ? color || theme.colors.primary : 'rgba(255, 255, 255, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: theme.colors.background,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Remote video feed - Real American person background optimized for 9:16 mobile */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Simulated video background with American person - contain mode to show full person */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=480&h=854&fit=crop&crop=faces)',
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          filter: isWaiting ? 'blur(8px) brightness(0.6)' : 'brightness(0.85)',
          transition: 'filter 0.5s ease',
        }} />
        
        {/* Overlay gradient for better UI visibility */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.5) 100%)',
        }} />
      </div>

      {/* Local video (picture-in-picture) - Small preview at top */}
      <div
        style={{
          position: 'absolute',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '110px',
          height: '150px',
          backgroundColor: 'rgba(42, 42, 42, 0.95)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '2px solid rgba(255,255,255,0.4)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
        }}
      >
        {isCameraOn ? (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=220&h=300&fit=crop&crop=faces)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        ) : (
          <div style={{ fontSize: '48px', opacity: 0.7 }}>🚫</div>
        )}
      </div>

      {/* Top status text - removed from here */}
      
      {/* Contact name overlay - below the small video */}
      <div
        style={{
          position: 'absolute',
          top: '240px',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <h2 style={{ 
          fontSize: '26px', 
          fontWeight: '600', 
          color: '#ffffff', 
          marginBottom: '8px',
          textShadow: '0 3px 10px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.8)',
          letterSpacing: '0.3px',
        }}>
          {contactName}
        </h2>
        {isWaiting ? (
          <p style={{ 
            fontSize: '16px', 
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 2px 6px rgba(0,0,0,0.7)',
            fontWeight: '400',
            margin: 0,
          }}>
            {role === 'caller' ? 'Calling...' : 'Connected'}
          </p>
        ) : (
          <p style={{ 
            fontSize: '16px', 
            color: 'rgba(255,255,255,0.95)',
            textShadow: '0 2px 6px rgba(0,0,0,0.7)',
            fontWeight: '500',
            margin: 0,
          }}>
            {formatDuration(duration)}
          </p>
        )}
      </div>

      {/* Controls overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
          padding: `${theme.spacing.xl} ${theme.spacing.lg} 40px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: theme.spacing.xl,
        }}
      >
        {/* Control buttons row 1 */}
        <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', width: '100%', maxWidth: '360px' }}>
          {/* Mute button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.sm }}>
            <button
              onClick={onMuteToggle}
              style={controlButtonStyle(isMuted, theme.colors.error)}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isMuted ? 'white' : '#333'}>
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
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.95)', textAlign: 'center', fontWeight: '500', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              {isMuted ? 'Mic Off' : 'Mic On'}
            </span>
          </div>

          {/* Speaker button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.sm }}>
            <button
              onClick={onSpeakerToggle}
              style={controlButtonStyle(isSpeakerOn, '#007AFF')}
              aria-label={isSpeakerOn ? 'Speaker off' : 'Speaker on'}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isSpeakerOn ? 'white' : '#333'}>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                {isSpeakerOn && (
                  <>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </>
                )}
              </svg>
            </button>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.95)', textAlign: 'center', fontWeight: '500', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              {isSpeakerOn ? 'Speaker On' : 'Speaker Off'}
            </span>
          </div>

          {/* Camera button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.sm }}>
            <button
              onClick={onCameraToggle}
              style={controlButtonStyle(!isCameraOn, theme.colors.error)}
              aria-label={isCameraOn ? 'Camera off' : 'Camera on'}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isCameraOn ? '#333' : 'white'}>
                {isCameraOn ? (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" strokeWidth={2} />
                  </>
                ) : (
                  <>
                    <line x1="1" y1="1" x2="23" y2="23" strokeWidth={2} strokeLinecap="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 16v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3m9-3h3a2 2 0 0 1 2 2v9.34m-7.72-2.06L23 19V5l-7 5" />
                  </>
                )}
              </svg>
            </button>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.95)', textAlign: 'center', fontWeight: '500', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              {isCameraOn ? 'Camera On' : 'Camera Off'}
            </span>
          </div>
        </div>

        {/* End call button row */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.sm, marginTop: theme.spacing.sm }}>
          <button
            onClick={onEndCall}
            style={{
              width: '72px', height: '72px', minWidth: theme.touchTarget.minimum, minHeight: theme.touchTarget.minimum,
              borderRadius: theme.borderRadius.full, backgroundColor: '#ff3b30',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: 'none', boxShadow: '0 4px 16px rgba(255,59,48,0.4)',
            }}
            aria-label="End call"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
            </svg>
          </button>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.95)', textAlign: 'center', fontWeight: '500', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
            End Call
          </span>
        </div>
      </div>

    </div>
  );
};

export default VideoCallPage;
