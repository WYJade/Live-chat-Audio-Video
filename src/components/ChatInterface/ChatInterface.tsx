import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { theme } from '../../styles/theme';
import InputBar from './InputBar';
import ActionMenu from './ActionMenu';
import MessageBubble from './MessageBubble';
import UnreadBadge from './UnreadBadge';
import VoiceCallPage from '../VoiceCallPage/VoiceCallPage';
import VideoCallPage from '../VideoCallPage/VideoCallPage';
import IncomingCallScreen from '../IncomingCall/IncomingCallScreen';
import PushNotificationOverlay from '../PushNotification/PushNotificationOverlay';

const ChatInterface: React.FC = () => {
  const { state, dispatch, showWelcome, setShowWelcome } = useAppContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mark messages as read when viewing chat
  useEffect(() => {
    if (state.uiState.activeScreen === 'chat' && !showWelcome) {
      const unreadCount = state.messages.filter((m) => !m.isRead && m.senderId !== 'me').length;
      if (unreadCount > 0) {
        const timer = setTimeout(() => dispatch({ type: 'MARK_MESSAGES_READ' }), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [state.uiState.activeScreen, showWelcome, state.messages, dispatch]);

  // Simulate incoming push notification after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: 'ADD_PUSH_NOTIFICATION',
        payload: {
          id: 'push-' + Date.now(),
          appIcon: '💬',
          chatName: 'Alexander Nicholas Williams...',
          lastMessage: 'Hey, are you available for a pickup at dock 5?',
          timestamp: new Date(),
        },
      });
    }, 8000);
    return () => clearTimeout(timer);
  }, [dispatch]);

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

  const handleBackClick = () => setShowWelcome(true);

  const handleVoiceCallClick = () => {
    handleSaveScrollPosition();
    dispatch({ type: 'INITIATE_CALL', payload: { callType: 'voice' } });
  };
  const handleVideoCallClick = () => {
    handleSaveScrollPosition();
    dispatch({ type: 'INITIATE_CALL', payload: { callType: 'video' } });
  };
  const handleSimulateIncomingVoice = () => {
    dispatch({ type: 'RECEIVE_CALL', payload: { callType: 'voice', callerName: 'Dispatcher Support' } });
  };
  const handleSimulateIncomingVideo = () => {
    dispatch({ type: 'RECEIVE_CALL', payload: { callType: 'video', callerName: 'Dispatcher Support' } });
  };
  const handleAcceptCall = () => dispatch({ type: 'ACCEPT_CALL' });
  const handleDeclineCall = () => {
    dispatch({ type: 'DECLINE_CALL' });
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        id: Date.now().toString(), senderId: 'system', senderName: 'System',
        content: `${state.callState.type === 'video' ? 'Video' : 'Voice'} call declined`,
        timestamp: new Date(), isEdited: false, canReEdit: false, isRead: true, readAt: null, messageType: 'system',
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
        id: Date.now().toString(), senderId: 'system', senderName: 'System',
        content: `${callType === 'video' ? 'Video' : 'Voice'} call ended · ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`,
        timestamp: new Date(), isEdited: false, canReEdit: false, isRead: true, readAt: null, messageType: 'system',
      },
    });
  };
  const handleMuteToggle = () => dispatch({ type: 'SET_CALL_STATE', payload: { isMuted: !state.callState.isMuted } });
  const handleSpeakerToggle = () => dispatch({ type: 'SET_CALL_STATE', payload: { isSpeakerOn: !state.callState.isSpeakerOn } });
  const handleCameraToggle = () => dispatch({ type: 'SET_CALL_STATE', payload: { isCameraOn: !state.callState.isCameraOn } });

  // Incoming call screen
  if (state.callState.status === 'ringing' && state.callState.role === 'receiver') {
    return (
      <IncomingCallScreen callerName={state.callState.contactName} callType={state.callState.type!}
        onAccept={handleAcceptCall} onDecline={handleDeclineCall} />
    );
  }
  if (state.uiState.activeScreen === 'voiceCall') {
    return (
      <VoiceCallPage contactName={state.callState.contactName} callDuration={state.callState.duration}
        isMuted={state.callState.isMuted} isSpeakerOn={state.callState.isSpeakerOn}
        callStatus={state.callState.status} role={state.callState.role || 'caller'}
        onMuteToggle={handleMuteToggle} onSpeakerToggle={handleSpeakerToggle} onEndCall={handleEndCall} />
    );
  }
  if (state.uiState.activeScreen === 'videoCall') {
    return (
      <VideoCallPage contactName={state.callState.contactName} callDuration={state.callState.duration}
        isMuted={state.callState.isMuted} isSpeakerOn={state.callState.isSpeakerOn}
        isCameraOn={state.callState.isCameraOn} callStatus={state.callState.status}
        role={state.callState.role || 'caller'} onMuteToggle={handleMuteToggle}
        onSpeakerToggle={handleSpeakerToggle} onCameraToggle={handleCameraToggle} onEndCall={handleEndCall} />
    );
  }

  // Chat view
  return (
    <div style={{
      width: '100%', maxWidth: '480px', height: '100vh', backgroundColor: theme.colors.background,
      display: 'flex', flexDirection: 'column', position: 'relative', margin: '0 auto',
    }}>
      {/* Push Notification Overlay */}
      <PushNotificationOverlay
        notifications={state.pushNotifications}
        onDismiss={(id) => dispatch({ type: 'DISMISS_PUSH_NOTIFICATION', payload: id })}
        onTap={(id) => dispatch({ type: 'DISMISS_PUSH_NOTIFICATION', payload: id })}
      />

      {/* Header */}
      <div style={{
        padding: theme.spacing.md, backgroundColor: theme.colors.surface,
        display: 'flex', alignItems: 'center', gap: theme.spacing.md,
        borderBottom: `1px solid ${theme.colors.surfaceElevated}`,
      }}>
        <button style={{ background: 'none', border: 'none', color: theme.colors.textPrimary, fontSize: '24px', cursor: 'pointer', padding: theme.spacing.sm }}
          onClick={handleBackClick}>←</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, flex: 1 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: theme.borderRadius.full,
              backgroundColor: theme.colors.primary, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: theme.colors.textPrimary, fontWeight: 'bold', fontSize: '18px',
            }}>D</div>
            {/* Online indicator */}
            <div style={{
              position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px',
              borderRadius: '50%', backgroundColor: theme.colors.success,
              border: `2px solid ${theme.colors.surface}`,
            }} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '500', color: theme.colors.textPrimary, margin: 0 }}>Dispatcher Support</h3>
            <p style={{ fontSize: '12px', color: theme.colors.success, margin: 0 }}>Online</p>
          </div>
        </div>
        {/* Unread badge on header */}
        {state.totalUnreadCount > 0 && !showWelcome && (
          <UnreadBadge count={state.totalUnreadCount} />
        )}
      </div>

      {/* Messages or Welcome Screen */}
      <div ref={scrollContainerRef} style={{
        flex: 1, overflowY: 'auto', padding: theme.spacing.md,
        display: 'flex', flexDirection: 'column', gap: theme.spacing.sm,
      }}>
        {showWelcome ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: theme.spacing.xl, textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: theme.colors.textPrimary, marginBottom: theme.spacing.lg }}>Welcome to Dispatcher Support</h2>
            <p style={{ fontSize: '15px', color: theme.colors.textSecondary, lineHeight: '1.6', marginBottom: theme.spacing.md }}>
              This is a chat service to help you with delivery queries and operations
            </p>
            <p style={{ fontSize: '14px', color: theme.colors.textSecondary, lineHeight: '1.5', marginTop: theme.spacing.xl }}>
              Feel free to send us a message if you need any assistance with your deliveries, routes, or have any questions.
            </p>

            {/* Chat list preview with unread badges */}
            <div style={{ width: '100%', marginTop: '32px' }}>
              <h3 style={{ fontSize: '14px', color: theme.colors.textSecondary, marginBottom: theme.spacing.md, textAlign: 'left' }}>Recent Chats</h3>
              {state.contacts.map((contact) => (
                <div key={contact.id} onClick={() => { if (contact.id === 'c1') setShowWelcome(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: theme.spacing.md,
                    padding: '12px', borderRadius: theme.borderRadius.sm,
                    backgroundColor: theme.colors.surfaceElevated, marginBottom: '8px', cursor: 'pointer',
                  }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      backgroundColor: contact.id === 'c1' ? theme.colors.primary : '#666',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 'bold', fontSize: '18px',
                    }}>{contact.avatar}</div>
                    {contact.isOnline && (
                      <div style={{
                        position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px',
                        borderRadius: '50%', backgroundColor: theme.colors.success,
                        border: `2px solid ${theme.colors.surfaceElevated}`,
                      }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '15px', fontWeight: '500', color: '#fff' }}>{contact.name}</span>
                      <span style={{ fontSize: '11px', color: theme.colors.textSecondary, flexShrink: 0 }}>
                        {contact.lastMessageTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                      <span style={{
                        fontSize: '13px', color: theme.colors.textSecondary,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                      }}>{contact.lastMessage}</span>
                      {contact.unreadCount > 0 && (
                        <span style={{ marginLeft: '8px' }}><UnreadBadge count={contact.unreadCount} size="small" /></span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {state.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />

            {/* Demo buttons */}
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
            payload: {
              id: Date.now().toString(), senderId: 'me', senderName: 'Me', content: text,
              timestamp: new Date(), isEdited: false, canReEdit: false,
              isRead: false, readAt: null, messageType: 'text',
            },
          });
          // Simulate read receipt after 2s
          setTimeout(() => {
            dispatch({ type: 'MARK_MESSAGES_READ' });
          }, 2000);
        }}
      />

      <ActionMenu
        isOpen={state.uiState.isActionMenuOpen}
        onClose={() => dispatch({ type: 'TOGGLE_ACTION_MENU' })}
        onCameraClick={() => console.log('Camera clicked')}
        onPhotosClick={() => console.log('Photos clicked')}
        onFilesClick={() => console.log('Files clicked')}
        onVoiceCallClick={handleVoiceCallClick}
        onVideoCallClick={handleVideoCallClick}
      />

      {/* Bottom Navigation with unread badge */}
      <div style={{
        display: 'flex', justifyContent: 'space-around', padding: theme.spacing.md,
        backgroundColor: theme.colors.surface, borderTop: `1px solid ${theme.colors.surfaceElevated}`,
      }}>
        <div style={{ position: 'relative', fontSize: '24px' }}>
          💬
          {state.totalUnreadCount > 0 && (
            <span style={{ position: 'absolute', top: '-6px', right: '-10px' }}>
              <UnreadBadge count={state.totalUnreadCount} size="small" />
            </span>
          )}
        </div>
        <div style={{ fontSize: '24px', opacity: 0.5 }}>☰</div>
        <div style={{ fontSize: '24px', opacity: 0.5 }}>◁</div>
      </div>
    </div>
  );
};

export default ChatInterface;
