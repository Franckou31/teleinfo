var DAYS_LABEL = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
var MONTHS_LABEL = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec']
var COLORS = {
  HCJB : 'Bleu',
  HPJB : 'Bleu',
  HCJW : 'Blanc',
  HPJW : 'Blanc',
  HCJR : 'Rouge',
  HPJR : 'Rouge'
}

var T_JBHC = 0.0967
var T_JBHP = 0.1147
var T_JWHC = 0.1336
var T_JWHP = 0.1585
var T_JRHC = 0.2402
var T_JRHP = 0.6207

var PERIOD = ['JB_HC', 'JB_HP', 'JW_HC', 'JW_HP', 'JR_HC', 'JR_HP']
var TARIFS = [T_JBHC, T_JBHP, T_JWHC, T_JWHP, T_JRHC, T_JRHP]
var TARIF_LABEL = ['Bleu H. creuses', 'Bleu H. pleines',
  'Blanc H. creuses', 'Blanc H. pleines',
  'Rouge H. creuses', 'Rouge H. pleines']

var optionsDay = {
  series: {
    stack: 0,
    lines: {
      show: true,
      fill: false,
      steps: true
    },
    bars: {
      show: false,
      barWidth: 0.6
    }
  },
  xaxis: {
    tickDecimals: 0,
    tickSize: 1
  },
  grid: {
    borderWidth: 2,
    backgroundColor: '#5F5F5F'
  }
}

var optionsWeek = {
  legend: {
    backgroundColor: '#FFFFFF',
    backgroundOpacity: 1,
    noColumns: 2
  },
  series: {
    stack: true,
    bars: {
      show: true,
      clickable: true
    }
  },
  bars: {
    align: 'center',
    barWidth:24 * 60 * 60 * 600,
    lineWidth: 1,
    clickable: true
  },
  xaxis: {
    mode: 'time',
    tickLength: 10,
    color: 'black',
    axisLabel: 'Date',
    tickFormatter: getDayForWeekStat,
    axisLabelUseCanvas: true,
    axisLabelFontSizePixels: 12,
    axisLabelFontFamily: 'Verdana, Arial',
    axisLabelPadding: 10
  },
  yaxis: {
    color: 'black',
    axisLabel: 'DNS Query Count',
    axisLabelUseCanvas: true,
    axisLabelFontSizePixels: 12,
    axisLabelFontFamily: 'Verdana, Arial',
    axisLabelPadding: 3,
    max: 100000
  },
  grid: {
    hoverable: true,
    clickable: true,
    borderWidth: 2,
    backgroundColor: '#5F5F5F'
  }
}

/**
* return the day under the form:
* Lun 2 Dec.
*/
function getDayForWeekStat (date) {
  var dd = new Date(date)
  var day = DAYS_LABEL[dd.getDay()]
  var dayn = dd.getDate()
  var month = MONTHS_LABEL[dd.getMonth()]

  return day + ' ' + dayn + ' <br> ' + month
}

/**
return the timestamp  for a year month day.
*/
function gd (year, month, day) {
  return new Date(year, month - 1, day).getTime()
}

/**
lpad function
*/
function lpad (value, car, length) {
  return String(car + value).slice(-length)
}

function toGMT (utcDate) {
  // Convert UTC time to local time
  var d = new Date(utcDate)
  var toGMTDate = d.getFullYear() +
     '-' + lpad(d.getMonth() + 1, '0', 2) +
     '-' + lpad(d.getDate(), '0', 2) +
     ' ' + lpad(d.getHours(), '0', 2) +
     ':' + lpad(d.getMinutes(), '0', 2) +
     ':' + lpad(d.getSeconds(), '0', 2)
  return toGMTDate
}

function extractRelevantData (series) {
  var keyRef = series[0].ANNEE + '-' + series[0].MOIS + '-' + series[0].JOUR
  var zz = series.filter(function (row) {
    var key = row.ANNEE + '-' + row.MOIS + '-' + row.JOUR
    if (key === keyRef) {
      return row
    }
  })
  if (zz.length < series.length) {
    zz.push(series[zz.length])
  }
  return zz
}

function computeKeyHour (row) {
  return toGMT(row.date).substring(11, 13)
}

function computeKeyDay (row) {
  return gd(row.ANNEE, row.MOIS, row.JOUR)
}

export function formatDayData (dataSerie) {
  var series = extractRelevantData(dataSerie)
  var result = formatData(series, computeKeyHour, optionsDay, true)

  return result
}

export function formatWeekData (series) {
  var result = formatData(series, computeKeyDay, optionsWeek, false)

  return result
}

