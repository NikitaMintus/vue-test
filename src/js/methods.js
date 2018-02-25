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

function valda(areaSelected) {
  var matrixArr = convertDataToArrMatrix(areaSelected);
  var col = matrixArr[0].length, rowSum, resultArr = [];
  matrixArr.forEach(function (row) {
    rowSum = row.reduce((a, b) => a + b, 0);
    resultArr.push(mathjs.round(rowSum, 2));
  });
  var resultObj = normalize.makeKeyPairObj(db.energyTypes, resultArr);
  var bestEnergyValue = mathjs.min(resultArr);
  console.dir(bestEnergyValue);
  var bestEnergyKey = Object.keys(resultObj).find(function (key) {
    return resultObj[key] === bestEnergyValue;
  });
  return { 'energy': bestEnergyKey, 'value': bestEnergyValue };
}

function hurvitsa (areaSelected, alpha) {
  var matrixArr = convertDataToArrMatrix(areaSelected);
  var col = matrixArr[0].length, rowMin, rowMax, rowResult,  resultArr = [];
  matrixArr.forEach(function (row) {
    rowMin = mathjs.min(row);
    rowMax = mathjs.max(row);
    rowResult = alpha * rowMin + rowMax * (1 - alpha);
    resultArr.push(mathjs.round(rowResult, 2));
  });
  var resultObj = normalize.makeKeyPairObj(db.energyTypes, resultArr);
  var bestEnergyValue = mathjs.min(resultArr);
  var bestEnergyKey = Object.keys(resultObj).find(function (key) {
    return resultObj[key] === bestEnergyValue;
  });
  return { 'energy': bestEnergyKey, 'value': bestEnergyValue };
}

function sevidge (areaSelected, alpha) {
  debugger;
  var matrixArr = convertDataToArrMatrix(areaSelected);
  var col = matrixArr[0].length, rowMin, rowMax, rowResult, resultArr = [], currentMin;
  console.dir(matrixArr);
  var arrByColumn = []; // make arrays by columns
  for (var i = 0; i < matrixArr[0].length; ++i) {
    arrByColumn[i] = [];
    for (var j = 0; j < matrixArr.length; ++j) {
      arrByColumn[i].push(matrixArr[j][i]);
    }
  }
  arrByColumn.forEach(function (row, index) { // find min at each column at substract
    currentMin = mathjs.min(row);
    arrByColumn[index] = row.map((a) => mathjs.round(a - currentMin, 2));
  });
  console.dir('by column');
  console.dir(arrByColumn);

  var arrByRow = []; // make arrays by rows
  for (var i = 0; i < arrByColumn[0].length; ++i) {
    arrByRow[i] = [];
    for (var j = 0; j < arrByColumn.length; ++j) {
      arrByRow[i].push(arrByColumn[j][i]);
    }
  }
  console.dir('by row');
  console.dir(arrByRow);
  var maxElements = [];
  arrByRow.forEach(function (row) {
    maxElements.push(mathjs.max(row));
  });
  var resultObj = normalize.makeKeyPairObj(db.energyTypes, maxElements);
  console.dir('max elements');
  console.dir(maxElements);
  var bestEnergyValue = mathjs.min(maxElements);

  var bestEnergyKey = Object.keys(resultObj).find(function (key) {
    return resultObj[key] === bestEnergyValue;
  });
  return { 'energy': bestEnergyKey, 'value': bestEnergyValue };
}

export {laplass, valda, hurvitsa, sevidge}
