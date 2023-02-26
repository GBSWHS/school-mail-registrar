import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import '@fontsource/roboto'
import 'normalize.css/normalize.css'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
