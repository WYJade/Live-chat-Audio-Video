import React from 'react';

interface UnreadBadgeProps {
  count: number;
  size?: 'small' | 'normal';
}

const UnreadBadge: React.FC<UnreadBadgeProps> = ({ count, size = 'normal' }) => {
  if (count <= 0) return null;

  const isSmall = size === 'small';
  const displayText = count >= 99 ? '99+' : count.toString();

  return (
    <span style={{
      backgroundColor: '#ff3b30',
      color: '#fff',
      borderRadius: '12px',
      padding: isSmall ? '1px 5px' : '2px 7px',
      fontSize: isSmall ? '10px' : '12px',
      fontWeight: '600',
      minWidth: isSmall ? '16px' : '20px',
      height: isSmall ? '16px' : '20px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 1,
    }}>
      {displayText}
    </span>
  );
};

export default UnreadBadge;
