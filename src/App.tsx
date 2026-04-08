import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import ChatInterface from './components/ChatInterface/ChatInterface';
import CompanySelector from './components/CompanySelector/CompanySelector';
import WiseAppHome from './components/WiseApp/WiseAppHome';
import { Company } from './types/models';

type AppScreen = 'wiseHome' | 'companySelect' | 'companySwitch' | 'chat';

const AppContent: React.FC = () => {
  const { state, dispatch, setShowWelcome } = useAppContext();
  const [screen, setScreen] = React.useState<AppScreen>('wiseHome');

  const handleOpenLiveChat = () => {
    // If no company selected and multiple companies, show selector
    if (!state.selectedCompany) {
      if (state.companies.length === 1) {
        dispatch({ type: 'SELECT_COMPANY', payload: state.companies[0] });
        setScreen('chat');
      } else {
        setScreen('companySelect');
      }
    } else {
      setScreen('chat');
    }
  };

  const handleSelectCompany = (company: Company) => {
    dispatch({ type: 'SELECT_COMPANY', payload: company });
    setShowWelcome(false);
    setScreen('chat');
  };

  const handleSwitchCompany = () => {
    setScreen('companySwitch');
  };

  const handleBackToChat = () => {
    setScreen('chat');
  };

  const handleBackToWiseHome = () => {
    setScreen('wiseHome');
  };

  switch (screen) {
    case 'wiseHome':
      return (
        <WiseAppHome
          onOpenLiveChat={handleOpenLiveChat}
          unreadCount={state.totalUnreadCount}
        />
      );

    case 'companySelect':
      return (
        <CompanySelector
          companies={state.companies}
          currentCompanyId={null}
          onSelect={handleSelectCompany}
          isInitial={true}
        />
      );

    case 'companySwitch':
      return (
        <CompanySelector
          companies={state.companies}
          currentCompanyId={state.selectedCompany?.id || null}
          onSelect={handleSelectCompany}
          isInitial={false}
          onBack={handleBackToChat}
        />
      );

    case 'chat':
      return (
        <ChatInterface
          onSwitchCompany={handleSwitchCompany}
          onBackToApp={handleBackToWiseHome}
        />
      );

    default:
      return null;
  }
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
