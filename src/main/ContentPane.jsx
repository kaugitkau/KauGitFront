import React from 'react';
import HomeDashboard from '../pages/Home';

function ContentPane() {
    return (
    <>  
        <div className="flex-row w-full-[52] px-6 py-2 md:pl-56 h-screen">
            <HomeDashboard />
        </div>
      </>
    );
}

export default ContentPane;