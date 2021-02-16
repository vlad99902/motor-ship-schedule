import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  SelectOptionType,
  timerToOneDirectionTripInMinutes,
} from '../../constants/schedule';
import { useFetchScheduleTime } from '../../hooks/useFetchScheduleTime';
import './styles.css';

type ShipScheduleTimeType = {
  routeType: number | undefined;
  routeName: string | undefined;
  time: SelectOptionType | null;
  setTime: (arg0: SelectOptionType | null) => void;
  secondTime: SelectOptionType | null;
  setSecondTime: (arg0: SelectOptionType | null) => void;
};

export const ShipScheduleTime: React.FC<ShipScheduleTimeType> = ({
  routeType,
  routeName,
  time,
  setTime,
  secondTime,
  setSecondTime,
}) => {
  const [timeSchedule, getNewSchedule] = useFetchScheduleTime();
  const { schedule, loading, error } = timeSchedule;

  const [filteredSecondSchedule, setFilteredSecondSchedule] = useState(
    schedule[1],
  );

  useEffect(() => {
    getNewSchedule();
  }, []);

  useEffect(() => {
    setTime(null);
    setSecondTime(null);
    setFilteredSecondSchedule(schedule[1]);
  }, [routeType]);

  const filterSecondSchedule = (
    secondSchedule: SelectOptionType[],
    selectedTime: string | undefined,
    tripDuration: number,
  ) => {
    let selectedTimeDate = 0;
    if (selectedTime) {
      selectedTimeDate = +new Date(selectedTime);
      selectedTimeDate = selectedTimeDate + tripDuration * 60 * 1000;
    }

    return secondSchedule.filter((time) => {
      let dateToCompare = 0;
      if (time.value) {
        dateToCompare = +new Date(time.value);
      }
      if (dateToCompare > selectedTimeDate) return true;
      return false;
    });
  };

  const onChageTimeRouteTypeTwo = (selected: SelectOptionType | null) => {
    setTime(selected);

    const filteredSchedule = filterSecondSchedule(
      schedule[1],
      selected?.value,
      timerToOneDirectionTripInMinutes,
    );
    setFilteredSecondSchedule(filteredSchedule);

    const secondSelectedExists = filteredSchedule.find(
      (el) => el.value === secondTime?.value,
    );

    !secondSelectedExists
      ? setSecondTime(null)
      : setSecondTime(secondSelectedExists);
  };

  return (
    <>
      {!loading && (
        <section className="select-section">
          <h1 className="select-section__header">
            Выберите время {routeName}:
          </h1>
          <div className="select-section__content"></div>

          {routeType !== 2 ? (
            <Select
              isDisabled={!routeType && routeType !== 0}
              value={time}
              onChange={(selected) => setTime(selected)}
              options={
                ((routeType || routeType === 0) && schedule[routeType]) || []
              }
            />
          ) : (
            <div className="select-section__content--flex">
              <div className="select-section__selects">
                <Select
                  value={time}
                  onChange={onChageTimeRouteTypeTwo}
                  options={schedule[0]}
                />
              </div>
              <div className="select-section__selects">
                <Select
                  value={secondTime}
                  onChange={(selected) => setSecondTime(selected)}
                  options={filteredSecondSchedule || schedule[1]}
                />
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};
