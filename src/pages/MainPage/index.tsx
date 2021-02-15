import React, { useState } from 'react';
import Select from 'react-select';
import { MainButton } from '../../components/MainButton';
import './styles.css';
import {
  shipRoutes,
  SelectOptionType,
  scheduleFromAToB,
  scheduleFromBToA,
} from '../../constants/schedule';

export const MainPage: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<SelectOptionType | null>(
    null,
  );
  const [
    selectedTimeOneDirectionTrip,
    setSelectedTimeOneDirectionTrip,
  ] = useState<SelectOptionType | null>(null);

  const showSelectsBySelectedRoutes = (
    routeId: number | undefined,
  ): React.ReactFragment => {
    if (routeId === 0)
      return (
        <Select
          value={selectedTimeOneDirectionTrip}
          onChange={(selected) => setSelectedTimeOneDirectionTrip(selected)}
          options={scheduleFromAToB}
        />
      );
    else if (routeId === 1)
      return (
        <Select
          value={selectedTimeOneDirectionTrip}
          onChange={(selected) => setSelectedTimeOneDirectionTrip(selected)}
          options={scheduleFromBToA}
        />
      );

    return <></>;
  };
  return (
    <div className="container">
      <Select
        value={selectedRoute}
        onChange={(selected) => setSelectedRoute(selected)}
        options={shipRoutes}
      />
      {showSelectsBySelectedRoutes(selectedRoute?.id)}
      {selectedRoute?.value}
      {selectedTimeOneDirectionTrip?.value}
      <MainButton onClick={() => console.log('ЕНЗУЫ')}>Type</MainButton>
    </div>
  );
};
