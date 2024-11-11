import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Eventts from './component/events.tsx';
import getEventts from './util/get-events.ts';
import executeEventtsActions from './util/execute-events-actions.ts';
import ErrorBoundary from './component/error-boundary.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Eventts/>,
        loader: getEventts,
        action: executeEventtsActions,
        errorElement: <ErrorBoundary/>
      }
    ],
  }  
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
