import { useGame } from "./game-context";
import GameScreen from "./screens/game-screen";
import EntryScreen from "./screens/entry-screen";
import FeedbackScreen from "./screens/feedback-screen";

export default function GameViewRouter() {
  const { gameState, feedback } = useGame();

  if (
    feedback &&
    gameState !== "entry" &&
    gameState !== "indicator" &&
    gameState !== "waiting"
  ) {
    return <FeedbackScreen />;
  }
  if (gameState === "indicator" || gameState === "waiting") {
    return <GameScreen />;
  }
  return <EntryScreen />;
}
