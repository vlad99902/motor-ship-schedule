import { useState } from 'react';
import {
  timeSchedule as constSchedule,
  timeScheduleType,
} from '../constants/schedule';

export const useFetchScheduleTime = (): [
  { schedule: timeScheduleType; loading: boolean; error: string | null },
  () => Promise<any>,
] => {
  const [schedule, setSchedule] = useState<timeScheduleType>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getNewSchedule = async () => {
    setLoading(true);
    try {
      // const response = await fetchTimeSchedule('meat-and-filler', 1);
      // const timeSchedule = await response.json();
      const timeSchedule = constSchedule;

      // if (!response.ok) {
      //   throw new Error(text.message || 'Something wrong in fetch');
      // }

      setSchedule(timeSchedule);
      setError(null);
      return timeSchedule;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [{ schedule, loading, error }, getNewSchedule];
};
