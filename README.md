# 🎮 AI Game Simulator

**Tic-Tac-Toe: AI vs AI or AI vs Human**

[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://html-preview.github.io/?url=https://github.com/Agent-Lumi/ai-game-simulator/blob/main/index.html)

## 🎯 Features

### Game Modes
- **👤 vs 🤖 Human vs AI** - Play against the machine
- **🤖 vs 🤖 AI vs AI** - Watch two AIs battle!
- **▶️ Auto-Play** - Continuous AI battles (auto-restart)

### AI Configuration
- **Player 1** (X): Human or Ollama AI (your choice)
- **Player 2** (O): Always Ollama AI
- **Model Input**: Type any model (default: `llama3.2:latest`)
- **Ollama URL**: Configure your endpoint
- **Timeout**: Adjustable 5-60 seconds

### Smart Features

#### 💭 Thought Bubbles
Watch the AI "think" in real-time with animated thought bubbles showing their reasoning!

#### 🔄 Smart Retry (3 attempts)
When Ollama picks an invalid move:
1. **First attempt**: Standard prompt
2. **Retry**: Tells LLM what went wrong
3. **Final**: "Positions 0, 4, 8 are TAKEN - you CANNOT pick them!"

#### 🧠 Local AI Fallback
- ✅ **Optional**: Allow fallback to Local AI on API failure
- **Smart Local AI Strategy**:
  1. Win if possible
  2. Block opponent win
  3. Take center
  4. Take corners
  5. Random fallback

#### ⏸️ Pause & Resume
- Pause mid-game (works during AI turns)
- Resume continues from where you left off
- AI automatically resumes on unpause

#### 📝 Game Log
Complete move history with:
- Position coordinates
- AI vs Human distinction
- Retry attempts logged
- API vs Local AI distinction

## 🚀 Try It

**[Live Demo](https://html-preview.github.io/?url=https://github.com/Agent-Lumi/ai-game-simulator/blob/main/index.html)**

## 🛠️ Setup

### Quick Start
1. Open `index.html` (or [Live Demo](https://html-preview.github.io/?url=https://github.com/Agent-Lumi/ai-game-simulator/blob/main/index.html))
2. Configure settings:
   - **AI Model**: `llama3.2:latest` (or type your own)
   - **Ollama URL**: `http://192.168.99.113:11434`
   - **Timeout**: `10` seconds (adjust 5-60s)
   - **Fallback**: ✅ Allow fallback to Local AI
3. Choose mode and play!

### Running Locally (for Ollama API)
```bash
# Serve locally to avoid CORS issues
cd ai-game-simulator
python3 -m http.server 8080
# Open http://localhost:8080
```

## 🎮 How to Play

### Human vs AI
1. Select "👤 Human" for Player 1
2. Type your Ollama model (e.g., `llama3.2:latest`)
3. Click **▶️ Start Game**
4. Click board squares to play
5. Watch 💭 thought bubbles as AI thinks!

### AI vs AI (Simulation)
1. Select "🤖 Ollama AI" for Player 1
2. Click **🔄 Auto-Play (AI vs AI)**
3. Watch the battle with 💭 thought bubbles!
4. Games auto-restart every 3 seconds
5. Use **⏸️ Pause** to stop, **▶️ Resume** to continue

### Using Local AI Only (No Ollama)
1. Type `local` in the AI Model field
2. Or: Disable fallback checkbox + let API timeout
3. Smart Local AI plays without any API calls!

## 🧠 AI Prompt Example

```
You are playing Tic-Tac-Toe as player X.
Current board (positions 0-8):
pos 0: X | pos 1: _ | pos 2: _
pos 3: _ | pos 4: O | pos 5: _
pos 6: _ | pos 7: _ | pos 8: X

YOU ARE: X
❌ TAKEN (DO NOT PICK): 0 (X), 4 (O), 8 (X)
✅ AVAILABLE (PICK ONE): 1, 3, 5, 6, 7

CHOOSE THE BEST MOVE (0-8) FROM AVAILABLE POSITIONS ONLY.
⚠️ REMEMBER: Positions 0, 4, 8 are ALREADY TAKEN. You CANNOT pick them!
```

## 📊 Troubleshooting

| Issue | Solution |
|-------|----------|
| Game freezes | Check Ollama URL, increase timeout, or enable fallback |
| CORS errors | Run locally (python3 -m http.server) |
| Invalid moves | Enable "Allow fallback" for Local AI backup |
| Slow responses | Reduce timeout to 5s for faster fallback |

## 🛠️ Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- Ollama API integration
- Fetch API with AbortController (timeouts)
- No external dependencies
- GitHub Pages compatible

## 📝 License

MIT

---

Made with 💡 by [Lumi](https://github.com/Agent-Lumi)
