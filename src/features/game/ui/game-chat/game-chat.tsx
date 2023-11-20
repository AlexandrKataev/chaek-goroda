import { ProgressBar } from '@shared/ui';

import {
  selectIsPlayersTurn,
  selectLastNamedCity,
  selectNamedCities,
  selectNotNamedCities,
  sendCity,
  useTimer,
  won,
} from '@features/game';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { findCityByLetter, formatName, getLastLetter } from '@shared/helpers';
import dayjs from 'dayjs';
import { citiesData } from '@shared/data';
import { CityRow } from '@entities/city';
import { SendIcon } from '@shared/icons';

import sound from '@shared/sounds/sound.mp3';
import sound2 from '@shared/sounds/sound1.wav';

export const GameChat = () => {
  const { time, setEndTime, setTime } = useTimer();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  const namedCities = useAppSelector(selectNamedCities);
  const notNamedCities = useAppSelector(selectNotNamedCities);

  const lastNamedCity = useAppSelector(selectLastNamedCity);
  const isPlayersTurn = useAppSelector(selectIsPlayersTurn);

  // нажатие на "отправить город"
  const onClickSendCity = () => {
    if (inputValue === '') {
      return;
    }
    if (lastNamedCity && inputValue[0].toLowerCase() !== getLastLetter(lastNamedCity)) {
      alert('Город не найден');
      return;
    }
    if (namedCities.filter((el) => el.toLowerCase() === inputValue.toLowerCase()).length) {
      alert('Город уже был');
      return;
    }

    if (!citiesData.filter((el) => el.toLowerCase() === inputValue.toLowerCase()).length) {
      alert('Я не знаю такого города');
      return;
    }
    const formattedName = formatName(inputValue);
    if (notNamedCities.find((el) => el.toLowerCase() === inputValue.toLowerCase())) {
      dispatch(sendCity(formattedName));
      setInputValue('');
      setTime('2:00');
      setEndTime(dayjs().add(2, 'minutes'));
      new Audio(sound2).play();
    }
  };

  // отправка города по Enter
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      onClickSendCity();
    }
  };

  // ход ии с задержкой в 5 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isPlayersTurn && lastNamedCity) {
        const res = findCityByLetter(getLastLetter(lastNamedCity), notNamedCities);
        res !== 'won' ? dispatch(sendCity(res)) : dispatch(won());
        setEndTime(dayjs().add(2, 'minutes'));
        setTime('2:00');
        new Audio(sound).play();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isPlayersTurn, lastNamedCity]);

  // прокручивание скроллбара вниз при ответе
  useEffect(() => {
    ref.current && ref.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef.current && inputRef.current.focus();
  }, [namedCities]);

  // инпут
  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <>
      <header className="  p-4 text-base font-normal flex justify-between items-center ">
        <div>Сейчас ваша очередь</div>
        <div className="text-xl font-semibold">{time}</div>
      </header>

      <ProgressBar isPlayersTurn={isPlayersTurn} />

      <main className="h-[320px] mt-3 w-full overflow-y-scroll snap-end scrollbar-thumb-violet-600 scrollbar-track-white scrollbar-thin">
        {!lastNamedCity && (
          <div className="p-4  mt-[150px] text-gray-400 flex flex-col justify-center items-center">
            <div>Первый участник вспоминает города...</div>
          </div>
        )}

        <div className="flex flex-col p-4">
          {namedCities?.map((el, i) => {
            return (
              <CityRow
                key={i}
                className={
                  i % 2 === 0
                    ? 'bg-violet-600 justify-self-end text-white px-3 py-1.5 rounded-t-xl rounded-bl-xl'
                    : 'bg-violet-50 text-gray-700 justify-self-start px-3 py-1.5 rounded-t-xl rounded-br-xl'
                }
                name={el}
              />
            );
          })}
        </div>

        <div ref={ref} />
      </main>
      <footer className={'p-4 ' + (isPlayersTurn ? 'text-gray-700 ' : 'text-gray-400 ')}>
        <div className="p-3 bg-gray-100 flex justify-between items-center rounded-md">
          <input
            ref={inputRef}
            placeholder={
              isPlayersTurn
                ? namedCities.length && isPlayersTurn
                  ? `Знаете город на букву “${getLastLetter(lastNamedCity || '')}”?`
                  : 'Напишите любой город, например: Где вы живете?'
                : 'Ожидаем ответа соперника...'
            }
            value={inputValue}
            onChange={(e) => onChangeInput(e)}
            disabled={!isPlayersTurn}
            onKeyDown={handleKeyPress}
            autoFocus
          />

          <div
            className="rounded-md bg-violet-600 w-[32px] h-[32px] flex justify-center items-center"
            onClick={onClickSendCity}>
            <SendIcon />
          </div>
        </div>
      </footer>
    </>
  );
};
