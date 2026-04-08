import React from 'react';
import { Company } from '../../types/models';
import { theme } from '../../styles/theme';

interface CompanySelectorProps {
  companies: Company[];
  currentCompanyId: string | null;
  onSelect: (company: Company) => void;
  isInitial: boolean; // true = first time entry, false = switching from settings
  onBack?: () => void;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  companies,
  currentCompanyId,
  onSelect,
  isInitial,
  onBack,
}) => {
  return (
    <div style={{
      width: '100%', maxWidth: '480px', height: '100vh', backgroundColor: theme.colors.background,
      display: 'flex', flexDirection: 'column', margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        padding: theme.spacing.md, backgroundColor: theme.colors.surface,
        display: 'flex', alignItems: 'center', gap: theme.spacing.md,
        borderBottom: `1px solid ${theme.colors.surfaceElevated}`,
      }}>
        {!isInitial && onBack && (
          <button onClick={onBack} style={{
            background: 'none', border: 'none', color: theme.colors.textPrimary,
            fontSize: '24px', cursor: 'pointer', padding: theme.spacing.sm,
          }}>←</button>
        )}
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: theme.colors.textPrimary, margin: 0, flex: 1, textAlign: isInitial ? 'center' : 'left' }}>
          {isInitial ? 'Select Company' : 'Switch Company'}
        </h3>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: theme.spacing.lg }}>
        {isInitial && (
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '20px',
              backgroundColor: theme.colors.primary, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '36px', margin: '0 auto 16px',
            }}>💬</div>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: theme.colors.textPrimary, marginBottom: '8px' }}>
              Welcome to Live Chat
            </h2>
            <p style={{ fontSize: '14px', color: theme.colors.textSecondary, lineHeight: '1.5' }}>
              Please select your company to continue
            </p>
          </div>
        )}

        {!isInitial && (
          <p style={{ fontSize: '14px', color: theme.colors.textSecondary, marginBottom: theme.spacing.lg, lineHeight: '1.5' }}>
            Switching company will refresh all chat data. Select the company you want to use:
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {companies.map((company) => {
            const isSelected = company.id === currentCompanyId;
            return (
              <div
                key={company.id}
                onClick={() => onSelect(company)}
                style={{
                  display: 'flex', alignItems: 'center', gap: theme.spacing.md,
                  padding: '16px', borderRadius: theme.borderRadius.md,
                  backgroundColor: isSelected ? 'rgba(155, 135, 245, 0.15)' : theme.colors.surfaceElevated,
                  border: isSelected ? `2px solid ${theme.colors.primary}` : '2px solid transparent',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  backgroundColor: isSelected ? theme.colors.primary : '#444',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: 'bold', color: '#fff', flexShrink: 0,
                }}>
                  {company.logo}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '500', color: theme.colors.textPrimary, margin: 0 }}>
                    {company.name}
                  </h4>
                  <p style={{ fontSize: '13px', color: theme.colors.textSecondary, margin: '2px 0 0' }}>
                    {company.code}
                  </p>
                </div>
                {isSelected && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth={3}>
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanySelector;
