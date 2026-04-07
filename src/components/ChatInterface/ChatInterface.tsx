import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { theme } from '../../styles/theme';
import InputBar from './InputBar';
import ActionMenu from './ActionMenu';
import MessageBubble from './MessageBubble';
import VoiceCallPage from '../VoiceCallPage/VoiceCallPage';
import VideoCallPage from '../VideoCallPage/VideoCallPage';
import IncomingCallScreen from '../IncomingCall/IncomingCallScreen';

const ChatInterface: React.FC = () => {
  const { state, dispatch, showWelcome, setShowWelcome } = useAppContext();
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

  const handleBackClick = () => {
    setShowWelcome(true);
  };

  // --- Caller: initiate call ---
  const handleVoiceCallClick = () => {
    handleSaveScrollPosition();
    dispatch({ type: 'INITIATE_CALL', payload: { callType: 'voice' } });
  };

  const handleVideoCallClick = () => {
    handleSaveScrollPosition();
    dispatch({ type: 'INITIATE_CALL', payload: { callType: 'video' } });
  };

  // --- Receiver: simulate incoming call ---
  const handleSimulateIncomingVoice = () => {
    dispatch({ type: 'RECEIVE_CALL', payload: { callType: 'voice', callerName: 'Dispatcher Support' } });
  };

  const handleSimulateIncomingVideo = () => {
    dispatch({ type: 'RECEIVE_CALL', payload: { callType: 'video', callerName: 'Dispatcher Support' } });
  };

  // --- Call actions ---
  const handleAcceptCall = () => {
    dispatch({ type: 'ACCEPT_CALL' });
  };

  const handleDeclineCall = () => {
    dispatch({ type: 'DECLINE_CALL' });
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        id: Date.now().toString(),
        senderId: 'system',
        senderName: 'System',
        content: `${state.callState.type === 'video' ? 'Video' : 'Voice'} call declined`,
        timestamp: new Date(),
        isEdited: false,
        canReEdit: false,
      },
    });
  };

  const handleEndCall = () => {
    const callType = state.callState.type;
    const duration = state.callState.duration;
    dispatch({ type: 'END_CALL' });
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        id: Date.now().toString(),
        senderId: 'system',
        senderName: 'System',
        content: `${callType === 'video' ? 'Video' : 'Voice'} call ended · ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`,
        timestamp: new Date(),
        isEdited: false,
        canReEdit: false,
      },
    });
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

  // --- Render: Incoming call screen (receiver, ringing) ---
  if (state.callState.status === 'ringing' && state.callState.role === 'receiver') {
    return (
      <IncomingCallScreen
        callerName={state.callState.contactName}
        callType={state.callState.type!}
        onAccept={handleAcceptCall}
        onDecline={handleDeclineCall}
      />
    );
  }

  // --- Render: Voice call (caller connecting or active) ---
  if (state.uiState.activeScreen === 'voiceCall') {
    return (
      <VoiceCallPage
        contactName={state.callState.contactName}
        callDuration={state.callState.duration}
        isMuted={state.callState.isMuted}
        isSpeakerOn={state.callState.isSpeakerOn}
        callStatus={state.callState.status}
        role={state.callState.role || 'caller'}
        onMuteToggle={handleMuteToggle}
        onSpeakerToggle={handleSpeakerToggle}
        onEndCall={handleEndCall}
      />
    );
  }

  // --- Render: Video call (caller connecting or active) ---
  if (state.uiState.activeScreen === 'videoCall') {
    return (
      <VideoCallPage
        contactName={state.callState.contactName}
        callDuration={state.callState.duration}
        isMuted={state.callState.isMuted}
        isSpeakerOn={state.callState.isSpeakerOn}
        isCameraOn={state.callState.isCameraOn}
        callStatus={state.callState.status}
        role={state.callState.role || 'caller'}
        onMuteToggle={handleMuteToggle}
        onSpeakerToggle={handleSpeakerToggle}
        onCameraToggle={handleCameraToggle}
        onEndCall={handleEndCall}
      />
    );
  }

  // --- Render: Chat view ---
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
          style={{ background: 'none', border: 'none', color: theme.colors.textPrimary, fontSize: '24px', cursor: 'pointer', padding: theme.spacing.sm }}
          onClick={handleBackClick}
        >
          ←
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, flex: 1 }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: theme.borderRadius.full,
            backgroundColor: theme.colors.primary, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: theme.colors.textPrimary, fontWeight: 'bold', fontSize: '18px',
          }}>D</div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '500', color: theme.colors.textPrimary, margin: 0 }}>Dispatcher Support</h3>
            <p style={{ fontSize: '12px', color: theme.colors.success, margin: 0 }}>Online</p>
          </div>
        </div>
      </div>

      {/* Messages or Welcome Screen */}
      <div
        ref={scrollContainerRef}
        style={{ flex: 1, overflowY: 'auto', padding: theme.spacing.md, display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}
      >
        {showWelcome ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: theme.spacing.xl, textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: theme.colors.textPrimary, marginBottom: theme.spacing.lg }}>Welcome to Dispatcher Support</h2>
            <p style={{ fontSize: '15px', color: theme.colors.textSecondary, lineHeight: '1.6', marginBottom: theme.spacing.md }}>
              This is a chat service to help you with delivery queries and operations
            </p>
            <p style={{ fontSize: '14px', color: theme.colors.textSecondary, lineHeight: '1.5', marginTop: theme.spacing.xl }}>
              Feel free to send us a message if you need any assistance with your deliveries, routes, or have any questions.
            </p>
          </div>
        ) : (
          <>
            {state.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />

            {/* Demo: Simulate incoming call buttons */}
            <div style={{
              marginTop: theme.spacing.lg, padding: theme.spacing.md,
              backgroundColor: theme.colors.surfaceElevated, borderRadius: theme.borderRadius.md,
              display: 'flex', flexDirection: 'column', gap: theme.spacing.sm,
            }}>
              <p style={{ fontSize: '12px', color: theme.colors.textSecondary, textAlign: 'center', margin: 0 }}>
                Demo: Simulate Incoming Call (Receiver View)
              </p>
              <div style={{ display: 'flex', gap: theme.spacing.sm, justifyContent: 'center' }}>
                <button onClick={handleSimulateIncomingVoice} style={{
                  padding: '8px 16px', borderRadius: theme.borderRadius.sm, border: 'none',
                  backgroundColor: theme.colors.primary, color: 'white', fontSize: '13px', cursor: 'pointer',
                }}>📞 Incoming Voice</button>
                <button onClick={handleSimulateIncomingVideo} style={{
                  padding: '8px 16px', borderRadius: theme.borderRadius.sm, border: 'none',
                  backgroundColor: theme.colors.primary, color: 'white', fontSize: '13px', cursor: 'pointer',
                }}>📹 Incoming Video</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Input Bar */}
      <InputBar
        onVoiceClick={() => console.log('Voice clicked')}
        onEmojiClick={() => console.log('Emoji clicked')}
        onPlusClick={() => dispatch({ type: 'TOGGLE_ACTION_MENU' })}
        onTextChange={() => {}}
        onSend={(text) => {
          if (showWelcome) setShowWelcome(false);
          dispatch({
            type: 'ADD_MESSAGE',
            payload: { id: Date.now().toString(), senderId: 'me', senderName: 'Me', content: text, timestamp: new Date(), isEdited: false, canReEdit: false },
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
      <div style={{
        display: 'flex', justifyContent: 'space-around', padding: theme.spacing.md,
        backgroundColor: theme.colors.surface, borderTop: `1px solid ${theme.colors.surfaceElevated}`,
      }}>
        <div style={{ fontSize: '24px' }}>💬</div>
        <div style={{ fontSize: '24px', opacity: 0.5 }}>☰</div>
        <div style={{ fontSize: '24px', opacity: 0.5 }}>◁</div>
      </div>
    </div>
  );
};

export default ChatInterface;
