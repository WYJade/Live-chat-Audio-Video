import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { theme } from '../../styles/theme';
import InputBar from './InputBar';
import ActionMenu from './ActionMenu';
import MessageBubble from './MessageBubble';
import VoiceCallPage from '../VoiceCallPage/VoiceCallPage';
import VideoCallPage from '../VideoCallPage/VideoCallPage';

const ChatInterface: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.uiState.activeScreen === 'chat' && state.uiState.chatScrollPosition > 0) {
      scrollContainerRef.current?.scrollTo(0, state.uiState.chatScrollPosition);
    }
  }, [state.uiState.activeScreen]);

  const handleSaveScrollPosition = () => {
    if (scrollContainerRef.current) {
      dispatch({ type: 'SAVE_SCROLL_POSITION', payload: scrollContainerRef.current.scrollTop });
    }
  };

  const handleVoiceCallClick = () => {
    handleSaveScrollPosition();
    dispatch({ type: 'SET_CALL_STATE', payload: { type: 'voice', status: 'active', startTime: new Date() } });
    dispatch({ type: 'NAVIGATE_TO_SCREEN', payload: 'voiceCall' });
  };

  const handleVideoCallClick = () => {
    handleSaveScrollPosition();
    dispatch({ type: 'SET_CALL_STATE', payload: { type: 'video', status: 'active', startTime: new Date() } });
    dispatch({ type: 'NAVIGATE_TO_SCREEN', payload: 'videoCall' });
  };

  const handleEndCall = () => {
    dispatch({ type: 'END_CALL' });
  };

  const handleMuteToggle = () => {
    dispatch({ type: 'SET_CALL_STATE', payload: { isMuted: !state.callState.isMuted } });
  };

  const handleSpeakerToggle = () => {
    dispatch({ type: 'SET_CALL_STATE', payload: { isSpeakerOn: !state.callState.isSpeakerOn } });
  };

  const handleCameraToggle = () => {
    dispatch({ type: 'SET_CALL_STATE', payload: { isCameraOn: !state.callState.isCameraOn } });
  };

  if (state.uiState.activeScreen === 'voiceCall') {
    return (
      <VoiceCallPage
        contactName={state.callState.contactName}
        callDuration={state.callState.duration}
        isMuted={state.callState.isMuted}
        isSpeakerOn={state.callState.isSpeakerOn}
        onMuteToggle={handleMuteToggle}
        onSpeakerToggle={handleSpeakerToggle}
        onEndCall={handleEndCall}
      />
    );
  }

  if (state.uiState.activeScreen === 'videoCall') {
    return (
      <VideoCallPage
        contactName={state.callState.contactName}
        callDuration={state.callState.duration}
        isMuted={state.callState.isMuted}
        isSpeakerOn={state.callState.isSpeakerOn}
        isCameraOn={state.callState.isCameraOn}
        onMuteToggle={handleMuteToggle}
        onSpeakerToggle={handleSpeakerToggle}
        onCameraToggle={handleCameraToggle}
        onEndCall={handleEndCall}
      />
    );
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '480px',
        height: '100vh',
        backgroundColor: theme.colors.background,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: theme.spacing.md,
          backgroundColor: theme.colors.surface,
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.md,
          borderBottom: `1px solid ${theme.colors.surfaceElevated}`,
        }}
      >
        <button
          style={{
            background: 'none',
            border: 'none',
            color: theme.colors.textPrimary,
            fontSize: '24px',
            cursor: 'pointer',
            padding: theme.spacing.sm,
          }}
        >
          ←
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, flex: 1 }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: theme.borderRadius.full,
              backgroundColor: theme.colors.surfaceElevated,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            👤
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '500', color: theme.colors.textPrimary, margin: 0 }}>
              {state.callState.contactName}
            </h3>
          </div>
        </div>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: theme.colors.textPrimary,
            fontSize: '20px',
            cursor: 'pointer',
            padding: theme.spacing.sm,
          }}
        >
          ⋮
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: theme.spacing.md,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.sm,
        }}
      >
        {state.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <InputBar
        onVoiceClick={() => console.log('Voice clicked')}
        onEmojiClick={() => console.log('Emoji clicked')}
        onPlusClick={() => dispatch({ type: 'TOGGLE_ACTION_MENU' })}
        onTextChange={(text) => console.log('Text:', text)}
        onSend={(text) => {
          dispatch({
            type: 'ADD_MESSAGE',
            payload: {
              id: Date.now().toString(),
              senderId: 'me',
              senderName: 'Me',
              content: text,
              timestamp: new Date(),
              isEdited: false,
              canReEdit: false,
            },
          });
        }}
      />

      {/* Action Menu */}
      <ActionMenu
        isOpen={state.uiState.isActionMenuOpen}
        onClose={() => dispatch({ type: 'TOGGLE_ACTION_MENU' })}
        onCameraClick={() => console.log('Camera clicked')}
        onPhotosClick={() => console.log('Photos clicked')}
        onFilesClick={() => console.log('Files clicked')}
        onVoiceCallClick={handleVoiceCallClick}
        onVideoCallClick={handleVideoCallClick}
      />

      {/* Bottom Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: theme.spacing.md,
          backgroundColor: theme.colors.surface,
          borderTop: `1px solid ${theme.colors.surfaceElevated}`,
        }}
      >
        <div style={{ fontSize: '24px' }}>💬</div>
        <div style={{ fontSize: '24px', opacity: 0.5 }}>☰</div>
        <div style={{ fontSize: '24px', opacity: 0.5 }}>◁</div>
      </div>
    </div>
  );
};

export default ChatInterface;
