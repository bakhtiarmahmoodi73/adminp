// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import App from './App'
import { store } from './store'
import { darkTheme } from './themes/darkTheme'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)