import { Navigation } from '@toolpad/core'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';


const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Games',
  },
  {
    segment: 'games',
    title: 'Game List',
    icon: <DashboardIcon />
  },
  {
    segment: 'add-game',
    title: 'Add Game',
    icon: <AddCircleOutlineIcon />
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Genres'
  },
  {
    segment: 'genres',
    title: 'Genre List',
    icon: <ContentPasteIcon />
  },
  {
    segment: 'genre',
    title: 'Add Genre',
    icon: <AddCircleOutlineIcon />
  }
];

const BRANDING = {
  title: "Game List App"
}

function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>    
  )
}

export default App
