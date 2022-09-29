import '../css/app.css'

import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './Style/theme'

InertiaProgress.init({
  color: '#EF89DA',
  showSpinner: false
})

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props }) {
    render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App {...props} />
      </ThemeProvider>
    , el)
  },
})
