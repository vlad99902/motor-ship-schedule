import React, { useState } from "react";
import Select from "react-select";
import "./styles.css";
import {
  shipRoutes,
  SelectOptionType,
  ShipRoutesType,
  timerToOneDirectionTripInMinutes,
  ticketOneDirectionPrice,
  ticketTwoDirectionsPrice,
} from "../../constants/schedule";
import { ShipScheduleTime } from "../../containers/ShipScheduleTime";
import "../../containers/ShipScheduleTime/styles.css";
import { TicketInfo } from "../../containers/TicketInfo";

/**
 * Главная страница приложения
 */
export const MainPage: React.FC = () => {
  //путь выбранный пользователем
  const [selectedRoute, setSelectedRoute] = useState<ShipRoutesType | null>(
    null,
  );
  //время выбранное пользователем
  const [selectedTime, setSelectedTime] = useState<SelectOptionType | null>(
    null,
  );
  //время обратной поездки, если пользователь выбрал обратную поездку
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
        timerToOneDirectionTripInMinutes={timerToOneDirectionTripInMinutes}
      />
      <TicketInfo
        ticketOneDirectionPrice={ticketOneDirectionPrice}
        ticketTwoDirectionsPrice={ticketTwoDirectionsPrice}
        timerToOneDirectionTripInMinutes={timerToOneDirectionTripInMinutes}
        route={selectedRoute}
        time={selectedTime?.value}
        secondTime={selectedBackTime?.value}
      />
    </div>
  );
};
