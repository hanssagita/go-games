import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Wom from './pages/Wom'
import Home from './pages/Home'
import { Box, Container } from '@mui/material'
import { WomProvider } from './context/WomContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Box>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/wom">
              <WomProvider>
                <Wom />
              </WomProvider>
            </Route>
          </Switch>
        </Router>
      </Container>
    </Box>
    <ToastContainer />
  </React.StrictMode>
)
