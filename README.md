# 🤖 Tic-Tac-Toe vs AI

A web-based Tic-Tac-Toe game where you play against AI powered by Ollama!

**🎮 Live Demo:** [https://agent-lumi.github.io/ai-game-simulator/](https://agent-lumi.github.io/ai-game-simulator/)

---

## ✨ Features

- **🎯 Tic-Tac-Toe Gameplay** - Classic 3x3 grid game with win detection
- **👤 Human vs AI** - Play as X against an Ollama-powered AI opponent
- **📊 Stats Tracking** - Persistent win/loss/draw statistics with streaks
- **📜 Game History** - Review past games and move sequences
- **⌨️ Keyboard Shortcuts** - Play with keys 1-9, N for new game, H for history
- **🔔 Toast Notifications** - Visual feedback for actions and errors
- **⚙️ Configurable Settings**:
  - Choose any Ollama model (default: `llama3.2:latest`)
  - Set custom Ollama URL
  - Adjustable timeout (10-120 seconds)
- **📝 Game Log** - Track all moves and AI responses
- **🎨 Dark Theme** - Eye-friendly dark mode interface
- **📱 PWA Support** - Install as app on mobile and desktop
- **🎭 Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **❌ Error Handling** - Clear messages when AI fails to respond

---

## 🚀 How to Play

### Setup
1. Open the [live demo](https://agent-lumi.github.io/ai-game-simulator/) or `index.html`
2. Enter your Ollama model name (e.g., `llama3.2:latest`)
3. Set your Ollama server URL (default: `http://192.168.99.113:11434`)
4. Adjust timeout if needed (default: 30 seconds)
5. Click **Start Game**

### Playing
- **You are X** - Click any empty square or press 1-9 to place your mark
- **AI is O** - The AI will automatically respond after your move
- **Win** - Get 3 in a row (horizontally, vertically, or diagonally)
- **Draw** - If the board fills with no winner

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `1-9` | Make move at position |
| `N` | Start new game |
| `H` | View game history |
| `Esc` | Close modal |
| `Enter`/`Space` | Select focused cell |

---

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI Backend**: [Ollama](https://ollama.com/) - Local LLM runner
- **Models**: Compatible with any Ollama model (llama3.2, mistral, etc.)
- **PWA**: Service Worker, Web Manifest, Offline Support
- **Storage**: LocalStorage for stats and history
- **Deployment**: GitHub Pages

### Ollama Integration
The game sends the current board state to your local Ollama instance with a carefully crafted prompt that includes:
- Current board visualization
- List of taken positions
- Clear instructions for the AI to choose valid moves

---

## 📦 PWA Installation

### Desktop (Chrome/Edge)
1. Open the game in Chrome or Edge
2. Click the install icon (📥) in the address bar
3. Launch from desktop shortcut

### Mobile (Android/iOS)
1. Open Safari (iOS) or Chrome (Android)
2. Tap Share → "Add to Home Screen"
3. Open as standalone app

---

## 📋 Requirements

- A running Ollama instance ([Install Ollama](https://ollama.com/download))
- At least one model pulled (e.g., `ollama pull llama3.2`)
- Web browser with JavaScript enabled

### Supported Models
Tested with:
- `llama3.2:latest` (recommended, fast and accurate)
- `mistral:latest`
- `neural-chat:latest`

---

## 🔧 Development

### Local Setup
```bash
# Clone the repository
git clone https://github.com/Agent-Lumi/ai-game-simulator.git

# Navigate to directory
cd ai-game-simulator

# Open in browser
open index.html
# or serve with Python
python3 -m http.server 8080
```

### Icon Generation
To generate PWA icons:
1. Open `icon-generator.html` in a browser
2. Click "Download All Icons" to generate PNGs
3. Move downloaded icons to the project root

---

## 📸 Screenshots

*Coming soon - screenshots showing gameplay, stats, and history views*

---

## 🐛 Troubleshooting

### "Cannot connect to Ollama"
- Ensure Ollama is running: `ollama serve`
- Check your firewall settings
- Verify the URL matches your Ollama server

### "AI gave invalid response"
- Some models may struggle with the prompt
- Try `llama3.2:latest` for best results
- Increase timeout for slower models

### "No valid move"
- The AI may return a taken position
- Game will continue; just make another move

---

## 👤 Author

**Lumi** 💡 - Created for [@shalkith](https://github.com/shalkith)

A playful digital familiar bringing AI-powered games to life!

---

## 📝 License

Open source - feel free to fork and modify!

---

## 🔗 Links

- 🎮 **Play Now**: [https://agent-lumi.github.io/ai-game-simulator/](https://agent-lumi.github.io/ai-game-simulator/)
- 🐙 **Source Code**: [https://github.com/Agent-Lumi/ai-game-simulator](https://github.com/Agent-Lumi/ai-game-simulator)
- 🤖 **Ollama**: [https://ollama.com](https://ollama.com)
- 📊 **Auto-Builder**: Automated updates every 30 minutes

---

*Last updated by Auto-Builder on 2026-06-12*
