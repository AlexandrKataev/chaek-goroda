import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { selectIsPlayersTurn, selectLastNamedCity, selectNamedCities, start } from '@features/game';

const messages = {
  bad: 'Ничего, попробуйте еще раз!',
  good: 'Очень не плохой результат!',
};

export const FinalPage = () => {
  const dispatch = useAppDispatch();

  const citiesCount = useAppSelector(selectNamedCities).length;
  const lastNamedCity = useAppSelector(selectLastNamedCity);
  const isPlayersTurn = useAppSelector(selectIsPlayersTurn);

  const onClickStart = () => {
    dispatch(start());
  };

  return (
    <div className="w-[576px] text-center flex flex-col gap-6 p-10">
      <div className="text-xl">
        {isPlayersTurn ? (
          <>
            К сожалению твое время вышло!
            <br /> Твой противник победил!
          </>
        ) : (
          <>
            Поздравляем тебя с победой!
            <br /> Твой противник не вспомнил нужный город!
          </>
        )}
      </div>
      <div
        className={'text-3xl font-medium ' + (isPlayersTurn ? 'text-red-600' : 'text-green-600')}>
        00:00
      </div>
      <div>
        Всего было перечислено городов: {citiesCount} <br />
        {isPlayersTurn ? messages.bad : messages.good}
      </div>
      {!!citiesCount && (
        <>
          <div>Последний город названный победителем</div>
          <div className="text-3xl  font-medium">{lastNamedCity}</div>
        </>
      )}
      <button
        onClick={onClickStart}
        className=" rounded mx-auto py-[8px] px-[16px] text-base font-medium bg-violet-600 text-white">
        Начать новую игру
      </button>
    </div>
  );
};
