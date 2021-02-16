import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { MainButton } from '../../components/MainButton';
import {
  ShipRoutesType,
  ticketOneDirectionPrice,
  ticketTwoDirectionsPrice,
  timerToOneDirectionTripInMinutes,
} from '../../constants/schedule';
import { timeStampToHumanReadble } from '../../utils/dateAndTime';

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

      <div>
        <div>Поездка {ticketInfo?.route?.value}</div>
        <hr />
        <div>Количество билетов: {ticketInfo?.quantity}</div>
        <div>Стоимость:{ticketInfo?.price}</div>
        <hr />
        <div>Время начала поездки: {ticketInfo?.time}</div>
        <div>Время окончания поездки: {ticketInfo?.endTripTime}</div>
        {ticketInfo?.secondTime && (
          <>
            <hr />
            <div>Время начала обратной поездки: {ticketInfo.secondTime}</div>
            <div>
              Время окончания обратной поездки: {ticketInfo?.endSecondTripTime}
            </div>
          </>
        )}
      </div>
    </>
  );
};
