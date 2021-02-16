import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { MainButton } from '../../components/MainButton';
import {
  ShipRoutesType,
  ticketOneDirectionPrice,
  ticketTwoDirectionsPrice,
  timerToOneDirectionTripInMinutes,
} from '../../constants/schedule';
import { timeStampToHumanReadble, tripDuratin } from '../../utils/dateAndTime';
import './styles.css';

type TicketInfoType = {
  time: string | undefined;
  secondTime: string | undefined;
  route: ShipRoutesType | null;
};

export const TicketInfo: React.FC<TicketInfoType> = ({
  time,
  secondTime,
  route,
}) => {
  const [ticketsCount, setTicketsCount] = useState(0);
  const [ticketInfo, setTicketInfo] = useState<{
    route: ShipRoutesType | null;
    quantity: number | null;
    price: number | undefined;
    endTripTime: string;
    endSecondTripTime?: string;
    time?: string;
    secondTime?: string;
  }>({
    route: null,
    quantity: null,
    price: undefined,
    endTripTime: '',
  });

  const [inputValid, setInputValid] = useState(true);
  const inputChangeHandler = (event: any) => {
    setTicketsCount(event.target.value);
    isInputValid(event.target.value);
  };

  const ticketsPrice = (
    ticketsCount: number,
    ticketOneDirectionPrice: number,
    ticketTowDirectionsPrice: number,
    time: string | undefined,
    secondTime: string | undefined,
  ): number | undefined => {
    if (time)
      if (!secondTime) {
        return ticketsCount * ticketOneDirectionPrice;
      } else return ticketsCount * ticketTowDirectionsPrice;
  };

  const endTripTime = (startTripTime: string, duration: number): string => {
    return timeStampToHumanReadble(
      new Date(+new Date(startTripTime) + duration * 60 * 1000),
    );
  };

  const submitClickHandler = (
    ticketOneDirectionPrice: number,
    ticketTwoDirectionsPrice: number,
    timerToOneDirectionTripInMinutes: number,
  ): void => {
    setTicketInfo({
      route,
      quantity: ticketsCount,
      price: ticketsPrice(
        ticketsCount,
        ticketOneDirectionPrice,
        ticketTwoDirectionsPrice,
        time,
        secondTime,
      ),
      endTripTime: endTripTime(time!, timerToOneDirectionTripInMinutes),
      endSecondTripTime: endTripTime(
        secondTime!,
        timerToOneDirectionTripInMinutes,
      ),
      time,
      secondTime,
    });
  };

  const submitDisabled = (
    time: string | undefined,
    secondTime: string | undefined,
    route: ShipRoutesType | null,
    quantity: number,
  ): boolean => {
    if (
      !quantity ||
      quantity <= 0 ||
      !time ||
      !route ||
      (route?.type === 2 && !secondTime)
    )
      return true;
    return false;
  };

  const isInputValid = (quantity: number) => {
    setInputValid(!(!quantity || quantity <= 0));
  };

  return (
    <>
      <section className="select-section">
        <h1 className="select-section__header">
          Выберите количество билетов:{' '}
        </h1>
        <div className="select-section__content">
          <InputField
            id="num"
            type="number"
            isValid={inputValid}
            onChange={inputChangeHandler}
          />
          <MainButton
            disabled={submitDisabled(time, secondTime, route, ticketsCount)}
            onClick={() => {
              submitClickHandler(
                ticketOneDirectionPrice,
                ticketTwoDirectionsPrice,
                timerToOneDirectionTripInMinutes,
              );
            }}
          >
            Посчитать
          </MainButton>
        </div>
      </section>
      <section className="trip-info">
        <h1 className="trip-info__header">Информация о выбранных билетах</h1>
        <hr />
        <div className="trip-info__content">
          Поездка {ticketInfo?.route?.value}
          <hr />
          <h3>Количество билетов: {ticketInfo?.quantity}</h3>
          <h3>Стоимость: {ticketInfo?.price}</h3>
          <hr />
          <h3>Время начала поездки: {ticketInfo?.time}</h3>
          <h3>Время окончания поездки: {ticketInfo?.endTripTime}</h3>
          <h3>
            Поездка займет:
            {ticketInfo.endTripTime &&
              ticketInfo.time &&
              tripDuratin(ticketInfo.time, ticketInfo.endTripTime)}
          </h3>
          {ticketInfo?.secondTime && (
            <>
              <hr />
              <h3>Время начала обратной поездки: {ticketInfo.secondTime}</h3>
              <h3>
                Время окончания обратной поездки:{' '}
                {ticketInfo?.endSecondTripTime}
              </h3>
              <h3>
                Обратная поездка займет:
                {ticketInfo.endSecondTripTime &&
                  tripDuratin(
                    ticketInfo.secondTime,
                    ticketInfo.endSecondTripTime,
                  )}
              </h3>
              <hr />
              <h3>
                Все путешествие займет:
                {ticketInfo.endSecondTripTime &&
                  ticketInfo.time &&
                  tripDuratin(ticketInfo.time, ticketInfo.endSecondTripTime)}
              </h3>
            </>
          )}
        </div>
      </section>
    </>
  );
};
