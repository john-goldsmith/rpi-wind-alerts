/**
 * Given a Weather Underground forecast object, determines if the date
 * is in the future, relative to the current date. Despite being called a "forecast",
 * Weather Underground can return forecast objects for the current *day* but several
 * *hours* in the past which, for the purposes of this app, is not helpful.
 *
 * @param  {Object} forecast
 * @param  {Object} forecast.date
 * @param  {Number} forecast.date.day
 * @param  {Number} forecast.date.hour
 * @return {Boolean}
 */
function forecastIsInFuture(forecast) {
  if (!forecast || !forecast.date) return false
  const now = new Date()
  return (forecast.date.day === now.getDate() && forecast.date.hour > now.getHours()) || (forecast.date.day > now.getDate())
}

module.exports = {
  forecastIsInFuture
}
