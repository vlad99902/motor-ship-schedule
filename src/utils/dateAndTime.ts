export const timeStampToHumanReadble = (date: Date): string => {
  const arrayDates = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  const arrayTime = [date.getHours(), date.getMinutes(), date.getSeconds()];
  return arrayDates.join('-') + ' ' + arrayTime.join(':');
};
