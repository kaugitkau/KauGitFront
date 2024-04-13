import Sidebar from './main/SideNav';
import Header from './main/Header';
import BottomNav from './main/BottomNav';
import ContentPane from './main/ContentPane';

function Layout() {
    return (
    <>
        <div className="flex flex-row bg-slate-200">
            <div className="hidden md:block">
              <Sidebar />
            </div>
            <div className="w-full mb-3 overflow-scroll">
                <Header />
                <ContentPane />
                <BottomNav />
            </div>
        </div>
      </>  
    );
}

export default Layout;