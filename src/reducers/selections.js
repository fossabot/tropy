'use strict'

const { METADATA, SELECTION, PROJECT } = require('../constants')
const { bulk, insert, nested, replace, touch } = require('./util')

module.exports = {
  // eslint-disable-next-line complexity
  selections(state = {}, { type, payload, error, meta }) {
    switch (type) {
      case PROJECT.OPEN:
        return {}

      case SELECTION.LOAD:
        return (error || !meta.done) ? state : replace(state, payload)
      case SELECTION.CREATE:
        return (error || !meta.done) ? state : insert(state, payload)
      case SELECTION.SAVE:
        return (!meta.done || error) ?
          state : {
            ...state,
            [payload.id]: {
              ...state[payload.id],
              ...payload,
              modified: new Date(meta.was)
            }
          }

      case SELECTION.NOTE.ADD:
        return nested.add('notes', state, payload, meta)
      case SELECTION.NOTE.REMOVE:
        return nested.remove('notes', state, payload, meta)

      case SELECTION.BULK.UPDATE:
        return bulk.update(state, payload, meta)

      case METADATA.SAVE:
      case METADATA.RESTORE:
        return touch(state, payload, meta, error)

      default:
        return state
    }
  }
}
