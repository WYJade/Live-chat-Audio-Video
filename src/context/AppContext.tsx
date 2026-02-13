import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Message, CallState, UIState } from '../types/models';

interface AppState {
  messages: Message[];
  callState: CallState;
  uiState: UIState;
}

type AppAction =
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; content: string } }
  | { type: 'SET_CALL_STATE'; payload: Partial<CallState> }
  | { type: 'SET_UI_STATE'; payload: Partial<UIState> }
  | { type: 'TOGGLE_ACTION_MENU' }
  | { type: 'NAVIGATE_TO_SCREEN'; payload: 'chat' | 'voiceCall' | 'videoCall' }
  | { type: 'END_CALL' }
  | { type: 'SAVE_SCROLL_POSITION'; payload: number };

const initialState: AppState = {
  messages: [
    {
      id: '1',
      senderId: 'other',
      senderName: 'Alexander Nicholas Williams1111',
      content: 'Hi, Mengtian😊',
      timestamp: new Date('2024-01-30T02:34:00'),
      isEdited: false,
      canReEdit: false,
    },
    {
      id: '2',
      senderId: 'other',
      senderName: 'Alexander Nicholas Williams1111',
      content: 'You have withdrawn the message',
      timestamp: new Date('2024-01-30T02:35:00'),
      isEdited: false,
      canReEdit: true,
    },
    {
      id: '3',
      senderId: 'other',
      senderName: 'Alexander Nicholas Williams1111',
      content: 'You have withdrawn the message',
      timestamp: new Date('2024-01-30T02:36:00'),
      isEdited: false,
      canReEdit: true,
    },
  ],
  callState: {
    status: 'idle',
    type: null,
    contactName: 'Alexander Nicholas Williams1111',
    startTime: null,
    duration: 0,
    isMuted: false,
    isSpeakerOn: false,
    isCameraOn: true,
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
    case 'END_CALL':
      return {
        ...state,
        callState: {
          ...state.callState,
          status: 'ended',
          type: null,
          startTime: null,
          duration: 0,
        },
        uiState: {
          ...state.uiState,
          activeScreen: 'chat',
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
} | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
