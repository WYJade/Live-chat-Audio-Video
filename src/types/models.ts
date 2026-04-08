export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isEdited: boolean;
  canReEdit: boolean;
  isRead: boolean;
  readAt: Date | null;
  messageType: 'text' | 'voice' | 'image' | 'file' | 'system';
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface PushNotification {
  id: string;
  appIcon: string;
  chatName: string;
  lastMessage: string;
  timestamp: Date;
}

export interface CallState {
  status: 'idle' | 'connecting' | 'ringing' | 'active' | 'ended' | 'declined';
  type: 'voice' | 'video' | null;
  role: 'caller' | 'receiver' | null;
  contactName: string;
  startTime: Date | null;
  duration: number;
  isMuted: boolean;
  isSpeakerOn: boolean;
  isCameraOn: boolean;
}

export interface UIState {
  activeScreen: 'chat' | 'voiceCall' | 'videoCall';
  isActionMenuOpen: boolean;
  previousScreen: 'chat' | 'voiceCall' | 'videoCall' | null;
  chatScrollPosition: number;
}

export const validateMessage = (message: Partial<Message>): message is Message => {
  return !!(
    message.id &&
    message.senderId &&
    message.senderName &&
    message.content &&
    message.timestamp &&
    typeof message.isEdited === 'boolean' &&
    typeof message.canReEdit === 'boolean'
  );
};

export const validateCallState = (state: Partial<CallState>): state is CallState => {
  return !!(
    state.status &&
    ['idle', 'connecting', 'ringing', 'active', 'ended', 'declined'].includes(state.status) &&
    (state.type === null || (typeof state.type === 'string' && ['voice', 'video'].includes(state.type))) &&
    (state.role === null || (typeof state.role === 'string' && ['caller', 'receiver'].includes(state.role))) &&
    typeof state.contactName === 'string' &&
    typeof state.duration === 'number' &&
    typeof state.isMuted === 'boolean' &&
    typeof state.isSpeakerOn === 'boolean' &&
    typeof state.isCameraOn === 'boolean'
  );
};

export const validateUIState = (state: Partial<UIState>): state is UIState => {
  return !!(
    state.activeScreen &&
    ['chat', 'voiceCall', 'videoCall'].includes(state.activeScreen) &&
    typeof state.isActionMenuOpen === 'boolean' &&
    (state.previousScreen === null || (typeof state.previousScreen === 'string' && ['chat', 'voiceCall', 'videoCall'].includes(state.previousScreen))) &&
    typeof state.chatScrollPosition === 'number'
  );
};
