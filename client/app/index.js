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
            //tickSize: [3, "day"],
            tickLength: 10,
            color: "black",
            axisLabel: "Date",
            // dayNames: stringDays,
            // monthNames: tringMonths,
            tickFormatter: getDayForWeekStat,
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10
        },
        yaxis: {
            color: "black",
            axisLabel: "DNS Query Count",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 3
        },
        grid: {
            hoverable: true,
            clickable: true,
            borderWidth: 2//,
            //backgroundColor: { colors: ["#EDF5FF", "#ffffff"] }
        },
        colors:["#004078","#207800", "#613C00"]
    };

var alreadyFetched = [];

/**
* reformat a tab containing stats of past nbdays days with several tabs of stats per days
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
      var yy = series.map(function(row, index){
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
      var arrayLength = series.length;
      var prevIndice = [];
      var prevHour = "xx";
      var couts = [];
      var coutTotal = 0;

      for (var i = 0; i < arrayLength; i++) {
        row = series[i];
        // console.log(row.date);
        // console.log(toGMT(row.date));

        if(i == 0) {
          prevIndice = [row.JB_HC, row.JB_HP, row.JW_HC, row.JW_HP, row.JR_HC, row.JR_HP];
          prevHour = row.date.substring(11,13);
        } else {
          hour = row.date.substring(11,13);
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
      var data = [
        {label: "jbhc", data: jbhc, color: "rgba(27,119,156, 1)", lines: {show: true, fill: true, fillColor: "rgba(27,119,156, 0.6)" }},
        {label: "jbhp", data: jbhp, color: "rgba(105,187,180, 1)", lines: {show: true, fill: true, fillColor: "rgba(105,187,180, 0.6)" }},
        {label: "jwhc", data: jwhc, color: "rgba(0, 153, 0, 1)", lines: {show: true, fill: true, fillColor: "rgba(0, 153, 0, 0.6)" }},
        {label: "jwhp", data: jwhp, color: "rgba(255, 255, 0, 1)", lines: {show: true, fill: true, fillColor: "rgba(255, 255, 0, 0.6)" }},
        {label: "jrhc", data: jrhc, color: "rgba(105,187,180, 1)", lines: {show: true, fill: true, fillColor: "rgba(105,187,180, 0.6)" }},
        {label: "jrhp", data: jrhp, color: "rgba(105,187,180, 1)", lines: {show: true, fill: true, fillColor: "rgba(105,187,180, 0.6)" }},
        {yaxis: 2, data: couts}
      ];
      var consos = [];
      period.forEach(function(element, index) {
        var conso = series[arrayLength-1][element] - series[0][element];
        var cout = conso * tarifs[index];
        consos.push({conso: conso, cout: cout, label: tarifLabels[index]});
      });
      consos.forEach(function(conso) {
        coutTotal += conso.cout;
      });

      var indexes = [];

      var lastRow = series[series.length - 1];
      tarifLabels.forEach(function(element, index) {

        indexes.push({label : element, valeur: lastRow[period[index]]});
      })

     return {
       statDays: [{data: data, consos: consos}],
       coutTotal: (coutTotal/1000).toFixed(2),
       options: options,
       infogenerale: {
         date: series[series.length - 1].date,
         index: indexes,
         couleurDuJour: couleur[lastRow.PTEC],
         couleurDemain: lastRow.DEMAIN
       }
     }
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
        {label: "jbhc", data: jbhc, color: "rgba(27,119,156, 1)"},
        {label: "jbhp", data: jbhp, color: "rgba(105,187,180, 1)"},
        {label: "jwhc", data: jwhc, color: "rgba(0, 153, 0, 1)"},
        {label: "jwhp", data: jwhp, color: "rgba(255, 255, 0 1)"},
        {label: "jrhc", data: jrhc},
        {label: "jrhp", data: jrhp}/*,
        {yaxis: 2, lines: {fill: false, steps: false, show: true }, data: couts},*/
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
