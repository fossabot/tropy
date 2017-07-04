'use strict'

const React = require('react')
const { PureComponent } = React
const { TemplateField } = require('./field')
const { insert, move } = require('../../common/util')
const { arrayOf, func, object, shape, string } = require('prop-types')


class TemplateFieldList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      fields: [...props.fields]
    }
  }

  componentWillReceiveProps(props) {
    if (props.fields !== this.props.fields) {
      this.setState({
        fields: [...props.fields]
      })
    }
  }

  handleFieldInsert = (field) => {
    const at = this.state.fields.indexOf(field)

    this.setState({
      fields: insert(this.state.fields, at + 1, {
        property: { id: '' }
      })
    })
  }

  handleFieldRemove = (field) => {
    this.props.onFieldRemove({
      id: this.props.template,
      field: field.id
    })
  }

  handleSort = () => {
  }

  handleSortPreview = (from, to, offset) => {
    this.setState({
      fields: move(this.state.fields, from, to, offset)
    })
  }

  handleSortReset = () => {
  }

  render() {
    return this.props.template != null && (
      <ul className="template-field-list">
        {this.state.fields.map((field) =>
          <TemplateField
            key={field.id}
            field={field}
            properties={this.props.properties}
            onInsert={this.handleFieldInsert}
            onRemove={this.handleFieldRemove}
            onSort={this.handleSort}
            onSortPreview={this.handleSortPreview}
            onSortReset={this.handleSortReset}/>)}
      </ul>
    )
  }

  static propTypes = {
    template: string.isRequired,
    fields: arrayOf(object).isRequired,
    properties: arrayOf(shape({
      id: string.isRequired
    })).isRequired,
    onFieldAdd: func.isRequired,
    onFieldRemove: func.isRequired,
  }
}

module.exports = {
  TemplateFieldList
}