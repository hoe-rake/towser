import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import MatchForm from './MatchForm'
import './globals.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RecoilRoot>
            <MatchForm />
        </RecoilRoot>
    </React.StrictMode>
)
