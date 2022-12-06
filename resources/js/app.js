import '../css/app.css'

import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import { CssBaseline } from '@mui/material'
import WebFont from 'webfontloader'
import { ThemeProvider } from '@emotion/react'
import theme from './Style/theme'

InertiaProgress.init({
  color: '#EF89DA',
  showSpinner: false
})

WebFont.load({
  google: {
    families: ['Poppins', 'Nunito']
  }
})

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props }) {
    render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App {...props} />
      </ThemeProvider>
      </React.StrictMode >
    , el)
  },
})
