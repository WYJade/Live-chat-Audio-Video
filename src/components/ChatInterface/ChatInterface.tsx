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

interface ChatInterfaceProps {
  onSwitchCompany: () => void;
  onBackToApp: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSwitchCompany: _onSwitchCompany, onBackToApp }) => {
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
    if (showWelcome) {
      onBackToApp();
    } else {
      setShowWelcome(true);
    }
  };

  const handleVoiceCallClick = () => { handleSaveScrollPosition(); dispatch({ type: 'INITIATE_CALL', payload: { callType: 'voice' } }); };
  const handleVideoCallClick = () => { handleSaveScrollPosition(); dispatch({ type: 'INITIATE_CALL', payload: { callType: 'video' } }); };
  const handleSimulateIncomingVoice = () => { dispatch({ type: 'RECEIVE_CALL', payload: { callType: 'voice', callerName: 'Dispatcher Support' } }); };
  const handleSimulateIncomingVideo = () => { dispatch({ type: 'RECEIVE_CALL', payload: { callType: 'video', callerName: 'Dispatcher Support' } }); };
  const handleAcceptCall = () => dispatch({ type: 'ACCEPT_CALL' });
  const handleDeclineCall = () => {
    dispatch({ type: 'DECLINE_CALL' });
    dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now().toString(), senderId: 'system', senderName: 'System', content: `${state.callState.type === 'video' ? 'Video' : 'Voice'} call declined`, timestamp: new Date(), isEdited: false, canReEdit: false, isRead: true, readAt: null, messageType: 'system' } });
  };
  const handleEndCall = () => {
    const callType = state.callState.type; const duration = state.callState.duration;
    dispatch({ type: 'END_CALL' });
    dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now().toString(), senderId: 'system', senderName: 'System', content: `${callType === 'video' ? 'Video' : 'Voice'} call ended · ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`, timestamp: new Date(), isEdited: false, canReEdit: false, isRead: true, readAt: null, messageType: 'system' } });
  };
  const handleMuteToggle = () => dispatch({ type: 'SET_CALL_STATE', payload: { isMuted: !state.callState.isMuted } });
  const handleSpeakerToggle = () => dispatch({ type: 'SET_CALL_STATE', payload: { isSpeakerOn: !state.callState.isSpeakerOn } });
  const handleCameraToggle = () => dispatch({ type: 'SET_CALL_STATE', payload: { isCameraOn: !state.callState.isCameraOn } });

  if (state.callState.status === 'ringing' && state.callState.role === 'receiver') {
    return <IncomingCallScreen callerName={state.callState.contactName} callType={state.callState.type!} onAccept={handleAcceptCall} onDecline={handleDeclineCall} />;
  }
  if (state.uiState.activeScreen === 'voiceCall') {
    return <VoiceCallPage contactName={state.callState.contactName} callDuration={state.callState.duration} isMuted={state.callState.isMuted} isSpeakerOn={state.callState.isSpeakerOn} callStatus={state.callState.status} role={state.callState.role || 'caller'} onMuteToggle={handleMuteToggle} onSpeakerToggle={handleSpeakerToggle} onEndCall={handleEndCall} />;
  }
  if (state.uiState.activeScreen === 'videoCall') {
    return <VideoCallPage contactName={state.callState.contactName} callDuration={state.callState.duration} isMuted={state.callState.isMuted} isSpeakerOn={state.callState.isSpeakerOn} isCameraOn={state.callState.isCameraOn} callStatus={state.callState.status} role={state.callState.role || 'caller'} onMuteToggle={handleMuteToggle} onSpeakerToggle={handleSpeakerToggle} onCameraToggle={handleCameraToggle} onEndCall={handleEndCall} />;
  }

  // ---- showWelcome = Chat List view (matching screenshot) ----
  if (showWelcome) {
    return (
      <div style={{ width: '100%', maxWidth: '480px', height: '100vh', backgroundColor: '#121212', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', fontSize: '13px', color: '#fff' }}>
          <span>13:53</span>
          <div style={{ display: 'flex', gap: '6px', fontSize: '12px' }}><span>📶</span><span>🔋</span></div>
        </div>
        {/* Header with back arrow */}
        <div style={{ padding: '8px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={onBackToApp} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer', padding: '4px' }}>←</button>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', margin: 0 }}>Chats</h1>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ff8c00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>
          </div>
        </div>
        {/* Search */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#2a2a2a', borderRadius: '8px', padding: '10px 14px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <span style={{ fontSize: '14px', color: '#888' }}>Search chats, contacts, customers...</span>
            <div style={{ marginLeft: 'auto' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg></div>
          </div>
        </div>

        {/* Contact list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {state.contacts.map((contact, index) => (
            <div key={contact.id} onClick={() => setShowWelcome(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', cursor: 'pointer',
                backgroundColor: index === 0 ? 'rgba(70, 130, 240, 0.6)' : 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  backgroundColor: index === 0 ? '#666' : index === 2 ? '#9b87f5' : '#888',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#fff',
                }}>
                  {index < 2 ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  ) : (
                    <span style={{ fontWeight: 'bold' }}>{contact.avatar}</span>
                  )}
                </div>
                {contact.isOnline && (
                  <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#34c759', border: '2px solid #121212' }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{contact.name}</span>
                  {index > 0 && (
                    <span style={{ fontSize: '12px', color: '#888', flexShrink: 0 }}>
                      {contact.lastMessageTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3px' }}>
                  <span style={{ fontSize: '13px', color: index === 0 ? 'rgba(255,255,255,0.8)' : '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{contact.lastMessage}</span>
                  {contact.unreadCount > 0 && <span style={{ marginLeft: '8px' }}><UnreadBadge count={contact.unreadCount} size="small" /></span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom nav */}
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '12px 0 24px', backgroundColor: '#121212', borderTop: '1px solid #333' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth={2}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            <span style={{ fontSize: '11px', color: theme.colors.primary, fontWeight: '500' }}>Chats</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth={2}><path d="M12 2C6.48 2 2 6 2 11c0 2.8 1.4 5.3 3.5 7L4 22l4.5-2.5C9.6 19.8 10.8 20 12 20c5.52 0 10-4 10-9s-4.48-9-10-9z" /></svg>
            <span style={{ fontSize: '11px', color: '#666' }}>Walkie-Talkie</span>
          </div>
        </div>
      </div>
    );
  }

  // ---- Chat conversation view ----
  return (
    <div style={{ width: '100%', maxWidth: '480px', height: '100vh', backgroundColor: theme.colors.background, display: 'flex', flexDirection: 'column', position: 'relative', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ padding: theme.spacing.md, backgroundColor: theme.colors.surface, display: 'flex', alignItems: 'center', gap: theme.spacing.md, borderBottom: `1px solid ${theme.colors.surfaceElevated}` }}>
        <button style={{ background: 'none', border: 'none', color: theme.colors.textPrimary, fontSize: '24px', cursor: 'pointer', padding: theme.spacing.sm }} onClick={handleBackClick}>←</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, flex: 1 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: theme.borderRadius.full, backgroundColor: theme.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.textPrimary, fontWeight: 'bold', fontSize: '18px' }}>A</div>
            <div style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: theme.colors.success, border: `2px solid ${theme.colors.surface}` }} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '500', color: theme.colors.textPrimary, margin: 0 }}>Alexander Nicholas Williams1111...</h3>
        </div>
        <button style={{ background: 'none', border: 'none', color: theme.colors.textPrimary, fontSize: '20px', cursor: 'pointer', padding: theme.spacing.sm }}>⋮</button>
      </div>

      {/* Messages */}
      <div ref={scrollContainerRef} style={{ flex: 1, overflowY: 'auto', padding: theme.spacing.md, display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
        {state.messages.map((message) => <MessageBubble key={message.id} message={message} />)}
        <div ref={messagesEndRef} />
        <div style={{ marginTop: theme.spacing.lg, padding: theme.spacing.md, backgroundColor: theme.colors.surfaceElevated, borderRadius: theme.borderRadius.md, display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
          <p style={{ fontSize: '12px', color: theme.colors.textSecondary, textAlign: 'center', margin: 0 }}>Demo: Simulate Incoming Call</p>
          <div style={{ display: 'flex', gap: theme.spacing.sm, justifyContent: 'center' }}>
            <button onClick={handleSimulateIncomingVoice} style={{ padding: '8px 16px', borderRadius: theme.borderRadius.sm, border: 'none', backgroundColor: theme.colors.primary, color: 'white', fontSize: '13px', cursor: 'pointer' }}>📞 Incoming Voice</button>
            <button onClick={handleSimulateIncomingVideo} style={{ padding: '8px 16px', borderRadius: theme.borderRadius.sm, border: 'none', backgroundColor: theme.colors.primary, color: 'white', fontSize: '13px', cursor: 'pointer' }}>📹 Incoming Video</button>
          </div>
        </div>
      </div>

      <InputBar onVoiceClick={() => {}} onEmojiClick={() => {}} onPlusClick={() => dispatch({ type: 'TOGGLE_ACTION_MENU' })} onTextChange={() => {}}
        onSend={(text) => {
          dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now().toString(), senderId: 'me', senderName: 'Me', content: text, timestamp: new Date(), isEdited: false, canReEdit: false, isRead: false, readAt: null, messageType: 'text' } });
          setTimeout(() => dispatch({ type: 'MARK_MESSAGES_READ' }), 2000);
        }}
      />
      <ActionMenu isOpen={state.uiState.isActionMenuOpen} onClose={() => dispatch({ type: 'TOGGLE_ACTION_MENU' })} onCameraClick={() => {}} onPhotosClick={() => {}} onFilesClick={() => {}} onVoiceCallClick={handleVoiceCallClick} onVideoCallClick={handleVideoCallClick} />

      <div style={{ display: 'flex', justifyContent: 'space-around', padding: theme.spacing.md, backgroundColor: theme.colors.surface, borderTop: `1px solid ${theme.colors.surfaceElevated}` }}>
        <div style={{ position: 'relative', fontSize: '24px' }}>💬</div>
        <div style={{ fontSize: '24px', opacity: 0.5 }}>☰</div>
        <div style={{ fontSize: '24px', opacity: 0.5 }}>◁</div>
      </div>
    </div>
  );
};

export default ChatInterface;
