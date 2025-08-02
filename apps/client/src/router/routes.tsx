import MailLayout from '@/layouts/MailLayout';
import { PlainLayout } from '@/layouts/PlainLayout';
import { SettingLayout } from '@/layouts/SettingLayout';
import Login from '@/pages/auth/SignInPage';
import Hero from '@/pages/hero/HeroPage';
import Compose from '@/pages/mail/ComposePage';
import Inbox from '@/pages/mail/InboxPage'; 
import Profile from '@/pages/settings/ProfilePage';
import Appearance from '@/pages/settings/AppearancePage';
import { createBrowserRouter, Navigate } from 'react-router';
import ImportPage from '@/pages/settings/ImportPage';

export const router = createBrowserRouter([
  {
    element: <PlainLayout />,
    children: [
      { path: '/', element: <Hero /> },
      { path: '/login', element: <Login /> }
    ]
  },
  {
    path: '/mail',
    element: <MailLayout />,
    children: [
      { index: true, element: <Navigate to='inbox' replace /> },
      { path: 'inbox', element: <Inbox /> },
      { path: 'compose', element: <Compose /> },
      {
        path: 'settings',
        element: <SettingLayout />,
        children: [
          { index: true, element: <Navigate to='profile' replace /> },
          { path: 'profile', element: <Profile /> },
          { path: 'appearance', element: <Appearance /> },
          { path: 'import', element: <ImportPage /> },
        ]
      },
    ]
  },

  {
    path: '*',
    element: <h1>404 not found</h1>
  }
]);