function formatData (series, computeKeyFn, graphOption, isStacked) {
  let data = []

  // conversion des string en int
  series.map(function (row) {
    PERIOD.forEach(function (element) {
      row[element] = parseInt(row[element])
    })
    return row
  })

  var jbhc = []
  var jbhp = []
  var jwhc = []
  var jwhp = []
  var jrhc = []
  var jrhp = []
  var prevIndice = []
  var prevKey = 'xx'
  var coutTotal = 0

  var arrayLength = series.length
  for (var i = 0; i < arrayLength; i++) {
    var row = series[i]

    if (i === 0) {
      prevIndice = [row.JB_HC, row.JB_HP, row.JW_HC, row.JW_HP, row.JR_HC, row.JR_HP]
      prevKey = computeKeyFn(row)
    } else {
      var key = computeKeyFn(row)
      if (key !== prevKey) {
        jbhc.push([prevKey, (row.JB_HC) - (prevIndice[0])])
        jbhp.push([prevKey, (row.JB_HP) - (prevIndice[1])])
        jwhc.push([prevKey, (row.JW_HC) - (prevIndice[2])])
        jwhp.push([prevKey, (row.JW_HP) - (prevIndice[3])])
        jrhc.push([prevKey, (row.JR_HC) - (prevIndice[4])])
        jrhp.push([prevKey, (row.JR_HP) - (prevIndice[5])])

        prevKey = key
        prevIndice = [row.JB_HC, row.JB_HP, row.JW_HC, row.JW_HP, row.JR_HC, row.JR_HP]
      } else {
        if (i === arrayLength - 1) {
          jbhc.push([prevKey, (row.JB_HC) - (prevIndice[0])])
          jbhp.push([prevKey, (row.JB_HP) - (prevIndice[1])])
          jwhc.push([prevKey, (row.JW_HC) - (prevIndice[2])])
          jwhp.push([prevKey, (row.JW_HP) - (prevIndice[3])])
          jrhc.push([prevKey, (row.JR_HC) - (prevIndice[4])])
          jrhp.push([prevKey, (row.JR_HP) - (prevIndice[5])])
        }
      }
    }
  }

  /* eslint-disable */
  if (!isStacked) {
    data = [
      { label: 'jbhc', data: jbhc, color: 'rgba(0,154,191, 1)', bars: { show: true, fill: true, fillColor: 'rgba(0,154,191, 1)' } },
      { label: 'jbhp', data: jbhp, color: 'rgba(0,192,239, 1)', bars: { show: true, fill: true, fillColor: 'rgba(0,192,239, 1)' } },
      { label: 'jwhc', data: jwhc, color: '#F5F5F5', bars: { show: true, fill: true, fillColor: '#F5F5F5' } },
      { label: 'jwhp', data: jwhp, color: '#FFFFFF', bars: { show: true, fill: true, fillColor: '#FFFFFF' } },
      { label: 'jrhc', data: jrhc, color: 'rgba(177,60,46, 1)', bars: { show: true, fill: true, fillColor: 'rgba(177,60,46, 1)' } },
      { label: 'jrhp', data: jrhp, color: 'rgba(221,75,57, 1)', bars: { show: true, fill: true, fillColor: 'rgba(221,75,57, 1)' } }
    ]
  } else {
    data = [
      {label: "jbhc", data: jbhc, color: "rgba(0,154,191, 1)", lines: {show: true, fill: true, fillColor: "rgba(0,154,191, 1)" }},
      {label: "jbhp", data: jbhp, color: "rgba(0,192,239, 1)", lines: {show: true, fill: true, fillColor: "rgba(0,192,239, 1)" }},
      {label: "jwhc", data: jwhc, color: '#F5F5F5', lines: {show: true, fill: true, fillColor: '#F5F5F5' }},
      {label: "jwhp", data: jwhp, color: '#FFFFFF', lines: {show: true, fill: true, fillColor: '#FFFFFF' }},
      {label: "jrhc", data: jrhc, color: "rgba(177,60,46, 1)", lines: {show: true, fill: true, fillColor: "rgba(177,60,46, 1)" }},
      {label: "jrhp", data: jrhp, color: "rgba(221,75,57, 1)", lines: {show: true, fill: true, fillColor: "rgba(221,75,57, 1)" }}
      ];
  }
  /* eslint-enable */
  var consos = []
  PERIOD.forEach(function (element, index) {
    var conso = series[arrayLength - 1][element] - series[0][element]
    var cout = conso * TARIFS[index]
    consos.push({ conso: conso, cout: cout, label: TARIF_LABEL[index] })
  })
  consos.forEach(function (conso) {
    coutTotal += conso.cout
  })

  var indexes = []

  var lastRow = series[series.length - 1]
  TARIF_LABEL.forEach(function (element, index) {
    indexes.push({ label : element, valeur: lastRow[PERIOD[index]] })
  })

  var result = {
    statDays: [{ data: data, consos: consos }],
    coutTotal: (coutTotal / 1000).toFixed(2),
    options: graphOption,
    infogenerale: {
      date: series[0].date,
      index: indexes,
      couleurDuJour: COLORS[lastRow.PTEC],
      couleurDemain: lastRow.DEMAIN
    }
  }

  // calcule les dates pour les liens jours suivant, jour precedent
  var dtmp = series[0]
  var dx = new Date()
  var currentDay = gd(dtmp.ANNEE, dtmp.MOIS, dtmp.JOUR)
  var nextDay = currentDay + (24 * 60 * 60 * 1000)
  var prevDay = currentDay - (24 * 60 * 60 * 1000)
  result.infogenerale.nextday = nextDay
  result.infogenerale.prevday = prevDay
  if (gd(dx.getFullYear(), dx.getMonth() + 1, dx.getDate()) === currentDay) {
    result.infogenerale.today = true
  } else {
    result.infogenerale.today = false
  }

  return result
}
