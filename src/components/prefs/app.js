'use strict'

const React = require('react')
const { TemplateSelect } = require('../template/select')
const { ResourceSelect } = require('../resource/select')
const { ipcRenderer: ipc } = require('electron')
const { ESPER, ITEM } = require('../../constants')
const { darwin } = require('../../common/os')

const {
  IconItemSmall,
  IconPhoto,
  IconSelection
} = require('../icons')

const {
  array, arrayOf, bool, func, object, shape, string
} = require('prop-types')

const {
  FormElement,
  FormSelect,
  FormToggle,
  FormToggleGroup,
  Toggle
} = require('../form')


class AppPrefs extends React.PureComponent {
  handleDebugChange() {
    ipc.send('cmd', 'app:toggle-debug-flag')
  }

  handleThemeChange = ({ theme }) => {
    ipc.send('cmd', 'app:switch-theme', theme)
  }

  handleLocaleChange = ({ locale }) => {
    ipc.send('cmd', 'app:switch-locale', locale)
  }

  handleLocalTimeChange = ({ localtime }) => {
    this.props.onSettingsUpdate({ localtime })
  }

  handleTemplateChange = (values, hasChanged) => {
    if (hasChanged) {
      let [type, template] = Object.entries(values)[0]
      this.props.onSettingsUpdate({
        templates: {
          [type]: template.id
        }
      })
    }
  }

  handleTitleChange = (values, hasChanged) => {
    if (hasChanged) {
      let [name, value] = Object.entries(values)[0]
      if (value && value.id) value = value.id
      this.props.onSettingsUpdate({
        title: {
          [name]: value
        }
      })
    }
  }

  render() {
    return (
      <div className="scroll-container">
        <div className="form-horizontal">
          <FormElement id="prefs.app.templates.label">
            <TemplateSelect
              icon={<IconItemSmall/>}
              isRequired
              name="item"
              options={this.props.templates.item}
              value={this.props.settings.templates.item}
              tabIndex={0}
              onChange={this.handleTemplateChange}/>
            <TemplateSelect
              icon={<IconPhoto/>}
              isRequired
              name="photo"
              options={this.props.templates.photo}
              value={this.props.settings.templates.photo}
              tabIndex={0}
              onChange={this.handleTemplateChange}/>
            <TemplateSelect
              icon={<IconSelection/>}
              isRequired
              name="selection"
              options={this.props.templates.selection}
              value={this.props.settings.templates.selection}
              tabIndex={0}
              onChange={this.handleTemplateChange}/>
          </FormElement>
          <hr/>
          <FormToggleGroup
            id="prefs.app.dup"
            name="dup"
            isCompact
            value={this.props.settings.dup}
            options={this.props.dupOptions}
            onChange={this.props.onSettingsUpdate}/>
          <FormToggle
            id="prefs.app.localtime"
            name="localtime"
            value={this.props.settings.localtime}
            onChange={this.handleLocalTimeChange}/>
          <FormElement
            id="prefs.app.title.label"
            isCompact>
            <ResourceSelect
              icon={<IconItemSmall/>}
              options={this.props.properties}
              name="item"
              value={this.props.settings.title.item}
              tabIndex={0}
              onChange={this.handleTitleChange}/>
            <ResourceSelect
              icon={<IconPhoto/>}
              options={this.props.properties}
              name="photo"
              value={this.props.settings.title.photo}
              tabIndex={0}
              onChange={this.handleTitleChange}/>
          </FormElement>
          <FormToggle
            id="prefs.app.title.force"
            name="force"
            value={this.props.settings.title.force}
            onChange={this.handleTitleChange}/>
          <hr/>
          <FormSelect
            id="prefs.app.style.theme"
            name="theme"
            isRequired
            isSelectionHidden
            value={this.props.settings.theme}
            options={this.props.themes}
            onChange={this.handleThemeChange}/>
          <hr/>
          <FormSelect
            id="prefs.app.locale.locale"
            name="locale"
            isRequired
            isSelectionHidden
            value={this.props.settings.locale}
            options={this.props.locales}
            tabIndex={0}
            onChange={this.handleLocaleChange}/>
          <hr/>
          <FormElement
            id="prefs.app.ui.label"
            isCompact>
            <Toggle
              id="prefs.app.ui.option.invertScroll"
              name="invertScroll"
              value={this.props.settings.invertScroll}
              onChange={this.props.onSettingsUpdate}/>
            <Toggle
              id="prefs.app.ui.option.invertZoom"
              name="invertZoom"
              value={this.props.settings.invertZoom}
              onChange={this.props.onSettingsUpdate}/>
            <Toggle
              id="prefs.app.ui.option.overlayToolbars"
              name="overlayToolbars"
              value={this.props.settings.overlayToolbars}
              onChange={this.props.onSettingsUpdate}/>
          </FormElement>
          <FormToggleGroup
            id="prefs.app.zoomMode"
            name="zoomMode"
            isCompact
            value={this.props.settings.zoomMode}
            options={this.props.zoomModes}
            onChange={this.props.onSettingsUpdate}/>
          <FormToggleGroup
            id="prefs.app.layout"
            name="layout"
            value={this.props.settings.layout}
            options={this.props.layouts}
            onChange={this.props.onSettingsUpdate}/>
          <hr/>
          <FormToggle
            id="prefs.app.debug"
            name="debug"
            isDisabled={ARGS.dev}
            value={this.props.settings.debug || ARGS.dev}
            onChange={this.handleDebugChange}/>
        </div>
      </div>
    )
  }

  static propTypes = {
    properties: array.isRequired,
    templates: shape({
      item: array.isRequired,
      photo: array.isRequired,
      selection: array.isRequired
    }).isRequired,
    settings: shape({
      debug: bool.isRequired,
      layout: string.isRequired,
      locale: string.isRequired,
      theme: string.isRequired,
      templates: object.isRequired
    }).isRequired,
    layouts: arrayOf(string).isRequired,
    locales: arrayOf(string).isRequired,
    themes: arrayOf(string).isRequired,
    dupOptions: arrayOf(string).isRequired,
    zoomModes: arrayOf(string).isRequired,
    onSettingsUpdate: func.isRequired
  }

  static defaultProps = {
    themes: ['light', 'dark'],
    layouts: [ITEM.LAYOUT.STACKED, ITEM.LAYOUT.SIDE_BY_SIDE],
    locales: ['de', 'en', 'fr', 'ja'],
    dupOptions: ['skip', 'import', 'prompt'],
    zoomModes: [ESPER.MODE.FIT, ESPER.MODE.FILL]
  }
}

if (darwin) {
  AppPrefs.defaultProps.themes.push('system')
}


module.exports = {
  AppPrefs
}
