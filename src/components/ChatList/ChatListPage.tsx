import React from 'react';
import { theme } from '../../styles/theme';
import { ChatContact } from '../../types/models';
import UnreadBadge from '../ChatInterface/UnreadBadge';

interface ChatListPageProps {
  contacts: ChatContact[];
  onSelectContact: (contactId: string) => void;
  onBack: () => void;
}

const ChatListPage: React.FC<ChatListPageProps> = ({ contacts, onSelectContact }) => {
  return (
    <div style={{
      width: '100%', maxWidth: '480px', height: '100vh', backgroundColor: '#121212',
      display: 'flex', flexDirection: 'column', margin: '0 auto',
    }}>
      {/* Status bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 16px', fontSize: '13px', color: '#fff',
      }}>
        <span>16:40</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '12px' }}>
          <span>📶</span><span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div style={{
        padding: '8px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', margin: 0 }}>Chats</h1>
        {/* Headphone icon - orange circle */}
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ff8c00',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}>
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        </div>
      </div>

      {/* Search bar */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: '#2a2a2a', borderRadius: '8px', padding: '10px 14px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span style={{ fontSize: '14px', color: '#888' }}>Search chats, contacts...</span>
          <div style={{ marginLeft: 'auto' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}>
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contact list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {contacts.map((contact, index) => {
          const isFirst = index === 0;
          return (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 20px', cursor: 'pointer',
                backgroundColor: isFirst ? 'rgba(70, 130, 240, 0.6)' : 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {/* Avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  backgroundColor: contact.id === 'c1' ? '#666' : contact.id === 'c2' ? '#888' : '#9b87f5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', color: '#fff',
                }}>
                  {contact.id === 'c1' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth={2}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  ) : contact.id === 'c2' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth={2}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  ) : (
                    <span style={{ fontWeight: 'bold' }}>{contact.avatar}</span>
                  )}
                </div>
                {contact.isOnline && (
                  <div style={{
                    position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px',
                    borderRadius: '50%', backgroundColor: '#34c759', border: '2px solid #121212',
                  }} />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{contact.name}</span>
                  {!isFirst && (
                    <span style={{ fontSize: '12px', color: '#888', flexShrink: 0 }}>
                      {contact.lastMessageTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3px' }}>
                  <span style={{
                    fontSize: '13px', color: isFirst ? 'rgba(255,255,255,0.8)' : '#888',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                  }}>{contact.lastMessage}</span>
                  {contact.unreadCount > 0 && (
                    <span style={{ marginLeft: '8px' }}><UnreadBadge count={contact.unreadCount} size="small" /></span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation - Chats & Walkie-Talkie */}
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '12px 0 24px', backgroundColor: '#121212', borderTop: '1px solid #333',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth={2}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span style={{ fontSize: '11px', color: theme.colors.primary, fontWeight: '500' }}>Chats</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth={2}>
            <path d="M12 2C6.48 2 2 6 2 11c0 2.8 1.4 5.3 3.5 7L4 22l4.5-2.5C9.6 19.8 10.8 20 12 20c5.52 0 10-4 10-9s-4.48-9-10-9z" />
            <circle cx="8" cy="11" r="1" fill="#666" /><circle cx="12" cy="11" r="1" fill="#666" /><circle cx="16" cy="11" r="1" fill="#666" />
          </svg>
          <span style={{ fontSize: '11px', color: '#666' }}>Walkie-Talkie</span>
        </div>
      </div>
    </div>
  );
};

export default ChatListPage;
