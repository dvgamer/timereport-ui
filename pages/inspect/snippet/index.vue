<template>
<div>
  <no-ssr>
    <slideout-panel v-show="true"></slideout-panel>
  </no-ssr>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
    <h1 class="h2">Snippets</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <b-button-group class="mr-2" size="sm">
        <b-button class="btn-outline-secondary" @click="$router.push('/inspect/snippet/create')"><i class="fa fa-plus"></i> NEW</b-button>
      </b-button-group>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="table-responsive-sm">
        <b-table class="table table-filter" :items="items" :fields="fields" show-empty empty-text="No snippet.">
          <template slot="table-colgroup">
            <col style="width: 75%">
            <col style="width: 10%">
            <col style="width: 15%">
          </template>
          <template slot="file" slot-scope="data">
            <nuxt-link class="media" :to="{ path: `/inspect/snippet/${data.item._id}` }">
              <a href="#" class="pull-left pr-2">
                <div class="media-photo" :style="{ backgroundImage: `url('${data.item.avatar}')` }"></div>
              </a>
              <div class="media-body">
                <h4 class="title" v-text="data.value"></h4>
                <p class="summary text-muted text-nowrap mb-0" v-text="getDetail(data.item.content)"></p>
              </div>
            </nuxt-link>
          </template>
          <template slot="private" slot-scope="data">
            <div v-text="data.value ? 'Private' : 'Public'"></div>
          </template>
          <template slot="updated" slot-scope="data">
            <div v-text="getModify(data.value)"></div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
const moment = require('moment')

export default {
  head: {
    title: 'Snippets',
  },
  async asyncData ({ $api, env, $axios, store, params }) {
    let data = await $api.get('/inspect/snippet')
    return { items: data }
  },
  data: () => ({
    sortBy: 'no',
    sortDesc: false,
    currentPage: 1,
    perPage: 20,
    totalRows: 120,
    fields: [
      { key: 'file', sortable: true },
      { key: 'private', sortable: true },
      { key: 'updated', sortable: true },
    ],
    items: [],
    cmOption: {
      tabSize: 4,
      styleActiveLine: true,
      lineNumbers: true,
      line: true,
      mode: 'powershell',
      lineWrapping: true,
      keyMap: "sublime",
      theme: "material"
    }
  }),
  methods: {
    getDetail (data) {
      let [ raw, line ] = /(.*?)\n/ig.exec(data) || []
      return line
    },
    getModify (date) {
      return moment(date).fromNow()
    },
    onCmCursorActivity(codemirror) {
      console.log('onCmCursorActivity', codemirror)
    },
    onCmReady(codemirror) {
      console.log('onCmReady', codemirror)
    },
    onCmFocus(codemirror) {
      console.log('onCmFocus', codemirror)
    },
    onCmBlur(codemirror) {
      console.log('onCmBlur', codemirror)
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
.table-filter {
	background-color: #fff;
	border-bottom: 1px solid #eee;
}
.table-filter tbody tr:hover {
	cursor: pointer;
	background-color: #eee;
}
.table-filter tbody tr td {
	padding: 10px;
	vertical-align: middle;
	border-top-color: #eee;
}
.table-filter tbody tr.selected td {
	background-color: #eee;
}
.table-filter tr td:first-child {
	width: 38px;
}
.table-filter tr td:nth-child(2) {
	width: 35px;
}
.ckbox {
	position: relative;
}
.ckbox input[type="checkbox"] {
	opacity: 0;
}
.ckbox label {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.ckbox label:before {
	content: '';
	top: 1px;
	left: 0;
	width: 18px;
	height: 18px;
	display: block;
	position: absolute;
	border-radius: 2px;
	border: 1px solid #bbb;
	background-color: #fff;
}
.ckbox input[type="checkbox"]:checked + label:before {
	border-color: #2BBCDE;
	background-color: #2BBCDE;
}
.ckbox input[type="checkbox"]:checked + label:after {
	top: 3px;
	left: 3.5px;
	content: '\e013';
	color: #fff;
	font-size: 11px;
	font-family: 'Glyphicons Halflings';
	position: absolute;
}
.table-filter  {
  tr.b-table-empty-row, tr.b-table-empty-row:hover {
    background-color: transparent;
    font-size: 0.75rem;
    font-weight: bold;
    cursor: default;
  }
  .star {
    color: #ccc;
    text-align: center;
    display: block;
    &.star-checked {
      color: #F0AD4E;
      &:hover {
        color: #F0AD4E;
      }
    }
    &:hover {
      color: #ccc;
    }
  }
  .media:hover {
    text-decoration:none;
  }
  .media-photo {
    width: 34px;
    height: 34px;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #f5f5f5;
  }
}


.table-filter .media-body {
    display: block;
    /* Had to use this style to force the div to expand (wasn't necessary with my bootstrap version 3.3.6) */
}
.table-filter .media-meta {
	font-size: 11px;
	color: #999;
}
.table-filter .media .title {
	color: #2BBCDE;
	font-size: 14px;
	font-weight: bold;
	line-height: normal;
	margin: 0;
}
.table-filter .media .title span {
	font-size: .8em;
	margin-right: 20px;
}
.table-filter .media .title span.pagado {
	color: #5cb85c;
}
.table-filter .media .title span.pendiente {
	color: #f0ad4e;
}
.table-filter .media .title span.cancelado {
	color: #d9534f;
}
.table-filter .media .summary {
  font-size: 11px;
  width: 320px;
}
</style>
