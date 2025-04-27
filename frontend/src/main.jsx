import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import {BrowserRouter} from 'react-router-dom'

import App from './App.jsx'

// Create the default system for Chakra UI v3
const system = createSystem(defaultConfig)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
    
  </StrictMode>,
)