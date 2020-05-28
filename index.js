module.exports = {
  renderTime: date => {
    if (!date) return;
    return date.toLocaleTimeString('en', {hour: '2-digit', minute: '2-digit'});
  },
   renderDate: date => {
    if (!date) return;

    const hours = date.getHours();
    const optionsWithoutYear = {day: 'numeric', month: 'long'};
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const newDay = new Date(date);

    /* Если выбранное время находится в промежутке с 21 вечера до 4 часов ночи, то выводится дата в формате "в ночь с... на...". */
    if (hours > 21) {
      const nextDay = newDay.setDate(date.getDate() + 1);

      return `On the night from
        ${new Intl.DateTimeFormat('en-US', optionsWithoutYear).format(date)}
        to
        ${new Intl.DateTimeFormat('en-US', options).format(nextDay)}`;
    } else if (hours < 4 || hours === '0') {
      const prevDay = newDay.setDate(date.getDate() - 1);

      return `On the night from
        ${new Intl.DateTimeFormat('en-US', optionsWithoutYear).format(prevDay)}
        to
        ${new Intl.DateTimeFormat('en-US', options).format(date)}`;
    }
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}