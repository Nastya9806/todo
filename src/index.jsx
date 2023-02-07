import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/app/app'

const container = document.getElementById('root')
const root = createRoot(container)

const el = <App />
root.render(el)
