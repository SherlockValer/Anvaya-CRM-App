import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import LeadManagement from './pages/LeadManagement.jsx'
import LeadList from './pages/LeadList.jsx'
import SalesAgentManagement from './pages/SalesAgentManagement.jsx'
import Reports from './pages/Reports.jsx'
import LeadsByStatus from './pages/LeadsByStatus.jsx'
import LeadsBySalesAgent from './pages/LeadsBySalesAgent.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/leads/:leadID',
    element: <LeadManagement />
  },
  {
    path: '/leadlist',
    element: <LeadList />
  },
  {
    path: '/salesagents',
    element: <SalesAgentManagement />
  },
  {
    path: '/reports',
    element: <Reports />
  },
  {
    path: '/status/:statusName',
    element: <LeadsByStatus />
  },
  {
    path: '/agent/:agentId',
    element: <LeadsBySalesAgent />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
