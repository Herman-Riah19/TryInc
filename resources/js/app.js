import '../css/app.css'

import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import { CssBaseline } from '@mui/material'
import SwitchThemeProvider from './Style/theme'

InertiaProgress.init({
  color: '#EF89DA',
  showSpinner: false
})

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props }) {
    render(
      <SwitchThemeProvider>
        <CssBaseline />
        <App {...props} />
      </SwitchThemeProvider>
    , el)
  },
})
