'use strict'

const {
  OPEN, OPENED, SAVE, UPDATE
} = require('../constants/project')

function opened(payload, meta) {
  return {
    type: OPENED,
    error: (payload instanceof Error),
    payload,
    meta: { ipc: true, ...meta }
  }
}

function open(payload, meta) {
  return { type: OPEN, payload, meta }
}

function save(payload, meta) {
  return {
    type: SAVE,
    payload,
    meta: {
      persist: true,
      history: true,
      ...meta
    }
  }
}

function update(payload, meta) {
  return { type: UPDATE, payload, meta }
}

module.exports = {
  open,
  opened,
  save,
  update
}
