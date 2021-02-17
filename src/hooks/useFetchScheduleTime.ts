import { fetchSchedule } from './../api/fetchSchedule';
import { useState } from 'react';
import { timeScheduleType } from '../constants/schedule';

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
      const response = await fetchSchedule();
      const timeSchedule = await response.json();

      if (!response.ok) {
        throw new Error(timeSchedule.message || 'Something wrong in fetch');
      }

      setSchedule(timeSchedule.schedule);
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
