import { useAppDispatch } from '@app/redux/hooks';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useState, useEffect } from 'react';
import { losed } from '..';

dayjs.extend(duration);

export const useTimer = () => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState<string>('2:00');
  const [endTime, setEndTime] = useState<Dayjs>(dayjs().add(2, 'minutes'));

  useEffect(() => {
    const currentTime = dayjs();

    const diffTime = endTime.unix() - currentTime.unix();

    let dur = dayjs.duration(diffTime * 1000, 'milliseconds');

    if (currentTime.isAfter(endTime)) {
      dispatch(losed());
    }

    const interval = setInterval(() => {
      dur = dayjs.duration(dur.asMilliseconds() - 1000, 'milliseconds');
      let timestamp = `${dur.minutes()}:${
        dur.seconds() < 10 ? '0' + dur.seconds() : dur.seconds()
      }`;
      setTime(timestamp);
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime, time]);

  return { time, setEndTime, setTime };
};
