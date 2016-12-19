// Global : to change to local


var stringDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
var stringMonths = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'];
var couleur = {
  HCJB : "Bleu",
  HPJB : "Bleu",
  HCJW : "Blanc",
  HPJW : "Blanc",
  HCJR : "Rouge",
  HPJR : "Rouge",
}
  var t_jbhc = 0.0967;
  var t_jbhp = 0.1147;
  var t_jwhc = 0.1336;
  var t_jwhp = 0.1585;
  var t_jrhc = 0.2402;
  var t_jrhp = 0.6207;

  var options = {
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
      yaxes: [ {}, {
					// align if we are to the right
					alignTicksWithAxis: 1,
					position: "right"
				} ]
    };


    var options2 = {
        legend: {
          backgroundColor: "#FFFFFF",
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
            align: "center",
            barWidth:24 * 60 * 60 * 600,
            lineWidth: 1,
            clickable: true
        },
        xaxis: {
            mode: "time",
            tickLength: 10,
            color: "black",
            axisLabel: "Date",
            tickFormatter: getDayForWeekStat,
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10,
        },
        yaxis: {
            color: "black",
            axisLabel: "DNS Query Count",
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
            backgroundColor: "#5F5F5F"
        }
    };


/**
* reformat a tab containing stats of past nbdays days with several tabs of stats per days
* TO BE REMOVED
*/
function getTabSeries(series, date, nbdays) {
  var datas = [];
  var dtime = date.getTime();
  for (var i=nbdays; i>=0; i--) {
    var data = [];
    var da = dtime - (i * 24 * 3600 * 1000);
    var db = new Date(da)
    var year = parseInt(db.getFullYear());
    var month = parseInt(db.getMonth()+1);
    var day = parseInt(db.getDate());

    var find = false;
    for (var j = 0; j<series.length; j++) {
      if(series[j].ANNEE == year && series[j].MOIS == month && series[j].JOUR == day) {
        data.push(series[j]);
        find = true;
      } else {
        if(find == true) {
          find = false;
          data.push(series[j]);
          datas.push(data);
          break;
        }
      }
    }
  }
  datas.push(data);
  return datas;
}

/**
* return the day under the form:
* Lun 2 Dec.
*/
function getDayForWeekStat(date) {
  var dd =  new Date(date);
  var day = stringDays[dd.getDay()];
  var dayn = dd.getDate();
  var month = stringMonths[dd.getMonth()];

  return day + " " + dayn + " <br> " + month;
}

function gd(year, month, day) {
    return new Date(year, month - 1, day).getTime();
}

function lpad(value, car, length) {
  return String(car + value).slice(-length);
}

function toGMT(utcDate) {
  // Convert UTC time to local time
  var d = new Date(utcDate);
  s_date = d.getFullYear() +
           "-" + lpad(d.getMonth()+1, "0", 2) +
           "-" + lpad(d.getDate(), "0", 2) +
           " " + lpad(d.getHours(), "0", 2) +
           ":" + lpad(d.getMinutes(), "0", 2) +
           ":" + lpad(d.getSeconds(), "0", 2)
  return s_date;
}

