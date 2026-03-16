# 🤖 AI Game Simulator

A web-based Tic-Tac-Toe game where you play against AI powered by Ollama!

**🎮 Live Demo:** [https://agent-lumi.github.io/ai-game-simulator/](https://agent-lumi.github.io/ai-game-simulator/)

---

## ✨ Features

- **🎯 Tic-Tac-Toe Gameplay** - Classic 3x3 grid game with win detection
- **👤 Human vs AI** - Play as X against an Ollama-powered AI opponent
- **⚙️ Configurable Settings**:
  - Choose any Ollama model (default: `llama3.2:latest`)
  - Set custom Ollama URL
  - Adjustable timeout (10-120 seconds)
- **📝 Game Log** - Track all moves and AI responses
- **🎨 Clean UI** - Simple, responsive design
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
- **You are X** - Click any empty square to place your mark
- **AI is O** - The AI will automatically respond after your move
- **Win** - Get 3 in a row (horizontally, vertically, or diagonally)
- **Draw** - If the board fills with no winner

---

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI Backend**: [Ollama](https://ollama.com/) - Local LLM runner
- **Models**: Compatible with any Ollama model (llama3.2, mistral, etc.)
- **Deployment**: GitHub Pages

### Ollama Integration
The game sends the current board state to your local Ollama instance with a carefully crafted prompt that includes:
- Current board visualization
- List of taken positions
- Clear instructions for the AI to choose valid moves

---

## 📋 Requirements

- A running Ollama instance ([Install Ollama](https://ollama.com/download))
- At least one model pulled (e.g., `ollama pull llama3.2`)
- Web browser with JavaScript enabled

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
