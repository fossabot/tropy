'use strict'

const { $, html } = require('../dom')

/* eslint-disable no-multi-str */
html($('main'), '\
  <div class="page">\
    <img src="../static/images/landscape.png" width="4000" height="2000">\
  </div>\
  <div class="page">\
    <img src="../static/images/portrait.png" width="2000" height="4000">\
  </div>\
  <div class="page">\
    <img src="../static/images/landscape-sm.png" width="400" height="200">\
  </div>\
  <div class="page">\
    <img src="../static/images/portrait-sm.png" width="200" height="400">\
  </div>\
')
