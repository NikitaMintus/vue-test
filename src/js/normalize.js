let db = require('@/db/db.json');
let dataParcer = require('@/js/data-parcer.js');
let mathjs = require('mathjs');
var jsonfile = require("jsonfile")

var jsonData = {};

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

    writeNormalizeToJson(normalizedData, jsonData)
  });
  db.normalizedData = jsonData;
  db.energyTypes = energyTypes;
}

function writeNormalizeToJson(normalizedData, jsonData) {
  var typeEnergyKey = Object.keys(normalizedData)[0];
  var criteriesObject = normalizedData[typeEnergyKey];
  var areasObject, value;

  for (var criteriaType in criteriesObject) {
    areasObject = criteriesObject[criteriaType];
    for (var curAreaKey in areasObject) {
      value = areasObject[curAreaKey];
      setJsonStructure(jsonData, curAreaKey, typeEnergyKey, criteriaType, value);
    }
  }
}

function setJsonStructure(jsonData, areaKey, typeEnergyKey, criteriaType, value) {
  if(jsonData.hasOwnProperty(areaKey)) {
    if(jsonData[areaKey].hasOwnProperty(typeEnergyKey)) {
      jsonData[areaKey][typeEnergyKey][criteriaType] = value;
    } else {
      jsonData[areaKey][typeEnergyKey] = {
        'type': typeEnergyKey,
        'area': areaKey,
        [criteriaType]: value
      }
    }
  } else {
    jsonData[areaKey] = {
      [typeEnergyKey]: {
        'type': typeEnergyKey,
        'area': areaKey,
        [criteriaType]: value
      }
    }
  }
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

export {getData, jsonData, makeKeyPairObj}