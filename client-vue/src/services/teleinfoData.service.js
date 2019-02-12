var DAYS_LABEL = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
var MONTHS_LABEL = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'];
var COLORS = {
  HCJB: 'Bleu',
  HPJB: 'Bleu',
  HCJW: 'Blanc',
  HPJW: 'Blanc',
  HCJR: 'Rouge',
  HPJR: 'Rouge'
};

var NEW_COLORS = {
  JB_HC: 'primary',
  JB_HP: 'primary',
  JW_HC: 'secondary',
  JW_HP: 'secondary',
  JR_HC: 'danger',
  JR_HP: 'danger'
};

var T_JBHC = 0.0967;
var T_JBHP = 0.1147;
var T_JWHC = 0.1336;
var T_JWHP = 0.1585;
var T_JRHC = 0.2402;
var T_JRHP = 0.6207;

var PERIOD = ['JB_HC', 'JB_HP', 'JW_HC', 'JW_HP', 'JR_HC', 'JR_HP'];
var TARIFS = [T_JBHC, T_JBHP, T_JWHC, T_JWHP, T_JRHC, T_JRHP];
var TARIF_LABEL = ['Bleu H. creuses', 'Bleu H. pleines',
  'Blanc H. creuses', 'Blanc H. pleines',
  'Rouge H. creuses', 'Rouge H. pleines'];

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
};

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
    barWidth: 24 * 60 * 60 * 600,
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
};

/**
* return the day under the form:
* Lun 2 Dec.
*/
export function getDayForWeekStat (date) {
  var dd = new Date(date);
  var day = DAYS_LABEL[dd.getDay()];
  var dayn = dd.getDate();
  var month = MONTHS_LABEL[dd.getMonth()];

  return day + ' ' + dayn + month;
}

/**
return the timestamp  for a year month day.
*/
function gd (year, month, day) {
  return new Date(year, month - 1, day).getTime();
}

/**
lpad function
*/
function lpad (value, car, length) {
  return String(car + value).slice(-length);
}

function toGMT (utcDate) {
  // Convert UTC time to local time
  var d = new Date(utcDate);
  var toGMTDate = d.getFullYear() +
     '-' + lpad(d.getMonth() + 1, '0', 2) +
     '-' + lpad(d.getDate(), '0', 2) +
     ' ' + lpad(d.getHours(), '0', 2) +
     ':' + lpad(d.getMinutes(), '0', 2) +
     ':' + lpad(d.getSeconds(), '0', 2);
  return toGMTDate;
}

function extractRelevantData (series) {
  var keyRef = series[0].ANNEE + '-' + series[0].MOIS + '-' + series[0].JOUR;
  var zz = series.filter(function (row) {
    var key = row.ANNEE + '-' + row.MOIS + '-' + row.JOUR;
    if (key === keyRef) {
      return row;
    }
  });
  if (zz.length < series.length) {
    zz.push(series[zz.length]);
  }
  return zz;
}

function computeKeyHour (row) {
  return toGMT(row.date).substring(11, 13);
}

function computeKeyDay (row) {
  return gd(row.ANNEE, row.MOIS, row.JOUR);
}

export function formatDayData (dataSerie) {
  var series = extractRelevantData(dataSerie);
  var result = formatChartData(series, computeKeyHour, optionsDay, true);

  return result;
}

export function formatWeekData (series) {
  var result = formatChartData(series, computeKeyDay, optionsWeek, false);

  return result;
}

