'use strict'

const React = require('react')
const { ipcRenderer: ipc } = require('electron')
const { Item } = require('./item')

class PrintContainer extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    ipc.on('print', this.onPrint)
    ipc.send('print:mount')
  }

  componentWillUnmount() {
    ipc.removeListener('print', this.onPrint)
  }

  componentDidUpdate(_, state) {
    if (this.state.items !== state.items) {
      ipc.send('print:ready')
    }
  }

  onPrint = (_, items) => {
    this.setState({ items })
  }

  render() {
    return (
      this.state.items.map(item =>
        <Item
          key={item.id}
          data={item.data}
          photos={item.photos}/>)
    )
  }
}

module.exports = {
  PrintContainer
}
