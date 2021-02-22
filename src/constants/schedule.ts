//тип для времени поездок
export type SelectOptionType = {
  id?: number;
  value?: string;
  label?: string;
};

//тип для вариантов направлений поездки
export type ShipRoutesType = {
  type?: number;
  value?: string;
  label?: string;
};

//тип зафетченной информации с сервера
export type timeScheduleType = SelectOptionType[][];

//тип полной информации о поездке
export type TicketInfoFullType = {
  route: ShipRoutesType | null;
  quantity: number | null;
  price: number | undefined;
  endTripTime: string;
  endSecondTripTime?: string;
  time?: string;
  secondTime?: string;
};

//варианты направлений поездки
export const shipRoutes: ShipRoutesType[] = [
  { type: 0, value: "из A в B", label: "из A в B" },
  { type: 1, value: "из B в А", label: "из B в А" },
  { type: 2, value: "из A в B и обратно в А", label: "из A в B и обратно в А" },
];

//длительность одной поездки
export const timerToOneDirectionTripInMinutes: number = 50;
//стоимость одной поездки
export const ticketOneDirectionPrice = 700;
//стоимость поездки туда и обратно
export const ticketTwoDirectionsPrice = 1200;
