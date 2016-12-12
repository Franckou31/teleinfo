STAT_TODAY  = "toDayCache";
STAT_SEVEN = "sevenDaysCache";

var cacheStat = {
}

function getStatFromCache(typeStat, date) {
  if (date == undefined) {
    date = "7days";
  }
  var result = undefined;
  var cache = cacheStat[typeStat];
  if (cache != undefined) {
    var diff = new Date().getTime() - cache.timestamp;
    if (diff < (5*60*1000)) {
      result = cache.cache;
    }
  }
  return result;
}

function setStatInCache(series, typeStat, date) {
  if (date == undefined) {
    date = "7days";
  }
  cacheStat[typeStat] = {
    timestamp : new Date().getTime(),
    cache : series
  }
}
