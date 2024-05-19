import React from 'react';
import PostingPreview from "../utils/Postingpreview";
import MentorPreview from "../utils/Mentoringpreview";
import UpcomingEvents from "../utils/UpcomingEvents";
import HousingPreview from '../utils/HousingPreview';

// root route
export default function MainBoard() { // Home Dashboard
    return (
    <>
        <div className="w-full">
            <UpcomingEvents />
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