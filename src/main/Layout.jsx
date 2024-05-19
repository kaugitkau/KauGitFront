import Sidebar from './components/SideNav';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
function Layout({Content}) {
    return (
    <>
        <Header />
        <div className="flex flex-row bg-slate-50">
            <div className="hidden md:block">
              <Sidebar />
            </div>
            <div className="w-full overflow-scroll">
                <div className="flex-row w-full-[52] md:w-full px-6 py-2 md:pl-28 md:pt-24 h-screen">
                  {Content}
                </div>
                <BottomNav />
            </div>
        </div>
      </>  
    );
}

export default Layout;