import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/mode-groovy'
import 'ace-builds/src-noconflict/theme-chaos'

import './custom.css'

export default class AceEditorWrapper extends React.Component {
  render() {
    return (
      <AceEditor
        theme="chaos"
        width="auto"
        height="100%"
        tabSize={2}
        debounceChangePeriod={200}
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        wrapEnabled
        {...this.props}
      />
    )
  }
}
