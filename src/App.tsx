import * as React from 'react'
import { Home } from './pages/home'

// import './style.scss'
import Style from './style.scss'

const App: React.FC = () => {
  return (
    <>
      <div id={Style.page}>hello</div>
      <Home />
    </>
  )
}

export default App