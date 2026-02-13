import { describe, it, expect } from 'vitest';
import { validateMessage, validateCallState, validateUIState, Message, CallState, UIState } from './models';

describe('Data Model Validation', () => {
  describe('validateMessage', () => {
    it('should validate a correct message', () => {
      const message: Message = {
        id: '1',
        senderId: 'user1',
        senderName: 'John Doe',
        content: 'Hello',
        timestamp: new Date(),
        isEdited: false,
        canReEdit: true,
      };
      expect(validateMessage(message)).toBe(true);
    });

    it('should reject message with missing fields', () => {
      const invalidMessage = {
        id: '1',
        senderId: 'user1',
      };
      expect(validateMessage(invalidMessage)).toBe(false);
    });

    it('should reject message with invalid boolean fields', () => {
      const invalidMessage = {
        id: '1',
        senderId: 'user1',
        senderName: 'John',
        content: 'Hi',
        timestamp: new Date(),
        isEdited: 'false',
        canReEdit: true,
      };
      expect(validateMessage(invalidMessage as any)).toBe(false);
    });
  });

  describe('validateCallState', () => {
    it('should validate a correct call state', () => {
      const callState: CallState = {
        status: 'active',
        type: 'voice',
        contactName: 'Jane',
        startTime: new Date(),
        duration: 120,
        isMuted: false,
        isSpeakerOn: true,
        isCameraOn: false,
      };
      expect(validateCallState(callState)).toBe(true);
    });

    it('should validate idle call state with null type', () => {
      const callState: CallState = {
        status: 'idle',
        type: null,
        contactName: '',
        startTime: null,
        duration: 0,
        isMuted: false,
        isSpeakerOn: false,
        isCameraOn: false,
      };
      expect(validateCallState(callState)).toBe(true);
    });

    it('should reject invalid status', () => {
      const invalidState = {
        status: 'invalid',
        type: 'voice',
        contactName: 'Jane',
        startTime: new Date(),
        duration: 0,
        isMuted: false,
        isSpeakerOn: false,
        isCameraOn: false,
      };
      expect(validateCallState(invalidState as any)).toBe(false);
    });
  });

  describe('validateUIState', () => {
    it('should validate a correct UI state', () => {
      const uiState: UIState = {
        activeScreen: 'chat',
        isActionMenuOpen: false,
        previousScreen: null,
        chatScrollPosition: 0,
      };
      expect(validateUIState(uiState)).toBe(true);
    });

    it('should validate UI state with previous screen', () => {
      const uiState: UIState = {
        activeScreen: 'voiceCall',
        isActionMenuOpen: false,
        previousScreen: 'chat',
        chatScrollPosition: 150,
      };
      expect(validateUIState(uiState)).toBe(true);
    });

    it('should reject invalid active screen', () => {
      const invalidState = {
        activeScreen: 'invalid',
        isActionMenuOpen: false,
        previousScreen: null,
        chatScrollPosition: 0,
      };
      expect(validateUIState(invalidState as any)).toBe(false);
    });
  });
});
