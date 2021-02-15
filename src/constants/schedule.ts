export type SelectOptionType = {
  id?: number;
  value?: string | number;
  label?: string;
};

export const shipRoutes: SelectOptionType[] = [
  { id: 0, value: 'из A в B', label: 'из A в B' },
  { id: 1, value: 'из B в А', label: 'из B в А' },
  { id: 2, value: 'из A в B и обратно в А', label: 'из A в B и обратно в А' },
];

export const scheduleFromBToA: SelectOptionType[] = [
  { id: 0, value: '2021-08-21 18:30:00', label: '2021-08-21 18:30:00' },
  { id: 1, value: '2021-08-21 18:45:00', label: '2021-08-21 18:45:00' },
  { id: 2, value: '2021-08-21 19:00:00', label: '2021-08-21 19:00:00' },
  { id: 3, value: '2021-08-21 19:15:00', label: '2021-08-21 19:15:00' },
  { id: 4, value: '2021-08-21 19:35:00', label: '2021-08-21 19:35:00' },
  { id: 5, value: '2021-08-21 21:50:00', label: '2021-08-21 21:50:00' },
  { id: 6, value: '2021-08-21 21:55:00', label: '2021-08-21 21:55:00' },
];

export const scheduleFromAToB: SelectOptionType[] = [
  { id: 0, value: '2021-08-21 18:00:00', label: '2021-08-21 18:00:00' },
  { id: 1, value: '2021-08-21 18:30:00', label: '2021-08-21 18:30:00' },
  { id: 2, value: '2021-08-21 18:45:00', label: '2021-08-21 18:45:00' },
  { id: 3, value: '2021-08-21 19:00:00', label: '2021-08-21 19:00:00' },
  { id: 4, value: '2021-08-21 19:15:00', label: '2021-08-21 19:15:00' },
  { id: 5, value: '2021-08-21 21:00:00', label: '2021-08-21 21:00:00' },
];

export const timerToOneDirectionTripInMinutes: number = 50;
