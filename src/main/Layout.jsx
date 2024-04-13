import Sidebar from './components/SideNav';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

function Layout({Content}) {
    return (
    <>
        <div className="flex flex-row bg-slate-200">
            <div className="hidden md:block">
              <Sidebar />
            </div>
            <div className="w-full overflow-scroll">
                <Header />
                <div className="flex-row w-full-[52] md:w-full px-6 py-2 md:pl-56 h-screen">
                  {Content}
                </div>
                <BottomNav />
            </div>
        </div>
      </>  
    );
}

export default Layout;