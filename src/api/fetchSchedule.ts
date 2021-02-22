/**
 * Функция для запроса информации на сервере
 */
export const fetchSchedule = async () => {
  return await fetch("http://localhost:3001/api/schedule");
};
