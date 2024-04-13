import React from 'react';
import PostingPreview from "../dashboard/Postingpreview";
import MentorPreview from "../dashboard/Mentoringpreview";
import upcomingEvents from "../dashboard/UpcomingEvents";
import HousingPreview from '../dashboard/HousingPreview';

export default function HomeDashboard() {
    let eventsCarousel = upcomingEvents();
    return (
    <>  
        <div className="w-full">
            {eventsCarousel}
        </div>
        <div className="mt-3 mb-2 lg:space-x-4 lg:flex md:flex-row h-max">
            <div className="w-full h-56 lg:w-1/2">
                <HousingPreview />
            </div>
            <div className="w-full h-56 lg:w-1/2">
                <MentorPreview/>
            </div>
        </div>
        <div className="h-36">
            <PostingPreview/>
        </div>
      </>
    );
}