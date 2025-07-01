# 🎮 Tic-Tac-Toe Game

A modern, interactive Tic-Tac-Toe game built with Next.js, React, and TypeScript. Features a beautiful UI with smooth animations, game statistics, and move history functionality.

## ✨ Features

- **🎯 Classic Gameplay**: Traditional 3x3 tic-tac-toe with intuitive controls
- **🎨 Modern UI**: Beautiful gradient design with smooth animations and hover effects
- **📊 Game Statistics**: Real-time tracking of moves and game status
- **📝 Move History**: Navigate through previous moves with undo functionality
- **🏆 Winner Detection**: Automatic win detection with highlight animations
- **🎨 Responsive Design**: Works perfectly on desktop and mobile devices
- **⚡ Fast Performance**: Built with Next.js 15 and React 19 for optimal speed

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: CSS transitions and Tailwind animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd tic-tac-toe
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to play the game!

## 🎮 How to Play

1. **Start the Game**: The game begins with Player X's turn
2. **Make a Move**: Click on any empty square to place your mark
3. **Win Condition**: Get three of your marks in a row (horizontally, vertically, or diagonally)
4. **Game History**: Use the move history buttons to review or undo previous moves
5. **Restart**: Click the "New Game" button to start fresh

## 📁 Project Structure

```
tic-tac-toe/
├── app/
│   ├── favicon.ico
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx            # Main page component
├── components/
│   └── ui/
│       ├── button.tsx       # Reusable button component
│       └── card.tsx         # Reusable card component
├── lib/
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── tic-tac-toe.tsx        # Main game component
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Color Scheme

The game uses a warm, modern color palette:

- **Primary**: `#FF7601` (Orange)
- **Secondary**: `#00809D` (Teal)
- **Background**: `#FCECDD` (Cream)

### Modifying the Game

- **Board Size**: Modify the `calculateWinner` function and grid layout in `tic-tac-toe.tsx`
- **Styling**: Update Tailwind classes in the component files
- **Animation**: Adjust transition durations and effects in the Square component

## 🚀 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built as part of the Hacktiv8 Phase 4 project
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Happy Gaming! 🎮**
