import { Outlet } from 'react-router';

export function SettingLayout() {
  return (
    <div className="flex h-screen">
      {/* <Settingbar/> -- setting sidebar component */}
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
