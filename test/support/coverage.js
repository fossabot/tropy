'use strict'

const glob = require('glob')

const { resolve } = require('path')
const { Reporter, Instrumenter, Collector, hook } = require('istanbul')

// Override __src to point to instrumented sources!
global.__src = resolve(__dirname, '..', '..', 'lib')

const root = resolve(__dirname, '..', '..')
const reporter = new Reporter()
reporter.addAll(['text-summary', 'json'])

function matcher(pattern) {
  const map = {}
  const fn = function (file) { return map[file] }

  fn.files = glob.sync(pattern, { root, realpath: true })
  for (let file of fn.files) map[file] = true

  return fn
}

const instrumenter = new Instrumenter()
const transformer = instrumenter.instrumentSync.bind(instrumenter)

hook.hookRequire(matcher('lib/**/*.js'), transformer, {})

global.__coverage__ = {}

function done() {
  // Check for global variable
  // Touch uncovered files
  const collector = new Collector()

  collector.add(__coverage__)

  reporter.write(collector, true, () => {})
}

if (process.type === 'browser') {
  process.on('exit', done)
} else {
  window.addEventListener('unload', done)
}
