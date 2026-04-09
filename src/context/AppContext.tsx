import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Message, CallState, UIState, ChatContact, PushNotification, Company } from '../types/models';

interface AppState {
  messages: Message[];
  callState: CallState;
  uiState: UIState;
  contacts: ChatContact[];
  pushNotifications: PushNotification[];
  totalUnreadCount: number;
  companies: Company[];
  selectedCompany: Company | null;
}

type AppAction =
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; content: string } }
  | { type: 'MARK_MESSAGES_READ' }
  | { type: 'ADD_PUSH_NOTIFICATION'; payload: PushNotification }
  | { type: 'DISMISS_PUSH_NOTIFICATION'; payload: string }
  | { type: 'SET_CALL_STATE'; payload: Partial<CallState> }
  | { type: 'SET_UI_STATE'; payload: Partial<UIState> }
  | { type: 'TOGGLE_ACTION_MENU' }
  | { type: 'NAVIGATE_TO_SCREEN'; payload: 'chat' | 'voiceCall' | 'videoCall' }
  | { type: 'INITIATE_CALL'; payload: { callType: 'voice' | 'video' } }
  | { type: 'RECEIVE_CALL'; payload: { callType: 'voice' | 'video'; callerName: string } }
  | { type: 'ACCEPT_CALL' }
  | { type: 'DECLINE_CALL' }
  | { type: 'END_CALL' }
  | { type: 'SELECT_COMPANY'; payload: Company }
  | { type: 'SAVE_SCROLL_POSITION'; payload: number };

