'use strict'

const React = require('react')
const { arrayOf, object } = require('prop-types')

const Item = ({ photos }) => (
  <div className="item page">
    {photos.map(photo =>
      <img
        key={photo.id}
        src={photo.path}/>)}
  </div>
)

Item.propTypes = {
  photos: arrayOf(object).isRequired
}

module.exports = {
  Item
}
