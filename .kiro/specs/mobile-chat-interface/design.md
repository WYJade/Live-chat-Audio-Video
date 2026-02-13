# Design Document: Mobile Chat Interface

## Overview

This design specifies a mobile chat interface application built as an HTML5 page with a 9:16 aspect ratio. The application enhances an existing chat interface by repositioning input controls, adding an expanded action menu with voice and video call options, and implementing dedicated call interaction pages. The design maintains a dark theme with purple/lavender accents and ensures smooth, responsive interactions suitable for mobile devices.

The application consists of three main screens:
1. **Chat Interface** - The primary messaging view with redesigned input controls
2. **Voice Call Page** - A dedicated interface for voice call interactions
3. **Video Call Page** - A dedicated interface for video call interactions

## Architecture

### Technology Stack

- **Frontend Framework**: HTML5, CSS3, JavaScript (ES6+)
- **Recommended Framework**: React or Vue.js for component-based architecture and state management
- **Styling**: CSS-in-JS or CSS Modules for scoped styling
- **Touch Interactions**: Native touch events or a lightweight gesture library
- **Responsive Design**: CSS viewport units and media queries for 9:16 aspect ratio

### Application Structure

```
mobile-chat-interface/
├── src/
│   ├── components/
│   │   ├── ChatInterface/
│   │   │   ├── ChatHeader.js
│   │   │   ├── MessageList.js
│   │   │   ├── MessageBubble.js
│   │   │   ├── InputBar.js
│   │   │   └── ActionMenu.js
│   │   ├── VoiceCallPage/
│   │   │   ├── VoiceCallControls.js
│   │   │   └── VoiceCallStatus.js
│   │   ├── VideoCallPage/
│   │   │   ├── VideoCallControls.js
│   │   │   ├── VideoCallStatus.js
│   │   │   └── VideoDisplay.js
│   │   └── NavigationBar/
│   │       └── NavigationBar.js
│   ├── styles/
│   │   ├── theme.js (colors, spacing, typography)
│   │   └── animations.js
│   ├── utils/
│   │   ├── touchHandler.js
│   │   └── stateManager.js
│   └── App.js
└── public/
    └── assets/
        └── icons/
```

### State Management

The application maintains the following state:

- **Chat State**: Current messages, scroll position, input text
- **UI State**: Active screen (chat/voice call/video call), action menu open/closed
- **Call State**: Call status (idle/connecting/active/ended), call duration, control states (muted/speaker on/camera on)
- **Navigation State**: Previous screen for back navigation

## Components and Interfaces

### 1. InputBar Component

**Purpose**: Provides text input and quick access to voice, emoji, and action menu.

**Props**:
- `onVoiceClick: () => void` - Handler for voice icon click
- `onEmojiClick: () => void` - Handler for emoji icon click
- `onPlusClick: () => void` - Handler for + icon click
- `onTextChange: (text: string) => void` - Handler for text input changes
- `onSend: (text: string) => void` - Handler for sending messages

**Layout**:
```
[Voice Icon] [Text Input: "Type a message"] [Emoji Icon] [+ Icon]
```

