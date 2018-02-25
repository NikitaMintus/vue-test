let db = require('@/db/db.json');
let dataParcer = require('@/js/data-parcer.js');
let normalize = require('@/js/normalize.js');
let mathjs = require('mathjs');
let normalizedData = db.normalizedData;

function convertDataToArrMatrix(areaSelected) {
  var areaData = db.normalizedData[areaSelected];
  var energyTypeArr = [];
  var matrixRows = [];
  Object.keys(areaData).map(function (energyTypeKey) {
    energyTypeArr.push(areaData[energyTypeKey]);
  });
  energyTypeArr.forEach(function (curEnergyType) {
    matrixRows.push([curEnergyType.general, curEnergyType.technical, curEnergyType.economical]);
  });
  return matrixRows;
}

function laplass(areaSelected) {
  var matrixArr = convertDataToArrMatrix(areaSelected);
  var col = matrixArr[0].length, rowSum, resultArr = [];
  var p = mathjs.round(1 / col, 2);
  console.dir(matrixArr);
  matrixArr.forEach(function (row) {
      rowSum = row.reduce((a, b) => a + b, 0);
      resultArr.push(mathjs.round(p * rowSum, 2));
  });
  var resultObj = normalize.makeKeyPairObj(db.energyTypes, resultArr);
  console.dir(resultArr);
  console.dir(resultObj);
  var bestEnergyValue = mathjs.min(resultArr);
  console.dir(bestEnergyValue);
  var bestEnergyKey = Object.keys(resultObj).find(function (key) {
    return resultObj[key] === bestEnergyValue;
  });
  return { 'energy': bestEnergyKey, 'value': bestEnergyValue };
}

export {laplass}
