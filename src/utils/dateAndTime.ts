export const timeStampToHumanReadble = (date: Date): string => {
  const arrayDates = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  const arrayTime = [date.getHours(), date.getMinutes(), date.getSeconds()];
  return arrayDates.join('-') + ' ' + arrayTime.join(':');
};

export const tripDuratin = (beginTime: string, endTime: string): string => {
  const beginTimeMilleseconds = +new Date(beginTime);
  const endTimeMilleseconds = +new Date(endTime);

  let durationMinutes =
    (endTimeMilleseconds - beginTimeMilleseconds) / 1000 / 60;

  const days = Math.floor(durationMinutes / 60 / 24);
  const hours = Math.floor(durationMinutes / 60) % 24;
  const minutes = durationMinutes % 60;

  let duration: string = '';
  if (days) duration += 'дней: ' + days;
  if (hours) duration += ' часов: ' + hours;
  if (minutes) duration += ' минут: ' + minutes;
  return '' + duration;
};
