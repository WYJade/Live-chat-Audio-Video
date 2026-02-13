import React, { useEffect, useRef } from 'react';
import { theme } from '../../styles/theme';

interface ActionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCameraClick: () => void;
  onPhotosClick: () => void;
  onFilesClick: () => void;
  onVoiceCallClick: () => void;
  onVideoCallClick: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  isOpen,
  onClose,
  onCameraClick,
  onPhotosClick,
  onFilesClick,
  onVoiceCallClick,
  onVideoCallClick,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside as any);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as any);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actionItems = [
    { label: 'Camera', icon: '📷', onClick: onCameraClick },
    { label: 'Photos', icon: '🖼️', onClick: onPhotosClick },
    { label: 'Files', icon: '📁', onClick: onFilesClick },
    { label: 'Voice Call', icon: '📞', onClick: onVoiceCallClick },
    { label: 'Video Call', icon: '📹', onClick: onVideoCallClick },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease-out',
        }}
        onClick={onClose}
      />

      {/* Menu */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.surfaceElevated,
          borderTopLeftRadius: theme.borderRadius.md,
          borderTopRightRadius: theme.borderRadius.md,
          padding: theme.spacing.lg,
          zIndex: 1000,
          animation: 'slideUp 0.3s ease-out',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: theme.spacing.lg,
            width: '100%',
          }}
        >
          {actionItems.map((item, index) => (
            <div
              key={index}
              onClick={item.onClick}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: theme.spacing.sm,
                cursor: 'pointer',
                minWidth: theme.touchTarget.minimum,
                minHeight: theme.touchTarget.minimum,
                justifyContent: 'center',
                padding: theme.spacing.sm,
              }}
              role="button"
              aria-label={item.label}
            >
              <div
                style={{
                  fontSize: '40px',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontSize: '11px',
                  color: theme.colors.textSecondary,
                  textAlign: 'center',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  lineHeight: '1.2',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default ActionMenu;
