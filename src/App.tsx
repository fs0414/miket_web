import './App.css'
import { Page } from './pages'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark'
      // primary: {
      //   main: "#a34449",
      //   dark: '#a34449'
      // },
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Page />
      </ThemeProvider>
    </>
  )
}

export default App
