"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, RotateCcw, Clock, Users } from "lucide-react"

interface SquareProps {
  value: string | null
  onSquareClick: () => void
  isWinning?: boolean
}

function Square({ value, onSquareClick, isWinning = false }: SquareProps) {
  return (
    <button
      className={`
        w-24 h-24 rounded-xl border-2 text-5xl font-bold 
        transition-all duration-300 transform hover:scale-105 hover:shadow-lg
        focus:outline-none focus:ring-4 focus:ring-orange-300
        ${
          isWinning
            ? "bg-gradient-to-br from-orange-400 to-orange-500 border-orange-300 shadow-orange-200 shadow-lg animate-pulse"
            : "bg-gradient-to-br from-[#FCECDD] to-white border-[#F3A26D]/30 hover:from-[#F3A26D]/20 hover:to-[#FCECDD] hover:border-[#FF7601]/50"
        }
        ${value === "X" ? "text-[#00809D]" : value === "O" ? "text-[#FF7601]" : ""}
      `}
      onClick={onSquareClick}
    >
      {value === "X" && "✕"}
      {value === "O" && "◯"}
    </button>
  )
}

interface BoardProps {
  xIsNext: boolean
  squares: (string | null)[]
  onPlay: (nextSquares: (string | null)[]) => void
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares).winner || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares)
  }

  const { winner, line } = calculateWinner(squares)
  let status: string
  let statusClass: string

  if (winner) {
    status = `🎉 Player ${winner} Wins!`
    statusClass = "bg-gradient-to-r from-[#FF7601] to-[#F3A26D] text-white shadow-lg animate-bounce"
  } else if (squares.every((square) => square !== null)) {
    status = "🤝 It's a Tie!"
    statusClass = "bg-gradient-to-r from-[#F3A26D] to-[#FF7601] text-white shadow-lg"
  } else {
    status = `${xIsNext ? "✕" : "◯"} Player ${xIsNext ? "X" : "O"}'s Turn`
    statusClass = xIsNext
      ? "bg-gradient-to-r from-[#00809D] to-[#00809D]/80 text-white shadow-lg"
      : "bg-gradient-to-r from-[#FF7601] to-[#F3A26D] text-white shadow-lg"
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className={`text-2xl font-bold px-6 py-3 rounded-full ${statusClass} transition-all duration-500`}>
        {status}
      </div>
      <div className="grid grid-cols-3 gap-3 p-6 bg-gradient-to-br from-[#FCECDD] to-[#F3A26D]/20 rounded-2xl shadow-2xl border border-[#F3A26D]/30">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} isWinning={line?.includes(i)} />
        ))}
      </div>
    </div>
  )
}

export default function Game() {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  function resetGame() {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Move #${move}` : "Game Start"
    const isCurrentMove = move === currentMove

    return (
      <li key={move} className="mb-2">
        <Button
          variant={isCurrentMove ? "default" : "outline"}
          size="sm"
          onClick={() => jumpTo(move)}
          className={`
            w-full text-left justify-start transition-all duration-200 hover:scale-105
            ${
              isCurrentMove
                ? "bg-gradient-to-r from-[#00809D] to-[#00809D]/80 text-white shadow-lg"
                : "hover:bg-gradient-to-r hover:from-[#F3A26D]/20 hover:to-[#FCECDD] hover:border-[#FF7601]/30"
            }
          `}
        >
          <Clock className="w-4 h-4 mr-2" />
          {description}
          {isCurrentMove && " (current)"}
        </Button>
      </li>
    )
  })

  const { winner } = calculateWinner(currentSquares)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCECDD] via-[#F3A26D]/10 to-[#FCECDD] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-8 bg-gradient-to-r from-[#00809D] to-[#00809D]/90 text-white border-0 shadow-2xl">
          <CardHeader className="text-center py-8">
            <CardTitle className="text-4xl font-bold flex items-center justify-center gap-3">
              <Trophy className="w-10 h-10" />
              Tic-Tac-Toe Championship
              <Trophy className="w-10 h-10" />
            </CardTitle>
            <p className="text-[#FCECDD] text-lg mt-2">Battle for victory in this classic strategy game!</p>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2 flex justify-center">
            <Card className="bg-[#FCECDD]/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Controls */}
            <Card className="bg-[#FCECDD]/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Game Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={resetGame}
                  className="w-full bg-gradient-to-r from-[#FF7601] to-[#F3A26D] hover:from-[#FF7601]/90 hover:to-[#F3A26D]/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Game
                </Button>
              </CardContent>
            </Card>

            {/* Game History */}
            <Card className="bg-[#FCECDD]/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Move History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {moves.length > 1 ? (
                    <ol className="list-none">{moves}</ol>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No moves yet. Start playing!</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Game Stats */}
            <Card className="bg-[#FCECDD]/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Game Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Moves:</span>
                    <span className="font-bold text-lg">{currentMove}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Game Status:</span>
                    <span className={`font-bold text-lg ${winner ? "text-[#FF7601]" : "text-[#00809D]"}`}>
                      {winner ? "Finished" : "In Progress"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-8 bg-gradient-to-r from-[#00809D] to-[#00809D]/90 text-white border-0 shadow-2xl">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-bold text-xl mb-3">🎮 How to Play</h3>
              <p className="text-[#FCECDD] leading-relaxed">
                Take turns placing your marks on the board. The first player to get 3 in a row (horizontally,
                vertically, or diagonally) wins the game! Use the move history to review previous turns or restart for a
                fresh challenge.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function calculateWinner(squares: (string | null)[]): { winner: string | null; line: number[] | null } {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] }
    }
  }
  return { winner: null, line: null }
}
