import './App.css'
//import { Suspense, lazy } from 'react'
import Nav from './components/semantics/Nav'
import Main from './components/semantics/Main'
import Footer from './components/semantics/Footer'
import MemoryGame from './components/pages/MemoryGame'
import CookieBar from './components/resources/cookies/CookieBar'

// Works also with SSR as expected
//const Card = lazy(() => import('./Card'))

function App() {
  return (
    <>
        <MemoryGame />
        <CookieBar />
    </>
  )
}

export default App
