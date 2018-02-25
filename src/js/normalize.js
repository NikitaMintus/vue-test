let db = require('@/db/db.json');
let dataParcer = require('@/js/data-parcer.js');
let mathjs = require('mathjs');

function getData() {
  var areas = Object.keys(db);
  var energyTypes = Object.keys(db[areas[0]]);

  energyTypes.forEach(function (curEnergyType) {
    var curData = dataParcer.findValues(db, curEnergyType);
    var rowData = {
      "general": [],
      "technical": [],
      "economical": []
    };
    var normalizedData = {};

    curData.forEach(function (element) {
      rowData.general.push(element.general);
      rowData.technical.push(element.technical);
      rowData.economical.push(element.economical);
    });
    normalizedData[curEnergyType] = {};
    for (var key in rowData) {
      var normalizedArray = normalize(rowData[key]);
      normalizedData[curEnergyType][key] = makeKeyPairObj(areas, normalizedArray);
    }
    console.dir(curData);
    console.dir(normalizedData);
    console.dir(areas);
  })
}

/*
 * make key-pair object from two arrays
 */
function makeKeyPairObj(arr1, arr2) {
  var obj = {};
  for(var i = 0, l = arr1.length; i < l; i++) {
    obj[arr1[i]] = arr2[i];
  }
  return obj;
}

/*
 * data array
 */
function normalize(data) {
  var max = mathjs.max(data);
  return data.map(val => {
    return mathjs.round(val / max, 2);
  });
}

export {getData}