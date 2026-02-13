import React, { useState } from 'react';
import { theme } from '../../styles/theme';

interface InputBarProps {
  onVoiceClick: () => void;
  onEmojiClick: () => void;
  onPlusClick: () => void;
  onTextChange: (text: string) => void;
  onSend: (text: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({
  onVoiceClick,
  onEmojiClick,
  onPlusClick,
  onTextChange,
  onSend,
}) => {
  const [inputText, setInputText] = useState('');
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    onTextChange(text);
  };

  const handleIconClick = (iconName: string, callback: () => void) => {
    setActiveIcon(iconName);
    setTimeout(() => setActiveIcon(null), 200);
    callback();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputText.trim()) {
      onSend(inputText);
      setInputText('');
    }
  };

  const iconStyle = (iconName: string): React.CSSProperties => ({
    width: '24px',
    height: '24px',
    minWidth: '44px',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: activeIcon === iconName ? theme.colors.primary : theme.colors.textSecondary,
    transition: 'color 0.2s',
    userSelect: 'none',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.sm,
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        margin: theme.spacing.md,
      }}
    >
      {/* Voice icon on LEFT */}
      <div
        onClick={() => handleIconClick('voice', onVoiceClick)}
        style={iconStyle('voice')}
        role="button"
        aria-label="Voice input"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" strokeWidth={2} />
          <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" strokeWidth={2} />
        </svg>
      </div>

      {/* Text input */}
      <input
        type="text"
        placeholder="Type a message"
        value={inputText}
        onChange={handleTextChange}
        onKeyPress={handleKeyPress}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          color: theme.colors.textPrimary,
          fontSize: '16px',
          padding: `${theme.spacing.sm} 0`,
        }}
      />

      {/* Emoji icon on RIGHT (first) */}
      <div
        onClick={() => handleIconClick('emoji', onEmojiClick)}
        style={iconStyle('emoji')}
        role="button"
        aria-label="Emoji picker"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
          <circle cx="8" cy="10" r="1.5" fill="currentColor" />
          <circle cx="16" cy="10" r="1.5" fill="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14s1.5 2 4 2 4-2 4-2" />
        </svg>
      </div>

      {/* Plus icon on RIGHT (second) */}
      <div
        onClick={() => handleIconClick('plus', onPlusClick)}
        style={iconStyle('plus')}
        role="button"
        aria-label="More options"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
          <line x1="12" y1="8" x2="12" y2="16" strokeLinecap="round" strokeWidth={2} />
          <line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" strokeWidth={2} />
        </svg>
      </div>
    </div>
  );
};

export default InputBar;
