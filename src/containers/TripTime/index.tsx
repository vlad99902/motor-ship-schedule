import React from 'react';
import { tripDuratin } from '../../utils/dateAndTime';
import './styles.css';

export const TripTime: React.FC<{ time: string; endTime: string }> = ({
  time,
  endTime,
}) => {
  return (
    <>
      <div className="trip-time">
        <div className="trip-time__times">
          <div className="trip-time__start-end">
            <h3>Время начала: </h3>
            <span>{time}</span>
          </div>

          <div className="trip-time__start-end">
            <h3>Время окончания: </h3>
            <span>{endTime}</span>
          </div>
        </div>
        <div>
          <h3>Поездка займет:</h3>
          <span>{endTime && tripDuratin(time, endTime)}</span>
        </div>
      </div>
    </>
  );
};
