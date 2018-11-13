import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { injectGlobal } from 'styled-components'
import 'normalize.css'
import './variables.css'
import 'semantic-ui-css/semantic.min.css';

// Global Styles
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Fredoka+One|Nunito');

  body {
    background-color: var(--main-bg-color) !important;
    font-family: var(--font-family) !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: var(--font-family) !important;
  }

  img {
    max-width: 100%;
    vertical-align: middle;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