**Styling**:
- Dark background (#1a1a1a or similar)
- Icons: 24x24px with 44x44px touch targets
- Text input: Full-width with padding for icons
- Border radius: 24px for rounded appearance
- Icon colors: Light gray (#b0b0b0) with hover/active states

### 2. ActionMenu Component

**Purpose**: Displays expandable menu with communication options.

**Props**:
- `isOpen: boolean` - Controls menu visibility
- `onClose: () => void` - Handler for closing menu
- `onCameraClick: () => void` - Handler for camera option
- `onPhotosClick: () => void` - Handler for photos option
- `onFilesClick: () => void` - Handler for files option
- `onVoiceCallClick: () => void` - Handler for voice call option
- `onVideoCallClick: () => void` - Handler for video call option

**Layout**:
```
[Camera] [Photos] [Files] [Voice Call] [Video Call]
  📷      🖼️       📁        📞           📹
```

**Behavior**:
- Slides up from bottom with animation (300ms ease-out)
- Semi-transparent dark overlay behind menu
- Each option: Icon (32x32px) above label text
- Grid layout: 5 columns, equal spacing
- Clicking outside menu closes it

**Styling**:
- Background: Dark panel (#2a2a2a)
- Border radius: 16px top corners
- Padding: 24px
- Icon colors: White (#ffffff)
- Label text: Light gray (#b0b0b0), 12px

### 3. VoiceCallPage Component

**Purpose**: Provides interface for voice call interactions.

**Props**:
- `contactName: string` - Name of the person being called
- `callDuration: number` - Duration of call in seconds
- `isMuted: boolean` - Microphone mute state
- `isSpeakerOn: boolean` - Speaker state
- `onMuteToggle: () => void` - Handler for mute button
- `onSpeakerToggle: () => void` - Handler for speaker button
- `onEndCall: () => void` - Handler for end call button

**Layout**:
```
        [Contact Name]
        [Call Duration]
        [Avatar/Icon]
        
        [Mute]  [Speaker]
        
        [End Call Button]
```

**Controls**:
- **Mute Button**: Microphone icon, toggles red when muted
- **Speaker Button**: Speaker icon, toggles blue when active
- **End Call Button**: Red circular button with phone icon

**Styling**:
- Full-screen dark background (#0a0a0a)
- Contact name: 24px, white, centered
- Call duration: 16px, gray, centered
- Avatar: 120x120px circular placeholder
- Control buttons: 64x64px circular, dark gray background
- End call button: 72x72px circular, red (#ff3b30)

### 4. VideoCallPage Component

**Purpose**: Provides interface for video call interactions.

**Props**:
- `contactName: string` - Name of the person being called
- `callDuration: number` - Duration of call in seconds
- `isMuted: boolean` - Microphone mute state
- `isSpeakerOn: boolean` - Speaker state
- `isCameraOn: boolean` - Camera state
- `onMuteToggle: () => void` - Handler for mute button
- `onSpeakerToggle: () => void` - Handler for speaker button
- `onCameraToggle: () => void` - Handler for camera button
- `onEndCall: () => void` - Handler for end call button

**Layout**:
```
[Remote Video Feed - Full Screen]

[Local Video - Picture-in-Picture]

[Contact Name] [Call Duration]

[Mute] [Camera] [Speaker]

[End Call Button]
```

**Controls**:
- **Mute Button**: Microphone icon, toggles red when muted
- **Camera Button**: Camera icon, toggles red when off
- **Speaker Button**: Speaker icon, toggles blue when active
- **End Call Button**: Red circular button with phone icon

**Styling**:
- Remote video: Full-screen background
- Local video: 120x180px, top-right corner, rounded corners
- Controls overlay: Bottom 25% of screen, gradient overlay
- Control buttons: 64x64px circular, semi-transparent dark background
- End call button: 72x72px circular, red (#ff3b30)

### 5. ChatInterface Component

**Purpose**: Main container orchestrating the chat view.

**State Management**:
- Manages action menu open/closed state
- Handles navigation to call pages
- Preserves chat state during navigation
- Manages scroll position restoration

**Child Components**:
- ChatHeader
- MessageList (with MessageBubble children)
- InputBar
- ActionMenu
- NavigationBar

## Data Models

### Message Model

```typescript
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isEdited: boolean;
  canReEdit: boolean;
}
```

### Call State Model

```typescript
interface CallState {
  status: 'idle' | 'connecting' | 'active' | 'ended';
  type: 'voice' | 'video' | null;
  contactName: string;
  startTime: Date | null;
  duration: number; // in seconds
  isMuted: boolean;
  isSpeakerOn: boolean;
  isCameraOn: boolean; // video calls only
}
```

### UI State Model

```typescript
interface UIState {
  activeScreen: 'chat' | 'voiceCall' | 'videoCall';
  isActionMenuOpen: boolean;
  previousScreen: 'chat' | 'voiceCall' | 'videoCall' | null;
  chatScrollPosition: number;
}
```

### Theme Model

```typescript
interface Theme {
  colors: {
    background: string; // #0a0a0a
    surface: string; // #1a1a1a
    surfaceElevated: string; // #2a2a2a
    primary: string; // #9b87f5 (purple/lavender)
    textPrimary: string; // #ffffff
    textSecondary: string; // #b0b0b0
    error: string; // #ff3b30
    success: string; // #34c759
  };
  spacing: {
    xs: string; // 4px
    sm: string; // 8px
    md: string; // 16px
    lg: string; // 24px
    xl: string; // 32px
  };
  borderRadius: {
    sm: string; // 8px
    md: string; // 16px
    lg: string; // 24px
    full: string; // 50%
  };
  touchTarget: {
    minimum: string; // 44px
  };
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Action Menu Toggle

*For any* click event on the + icon, the Action_Menu should transition from closed to open state and be visible at the bottom of the screen.

**Validates: Requirements 2.1**

### Property 2: Action Menu Close on Outside Click

*For any* click event that occurs outside the bounds of the Action_Menu when it is open, the Action_Menu should close and return to the default state.

**Validates: Requirements 2.5**

### Property 3: Action Items Have Icons

*For any* action item displayed in the Action_Menu (Camera, Photos, Files, Voice Call, Video Call), the rendered element should include an associated icon element.

**Validates: Requirements 2.4**

### Property 4: Call Screen Navigation from Action Menu

*For any* click event on a call option (Voice Call or Video Call) in the Action_Menu, the application should navigate to the corresponding call page (Voice_Call_Page or Video_Call_Page).

**Validates: Requirements 3.1, 4.1**

### Property 5: Call Control Button Execution

*For any* control button on the Voice_Call_Page or Video_Call_Page (mute, speaker, camera, end call), clicking the button should execute its corresponding action and update the call state accordingly.

**Validates: Requirements 3.3, 4.3**

### Property 6: End Call Navigation

*For any* active call (voice or video), when the end call action is triggered, the application should navigate back to the main chat view.

**Validates: Requirements 3.4, 4.4**

### Property 7: Aspect Ratio Consistency

*For any* screen or component in the application (chat, voice call, video call), the rendered aspect ratio should be 9:16 (width:height).

**Validates: Requirements 5.2**

### Property 8: Responsive Proportions

*For any* resize event applied to the Chat_Interface, all UI elements should maintain their proportional relationships relative to the viewport dimensions.

**Validates: Requirements 5.4**

### Property 9: Dark Theme Consistency

*For any* page in the application (chat, voice call, video call), the background color should match the dark theme specification (#0a0a0a or equivalent).

**Validates: Requirements 6.3**

### Property 10: Re-edit Functionality Preservation

*For any* message that has the canReEdit flag set to true, clicking the re-edit action should allow the user to modify the message content.

**Validates: Requirements 6.6**

### Property 11: Interactive Element Feedback

*For any* interactive element (icon, button, control) in the application, a tap event should trigger immediate visual feedback (state change, animation, or highlight).

**Validates: Requirements 7.1**

### Property 12: Action Execution Timing

*For any* control element (button, icon) in the application, when tapped, the associated action should execute within 300ms of the tap event.

**Validates: Requirements 7.2**

### Property 13: Touch Target Size

*For any* icon or button in the application, the touch target area should be at least 44x44 pixels to ensure mobile accessibility.

**Validates: Requirements 7.3**

### Property 14: Disabled Control Indication

*For any* control element that is in a disabled state, a tap event should provide visual indication that the control is unavailable (e.g., no action, disabled styling).

**Validates: Requirements 7.4**

### Property 15: Chat State Restoration

*For any* navigation event returning from a call screen to the chat view, the chat scroll position and message state should be restored to the state before navigation.

**Validates: Requirements 8.2**

### Property 16: Call Screen Navigation Lock

*For any* active call state (voice or video), navigation attempts away from the call screen should be prevented unless triggered by the end call button.

**Validates: Requirements 8.3**

### Property 17: Action Menu State Independence

*For any* navigation between screens (chat to call, call to chat), the Action_Menu state should be managed independently and not affect call screen state.

**Validates: Requirements 8.4**

### Property 18: Action Menu Auto-Close on Navigation

*For any* navigation event to a call screen (voice or video) while the Action_Menu is open, the Action_Menu should automatically close before the navigation completes.

**Validates: Requirements 8.5**

## Error Handling

### Input Validation

- **Empty Message Handling**: Prevent sending empty or whitespace-only messages
- **Invalid State Transitions**: Prevent navigating to call screens when already in a call
- **Touch Event Validation**: Ensure touch coordinates are within valid bounds before processing

### Call State Errors

- **Connection Failures**: Display error message if call cannot be initiated
- **Disconnection Handling**: Gracefully handle unexpected call disconnections and return to chat
- **Permission Errors**: Handle camera/microphone permission denials with user-friendly messages

### UI Error States

- **Component Render Failures**: Provide fallback UI if components fail to render
- **Animation Errors**: Degrade gracefully if animations cannot be performed
- **Touch Event Conflicts**: Resolve conflicts when multiple touch events occur simultaneously

### Error Recovery

- **State Reset**: Provide mechanism to reset application state if errors occur
- **Graceful Degradation**: Ensure core chat functionality works even if call features fail
- **Error Logging**: Log errors for debugging without exposing technical details to users

## Testing Strategy

### Dual Testing Approach

This application requires both **unit tests** and **property-based tests** for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

Together, these approaches ensure both concrete bug detection and general correctness validation.

### Unit Testing Focus

Unit tests should focus on:

1. **Specific UI Rendering Examples**:
   - Input bar renders with correct icon positions (Requirements 1.1, 1.2, 1.3, 1.5)
   - Action menu displays all 5 items in correct order (Requirements 2.2, 2.3)
   - Voice call page shows required controls (Requirement 3.2)
   - Video call page shows required controls (Requirement 4.2)
   - Chat interface preserves original layout (Requirements 6.1, 6.4, 6.5)
   - Message bubbles use purple/lavender colors (Requirement 6.2)

2. **Edge Cases**:
   - Clicking + icon when action menu is already open
   - Attempting to navigate during call connection
   - Rapid successive clicks on control buttons
   - Resize events during active calls

3. **Error Conditions**:
   - Call initiation failures
   - Permission denial handling
   - Invalid state transitions
   - Component render failures

### Property-Based Testing Focus

Property tests should focus on universal behaviors using a property-based testing library (e.g., **fast-check** for JavaScript/TypeScript, **Hypothesis** for Python).

**Configuration**:
- Minimum **100 iterations** per property test
- Each test must reference its design document property
- Tag format: `Feature: mobile-chat-interface, Property {number}: {property_text}`

**Property Test Implementation**:

1. **Property 1: Action Menu Toggle** - Generate random click events on + icon, verify menu opens
2. **Property 2: Action Menu Close** - Generate random outside-click coordinates, verify menu closes
3. **Property 3: Action Items Have Icons** - For all action items, verify icon element exists
4. **Property 4: Call Screen Navigation** - Generate random call option clicks, verify navigation
5. **Property 5: Call Control Execution** - For all control buttons, verify action execution
6. **Property 6: End Call Navigation** - For all call types, verify navigation back to chat
7. **Property 7: Aspect Ratio** - For all screens, verify 9:16 ratio
8. **Property 8: Responsive Proportions** - Generate random resize dimensions, verify proportions
9. **Property 9: Dark Theme** - For all pages, verify background color matches theme
10. **Property 10: Re-edit Functionality** - For all editable messages, verify re-edit works
11. **Property 11: Interactive Feedback** - For all interactive elements, verify tap feedback
12. **Property 12: Action Timing** - For all controls, verify action executes within 300ms
13. **Property 13: Touch Target Size** - For all icons/buttons, verify minimum 44x44px
14. **Property 14: Disabled Control** - For all disabled controls, verify indication shown
15. **Property 15: State Restoration** - For all navigation back events, verify state restored
16. **Property 16: Navigation Lock** - During all active calls, verify navigation blocked
17. **Property 17: State Independence** - For all navigation events, verify menu state independent
18. **Property 18: Menu Auto-Close** - For all call navigations, verify menu closes

### Integration Testing

- **Screen Transitions**: Test complete flows from chat → action menu → call → chat
- **State Persistence**: Verify state is maintained across navigation cycles
- **Touch Interaction Flows**: Test multi-step touch interactions (open menu, select option, use controls)

### Visual Regression Testing

- **Screenshot Comparison**: Capture and compare screenshots of key screens
- **Theme Consistency**: Verify color values match design specifications
- **Layout Consistency**: Verify element positions match design specifications

### Performance Testing

- **Animation Performance**: Verify animations run at 60fps
- **Touch Response Time**: Verify touch events respond within 300ms
- **Memory Usage**: Verify no memory leaks during navigation cycles
