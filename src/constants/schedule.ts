export type SelectOptionType = {
  id?: number;
  value?: string;
  label?: string;
};

export type ShipRoutesType = {
  type?: number;
  value?: string;
  label?: string;
};

export type timeScheduleType = SelectOptionType[][];

export type TicketInfoFullType = {
  route: ShipRoutesType | null;
  quantity: number | null;
  price: number | undefined;
  endTripTime: string;
  endSecondTripTime?: string;
  time?: string;
  secondTime?: string;
};

export const shipRoutes: ShipRoutesType[] = [
  { type: 0, value: 'из A в B', label: 'из A в B' },
  { type: 1, value: 'из B в А', label: 'из B в А' },
  { type: 2, value: 'из A в B и обратно в А', label: 'из A в B и обратно в А' },
];

export const timerToOneDirectionTripInMinutes: number = 50;
export const ticketOneDirectionPrice = 700;
export const ticketTwoDirectionsPrice = 1200;
