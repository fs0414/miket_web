import './App.css'
import { Page } from './pages'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CookiesProvider } from 'react-cookie'

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark'
      // mode: 'light'
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <CssBaseline />
          <Page />
        </CookiesProvider>
      </ThemeProvider>
    </>
  )
}

export default App