const initialState: AppState = {
  messages: [
    {
      id: '1',
      senderId: 'other',
      senderName: 'Alexander Nicholas Williams1111',
      content: 'Hello! How are you doing?',
      timestamp: new Date('2024-01-30T09:15:00'),
      isEdited: false,
      canReEdit: false,
      isRead: true,
      readAt: new Date('2024-01-30T09:15:05'),
      messageType: 'text',
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'Me',
      content: "I'm doing great, thanks for asking!",
      timestamp: new Date('2024-01-30T09:16:00'),
      isEdited: false,
      canReEdit: false,
      isRead: true,
      readAt: new Date('2024-01-30T09:16:05'),
      messageType: 'text',
    },
  ],
  contacts: [
    { id: 'c1', name: 'YongQiang', avatar: 'Y', isOnline: true, lastMessage: 'You are welcome', lastMessageTime: new Date('2024-01-30T02:30:00'), unreadCount: 0 },
    { id: 'c2', name: 'Alexander Nicholas Williams...', avatar: 'A', isOnline: false, lastMessage: 'You have withdrawn the message', lastMessageTime: new Date('2024-01-30T02:51:00'), unreadCount: 3 },
    { id: 'c3', name: 'Tianhao Cui', avatar: 'T', isOnline: true, lastMessage: 'hi', lastMessageTime: new Date('2024-01-30T02:39:00'), unreadCount: 0 },
  ],
  pushNotifications: [],
  totalUnreadCount: 2,
  companies: [
    { id: 'unis', name: 'UNIS', code: 'UNIS-001', logo: 'U', unreadCount: 4 },
    { id: 'bns', name: 'BNS Logistics', code: 'BNS-002', logo: 'B', unreadCount: 12 },
    { id: 'alpha', name: 'Alpha Transport', code: 'ALP-003', logo: 'A', unreadCount: 0 },
  ],
  selectedCompany: null,
  callState: {
    status: 'idle',
    type: null,
    contactName: 'James Mitchell',
    startTime: null,
    duration: 0,
    isMuted: false,
    isSpeakerOn: false,
    isCameraOn: true,
    role: null,
  },
  uiState: {
    activeScreen: 'chat',
    isActionMenuOpen: false,
    previousScreen: null,
    chatScrollPosition: 0,
  },
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id
            ? { ...msg, content: action.payload.content, isEdited: true }
            : msg
        ),
      };
    case 'MARK_MESSAGES_READ':
      return {
        ...state,
        messages: state.messages.map((msg) =>
          !msg.isRead && msg.senderId !== 'me'
            ? { ...msg, isRead: true, readAt: new Date() }
            : msg
        ),
        totalUnreadCount: 0,
        contacts: state.contacts.map((c) =>
          c.id === 'c1' ? { ...c, unreadCount: 0 } : c
        ),
      };
    case 'ADD_PUSH_NOTIFICATION':
      return {
        ...state,
        pushNotifications: [action.payload, ...state.pushNotifications].slice(0, 3),
      };
    case 'DISMISS_PUSH_NOTIFICATION':
      return {
        ...state,
        pushNotifications: state.pushNotifications.filter((n) => n.id !== action.payload),
      };
    case 'SET_CALL_STATE':
      return { ...state, callState: { ...state.callState, ...action.payload } };
    case 'SET_UI_STATE':
      return { ...state, uiState: { ...state.uiState, ...action.payload } };
    case 'TOGGLE_ACTION_MENU':
      return {
        ...state,
        uiState: { ...state.uiState, isActionMenuOpen: !state.uiState.isActionMenuOpen },
      };
    case 'NAVIGATE_TO_SCREEN':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          previousScreen: state.uiState.activeScreen,
          activeScreen: action.payload,
          isActionMenuOpen: false,
        },
      };
    case 'INITIATE_CALL':
      return {
        ...state,
        callState: {
          ...state.callState,
          status: 'connecting',
          type: action.payload.callType,
          role: 'caller',
          startTime: null,
          duration: 0,
          isMuted: false,
          isSpeakerOn: false,
          isCameraOn: action.payload.callType === 'video',
        },
        uiState: {
          ...state.uiState,
          previousScreen: state.uiState.activeScreen,
          activeScreen: action.payload.callType === 'voice' ? 'voiceCall' : 'videoCall',
          isActionMenuOpen: false,
        },
      };
    case 'RECEIVE_CALL':
      return {
        ...state,
        callState: {
          ...state.callState,
          status: 'ringing',
          type: action.payload.callType,
          role: 'receiver',
          contactName: action.payload.callerName,
          startTime: null,
          duration: 0,
          isMuted: false,
          isSpeakerOn: false,
          isCameraOn: action.payload.callType === 'video',
        },
        uiState: {
          ...state.uiState,
          previousScreen: state.uiState.activeScreen,
          activeScreen: action.payload.callType === 'voice' ? 'voiceCall' : 'videoCall',
          isActionMenuOpen: false,
        },
      };
    case 'ACCEPT_CALL':
      return {
        ...state,
        callState: {
          ...state.callState,
          status: 'active',
          startTime: new Date(),
        },
      };
    case 'DECLINE_CALL':
      return {
        ...state,
        callState: {
          ...state.callState,
          status: 'declined',
          type: null,
          role: null,
          startTime: null,
          duration: 0,
        },
        uiState: {
          ...state.uiState,
          activeScreen: 'chat',
          previousScreen: null,
        },
      };
    case 'END_CALL':
      return {
        ...state,
        callState: {
          ...state.callState,
          status: 'ended',
          type: null,
          role: null,
          startTime: null,
          duration: 0,
        },
        uiState: {
          ...state.uiState,
          activeScreen: 'chat',
          previousScreen: null,
        },
      };
    case 'SELECT_COMPANY':
      return {
        ...state,
        selectedCompany: action.payload,
        // Reset chat data when switching company
        messages: [
          {
            id: '1',
            senderId: 'other',
            senderName: 'James Mitchell',
            content: `Hi, welcome to ${action.payload.name}. How can I help you today?`,
            timestamp: new Date(),
            isEdited: false,
            canReEdit: false,
            isRead: false,
            readAt: null,
            messageType: 'text' as const,
          },
        ],
        totalUnreadCount: 1,
        contacts: [
          { id: 'c1', name: 'James Mitchell', avatar: 'J', isOnline: true, lastMessage: `Welcome to ${action.payload.name}...`, lastMessageTime: new Date(), unreadCount: 1 },
          { id: 'c2', name: 'Alexander Nicholas Williams...', avatar: 'A', isOnline: false, lastMessage: 'You have withdrawn the message', lastMessageTime: new Date('2024-01-30T02:51:00'), unreadCount: 3 },
          { id: 'c3', name: 'Tianhao Cui', avatar: 'T', isOnline: true, lastMessage: 'hi', lastMessageTime: new Date('2024-01-30T02:39:00'), unreadCount: 0 },
        ],
        pushNotifications: [],
        callState: {
          ...state.callState,
          status: 'idle' as const,
          type: null,
          role: null,
          startTime: null,
          duration: 0,
        },
        uiState: {
          ...state.uiState,
          activeScreen: 'chat' as const,
          isActionMenuOpen: false,
          previousScreen: null,
        },
      };
    case 'SAVE_SCROLL_POSITION':
      return {
        ...state,
        uiState: { ...state.uiState, chatScrollPosition: action.payload },
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  showWelcome: boolean;
  setShowWelcome: (show: boolean) => void;
} | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [showWelcome, setShowWelcome] = React.useState(false);

  return (
    <AppContext.Provider value={{ state, dispatch, showWelcome, setShowWelcome }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
