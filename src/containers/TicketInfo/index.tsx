import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { MainButton } from "../../components/MainButton";
import { ShipRoutesType, TicketInfoFullType } from "../../constants/schedule";
import { timeStampToHumanReadble, tripDuratin } from "../../utils/dateAndTime";
import "./styles.css";
import { TripTime } from "../TripTime";

type TicketInfoType = {
  time: string | undefined;
  secondTime: string | undefined;
  route: ShipRoutesType | null;
  ticketOneDirectionPrice: number;
  ticketTwoDirectionsPrice: number;
  timerToOneDirectionTripInMinutes: number;
};

/**
 * Вывод информации о выбранной поездке
 * @param param0
 */
export const TicketInfo: React.FC<TicketInfoType> = ({
  time,
  secondTime,
  route,
  ticketOneDirectionPrice,
  ticketTwoDirectionsPrice,
  timerToOneDirectionTripInMinutes,
}) => {
  //подсчет выбранного количества билетов
  const [ticketsCount, setTicketsCount] = useState(0);
  //полная информация о заказе
  const [ticketInfo, setTicketInfo] = useState<TicketInfoFullType>({
    route: null,
    quantity: null,
    price: undefined,
    endTripTime: "",
  });

  //проверка input на валидность
  const [inputValid, setInputValid] = useState(true);
  //функция на изменении input количества билетов
  const inputChangeHandler = (event: any) => {
    setTicketsCount(event.target.value);
    isInputValid(event.target.value);
  };

  /**
   * подсчет итоговой цены билета
   * @param ticketsCount
   * @param ticketOneDirectionPrice
   * @param ticketTowDirectionsPrice
   * @param time
   * @param secondTime
   */
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

  /**
   * Время окончания поездки
   * @param startTripTime
   * @param duration
   */
  const endTripTime = (startTripTime: string, duration: number): string => {
    return timeStampToHumanReadble(
      new Date(+new Date(startTripTime) + duration * 60 * 1000),
    );
  };

  /**
   * Функция на нажатие кнопки "посчитать"
   * @param ticketOneDirectionPrice
   * @param ticketTwoDirectionsPrice
   * @param timerToOneDirectionTripInMinutes
   */
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

  /**
   * Функция на проверку валидности данных
   * @param time
   * @param secondTime
   * @param route
   * @param quantity
   */
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

  /**
   * Проверка на валидность input
   * @param quantity
   */
  const isInputValid = (quantity: number) => {
    setInputValid(!(!quantity || quantity <= 0));
  };

  return (
    <>
      <section className="select-section">
        <h1 className="select-section__header">
          Выберите количество билетов:{" "}
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
          Поездка <span>{ticketInfo?.route?.value}</span>
          <hr />
          <h3>
            Количество билетов: <span>{ticketInfo?.quantity}</span>
          </h3>
          <h3>
            Стоимость: <span>{ticketInfo?.price}</span>
          </h3>
          {ticketInfo.time && (
            <>
              <hr />
              <TripTime
                time={ticketInfo?.time}
                endTime={ticketInfo?.endTripTime}
              />
            </>
          )}
          {ticketInfo?.secondTime && ticketInfo?.endSecondTripTime && (
            <>
              <hr />
              <h2 className="trip-info__back-direction">Обратная поездка</h2>
              <TripTime
                time={ticketInfo?.secondTime}
                endTime={ticketInfo?.endSecondTripTime}
              />
              <hr />
              <div className="trip-info__two-trips-time">
                <h3>Все путешествие займет:</h3>
                <span>
                  {ticketInfo.endSecondTripTime &&
                    ticketInfo.time &&
                    tripDuratin(ticketInfo.time, ticketInfo.endSecondTripTime)}
                </span>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};
