import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { injectGlobal } from 'styled-components'
import css from 'css.js'
import 'normalize.css'
import './variables.css'
import 'semantic-ui-css/semantic.min.css';
import 'react-notifications/lib/notifications.css';
import { lighten } from 'polished'

// Global Styles
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Fredoka+One|Nunito');

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: ${css.fontFamily} !important;
    background-color: ${lighten(0.1, '#d1d8e0')} !important;
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

  #root {
    @media screen and (max-width: 800px) {
      margin-bottom: calc(77.09px + 2em);
    }
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
