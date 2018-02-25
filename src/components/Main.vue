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
        </div>
    </div>
</template>
<script>
/* eslint-disable indent */
let db = require('@/db/db.json');
var normalize = require('@/js/normalize.js');
import Table from '@/components/Table.vue';

export default {
  data() {
    return {
      searchQuery: '',
      gridColumns: ['type', 'general', 'technical', 'economical'],
      areaSelected: ''
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
    }
  },
  created: function () {
    normalize.getData();
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
</style>