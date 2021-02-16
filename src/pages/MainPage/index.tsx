import React, { useState } from 'react';
import Select from 'react-select';
import { MainButton } from '../../components/MainButton';
import './styles.css';
import {
  shipRoutes,
  SelectOptionType,
  ShipRoutesType,
} from '../../constants/schedule';
import { ShipSheduleTime } from '../../containers/ShipSheduleTime';

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
      <Select
        value={selectedRoute}
        onChange={(selected) => setSelectedRoute(selected)}
        options={shipRoutes}
      />
      <ShipSheduleTime
        routeType={selectedRoute?.type}
        time={selectedTime}
        setTime={setSelectedTime}
        secondTime={selectedBackTime}
        setSecondTime={setSelectedBackTime}
      />

      {selectedRoute?.value}
      {selectedTime?.value}
      {selectedBackTime?.value}
      <MainButton onClick={() => console.log('ЕНЗУЫ')}>Type</MainButton>
    </div>
  );
};
