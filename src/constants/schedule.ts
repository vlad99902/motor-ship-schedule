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

export const timeSchedule: timeScheduleType = [
  [
    {
      id: 7,
      value: '2021-08-21 18:00:00 GMT+3',
      label: '2021-08-21 18:00:00 GMT+3',
    },
    {
      id: 8,
      value: '2021-08-21 18:30:00 GMT+3',
      label: '2021-08-21 18:30:00 GMT+3',
    },
    {
      id: 9,
      value: '2021-08-21 18:45:00 GMT+3',
      label: '2021-08-21 18:45:00 GMT+3',
    },
    {
      id: 10,
      value: '2021-08-21 19:00:00 GMT+3',
      label: '2021-08-21 19:00:00 GMT+3',
    },
    {
      id: 11,
      value: '2021-08-21 19:15:00 GMT+3',
      label: '2021-08-21 19:15:00 GMT+3',
    },
    {
      id: 12,
      value: '2021-08-21 21:00:00 GMT+3',
      label: '2021-08-21 21:00:00 GMT+3',
    },
  ],
  [
    {
      id: 0,
      value: '2021-08-21 18:30:00 GMT+3',
      label: '2021-08-21 18:30:00 GMT+3',
    },
    {
      id: 1,
      value: '2021-08-21 18:45:00 GMT+3',
      label: '2021-08-21 18:45:00 GMT+3',
    },
    {
      id: 2,
      value: '2021-08-21 19:00:00 GMT+3',
      label: '2021-08-21 19:00:00 GMT+3',
    },
    {
      id: 3,
      value: '2021-08-21 19:15:00 GMT+3',
      label: '2021-08-21 19:15:00 GMT+3',
    },
    {
      id: 4,
      value: '2021-08-21 19:35:00 GMT+3',
      label: '2021-08-21 19:35:00 GMT+3',
    },
    {
      id: 5,
      value: '2021-08-21 21:50:00 GMT+3',
      label: '2021-08-21 21:50:00 GMT+3',
    },
    {
      id: 6,
      value: '2021-08-21 21:55:00 GMT+3',
      label: '2021-08-21 21:55:00 GMT+3',
    },
  ],
];

export const timerToOneDirectionTripInMinutes: number = 50;
export const ticketOneDirectionPrice = 700;
export const ticketTwoDirectionsPrice = 1200;