function formatData(series) {
      var data = [];
      var period = ['JB_HC', 'JB_HP', 'JW_HC', 'JW_HP', 'JR_HC', 'JR_HP'];
      var tarifs = [t_jbhc, t_jbhp, t_jwhc, t_jwhp, t_jrhc, t_jrhp];
      var tarifLabels = ['Bleu H. creuses', 'Bleu H. pleines',
      'Blanc H. creuses', 'Blanc H. pleines',
      'Rouge H. creuses', 'Rouge H. pleines'];

      // Conversion de la date UTC en GMT
      // conversion des string en int
      series.map(function(row, index){
        period.forEach(function(element){
          row[element] = parseInt(row[element]);
        });
        return row;
      });
      var keyRef = series[0].ANNEE+"-"+series[0].MOIS+"-"+series[0].JOUR;
      var zz = series.filter(function(row,index) {
        var key = row.ANNEE+"-"+row.MOIS+"-"+row.JOUR;
        if (key == keyRef) {
          return row;
        }
      });
      if (zz.length < series.length) {
        zz.push(series[zz.length]);
      }

      var jbhc = [];
      var jbhp = [];
      var jwhc = [];
      var jwhp = [];
      var jrhc = [];
      var jrhp = [];
      var arrayLength = zz.length;
      var prevIndice = [];
      var prevHour = "xx";
      var couts = [];
      var coutTotal = 0;

      for (var i = 0; i < arrayLength; i++) {
        row = zz[i];
        if(i == 0) {
          prevIndice = [row.JB_HC, row.JB_HP, row.JW_HC, row.JW_HP, row.JR_HC, row.JR_HP];
          prevHour = toGMT(row.date).substring(11,13);
        } else {
          hour = toGMT(row.date).substring(11,13);
          if (hour != prevHour) {
            jbhc.push([parseInt(prevHour), (row.JB_HC) - (prevIndice[0])]);
            jbhp.push([parseInt(prevHour), (row.JB_HP) - (prevIndice[1])]);
            jwhc.push([parseInt(prevHour), (row.JW_HC) - (prevIndice[2])]);
            jwhp.push([parseInt(prevHour), (row.JW_HP) - (prevIndice[3])]);
            jrhc.push([parseInt(prevHour), (row.JR_HC) - (prevIndice[4])]);
            jrhp.push([parseInt(prevHour), (row.JR_HP) - (prevIndice[5])]);
            var cout = ((row.JB_HC) - (prevIndice[0])) * t_jbhc +
                       ((row.JB_HP) - (prevIndice[1])) * t_jbhp +
                       ((row.JW_HC) - (prevIndice[2])) * t_jwhc +
                       ((row.JW_HP) - (prevIndice[3])) * t_jwhp +
                       ((row.JR_HC) - (prevIndice[4])) * t_jrhc +
                       ((row.JR_HP) - (prevIndice[5])) * t_jrhp;
            couts.push([prevHour, cout]);
            prevHour = hour;
            prevIndice = [row.JB_HC, row.JB_HP, row.JW_HC, row.JW_HP, row.JR_HC, row.JR_HP];
          }
          else {
            if (i == arrayLength-1) {
              jbhc.push([parseInt(prevHour), (row.JB_HC) - (prevIndice[0])]);
              jbhp.push([parseInt(prevHour), (row.JB_HP) - (prevIndice[1])]);
              jwhc.push([parseInt(prevHour), (row.JW_HC) - (prevIndice[2])]);
              jwhp.push([parseInt(prevHour), (row.JW_HP) - (prevIndice[3])]);
              jrhc.push([parseInt(prevHour), (row.JR_HC) - (prevIndice[4])]);
              jrhp.push([parseInt(prevHour), (row.JR_HP) - (prevIndice[5])]);
              var cout = ((row.JB_HC) - (prevIndice[0])) * t_jbhc +
                         ((row.JB_HP) - (prevIndice[1])) * t_jbhp +
                         ((row.JW_HC) - (prevIndice[2])) * t_jwhc +
                         ((row.JW_HP) - (prevIndice[3])) * t_jwhp +
                         ((row.JR_HC) - (prevIndice[4])) * t_jrhc +
                         ((row.JR_HP) - (prevIndice[5])) * t_jrhp;
              couts.push([prevHour, cout]);
            }
          }
        }
      }


      // bc = rgb(0,154,191)
      // bp = rgb(0,192,239)
      // wc = rgb(194,125,14)
      // wp = rgb(243,156,18)
      // rc = rgb(177,60,46)
      // rp = rgb(221,75,57)

      var data = [
        {label: "jbhc", data: jbhc, color: "rgba(0,154,191, 1)", lines: {show: true, fill: true, fillColor: "rgba(0,154,191, 1)" }},
        {label: "jbhp", data: jbhp, color: "rgba(0,192,239, 1)", lines: {show: true, fill: true, fillColor: "rgba(0,192,239, 1)" }},
        {label: "jwhc", data: jwhc, color: "rgba(194,125,14, 1)", lines: {show: true, fill: true, fillColor: "rgba(194,125,14, 1)" }},
        {label: "jwhp", data: jwhp, color: "rgba(243,156,18, 1)", lines: {show: true, fill: true, fillColor: "rgba(243,156,18, 1)" }},
        {label: "jrhc", data: jrhc, color: "rgba(177,60,46, 1)", lines: {show: true, fill: true, fillColor: "rgba(177,60,46, 1)" }},
        {label: "jrhp", data: jrhp, color: "rgba(221,75,57, 1)", lines: {show: true, fill: true, fillColor: "rgba(221,75,57, 1)" }},
        {yaxis: 2, data: couts}
      ];
      var consos = [];
      period.forEach(function(element, index) {
        var conso = zz[arrayLength-1][element] - zz[0][element];
        var cout = conso * tarifs[index];
        consos.push({conso: conso, cout: cout, label: tarifLabels[index]});
      });
      consos.forEach(function(conso) {
        coutTotal += conso.cout;
      });

      var indexes = [];

      var lastRow = zz[zz.length - 1];
      tarifLabels.forEach(function(element, index) {

        indexes.push({label : element, valeur: lastRow[period[index]]});
      })

      var result = {
        statDays: [{data: data, consos: consos}],
        coutTotal: (coutTotal/1000).toFixed(2),
        options: options,
        infogenerale: {
          date: zz[0].date,
          index: indexes,
          couleurDuJour: couleur[lastRow.PTEC],
          couleurDemain: lastRow.DEMAIN
        }
      };

      // calcule les dates pour les liens jours suivant, jour precedent
      var dtmp = series[0];
      var dx = new Date();
      var currentDay = gd(dtmp.ANNEE, dtmp.MOIS, dtmp.JOUR);
      d_nextday = currentDay + (24 * 60 * 60 * 1000);
      d_prevday = currentDay - (24 * 60 * 60 * 1000);
      result.infogenerale.nextday=d_nextday;
      result.infogenerale.prevday=d_prevday;
      if (gd(dx.getFullYear(), dx.getMonth()+1, dx.getDate()) == currentDay) {
        result.infogenerale.today = true;
      } else {
        result.infogenerale.today = false;
      }

     return result;
}