/*
Data is an array of
{"date":"2018-12-10T23:00:02.000Z",
"ANNEE":2018,
"MOIS":12,"JOUR":11,
"JB_HC":25851028,
"JB_HP":37178677,
"JW_HC":3319615,
"JW_HP":3610695,
"JR_HC":1634352,
"JR_HP":1466195,
"PTEC":"HCJW",
"DEMAIN":"ROUG",
"IINST":6,
"PAPP":1490}
*/
function formatChartData (series, computeKeyFn, graphOption, isStacked) {
  // conversion des compteur de conso (JB_HC, JB_HP, ...) de string vers int
  series.map(function (row) {
    PERIOD.forEach(function (element) {
      row[element] = parseInt(row[element]);
    });
    return row;
  });

  // Tableaux contenant les consos pour chaque tranche de tarif
  var jbhc = [];
  var jbhp = [];
  var jwhc = [];
  var jwhp = [];
  var jrhc = [];
  var jrhp = [];

  var labelXAxis = [];

  var prevIndice = [];
  var prevKey = 'xx';
  var coutTotal = 0;

  var arrayLength = series.length;
  for (var i = 0; i < arrayLength; i++) {
    var row = series[i];

    if (i === 0) {
      prevIndice = [row.JB_HC, row.JB_HP, row.JW_HC, row.JW_HP, row.JR_HC, row.JR_HP];
      prevKey = computeKeyFn(row);
    } else {
      var key = computeKeyFn(row);
      if (key !== prevKey) {
        jbhc.push((row.JB_HC) - (prevIndice[0]));
        jbhp.push((row.JB_HP) - (prevIndice[1]));
        jwhc.push((row.JW_HC) - (prevIndice[2]));
        jwhp.push((row.JW_HP) - (prevIndice[3]));
        jrhc.push((row.JR_HC) - (prevIndice[4]));
        jrhp.push((row.JR_HP) - (prevIndice[5]));

        labelXAxis.push(prevKey);
        prevKey = key;
        prevIndice = [row.JB_HC, row.JB_HP, row.JW_HC, row.JW_HP, row.JR_HC, row.JR_HP];
      } else {
        if (i === arrayLength - 1) {
          jbhc.push((row.JB_HC) - (prevIndice[0]));
          jbhp.push((row.JB_HP) - (prevIndice[1]));
          jwhc.push((row.JW_HC) - (prevIndice[2]));
          jwhp.push((row.JW_HP) - (prevIndice[3]));
          jrhc.push((row.JR_HC) - (prevIndice[4]));
          jrhp.push((row.JR_HP) - (prevIndice[5]));

          labelXAxis.push(prevKey);
        }
      }
    }
  }

  var datasets = [
    {type: PERIOD[0], data: jbhc},
    {type: PERIOD[1], data: jbhp},
    {type: PERIOD[2], data: jwhc},
    {type: PERIOD[3], data: jwhp},
    {type: PERIOD[4], data: jrhc},
    {type: PERIOD[5], data: jrhp}
  ];

  // Calcul pour chaque tranche tarifaire de la conso globale et du cout global
  var consos = [];
  PERIOD.forEach(function (element, index) {
    var conso = series[arrayLength - 1][element] - series[0][element];
    var cout = conso * TARIFS[index];
    consos.push({ conso: conso, cout: cout, type: element });
  });
  consos.forEach(function (conso) {
    coutTotal += conso.cout;
  });

  var indexes = [];
  var lastRow = series[series.length - 1];
  TARIF_LABEL.forEach(function (element, index) {
    indexes.push({ color: NEW_COLORS[PERIOD[index]], label: element, valeur: lastRow[PERIOD[index]] });
  });

  var result = {
    datasets: datasets,
    xAxisLabels: labelXAxis,
    statDays: { consos: consos },
    coutTotal: (coutTotal / 1000).toFixed(2),
    options: graphOption,
    infogenerale: {
      date: series[0].date,
      index: indexes,
      couleurDuJour: COLORS[lastRow.PTEC],
      couleurDemain: lastRow.DEMAIN
    }
  };

  // calcule les dates pour les liens jours suivant, jour precedent
  var dtmp = series[0];
  var dx = new Date();
  var currentDay = gd(dtmp.ANNEE, dtmp.MOIS, dtmp.JOUR);
  var nextDay = currentDay + (24 * 60 * 60 * 1000);
  var prevDay = currentDay - (24 * 60 * 60 * 1000);
  result.infogenerale.nextday = nextDay;
  result.infogenerale.prevday = prevDay;
  if (gd(dx.getFullYear(), dx.getMonth() + 1, dx.getDate()) === currentDay) {
    result.infogenerale.today = true;
  } else {
    result.infogenerale.today = false;
  }

  return result;
}
