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
const isWeb = mini.environment === 'Web'
const navBarHeight = '-2.75em'

root.render(
  <React.StrictMode>
    <Navigator theme="Cupertino" onClose={() => !isWeb && mini.close()}>
      <Screen path='*'>
        <ScreenHelmet closeButtonLocation='right' visible={!isWeb} />
        <div style={{marginTop: isWeb ? '0' : navBarHeight}}> <App /> </div>
      </Screen>
    </Navigator>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
