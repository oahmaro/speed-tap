import React, {
  FC,
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type IndicatorSide = "left" | "right";
export type GameState = "entry" | "waiting" | "indicator";
export type Feedback = "success" | "wrong" | "tooSoon" | "tooLate" | null;

interface GameContextType {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  indicatorSide: IndicatorSide | null;
  setIndicatorSide: Dispatch<SetStateAction<IndicatorSide | null>>;
  feedback: Feedback;
  setFeedback: Dispatch<SetStateAction<Feedback>>;
  steps: number;
  setSteps: Dispatch<SetStateAction<number>>;
  indicatorProgress: number;
  setIndicatorProgress: Dispatch<SetStateAction<number>>;
  startGame: () => void;
  reset: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [gameState, setGameState] = useState<GameState>("entry");
  const [indicatorSide, setIndicatorSide] = useState<IndicatorSide | null>(
    null
  );
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [steps, setSteps] = useState(0);
  const [indicatorProgress, setIndicatorProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const waitingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start the game: go to waiting, then indicator
  const startGame = useCallback(() => {
    setGameState("waiting");
    setFeedback(null);
    setIndicatorProgress(0);
    // Clear any previous timeout
    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current);
      waitingTimeoutRef.current = null;
    }
    // Wait 2-5 seconds, then show indicator
    const delay = 2000 + Math.random() * 3000;
    waitingTimeoutRef.current = setTimeout(() => {
      // Randomly pick left or right
      const side: IndicatorSide = Math.random() < 0.5 ? "left" : "right";
      setIndicatorSide(side);
      setGameState("indicator");
      waitingTimeoutRef.current = null;
    }, delay);
  }, []);

  // Animate indicator progress (for fading)
  useEffect(() => {
    if (gameState !== "indicator" || feedback) {
      setIndicatorProgress(0);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    let start: number | null = null;
    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / 1000, 1); // 1s duration
      setIndicatorProgress(progress);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gameState, feedback]);

  // Handle keypress during waiting state (Too Soon)
  useEffect(() => {
    if (gameState !== "waiting") return;
    const handleKey = () => {
      if (!feedback) setFeedback("tooSoon");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState, feedback]);

  // After 'tooSoon' feedback, restart game
  useEffect(() => {
    if (feedback !== "tooSoon") return;
    const timeout = setTimeout(() => {
      startGame();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [feedback, startGame]);

  // Handle keypress during indicator state
  useEffect(() => {
    if (gameState !== "indicator" || !indicatorSide) return;

    const handleKey = (e: KeyboardEvent) => {
      if (feedback) return; // Ignore if feedback is already shown
      if (
        (indicatorSide === "left" && e.key.toLowerCase() === "a") ||
        (indicatorSide === "right" && e.key.toLowerCase() === "l")
      ) {
        setFeedback("success");
      } else {
        setFeedback("wrong");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState, indicatorSide, feedback]);

  // After 1s, if no feedback, set feedback to 'tooLate'
  useEffect(() => {
    if (gameState !== "indicator" || feedback) return;
    const timeout = setTimeout(() => {
      setFeedback("tooLate");
    }, 1000);
    return () => clearTimeout(timeout);
  }, [gameState, feedback]);

  // On success, increment steps and POST to backend (fixed loop)
  useEffect(() => {
    if (feedback !== "success" || !username) return;
    setSteps((prevSteps) => {
      const newSteps = prevSteps + 1;
      fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, steps: newSteps }),
      });
      return newSteps;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback, username]);

  // After feedback (except tooSoon), restart game (go to waiting state)
  useEffect(() => {
    if (!feedback || feedback === "tooSoon") return;
    const timeout = setTimeout(() => {
      startGame();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [feedback, startGame]);

  // Reset to entry state (if needed)
  const reset = () => {
    setUsername("");
    setGameState("entry");
    setIndicatorSide(null);
    setFeedback(null);
    setSteps(0);
    setIndicatorProgress(0);
    // Cancel any pending waiting->indicator timeout
    if (waitingTimeoutRef.current) {
      clearTimeout(waitingTimeoutRef.current);
      waitingTimeoutRef.current = null;
    }
  };

  const value: GameContextType = {
    username,
    setUsername,
    gameState,
    setGameState,
    indicatorSide,
    setIndicatorSide,
    feedback,
    setFeedback,
    steps,
    setSteps,
    indicatorProgress,
    setIndicatorProgress,
    startGame,
    reset,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
