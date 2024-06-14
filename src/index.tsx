import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import '../style12.scss'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('app')!)
// v18 的新方法
root.render(<App />)
