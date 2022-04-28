import './index.css'
import '@karrotframe/navigator/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigator, Screen, ScreenHelmet } from '@karrotframe/navigator'
import Mini from '@karrotmarket/mini'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const mini = new Mini()

root.render(
  <React.StrictMode>
    <Navigator
      theme="Cupertino"
      onClose={() => {
        console.log('Close button is pressed')
        if (mini.environment !== 'Web') {
          mini.close()
        }
      }}
    >
      {/* <Screen path="*" component={App} /> */}
      {/* <Screen path="/" component={App} /> */}
      <App />
    </Navigator>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
