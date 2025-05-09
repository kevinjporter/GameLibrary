import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css'
import App from './App.tsx'
import Layout from './layout/Dashboard.tsx';
import GameListPage from './pages/GameListPage.tsx';
import GenreListPage from './pages/GenreListPage.tsx';
import AddGamePage from './pages/AddGamePage.tsx';
import AddGenrePage from './pages/AddGenrePage.tsx';

const router = createBrowserRouter([
  {
    Component: App, // root layout route
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: 'games',
            Component: GameListPage
          },

          {
            path: 'add-game',
            Component: AddGamePage
          },

          {
            path: 'genres',
            Component: GenreListPage
          },

          {
            path: 'add-genre',
            Component: AddGenrePage
          }
        ]       
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
