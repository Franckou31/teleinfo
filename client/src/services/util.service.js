var DAYS_LABEL = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
var MONTHS_LABEL = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec']
var MONTHS_LABEL2 = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

/**
return the date under the String format:
Lundi 2 Dec 2017
*/
function formatDayDate (dd) {
  var date = new Date(dd)
  var day = DAYS_LABEL[date.getDay()]
  var dayn = date.getDate()
  var month = MONTHS_LABEL[date.getMonth()]
  var year = date.getFullYear()

  var sDate = day + ' ' + dayn + ' ' + month + ' ' + year

  return sDate
}

function formatMonthDate (dd) {
  var date = new Date(dd)
  var month = MONTHS_LABEL2[date.getMonth()]
  var year = date.getFullYear()

  var sDate = month + ' ' + year

  return sDate
}

export default class Util {
  static formatDayDate (date) {
    return formatDayDate(date)
  }
  static formatMonthDate (date) {
    return formatMonthDate(date)
  }
}
