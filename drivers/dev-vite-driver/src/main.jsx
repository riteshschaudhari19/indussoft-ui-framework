import * as React from 'react'
import * as Server from 'react-dom/server'
import {createRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
let Greet = () => <h1>Hello, world!</h1>
// console.log(Server.renderToString(<Greet />))

const ele = document.getElementById('root')
const root = createRoot(ele)
root.render(<BrowserRouter><App /></BrowserRouter>)