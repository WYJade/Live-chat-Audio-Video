# Mobile Chat Interface

A mobile H5 chat application with voice and video call features, designed for 9:16 aspect ratio and embedding into other mobile applications.

## Features

- ✅ Redesigned input bar with repositioned icons (voice left, emoji/+ right)
- ✅ Expanded action menu with Camera, Photos, Files, Voice Call, and Video Call
- ✅ Voice call page with mute, speaker, and end call controls
- ✅ Video call page with camera, mute, speaker, and end call controls
- ✅ Dark theme with purple/lavender accents
- ✅ Smooth navigation and state preservation
- ✅ Touch-optimized interactions (44x44px minimum touch targets)
- ✅ 9:16 aspect ratio for mobile devices

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Project Structure

```
mobile-chat-interface/
├── src/
│   ├── components/
│   │   ├── ChatInterface/
│   │   │   ├── ChatInterface.tsx    # Main chat container
│   │   │   ├── InputBar.tsx         # Input bar with repositioned icons
│   │   │   ├── ActionMenu.tsx       # Expandable action menu
│   │   │   └── MessageBubble.tsx    # Message display component
│   │   ├── VoiceCallPage/
│   │   │   └── VoiceCallPage.tsx    # Voice call interface
│   │   └── VideoCallPage/
│   │       └── VideoCallPage.tsx    # Video call interface
│   ├── context/
│   │   └── AppContext.tsx           # State management
│   ├── types/
│   │   └── models.ts                # TypeScript interfaces
│   ├── styles/
│   │   ├── theme.ts                 # Theme configuration
│   │   └── animations.ts            # Animation definitions
│   ├── App.tsx                      # Root component
│   └── main.tsx                     # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Usage

### Chat Interface
- Type messages in the input field
- Click the voice icon (left) for voice input
- Click the emoji icon (right) to open emoji picker
- Click the + icon (right) to open the action menu

### Action Menu
- Click + to open the menu with 5 options:
  - Camera: Take a photo
  - Photos: Select from gallery
  - Files: Attach files
  - Voice Call: Start a voice call
  - Video Call: Start a video call
- Click outside the menu to close it

### Voice Call
- Click "Voice Call" in the action menu
- Use mute button to toggle microphone
- Use speaker button to toggle speaker
- Click the red button to end the call

### Video Call
- Click "Video Call" in the action menu
- Use mute button to toggle microphone
- Use camera button to toggle video
- Use speaker button to toggle speaker
- Click the red button to end the call

## Technical Details

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: React Context API
- **Testing**: Vitest with React Testing Library
- **Styling**: Inline styles with theme system
- **Aspect Ratio**: 9:16 (mobile optimized)
- **Touch Targets**: Minimum 44x44px for accessibility

## Browser Support

- Modern browsers with ES2020 support
- Mobile browsers (iOS Safari, Chrome, Firefox)
- Designed for mobile webview embedding

## License

MIT
