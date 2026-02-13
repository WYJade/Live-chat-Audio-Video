# Implementation Plan: Mobile Chat Interface

## Overview

This implementation plan breaks down the mobile chat interface into discrete coding tasks. The application will be built using HTML5, CSS3, and JavaScript/TypeScript with a component-based architecture (React or Vue.js recommended). Each task builds incrementally, ensuring core functionality is validated early through code.

**Technology Stack**: TypeScript with React or Vue.js (choose based on team preference)
**Target**: Mobile H5 page with 9:16 aspect ratio
**Theme**: Dark mode with purple/lavender accents

## Tasks

- [x] 1. Set up project structure and core configuration
  - Create project directory structure (components, styles, utils)
  - Configure TypeScript and build tools (Vite or Create React App)
  - Set up CSS modules or styled-components for scoped styling
  - Create theme configuration file with colors, spacing, and design tokens
  - Configure viewport meta tags for mobile 9:16 aspect ratio
  - _Requirements: 5.1, 5.2, 6.2, 6.3_

- [x] 2. Implement core data models and state management
  - [x] 2.1 Create TypeScript interfaces for Message, CallState, UIState, and Theme models
    - Define all type definitions as specified in design document
    - Include validation functions for data integrity
    - _Requirements: 6.1_
  
  - [x] 2.2 Set up state management solution (Context API, Redux, or Pinia)
    - Create stores for chat state, UI state, and call state
    - Implement state update actions and reducers
    - _Requirements: 8.2, 8.4_
  
  - [x] 2.3 Write unit tests for data models
    - Test message model validation
    - Test call state transitions
    - Test UI state management
    - _Requirements: 6.1_

- [x] 3. Build InputBar component with repositioned icons
  - [x] 3.1 Create InputBar component structure
    - Implement text input field with "Type a message" placeholder
    - Position voice icon on LEFT side of input
    - Position emoji icon and + icon on RIGHT side (emoji first, then +)
    - Remove up arrow icon from previous design
    - Apply dark theme styling with proper spacing
    - _Requirements: 1.1, 1.2, 1.3, 1.5_
  
  - [x] 3.2 Implement touch interactions for InputBar icons
    - Add click handlers for voice, emoji, and + icons
    - Implement visual feedback on tap (state changes, highlights)
    - Ensure 44x44px minimum touch targets for all icons
    - _Requirements: 7.1, 7.3_
  
  - [x] 3.3 Write property test for InputBar icon interactions
    - **Property 11: Interactive Element Feedback**
    - **Validates: Requirements 7.1**
  
  - [x] 3.4 Write unit tests for InputBar rendering
    - Test voice icon positioned left
    - Test emoji and + icons positioned right in correct order
    - Test up arrow icon is not present
    - _Requirements: 1.1, 1.2, 1.3, 1.5_

