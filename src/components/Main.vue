<template>
    <div id="demo" class="columns">
        <div class="column">
            <form id="search">
                Search <input name="query" v-model="searchQuery">
                Select area
                <select v-model="areaSelected">
                    <option value="vinnitsa">Vinnitsa</option>
                    <option value="kiev">Kiev</option>
                    <option value="poltava">Poltava</option>
                    <option value="donetsk">Donetsk</option>
                </select>
            </form>
            <table-grid :data="gridData" :columns="gridColumns" :filter-key="searchQuery" :table-name="areaSelected"></table-grid>
            <table-grid :data="gridDataNormalized" :columns="gridColumns" :filter-key="searchQuery" :table-name="areaSelected"></table-grid>
            <br/>
            <div class="columns">
                <div class="column">
                    <div class="result-laplassa result-container">
                        <h1 class="header-method"> Method Laplassa</h1>
                        Result Laplassa =  <strong>{{laplassa.energy}}</strong> with value <strong>{{laplassa.value}}</strong>
                    </div>
                    <div class="result-valda result-container">
                        <h1 class="header-method"> Method Valda</h1>
                        Result Valda =  <strong>{{valda.energy}}</strong> with value <strong>{{valda.value}}</strong>
                    </div>
                </div>
                <div class="column">
                    <div class="result-hurvitsa result-container">
                        <h1 class="header-method"> Method Hurvitsa</h1>
                        Result Hurvitsa =  <strong>{{hurvitsa.energy}}</strong> with value <strong>{{hurvitsa.value}}</strong>
                    </div>
                    <div class="result-sevidge result-container">
                        <h1 class="header-method"> Method Sevidge</h1>
                        Result Sevidge =  <strong>{{sevidge.energy}}</strong> with value <strong>{{sevidge.value}}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable indent */
let db = require('@/db/db.json');
var normalize = require('@/js/normalize.js');
var methods = require('@/js/methods.js');
import Table from '@/components/Table.vue';

export default {
  data() {
    return {
      searchQuery: '',
      gridColumns: ['type', 'general', 'technical', 'economical'],
      areaSelected: '',
      laplassa: {
        energy: '',
        value: ''
      },
      valda: {
        energy: '',
        value: ''
      },
      hurvitsa: {
        energy: '',
        value: ''
      },
      sevidge: {
        energy: '',
        value: ''
      }
    }
  },
  methods: {
  },
  components: {
    'table-grid': Table
  },
  computed: {
    gridData: function () {
      var arrData = [];
      if(this.areaSelected !== '') {
        var currentData = db[this.areaSelected];
        var arrData = [currentData.sun, currentData.hydro, currentData.geothermal, currentData.land];
      }
      return arrData;
    },
    gridDataNormalized: function () {
      var arrData = [];
      if(this.areaSelected !== '') {
        var currentData = db.normalizedData[this.areaSelected];
        var arrData = [currentData.sun, currentData.hydro, currentData.geothermal, currentData.land];
      }
      return arrData;
    },

  },
  beforeCreate: function () {
    normalize.getData();
    console.dir(db);
  },
  updated: function () {
    if(this.areaSelected !== '') {
      var laplassaResult = methods.laplass(this.areaSelected);
      this.laplassa.energy = laplassaResult.energy;
      this.laplassa.value = laplassaResult.value;

      var valdaResult = methods.valda(this.areaSelected);
      this.valda.energy = valdaResult.energy;
      this.valda.value = valdaResult.value;

      var hurvitsaResult = methods.hurvitsa(this.areaSelected, 0.5); //alpha
      this.hurvitsa.energy = hurvitsaResult.energy;
      this.hurvitsa.value = hurvitsaResult.value;

      var sevidgeResult = methods.sevidge(this.areaSelected);
      this.sevidge.energy = sevidgeResult.energy;
      this.sevidge.value = sevidgeResult.value;
    }
  }
}
</script>

<style lang="scss">
    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }

    table {
        border: 2px solid #42b983;
        border-radius: 3px;
        background-color: #fff;
    }

    th {
        background-color: #42b983;
        color: rgba(255,255,255,0.66);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    td {
        background-color: #f9f9f9;
    }

    th, td {
        min-width: 120px;
        padding: 10px 20px;
    }

    th.active {
        color: #fff;
    }

    th.active .arrow {
        opacity: 1;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #fff;
    }
    .result-container {
        margin: 30px 0;
    }
    .header-method {
        font-size: 18px;
        font-weight: 500;
        margin: 15px;
    }
</style>