import { useState } from 'react';
import {
  timeShedule as constShedule,
  timeSheduleType,
} from '../constants/schedule';

export const useFetchSheduleTime = (): [
  { shedule: timeSheduleType; loading: boolean; error: string | null },
  () => Promise<any>,
] => {
  const [shedule, setShedule] = useState<timeSheduleType>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getNewShedule = async () => {
    setLoading(true);
    try {
      // const response = await fetchTimeShedule('meat-and-filler', 1);
      // const timeShedule = await response.json();
      const timeShedule = constShedule;

      // if (!response.ok) {
      //   throw new Error(text.message || 'Something wrong in fetch');
      // }

      setShedule(timeShedule);
      setError(null);
      return timeShedule;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [{ shedule, loading, error }, getNewShedule];
};
