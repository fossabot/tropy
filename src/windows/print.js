'use strict'

const React = require('react')
const { render } = require('react-dom')
const { $ } = require('../dom')
const { PrintContainer } = require('../components/print')

render(<PrintContainer/>, $('main'))