- [x] 4. Build ActionMenu component with expanded options
  - [x] 4.1 Create ActionMenu component structure
    - Implement slide-up animation from bottom (300ms ease-out)
    - Create grid layout for 5 action items: Camera, Photos, Files, Voice Call, Video Call
    - Add icons and labels for each action item
    - Implement semi-transparent overlay behind menu
    - Apply dark theme styling (#2a2a2a background, 16px top border radius)
    - _Requirements: 2.2, 2.3, 2.4_
  
  - [x] 4.2 Implement ActionMenu open/close logic
    - Connect + icon click to open menu
    - Implement outside-click detection to close menu
    - Add state management for menu open/closed
    - _Requirements: 2.1, 2.5_
  
  - [x] 4.3 Write property tests for ActionMenu behavior
    - **Property 1: Action Menu Toggle**
    - **Property 2: Action Menu Close on Outside Click**
    - **Property 3: Action Items Have Icons**
    - **Validates: Requirements 2.1, 2.4, 2.5**
  
  - [x] 4.4 Write unit tests for ActionMenu rendering
    - Test all 5 action items are displayed
    - Test correct ordering of items
    - Test each item has an icon
    - _Requirements: 2.2, 2.3, 2.4_

- [x] 5. Checkpoint - Ensure chat interface basics work
  - Verify InputBar renders correctly with repositioned icons
  - Verify ActionMenu opens and closes properly
  - Verify all touch interactions provide feedback
  - Ensure all tests pass, ask the user if questions arise

- [x] 6. Build VoiceCallPage component
  - [x] 6.1 Create VoiceCallPage component structure
    - Implement full-screen dark background layout
    - Add contact name display (24px, white, centered)
    - Add call duration timer (16px, gray, centered)
    - Add avatar/icon placeholder (120x120px circular)
    - Position control buttons at bottom
    - _Requirements: 3.2, 3.5_
  
  - [x] 6.2 Implement voice call controls
    - Create Mute button (microphone icon, toggles red when muted)
    - Create Speaker button (speaker icon, toggles blue when active)
    - Create End Call button (red circular, 72x72px, phone icon)
    - Add click handlers for each control
    - Update call state on control interactions
    - _Requirements: 3.2, 3.3_
  
  - [x] 6.3 Implement navigation to VoiceCallPage
    - Connect Voice Call option in ActionMenu to navigation
    - Implement screen transition animation
    - Close ActionMenu when navigating to call screen
    - _Requirements: 3.1, 8.5_
  
  - [x] 6.4 Write property tests for voice call functionality
    - **Property 4: Call Screen Navigation from Action Menu**
    - **Property 5: Call Control Button Execution**
    - **Property 18: Action Menu Auto-Close on Navigation**
    - **Validates: Requirements 3.1, 3.3, 8.5**
  
  - [x] 6.5 Write unit tests for VoiceCallPage
    - Test all required controls are rendered
    - Test control state changes (mute, speaker)
    - Test end call navigation
    - _Requirements: 3.2, 3.3, 3.4_

- [x] 7. Build VideoCallPage component
  - [x] 7.1 Create VideoCallPage component structure
    - Implement full-screen layout with video feed background
    - Add local video picture-in-picture (120x180px, top-right, rounded)
    - Add contact name and call duration overlay
    - Position control buttons at bottom with gradient overlay
    - _Requirements: 4.2, 4.5_
  
  - [x] 7.2 Implement video call controls
    - Create Mute button (microphone icon, toggles red when muted)
    - Create Camera button (camera icon, toggles red when off)
    - Create Speaker button (speaker icon, toggles blue when active)
    - Create End Call button (red circular, 72x72px, phone icon)
    - Add click handlers for each control
    - Update call state on control interactions
    - _Requirements: 4.2, 4.3_
  
  - [x] 7.3 Implement navigation to VideoCallPage
    - Connect Video Call option in ActionMenu to navigation
    - Implement screen transition animation
    - Close ActionMenu when navigating to call screen
    - _Requirements: 4.1, 8.5_
  
  - [x] 7.4 Write property tests for video call functionality
    - **Property 4: Call Screen Navigation from Action Menu**
    - **Property 5: Call Control Button Execution**
    - **Property 18: Action Menu Auto-Close on Navigation**
    - **Validates: Requirements 4.1, 4.3, 8.5**
  
  - [x] 7.5 Write unit tests for VideoCallPage
    - Test all required controls are rendered
    - Test control state changes (mute, camera, speaker)
    - Test end call navigation
    - _Requirements: 4.2, 4.3, 4.4_

- [x] 8. Implement end call navigation and state restoration
  - [x] 8.1 Add end call navigation logic
    - Implement navigation back to chat view from both call pages
    - Reset call state when ending call
    - _Requirements: 3.4, 4.4_
  
  - [x] 8.2 Implement chat state preservation
    - Save chat scroll position before navigating to call
    - Restore scroll position when returning from call
    - Preserve message state and input text
    - _Requirements: 8.2_
  
  - [x] 8.3 Write property tests for navigation and state
    - **Property 6: End Call Navigation**
    - **Property 15: Chat State Restoration**
    - **Property 17: State Independence**
    - **Validates: Requirements 3.4, 4.4, 8.2, 8.4**

- [x] 9. Checkpoint - Ensure call features work end-to-end
  - Verify navigation from chat → action menu → voice call → chat
  - Verify navigation from chat → action menu → video call → chat
  - Verify chat state is preserved across navigation
  - Ensure all tests pass, ask the user if questions arise

- [x] 10. Build ChatInterface main container
  - [x] 10.1 Create ChatInterface component
    - Integrate ChatHeader component (preserve existing design)
    - Integrate MessageList with MessageBubble components
    - Integrate InputBar component
    - Integrate ActionMenu component
    - Integrate NavigationBar component (preserve existing design)
    - Apply 9:16 aspect ratio constraints
    - _Requirements: 5.2, 6.1, 6.4, 6.5_
  
  - [x] 10.2 Implement message rendering with existing styles
    - Render messages with purple/lavender bubble colors
    - Preserve "Re-edit" functionality on editable messages
    - Maintain dark background theme
    - _Requirements: 6.1, 6.2, 6.3, 6.6_
  
  - [x] 10.3 Write property tests for ChatInterface
    - **Property 7: Aspect Ratio Consistency**
    - **Property 9: Dark Theme Consistency**
    - **Property 10: Re-edit Functionality Preservation**
    - **Validates: Requirements 5.2, 6.3, 6.6**
  
  - [x] 10.4 Write unit tests for ChatInterface
    - Test message layout preservation
    - Test purple/lavender color scheme
    - Test header and navigation bar preservation
    - _Requirements: 6.1, 6.2, 6.4, 6.5_

- [x] 11. Implement responsive behavior and touch interactions
  - [x] 11.1 Add responsive resize handling
    - Implement resize event listeners
    - Maintain UI element proportions on resize
    - Ensure 9:16 aspect ratio is maintained
    - _Requirements: 5.4_
  
  - [x] 11.2 Enhance touch interaction feedback
    - Ensure all buttons provide visual feedback within 300ms
    - Verify all touch targets meet 44x44px minimum
    - Add disabled state visual indicators
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [x] 11.3 Write property tests for responsive and touch behavior
    - **Property 8: Responsive Proportions**
    - **Property 12: Action Execution Timing**
    - **Property 13: Touch Target Size**
    - **Property 14: Disabled Control Indication**
    - **Validates: Requirements 5.4, 7.2, 7.3, 7.4**

- [x] 12. Implement call state navigation lock
  - [x] 12.1 Add navigation prevention during active calls
    - Block navigation away from call screens during active calls
    - Allow navigation only via end call button
    - Show visual feedback if navigation is attempted
    - _Requirements: 8.3_
  
  - [x] 12.2 Write property test for navigation lock
    - **Property 16: Call Screen Navigation Lock**
    - **Validates: Requirements 8.3**

- [x] 13. Add error handling and edge cases
  - [x] 13.1 Implement error handling for call features
    - Handle call connection failures with error messages
    - Handle unexpected disconnections gracefully
    - Handle camera/microphone permission denials
    - _Requirements: 3.1, 4.1_
  
  - [x] 13.2 Add input validation
    - Prevent empty message sending
    - Validate state transitions
    - Handle touch event edge cases
    - _Requirements: 6.1_
  
  - [x] 13.3 Write unit tests for error conditions
    - Test call initiation failures
    - Test permission denial handling
    - Test invalid state transitions
    - _Requirements: 3.1, 4.1_

- [x] 14. Final integration and polish
  - [x] 14.1 Integrate all components into main App
    - Wire up routing/navigation between screens
    - Connect all state management
    - Ensure smooth transitions between all screens
    - _Requirements: 8.1_
  
  - [x] 14.2 Apply final styling and theme consistency
    - Verify dark theme across all pages
    - Verify purple/lavender accents are consistent
    - Verify all spacing and proportions match design
    - _Requirements: 6.2, 6.3_
  
  - [x] 14.3 Run full integration tests
    - Test complete user flows (chat → calls → chat)
    - Test state persistence across navigation cycles
    - Test touch interaction flows
    - _Requirements: 8.1, 8.2_

- [x] 15. Final checkpoint - Complete testing and validation
  - Run all unit tests and property tests
  - Verify all 18 correctness properties pass
  - Test on mobile devices or emulators
  - Verify 9:16 aspect ratio on different screen sizes
  - Ensure all requirements are met
  - Ask the user if questions arise or if ready for deployment

## Notes

- All tasks are required for comprehensive testing and validation
- Each task references specific requirements for traceability
- Property tests should run minimum 100 iterations each
- All property tests must be tagged with: `Feature: mobile-chat-interface, Property {number}: {property_text}`
- Checkpoints ensure incremental validation of functionality
- Framework choice (React vs Vue.js) should be decided before starting task 1
