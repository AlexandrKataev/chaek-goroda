import { FinalPage, GamePage, StartPage } from '@pages';
import './app.css';
import { useAppSelector } from './redux/hooks';
import { selectGameStatus } from '@features/game';

function App() {
  const gameStatus = useAppSelector(selectGameStatus);
  return (
    <div className="bg-blue-50 w-full h-screen flex flex-col justify-center items-center ">
      <div className="max-w-xl  bg-white rounded-2xl">
        {!gameStatus && <StartPage />}
        {gameStatus === 'started' && <GamePage />}
        {(gameStatus === 'losed' || gameStatus === 'won') && <FinalPage />}
        {/* <FinalPage /> */}
      </div>
    </div>
  );
}

export default App;
