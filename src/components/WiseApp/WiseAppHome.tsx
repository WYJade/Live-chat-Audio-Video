import React from 'react';
import { theme } from '../../styles/theme';
import UnreadBadge from '../ChatInterface/UnreadBadge';

interface WiseAppHomeProps {
  onOpenLiveChat: () => void;
  unreadCount: number;
}

const tasks = [
  { name: 'Receive Task', detail: '9 New | 6 In Progress' },
  { name: 'Pick Task', detail: '3 New | 12 In Progress' },
  { name: 'Load Task', detail: '5 New | 10 In Progress' },
  { name: 'Put Away Task', detail: '15 New' },
  { name: 'Replenishment Task', detail: '15 In Progress' },
  { name: 'Pack Task', detail: '2 New | 13 In Progress' },
  { name: 'Put Back Task', detail: '12 New | 3 In Progress' },
  { name: 'General Task', detail: '4 New' },
];

const WiseAppHome: React.FC<WiseAppHomeProps> = ({ onOpenLiveChat, unreadCount }) => {
  return (
    <div style={{
      width: '100%', maxWidth: '480px', height: '100vh', backgroundColor: '#1a1a1a',
      display: 'flex', flexDirection: 'column', position: 'relative', margin: '0 auto',
    }}>
      {/* Status bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 16px', fontSize: '13px', color: '#fff',
      }}>
        <span>2:09</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span>●</span>
          <span>▲</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: '16px 20px 12px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', margin: 0 }}>Hello wise</h1>
        <p style={{ fontSize: '14px', color: '#999', margin: '4px 0 8px' }}>146 tasks for you today</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#999' }}>📍 Valley View</span>
          <span style={{ fontSize: '13px', color: '#999' }}>📅 April 8, 2026</span>
        </div>
      </div>

      {/* Claim Equipment */}
      <div style={{
        margin: '8px 20px', padding: '14px 16px', backgroundColor: '#2a2a2a',
        borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '15px', color: '#fff' }}>Claim Equipment</span>
        <span style={{ fontSize: '18px', color: '#999' }}>›</span>
      </div>

      {/* Pending Tasks */}
      <div style={{ padding: '16px 20px 8px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', margin: 0 }}>Pending Tasks</h2>
      </div>

      {/* Task list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
        {tasks.map((task, i) => (
          <div key={i} style={{
            padding: '16px 0', borderBottom: '1px solid #333',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <p style={{ fontSize: '16px', color: '#fff', margin: 0, fontWeight: '500' }}>{task.name}</p>
              <p style={{ fontSize: '13px', color: '#888', margin: '4px 0 0' }}>{task.detail}</p>
            </div>
            <span style={{ fontSize: '20px', color: '#666' }}>›</span>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '10px 0 20px', backgroundColor: '#1a1a1a',
        borderTop: '1px solid #333',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <div style={{ position: 'relative' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth={2}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            <span style={{ position: 'absolute', top: '-6px', right: '-12px' }}>
              <UnreadBadge count={146} size="small" />
            </span>
          </div>
          <span style={{ fontSize: '11px', color: theme.colors.primary }}>Tasks</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth={2}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span style={{ fontSize: '11px', color: '#666' }}>My Profile</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth={2}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span style={{ fontSize: '11px', color: '#666' }}>Message</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth={2}>
            <circle cx="12" cy="12" r="1" fill="#666" /><circle cx="12" cy="5" r="1" fill="#666" /><circle cx="12" cy="19" r="1" fill="#666" />
          </svg>
          <span style={{ fontSize: '11px', color: '#666' }}>More</span>
        </div>
      </div>

      {/* Floating LiveChat button */}
      <div
        onClick={onOpenLiveChat}
        style={{
          position: 'absolute', bottom: '90px', right: '20px',
          width: '56px', height: '56px', borderRadius: '50%',
          backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)', cursor: 'pointer',
          border: '2px solid #e0e0e0', zIndex: 100,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth={2}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        {unreadCount > 0 && (
          <span style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
            <UnreadBadge count={unreadCount} size="small" />
          </span>
        )}
      </div>
    </div>
  );
};

export default WiseAppHome;
