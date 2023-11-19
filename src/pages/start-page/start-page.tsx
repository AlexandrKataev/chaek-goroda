import { useAppDispatch } from '@app/redux/hooks';
import { start } from '@features/game';

export const StartPage = () => {
  const dispatch = useAppDispatch();
  const onClickStart = () => {
    dispatch(start());
  };
  return (
    <div className="w-[576px] break-words">
      <header className="p-4 text-base font-normal flex justify-center border-b-[3px]">
        Игра в города на время
      </header>

      <main className="p-[24px] text-gray-700 text-sm flex flex-col align-middle">
        <div className="py-[24px]">
          <div className="">Цель: Назвать как можно больше реальных городов.</div>
          <ul>
            <li>- Запрещается повторение городов.</li>

            <li>
              - Названий городов на "ы", твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы
              пропускаем эту букву и игрок должен назвать город на букву стоящую перед "ы", "ъ" или
              "ь".
            </li>
            <li className="">
              - Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит
              слово он считается проигравшим
            </li>
          </ul>
        </div>

        <button
          onClick={onClickStart}
          className=" rounded mx-auto py-[8px] px-[16px] text-base font-medium bg-violet-600 text-white">
          Начать игру
        </button>
      </main>
    </div>
  );
};
