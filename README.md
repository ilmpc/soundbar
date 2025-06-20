# 🎵 Soundbar

A retro-style music mixing and recording application built as a Telegram Mini App. Create beats, mix sounds, and share your musical creations directly in Telegram chats.

## ✨ Features

### 🎛️ Music Mixing
- **Multi-track mixing** with bass, drums, melody, and effect sounds
- **Real-time sound layering** - combine multiple sounds simultaneously
- **Volume control** with smooth slider interface
- **15 unique sound samples** across different categories

### 📼 Recording & Playback
- **High-quality recording** of your mixed compositions
- **Cassette player aesthetic** with animated reels during recording
- **Full playback controls** - play, pause, and stop your recordings
- **One-click sharing** to Telegram chats

### 🎨 Retro Design
- **Cassette tape interface** with authentic visual design
- **Animated tape reels** that spin during recording
- **Mobile-first responsive** design optimized for phones
- **Tactile button interactions** with press animations

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS 4** for styling
- **Zustand** for state management
- **Radix UI** for accessible components

### Backend
- **Cloudflare Workers** for serverless backend
- **Hono** web framework
- **Telegram Bot API** integration

### Audio Processing
- **Web Audio API** for sound mixing and recording
- **LameJS** for MP3 encoding
- **MediaRecorder API** for audio capture

## 🚀 Quick Start

### Prerequisites
- bun
- Cloudflare account for deployment
- Telegram Bot Token

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun dev
```

Visit `http://localhost:5173` to see the app in development mode.

## 🎮 How to Use

1. **Select Sounds**: Toggle different sound buttons to add them to your mix
   - 🎵 **Melody** (blue buttons) - Musical notes and tunes
   - 👏 **Claps** - Percussion claps
   - ✨ **Effects** - Special sound effects
   - 🥁 **Kicks** - Drum kicks
   - 🎸 **Bass** - Bass lines

2. **Adjust Volume**: Use the slider to control the master volume

3. **Record**: Press the red "Запись" (Record) button to start recording your mix

4. **Playback**: Use the transport controls to play, pause, or stop your recording

5. **Share**: Click the cassette player to upload your recording to the Telegram chat

## 🚀 Deployment

### Cloudflare Workers

1. **Configure Wrangler**: Update `wrangler.json` with your worker name and URL

2. **Set Environment Variables**:
   ```bash
   wrangler secret put BOT_TOKEN
   ```

3. **Deploy**:
   ```bash
   bun deploy
   ```

### Telegram Bot Setup

1. Create a bot with [@BotFather](https://t.me/botfather)
2. Set the webhook URL to your Cloudflare Worker endpoint
3. Configure the web app URL in your bot settings

## 🎵 Sound Categories

- **Melody** (melody1-3): Musical melodies and tunes
- **Claps** (clap1-3): Hand clap percussion sounds  
- **Effects** (effect1-3): Special audio effects and transitions
- **Kicks** (kick1-3): Drum kick sounds for rhythm
- **Bass** (bass1-3): Deep bass lines for foundation

## 📝 License

This project is licensed under the MIT License.