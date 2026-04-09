import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { theme } from '../../styles/theme';

interface WebLiveChatProps {
  onSwitchToApp: () => void;
}

const WebLiveChat: React.FC<WebLiveChatProps> = ({ onSwitchToApp }) => {
  const { state, dispatch } = useAppContext();
  const [selectedContact, setSelectedContact] = useState('c2');
  const [inputText, setInputText] = useState('');
  const [webCallState, setWebCallState] = useState<{
    active: boolean; type: 'voice' | 'video' | null; status: 'idle' | 'ringing' | 'active' | 'connecting';
    isMuted: boolean; isSpeakerOn: boolean; isCameraOn: boolean; duration: number;
  }>({ active: false, type: null, status: 'idle', isMuted: false, isSpeakerOn: false, isCameraOn: true, duration: 0 });

  // Timer for call duration
  React.useEffect(() => {
    if (webCallState.status === 'active') {
      const t = setInterval(() => setWebCallState(s => ({ ...s, duration: s.duration + 1 })), 1000);
      return () => clearInterval(t);
    }
  }, [webCallState.status]);

  // Auto-accept after 3s when connecting
  React.useEffect(() => {
    if (webCallState.status === 'connecting') {
      const t = setTimeout(() => setWebCallState(s => ({ ...s, status: 'active' })), 3000);
      return () => clearTimeout(t);
    }
  }, [webCallState.status]);

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const startCall = (type: 'voice' | 'video') => {
    setWebCallState({ active: true, type, status: 'connecting', isMuted: false, isSpeakerOn: false, isCameraOn: type === 'video', duration: 0 });
  };
  const endCall = () => {
    setWebCallState({ active: false, type: null, status: 'idle', isMuted: false, isSpeakerOn: false, isCameraOn: true, duration: 0 });
  };
  const simulateIncoming = (type: 'voice' | 'video') => {
    setWebCallState({ active: true, type, status: 'ringing', isMuted: false, isSpeakerOn: false, isCameraOn: type === 'video', duration: 0 });
  };
  const acceptCall = () => setWebCallState(s => ({ ...s, status: 'active' }));
  const declineCall = () => endCall();

  const sendMessage = () => {
    if (!inputText.trim()) return;
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        id: Date.now().toString(), senderId: 'me', senderName: 'Me', content: inputText,
        timestamp: new Date(), isEdited: false, canReEdit: false, isRead: false, readAt: null, messageType: 'text',
      },
    });
    setInputText('');
  };

  const contacts = [
    { id: 'c1', name: 'customer server-24f3d570-4939-4d9...', avatar: 'C', color: '#9b87f5', sub: 'test' },
    { id: 'c2', name: 'Aimee', avatar: 'A', color: '#e74c3c', sub: '😊' },
    { id: 'c3', name: 'customer agent', avatar: 'C', color: '#9b87f5', sub: '121' },
    { id: 'c4', name: 'Devin', avatar: 'D', color: '#9b87f5', sub: 'sayHello' },
    { id: 'c5', name: "*12..........Duan peiyi", avatar: '', color: '#666', sub: '{"imageUrl":"https://api-staging...' },
    { id: 'c6', name: 'alien gao', avatar: 'A', color: '#e74c3c', sub: '😊' },
    { id: 'c7', name: 'Yongqiang Zheng', avatar: '', color: '#666', sub: '👋' },
    { id: 'c8', name: 'Eddie Yang', avatar: '', color: '#666', sub: '1222' },
  ];

  const sel = contacts.find(c => c.id === selectedContact);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', backgroundColor: '#1a1a2e', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Left sidebar */}
      <div style={{ width: '60px', backgroundColor: '#12122a', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: '20px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: theme.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💬</div>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#2a2a4a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </div>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#2a2a4a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
        </div>
        {/* Switch to App button */}
        <div style={{ marginTop: 'auto', cursor: 'pointer' }} onClick={onSwitchToApp} title="Switch to App View">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
        </div>
      </div>

      {/* Contact list panel */}
      <div style={{ width: '240px', backgroundColor: '#1e1e3a', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>Messages</span>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: theme.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#fff', cursor: 'pointer' }}>+</div>
        </div>
        <div style={{ padding: '0 12px 12px' }}>
          <input placeholder="Search conversations..." style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#2a2a4a', color: '#fff', fontSize: '13px', outline: 'none' }} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {contacts.map(c => (
            <div key={c.id} onClick={() => setSelectedContact(c.id)} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', cursor: 'pointer',
              backgroundColor: selectedContact === c.id ? 'rgba(155,135,245,0.3)' : 'transparent',
            }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 'bold', flexShrink: 0 }}>{c.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#1a1a2e' }}>
        {/* Chat header with call buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid #333' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: sel?.color || '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>{sel?.avatar}</div>
            <span style={{ fontSize: '15px', fontWeight: '500', color: '#fff' }}>{sel?.name}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Voice call button */}
            <button onClick={() => startCall('voice')} title="Voice Call" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth={2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </button>
            {/* Video call button */}
            <button onClick={() => startCall('video')} title="Video Call" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth={2}><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
            </button>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#444', margin: '0 4px' }} />
            {/* Demo: simulate incoming - smaller, subtle */}
            <button onClick={() => simulateIncoming('voice')} title="Demo: Simulate Incoming Voice Call" style={{ background: 'none', border: '1px solid #444', borderRadius: '4px', color: '#666', fontSize: '11px', padding: '4px 6px', cursor: 'pointer' }}>📞 In</button>
            <button onClick={() => simulateIncoming('video')} title="Demo: Simulate Incoming Video Call" style={{ background: 'none', border: '1px solid #444', borderRadius: '4px', color: '#666', fontSize: '11px', padding: '4px 6px', cursor: 'pointer' }}>📹 In</button>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#444', margin: '0 4px' }} />
            {/* acquiesce button */}
            <button style={{ backgroundColor: theme.colors.primary, color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 16px', fontSize: '13px', cursor: 'pointer' }}>acquiesce</button>
          </div>
        </div>

        {/* Call overlay */}
        {webCallState.active && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
            backgroundColor: '#0a0a1a',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px',
          }}>
            {/* Video call: show remote + local video feeds */}
            {webCallState.type === 'video' && webCallState.status === 'active' && (
              <>
                {/* Remote video - full background */}
                <div style={{
                  position: 'absolute', width: '100%', height: '100%',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=800&fit=crop&crop=faces)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  filter: 'brightness(0.85)',
                }} />
                {/* Gradient overlay for controls */}
                <div style={{
                  position: 'absolute', width: '100%', height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.7) 100%)',
                }} />
                {/* Local video PIP - top right */}
                <div style={{
                  position: 'absolute', top: '20px', right: '20px', width: '180px', height: '240px',
                  borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 10,
                }}>
                  {webCallState.isCameraOn ? (
                    <div style={{
                      width: '100%', height: '100%',
                      backgroundImage: 'url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=360&h=480&fit=crop&crop=faces)',
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#2a2a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      <span style={{ fontSize: '12px', color: '#888' }}>Camera Off</span>
                    </div>
                  )}
                </div>
                {/* Remote user name overlay */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(155,135,245,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>{sel?.avatar}</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{sel?.name}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.7)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{fmt(webCallState.duration)}</p>
                  </div>
                </div>
              </>
            )}

            {/* Video call: ringing/connecting - show avatar */}
            {webCallState.type === 'video' && webCallState.status !== 'active' && (
              <>
                <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=800&fit=crop&crop=faces)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px) brightness(0.4)' }} />
                <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.3)' }}>
                    <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop&crop=faces)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  </div>
                  <h2 style={{ color: '#fff', fontSize: '22px', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{sel?.name}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: 0 }}>
                    {webCallState.status === 'connecting' ? 'Calling...' : 'Incoming video call...'}
                  </p>
                </div>
              </>
            )}

            {/* Voice call - avatar only */}
            {webCallState.type === 'voice' && (
              <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: theme.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#fff', fontWeight: 'bold' }}>{sel?.avatar}</div>
                <h2 style={{ color: '#fff', fontSize: '22px', margin: 0 }}>{sel?.name}</h2>
                <p style={{ color: '#aaa', fontSize: '14px', margin: 0 }}>
                  {webCallState.status === 'connecting' ? 'Calling...' : webCallState.status === 'ringing' ? 'Incoming voice call...' : fmt(webCallState.duration)}
                </p>
              </div>
            )}

            {/* Ringing: Accept / Decline */}
            {webCallState.status === 'ringing' && (
              <div style={{ display: 'flex', gap: '48px', zIndex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <button onClick={declineCall} style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#ff3b30', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
                  </button>
                  <span style={{ color: '#aaa', fontSize: '12px' }}>Decline</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <button onClick={acceptCall} style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#34c759', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </button>
                  <span style={{ color: '#aaa', fontSize: '12px' }}>Accept</span>
                </div>
              </div>
            )}

            {/* Active / Connecting: Controls */}
            {(webCallState.status === 'active' || webCallState.status === 'connecting') && (
              <div style={{ display: 'flex', gap: '24px', zIndex: 10, position: webCallState.type === 'video' && webCallState.status === 'active' ? 'absolute' : 'relative', bottom: webCallState.type === 'video' && webCallState.status === 'active' ? '40px' : 'auto' }}>
                <button onClick={() => setWebCallState(s => ({ ...s, isMuted: !s.isMuted }))} title={webCallState.isMuted ? 'Unmute' : 'Mute'} style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: webCallState.isMuted ? '#ff3b30' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /></svg>
                </button>
                {webCallState.type === 'video' && (
                  <button onClick={() => setWebCallState(s => ({ ...s, isCameraOn: !s.isCameraOn }))} title={webCallState.isCameraOn ? 'Camera Off' : 'Camera On'} style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: !webCallState.isCameraOn ? '#ff3b30' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                  </button>
                )}
                <button onClick={endCall} style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#ff3b30', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(255,59,48,0.4)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Messages area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {state.messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.senderId === 'me' ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
              <div style={{
                maxWidth: '60%', padding: '10px 14px', borderRadius: '12px',
                backgroundColor: msg.senderId === 'me' ? theme.colors.primary : '#2a2a4a', color: '#fff',
              }}>
                <p style={{ margin: 0, fontSize: '14px' }}>{msg.content}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                  {msg.senderId === 'me' && (
                    <span>{msg.isRead ? '✓✓' : '✓'}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #333', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>😊</button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>🖼️</button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>📎</button>
          </div>
          <input
            value={inputText} onChange={e => setInputText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Please enter a message... (Shift+Enter for new line)"
            style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#2a2a4a', color: '#fff', fontSize: '14px', outline: 'none' }}
          />
          <button onClick={sendMessage} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: theme.colors.primary, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebLiveChat;