function formatWeekData(series) {
      var data = [];
      var period = ['JB_HC', 'JB_HP', 'JW_HC', 'JW_HP', 'JR_HC', 'JR_HP'];
      var tarifs = [t_jbhc, t_jbhp, t_jwhc, t_jwhp, t_jrhc, t_jrhp];
      var tarifLabels = ['Bleu H. creuses', 'Bleu H. pleines',
      'Blanc H. creuses', 'Blanc H. pleines',
      'Rouge H. creuses', 'Rouge H. pleines'];

      // conversion des string en int
       series.map(function(row, index){
        row.date = toGMT(row.date);
        period.forEach(function(element){
          row[element] = parseInt(row[element]);
        });
        return row;
      });


      var jbhc = [];
      var jbhp = [];
      var jwhc = [];
      var jwhp = [];
      var jrhc = [];
      var jrhp = [];
      var prevIndice = [];
      var prevDay = "xx";
      var couts = [];
      var coutTotal = 0;

      var days = [];
      var statDays = [];
      var arrayLength = series.length;
      for (var i = 0; i < arrayLength; i++) {
        row = series[i];
        // console.log(row.date);
        // console.log(toGMT(row.date));

        if(i == 0) {
          prevIndice = [row.JB_HC, row.JB_HP, row.JW_HC, row.JW_HP, row.JR_HC, row.JR_HP];
          prevDay = gd(row.ANNEE, row.MOIS, row.JOUR);
        } else {
          day = gd(row.ANNEE, row.MOIS, row.JOUR);
          if (day != prevDay) {
            jbhc.push([prevDay, (row.JB_HC) - (prevIndice[0])]);
            jbhp.push([prevDay, (row.JB_HP) - (prevIndice[1])]);
            jwhc.push([prevDay, (row.JW_HC) - (prevIndice[2])]);
            jwhp.push([prevDay, (row.JW_HP) - (prevIndice[3])]);
            jrhc.push([prevDay, (row.JR_HC) - (prevIndice[4])]);
            jrhp.push([prevDay, (row.JR_HP) - (prevIndice[5])]);

            /*var cout = ((row.JB_HC) - (prevIndice[0])) * t_jbhc +
                       ((row.JB_HP) - (prevIndice[1])) * t_jbhp +
                       ((row.JW_HC) - (prevIndice[2])) * t_jwhc +
                       ((row.JW_HP) - (prevIndice[3])) * t_jwhp +
                       ((row.JR_HC) - (prevIndice[4])) * t_jrhc +
                       ((row.JR_HP) - (prevIndice[5])) * t_jrhp
            couts.push([prevHour, cout]); */
            prevDay = day;
            prevIndice = [row.JB_HC, row.JB_HP, row.JW_HC, row.JW_HP, row.JR_HC, row.JR_HP];
          } else {
            if (i == arrayLength-1) {
              jbhc.push([prevDay, (row.JB_HC) - (prevIndice[0])]);
              jbhp.push([prevDay, (row.JB_HP) - (prevIndice[1])]);
              jwhc.push([prevDay, (row.JW_HC) - (prevIndice[2])]);
              jwhp.push([prevDay, (row.JW_HP) - (prevIndice[3])]);
              jrhc.push([prevDay, (row.JR_HC) - (prevIndice[4])]);
              jrhp.push([prevDay, (row.JR_HP) - (prevIndice[5])]);
            }
          }
        }
      }

      // TO BE CONTINUED :
      // http://www.jqueryflottutorial.com/how-to-make-jquery-flot-stacked-chart.html

      var data = [
        {label: "jbhc", data: jbhc, color: "rgba(0,154,191, 1)", bars: {show: true, fill: true, fillColor: "rgba(0,154,191, 1)" }},
        {label: "jbhp", data: jbhp, color: "rgba(0,192,239, 1)", bars: {show: true, fill: true, fillColor: "rgba(0,192,239, 1)" }},
        {label: "jwhc", data: jwhc, color: "#F5F5F5", bars: {show: true, fill: true, fillColor: "#F5F5F5" }},
        {label: "jwhp", data: jwhp, color: "#FFFFFF", bars: {show: true, fill: true, fillColor: "#FFFFFF" }},
        {label: "jrhc", data: jrhc, color: "rgba(177,60,46, 1)", bars: {show: true, fill: true, fillColor: "rgba(177,60,46, 1)" }},
        {label: "jrhp", data: jrhp, color: "rgba(221,75,57, 1)", bars: {show: true, fill: true, fillColor: "rgba(221,75,57, 1)" }}

      ];
/*
      var consos = [];
      period.forEach(function(element, index) {
        var conso = series[arrayLength-1][element] - series[0][element];
        var cout = conso * tarifs[index];
        consos.push({conso: conso, cout: cout, label: tarifLabels[index]});
      });
      consos.forEach(function(conso) {
        coutTotal += conso.cout;
      });
*/
/*
     return {
       statDays: [{data: data, consos: consos}],
       coutTotal: (coutTotal/1000).toFixed(2)
     };
     */
     return {
       statDays: [{data: data}],
       options: options2
     };
}
