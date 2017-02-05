import angular from 'angular';

const cacheStat = {
};

function getStatFromCache(typeStat, date, nbdays) {
  let dateStat = date;
  if (date === undefined) {
    dateStat = '7days';
  }
  let key = typeStat + dateStat;
  if (nbdays !== undefined) {
    key = typeStat + nbdays;
  }
  let result;
  const cache = cacheStat[key];
  if (cache !== undefined) {
    const diff = new Date().getTime() - cache.timestamp;
    if (diff < (5 * 60 * 1000)) {
      result = cache.cache;
    }
  }
  return result;
}

function setStatInCache(series, typeStat, date, nbdays) {
  let dateStat = date;
  if (date === undefined) {
    dateStat = '7days';
  }
  let key = typeStat + dateStat;
  if (nbdays !== undefined) {
    key = typeStat + nbdays;
  }
  cacheStat[key] = {
    timestamp: new Date().getTime(),
    cache: series,
  };
}

class TeleInfoCache {
  constructor() {
    this.type = {
      STAT_TODAY: 'toDayCache',
      STAT_SEVEN: 'sevenDaysCache',
    };
  }
  static setStatInCache(series, typeStat, date, nbdays) {
    setStatInCache(series, typeStat, date, nbdays);
  }
  static getStatFromCache(typeStat, date, nbdays) {
    return getStatFromCache(typeStat, date, nbdays);
  }
}

export default angular.module('services.teleinfo-cache', [])
  .service('teleinfoCache', TeleInfoCache)
  .name;
