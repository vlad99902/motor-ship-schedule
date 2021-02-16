import React, { useEffect } from 'react';
import Select from 'react-select';
import { SelectOptionType } from '../../constants/schedule';
import { useFetchSheduleTime } from '../../hooks/useFetchScheduleTime';

type ShipSheduleTimeType = {
  routeType: number | undefined;
  time: SelectOptionType | null;
  setTime: (arg0: SelectOptionType | null) => void;
  secondTime: SelectOptionType | null;
  setSecondTime: (arg0: SelectOptionType | null) => void;
};

export const ShipSheduleTime: React.FC<ShipSheduleTimeType> = ({
  routeType,
  time,
  setTime,
  secondTime,
  setSecondTime,
}) => {
  const [timeShedule, getNewShedule] = useFetchSheduleTime();
  const { shedule, loading, error } = timeShedule;

  useEffect(() => {
    getNewShedule();
  }, []);

  useEffect(() => {
    setTime(null);
    setSecondTime(null);
  }, [routeType]);

  return (
    <>
      {!loading && (
        <>
          {routeType === 0 && (
            <Select
              value={time}
              onChange={(selected) => setTime(selected)}
              options={shedule[routeType]}
            />
          )}
          {routeType === 1 && (
            <Select
              value={time}
              onChange={(selected) => setTime(selected)}
              options={shedule[routeType]}
            />
          )}
          {routeType === 2 && (
            <>
              <Select
                value={time}
                onChange={(selected) => setTime(selected)}
                options={shedule[0]}
              />
              <Select
                value={secondTime}
                onChange={(selected) => setSecondTime(selected)}
                options={shedule[1]}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
