import React from 'react';
import { theme } from '../../styles/theme';

interface PermissionDialogProps {
  type: 'microphone' | 'camera_and_microphone';
  onAllow: () => void;
  onDeny: () => void;
}

const PermissionDialog: React.FC<PermissionDialogProps> = ({ type, onAllow, onDeny }) => {
  const isMicOnly = type === 'microphone';

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000,
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'permFadeIn 0.2s ease-out',
    }}>
      <div style={{
        width: '90%', maxWidth: '340px', backgroundColor: '#2c2c2e', borderRadius: '14px',
        overflow: 'hidden', animation: 'permScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Icon */}
        <div style={{ padding: '28px 24px 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            backgroundColor: isMicOnly ? 'rgba(255,59,48,0.15)' : 'rgba(155,135,245,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {isMicOnly ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff3b30" strokeWidth={2}>
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth={2}>
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth={2}>
                  <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div style={{ padding: '16px 24px 0', textAlign: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '600', color: '#fff' }}>
            {isMicOnly
              ? '"Wise App" Would Like to Access the Microphone'
              : '"Wise App" Would Like to Access the Camera and Microphone'}
          </h3>
        </div>

        {/* Description */}
        <div style={{ padding: '8px 24px 20px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
            {isMicOnly
              ? 'Microphone access is required to make voice calls. You can change this later in your device settings.'
              : 'Camera and microphone access are required to make video calls. You can change this later in your device settings.'}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={onDeny} style={{
            width: '100%', padding: '14px', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: '17px', cursor: 'pointer',
          }}>
            Don't Allow
          </button>
          <button onClick={onAllow} style={{
            width: '100%', padding: '14px', border: 'none',
            backgroundColor: 'transparent', color: '#0a84ff', fontSize: '17px', fontWeight: '600', cursor: 'pointer',
          }}>
            Allow
          </button>
        </div>
      </div>

      <style>{`
        @keyframes permFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes permScaleIn { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default PermissionDialog;
