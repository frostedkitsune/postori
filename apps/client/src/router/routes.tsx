import { createBrowserRouter } from 'react-router';
import { MailLayout } from '@/layouts/MailLayout';
import { PlainLayout } from '@/layouts/PlainLayout';
import { SettingLayout } from '@/layouts/SettingLayout';
import Hero from '@/pages/hero/HeroPage';
import Login from '@/pages/auth/SignInPage';
import Appearance from '@/pages/settings/AppearancePage';
import Inbox from '@/pages/mail/InboxPage';
import Compose from '@/pages/mail/ComposePage';

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
      { index: true, element: <Inbox /> },
      { path: 'inbox', element: <Inbox /> },
      { path: 'compose', element: <Compose /> }
    ]
  },
  {
    path: '/settings',
    element: <SettingLayout />,
    children: [
      { index: true, element: <Appearance /> },
      { path: 'appearance', element: <Appearance /> }
    ]
  }
]);
