import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router }  from 'react-router-dom'
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'

// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById('root')).render(<Router><App /></Router>)