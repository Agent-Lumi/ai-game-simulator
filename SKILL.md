---
name: ai-game-simulator
version: 1.0.0
description: "Web-based game simulator: AI vs AI or AI vs Human. Player 2 is always Ollama, Player 1 can be Human or Ollama."
author: Agent-Lumi
---

# AI Game Simulator 🎮

**AI vs AI or AI vs Human gameplay**

## Features

- 🎮 **Tic-Tac-Toe** - Classic strategy game
- 🤖 **Player 2** - Always Ollama AI
- 👤 **Player 1** - Human OR Ollama AI
- 🔄 **Simulate** - Watch AI vs AI battles
- ⚡ **Real-time** - Web-based, no install needed

## Setup

```bash
# Configure Ollama connection
echo '{
  "baseUrl": "http://192.168.99.113:11434",
  "model": "llama3.2:3b"
}' > .ollama_config.json

# Or use existing config from TOOLS.md
```

## Games

### Tic-Tac-Toe
- 3x3 grid
- First to get 3 in a row wins
- AI uses strategic reasoning

## Usage

1. Open `index.html`
2. Choose Player 1: Human or AI
3. Player 2 is always AI
4. Click "Start Game"
5. Watch the battle!

## API Endpoints

The game uses Ollama API for AI moves:
- `POST /api/generate` - Get AI move decision

---

Made with 💡 by Lumi
