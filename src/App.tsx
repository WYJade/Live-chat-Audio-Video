import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import ChatInterface from './components/ChatInterface/ChatInterface';
import CompanySelector from './components/CompanySelector/CompanySelector';
import WiseAppHome from './components/WiseApp/WiseAppHome';
import ChatListPage from './components/ChatList/ChatListPage';
import { Company } from './types/models';

type AppScreen = 'wiseHome' | 'companySelect' | 'companySwitch' | 'chatList' | 'chat';

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

  const handleSelectContact = (_contactId: string) => {
    setShowWelcome(false);
    setScreen('chat');
  };

  switch (screen) {
    case 'wiseHome':
      return <WiseAppHome onOpenLiveChat={handleOpenLiveChat} unreadCount={state.totalUnreadCount} />;

    case 'companySelect':
      return <CompanySelector companies={state.companies} currentCompanyId={null} onSelect={handleSelectCompany} isInitial={true} />;

    case 'companySwitch':
      return <CompanySelector companies={state.companies} currentCompanyId={state.selectedCompany?.id || null} onSelect={handleSelectCompany} isInitial={false} onBack={() => setScreen('chatList')} />;

    case 'chatList':
      return <ChatListPage contacts={state.contacts} onSelectContact={handleSelectContact} onBack={() => setScreen('wiseHome')} />;

    case 'chat':
      return <ChatInterface onSwitchCompany={() => setScreen('companySwitch')} onBackToApp={() => setScreen('chatList')} />;

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
