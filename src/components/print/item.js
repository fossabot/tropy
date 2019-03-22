'use strict'

const React = require('react')
const { Photo } = require('./photo')
const { arrayOf, object } = require('prop-types')

const Item = ({ photos }) => (
  <div className="item">
    {photos.map(photo =>
      <Photo
        {...photo}
        key={photo.id}/>)}
  </div>
)

Item.propTypes = {
  photos: arrayOf(object).isRequired
}

module.exports = {
  Item
}
