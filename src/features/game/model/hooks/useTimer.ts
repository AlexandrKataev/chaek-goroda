import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useState, useEffect } from 'react';

dayjs.extend(duration);

export const useTimer = () => {
  const [time, setTime] = useState<string>('2:00');
  const [endTime, setEndTime] = useState<Dayjs>(dayjs().add(2, 'minutes'));

  useEffect(() => {
    const currentTime = dayjs();
    const diffTime = endTime.unix() - currentTime.unix();

    let dur = dayjs.duration(diffTime * 1000, 'milliseconds');

    const interval = setInterval(() => {
      dur = dayjs.duration(dur.asMilliseconds() - 1000, 'milliseconds');
      let timestamp = `${dur.minutes()}:${dur.seconds()}`;
      setTime(timestamp);
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return { time, setEndTime, setTime };
};
