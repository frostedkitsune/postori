import { Outlet } from 'react-router';

export function MailLayout() {
  return (
    <div className="flex h-screen">
      {/* <Sidebar /> -- sidebar component */}
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
