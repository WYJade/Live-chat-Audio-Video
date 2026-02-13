export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isEdited: boolean;
  canReEdit: boolean;
}

export interface CallState {
  status: 'idle' | 'connecting' | 'active' | 'ended';
  type: 'voice' | 'video' | null;
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
    ['idle', 'connecting', 'active', 'ended'].includes(state.status) &&
    (state.type === null || ['voice', 'video'].includes(state.type)) &&
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
    (state.previousScreen === null || ['chat', 'voiceCall', 'videoCall'].includes(state.previousScreen)) &&
    typeof state.chatScrollPosition === 'number'
  );
};
