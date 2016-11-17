'use strict'

const React = require('react')
const { PropTypes } = React
const { only } = require('./util')
const { noop } = require('../common/util')
const cn = require('classnames')

const Tabs = ({ children, justified }) => (
  <nav>
    <ul className={cn({ nav: true, tabs: true, justified })}>
      {children}
    </ul>
  </nav>
)

const Tab = ({ children, active, onActivate, disabled }) => (
  <li
    className={cn({ tab: true, active, disabled })}
    onClick={disabled ? noop : onActivate}>
    {children}
  </li>
)


Tabs.propTypes = {
  justified: PropTypes.bool,
  children: only(Tab)
}

Tab.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onActivate: PropTypes.func.isRequired
}

module.exports = {
  Tabs, Tab
}
