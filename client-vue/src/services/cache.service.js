const cacheStat = {
}

function get (key) {
  let result
  const cache = cacheStat[key]
  if (cache !== undefined) {
    const diff = new Date().getTime() - cache.timestamp
    if (diff < (5 * 60 * 1000)) {
      result = cache.cache
    }
  }
  return result
}

function set (key, value) {
  cacheStat[key] = {
    timestamp: new Date().getTime(),
    cache: value
  }
}

function getStatFromCache (typeStat, date, nbdays) {
  let dateStat = date
  if (date === undefined) {
    dateStat = '7days'
  }
  let key = typeStat + dateStat
  if (nbdays !== undefined) {
    key = typeStat + nbdays
  }
  let result = get(key)
  return result
}

function setStatInCache (series, typeStat, date, nbdays) {
  let dateStat = date
  if (date === undefined) {
    dateStat = '7days'
  }
  let key = typeStat + dateStat
  if (nbdays !== undefined) {
    key = typeStat + nbdays
  }
  set(key, series)
}

export default class TeleInfoCache {
  static type = {
    STAT_TODAY: 'toDayCache',
    STAT_MONTH: 'monthCache',
    STAT_SEVEN: 'sevenDaysCache'
  }

  static setStatInCache (series, typeStat, date, nbdays) {
    setStatInCache(series, typeStat, date, nbdays)
  }
  static getStatFromCache (typeStat, date, nbdays) {
    return getStatFromCache(typeStat, date, nbdays)
  }
  static set (key, values) {
    set(key, values)
  }
  static get (key) {
    return get(key)
  }
}
