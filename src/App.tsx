import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import ChatInterface from './components/ChatInterface/ChatInterface';
import CompanySelector from './components/CompanySelector/CompanySelector';
import WiseAppHome from './components/WiseApp/WiseAppHome';
import ChatListPage from './components/ChatList/ChatListPage';
import WebLiveChat from './components/WebLiveChat/WebLiveChat';
import LockScreenPush from './components/PushNotification/LockScreenPush';
import { Company } from './types/models';

type AppScreen = 'wiseHome' | 'companySelect' | 'companySwitch' | 'chatList' | 'chat' | 'web' | 'lockScreen';

const AppContent: React.FC = () => {
  const { state, dispatch, setShowWelcome } = useAppContext();
  const [screen, setScreen] = React.useState<AppScreen>('wiseHome');

  const handleOpenLiveChat = () => {
    if (!state.selectedCompany) {
      if (state.companies.length === 1) {
        dispatch({ type: 'SELECT_COMPANY', payload: state.companies[0] });
        setScreen('chatList');
      } else {
        setScreen('companySelect');
      }
    } else {
      setScreen('chatList');
    }
  };

  const handleSelectCompany = (company: Company) => {
    dispatch({ type: 'SELECT_COMPANY', payload: company });
    setShowWelcome(false);
    setScreen('chatList');
  };

  const handleSelectContact = () => {
    setShowWelcome(false);
    setScreen('chat');
  };

  switch (screen) {
    case 'wiseHome':
      return (
        <>
          <WiseAppHome onOpenLiveChat={handleOpenLiveChat} unreadCount={state.totalUnreadCount} />
          <div style={{ position: 'fixed', top: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 9999 }}>
            <div onClick={() => setScreen('lockScreen')} style={{
              padding: '8px 16px', backgroundColor: 'rgba(255,59,48,0.9)', color: '#fff', borderRadius: '20px',
              fontSize: '13px', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              🔔 Push Demo
            </div>
            <div onClick={() => setScreen('web')} style={{
              padding: '8px 16px', backgroundColor: 'rgba(155,135,245,0.9)', color: '#fff', borderRadius: '20px',
              fontSize: '13px', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              🖥️ Web View
            </div>
          </div>
        </>
      );
    case 'companySelect':
      return <CompanySelector companies={state.companies} currentCompanyId={null} onSelect={handleSelectCompany} isInitial={true} />;
    case 'companySwitch':
      return <CompanySelector companies={state.companies} currentCompanyId={state.selectedCompany?.id || null} onSelect={handleSelectCompany} isInitial={false} onBack={() => setScreen('chatList')} />;
    case 'chatList':
      return (
        <>
          <ChatListPage contacts={state.contacts} onSelectContact={handleSelectContact} onBack={() => setScreen('wiseHome')} />
          <div onClick={() => setScreen('web')} style={{
            position: 'fixed', top: '16px', right: '16px', padding: '8px 16px',
            backgroundColor: 'rgba(155,135,245,0.9)', color: '#fff', borderRadius: '20px',
            fontSize: '13px', cursor: 'pointer', zIndex: 9999, boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            🖥️ Web View
          </div>
        </>
      );
    case 'chat':
      return (
        <>
          <ChatInterface onSwitchCompany={() => setScreen('companySwitch')} onBackToApp={() => setScreen('chatList')} />
          <div onClick={() => setScreen('web')} style={{
            position: 'fixed', top: '16px', right: '16px', padding: '8px 16px',
            backgroundColor: 'rgba(155,135,245,0.9)', color: '#fff', borderRadius: '20px',
            fontSize: '13px', cursor: 'pointer', zIndex: 9999, boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            🖥️ Web View
          </div>
        </>
      );
    case 'web':
      return <WebLiveChat onSwitchToApp={() => setScreen('wiseHome')} />;
    case 'lockScreen':
      return <LockScreenPush onDismiss={() => setScreen('wiseHome')} />;
    default:
      return null;
  }
};

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
