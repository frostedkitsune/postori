import { RouterProvider } from 'react-router';
import { router } from './router/routes';
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {


  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />;
    </ThemeProvider>
  )


}
