import MailLayout from '@/layouts/MailLayout';
import { PlainLayout } from '@/layouts/PlainLayout';
import { SettingLayout } from '@/layouts/SettingLayout';
import Login from '@/pages/auth/SignInPage';
import Hero from '@/pages/hero/HeroPage';
import Compose from '@/pages/mail/ComposePage';
import Inbox from '@/pages/mail/InboxPage';
import TrashPage from '@/pages/mail/TrashPage';
import Appearance from '@/pages/settings/AppearancePage';
import { createBrowserRouter, Navigate } from 'react-router';

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
      { path: 'trash', element: <TrashPage /> }
    ]
  },
  {
    path: '/settings',
    element: <SettingLayout />,
    children: [
      { index: true, element: <Appearance /> },
      { path: 'appearance', element: <Appearance /> }
    ]
  },
  {
    path: '*',
    element: <h1>404 not found</h1>
  }
]);
