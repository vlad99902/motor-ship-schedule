import React, { useState } from 'react';
import Select from 'react-select';
import { MainButton } from '../../components/MainButton';
import './styles.css';
import {
  shipRoutes,
  SelectOptionType,
  ShipRoutesType,
} from '../../constants/schedule';
import { ShipScheduleTime } from '../../containers/ShipScheduleTime';
import '../../containers/ShipScheduleTime/styles.css';

export const MainPage: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<ShipRoutesType | null>(
    null,
  );
  const [selectedTime, setSelectedTime] = useState<SelectOptionType | null>(
    null,
  );
  const [
    selectedBackTime,
    setSelectedBackTime,
  ] = useState<SelectOptionType | null>(null);

  return (
    <div className="container">
      <section className="select-section">
        <h1 className="select-section__header">
          Выберите направление маршрута:
        </h1>
        <Select
          value={selectedRoute}
          onChange={(selected) => setSelectedRoute(selected)}
          options={shipRoutes}
        />
      </section>
      <ShipScheduleTime
        routeType={selectedRoute?.type}
        routeName={selectedRoute?.label}
        time={selectedTime}
        setTime={setSelectedTime}
        secondTime={selectedBackTime}
        setSecondTime={setSelectedBackTime}
      />

      <MainButton onClick={() => console.log('Рассчитать стоимость')}>
        Рассчитать стоимость
      </MainButton>
    </div>
  );
};
