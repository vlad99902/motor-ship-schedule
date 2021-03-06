import React, { useEffect, useState } from "react";
import Select from "react-select";
import { SelectOptionType, timeScheduleType } from "../../constants/schedule";
import { useFetchScheduleTime } from "../../hooks/useFetchScheduleTime";
import "./styles.css";
import { setTimeToLocalTimeZone } from "../../utils/dateAndTime";

type ShipScheduleTimeType = {
  routeType: number | undefined;
  routeName: string | undefined;
  time: SelectOptionType | null;
  setTime: (arg0: SelectOptionType | null) => void;
  secondTime: SelectOptionType | null;
  setSecondTime: (arg0: SelectOptionType | null) => void;
  timerToOneDirectionTripInMinutes: number;
};

/**
 * Компонент для определения времени путешествия
 * @param param0
 */
export const ShipScheduleTime: React.FC<ShipScheduleTimeType> = ({
  routeType,
  routeName,
  time,
  setTime,
  secondTime,
  setSecondTime,
  timerToOneDirectionTripInMinutes,
}) => {
  //получение расписания поездок с сервера
  const [timeSchedule, getNewSchedule] = useFetchScheduleTime();
  const { schedule, loading, error } = timeSchedule;

  //перевод всего расписания в локальный часовой пояс
  const [
    localTimeZoneSchedule,
    setLocalTimeZoneSchedule,
  ] = useState<timeScheduleType>(schedule);

  //отфильтрованный список времени обратного пути, основываясь на выборе времени "туда"
  const [filteredSecondSchedule, setFilteredSecondSchedule] = useState(
    schedule[1],
  );

  //получение данных при загрузке страницы
  useEffect(() => {
    getNewSchedule();
  }, []);

  useEffect(() => {
    setLocalTimeZoneSchedule(setScheduleToLocalTimeZone(schedule));
  }, [schedule]);

  useEffect(() => {
    setTime(null);
    setSecondTime(null);
    setFilteredSecondSchedule(localTimeZoneSchedule[1]);
  }, [routeType]);

  /**
   * Установка времени в локальный формат
   * @param schedule
   */
  const setScheduleToLocalTimeZone = (schedule: timeScheduleType) => {
    return schedule.map((oneDirSchedule) =>
      oneDirSchedule.map((time) => {
        return {
          time: time.id,
          value: setTimeToLocalTimeZone(time.value),
          label: setTimeToLocalTimeZone(time.label),
        };
      }),
    );
  };

  /**
   * Фильтрация списка времени обратной поездки, по выбранному времени "туда"
   * @param secondSchedule
   * @param selectedTime
   * @param tripDuration
   */
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

  /**
   * Обработчик при измении времени обратной поездки
   * @param selected
   */
  const onChageTimeRouteTypeTwo = (selected: SelectOptionType | null) => {
    setTime(selected);

    const filteredSchedule = filterSecondSchedule(
      localTimeZoneSchedule[1],
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

  //проверка на загрузку
  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }
  //проверка на ошибку при загрузке данных
  if (error) {
    return <h1 className="error">{error}...</h1>;
  }

  return (
    <section className="select-section">
      <h1 className="select-section__header">Выберите время {routeName}:</h1>
      <div className="select-section__content"></div>

      {routeType !== 2 ? (
        <Select
          isDisabled={!routeType && routeType !== 0}
          value={time}
          onChange={(selected) => setTime(selected)}
          options={
            ((routeType || routeType === 0) &&
              localTimeZoneSchedule[routeType]) ||
            []
          }
        />
      ) : (
        <div className="select-section__content--flex">
          <div className="select-section__selects">
            <Select
              value={time}
              onChange={onChageTimeRouteTypeTwo}
              options={localTimeZoneSchedule[0]}
            />
          </div>
          <div className="select-section__selects">
            <Select
              value={secondTime}
              onChange={(selected) => setSecondTime(selected)}
              options={filteredSecondSchedule || localTimeZoneSchedule[1]}
            />
          </div>
        </div>
      )}
    </section>
  );
};
