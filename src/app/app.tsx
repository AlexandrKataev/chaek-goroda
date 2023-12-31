import { FinalPage, GamePage, HomePage } from '@pages';
import { useAppSelector } from './redux/hooks';
import { selectGameStatus } from '@features/game';

function App() {
  const gameStatus = useAppSelector(selectGameStatus);
  return (
    <div className="bg-blue-50 w-full h-screen flex flex-col justify-center items-center ">
      <div className="w-full sm:w-[576px] bg-white rounded-2xl">
        {!gameStatus && <HomePage />}
        {gameStatus === 'started' && <GamePage />}
        {(gameStatus === 'losed' || gameStatus === 'won') && <FinalPage />}
      </div>
    </div>
  );
}

export default App;
