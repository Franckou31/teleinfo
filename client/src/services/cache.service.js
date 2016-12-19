import angular from 'angular';

var cacheStat = {
}

function getStatFromCache(typeStat, date, nbdays) {
  if (date == undefined) {
    date = "7days";
  }
  var key = typeStat + date;
  if (nbdays != undefined) {
    key = typeStat + nbdays;
  }
  var result = undefined;
  var cache = cacheStat[key];
  if (cache != undefined) {
    var diff = new Date().getTime() - cache.timestamp;
    if (diff < (5*60*1000)) {
      result = cache.cache;
    }
  }
  return result;
}

function setStatInCache(series, typeStat, date, nbdays) {
  if (date == undefined) {
    date = "7days";
  }
  var key = typeStat + date;
  if (nbdays != undefined) {
    key = typeStat + nbdays;
  }
  cacheStat[key] = {
    timestamp : new Date().getTime(),
    cache : series
  }
}

class TeleInfoCache {
  constructor() {
    this.type = {
      STAT_TODAY  = "toDayCache";
      STAT_SEVEN = "sevenDaysCache";

    }
  }
  setStatInCache(series, typeStat, date, nbdays) {
      setStatInCache(series, typeStat, date, nbdays);
  }
  getStatFromCache(typeStat, date, nbdays) {
      return getStatFromCache(typeStat, date, nbdays);
  }
}

export default angular.module('services.teleinfo-cache', [])
  .service('teleinfoCache', TeleInfoCache)
  .name;
