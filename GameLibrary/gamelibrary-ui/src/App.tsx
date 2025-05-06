import { DashboardLayout } from '@toolpad/core';
import { AppProvider, Navigation } from '@toolpad/core'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { SportsEsportsOutlined } from '@mui/icons-material';
import { useDemoRouter } from '@toolpad/core/internal';
import { Box, Typography } from '@mui/material';

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
    segment: 'add-genre',
    title: 'Add Genre',
    icon: <AddCircleOutlineIcon />
  }
];

function App() {
  const router = useDemoRouter('/page');

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}>  
      <DashboardLayout
        branding={{
          logo: <SportsEsportsOutlined/>,
          title: 'Game Library',
          homeUrl: '/',
      }}>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>

  )
}

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

export default App
