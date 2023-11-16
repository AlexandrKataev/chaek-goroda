import { StartPage } from '@pages';
import './app.css';

function App() {
  return (
    <div className="bg-blue-50 w-full h-screen flex flex-col justify-center items-center ">
      <div className="max-w-xl  bg-white rounded-2xl">
        <StartPage />
      </div>
    </div>
  );
}

export default App;
