import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import Mini from '@karrotmarket/mini'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const mini = new Mini()

root.render(
  <React.StrictMode>
    <App closeMini={() => mini.close()} isOnNativeWebview={mini.environment !== 'Web'} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
