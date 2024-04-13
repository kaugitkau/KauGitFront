import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function upcomingEvents() {
    const EventUrls = [
        'https://dummyjson.com/image/300x100/?text=1',
        'https://dummyjson.com/image/300x100/?text=2',
        'https://dummyjson.com/image/300x100/?text=3'
    ]

    return (
    <>
    <div>
    {/* <h2 className="mb-3 ml-1 text-xl font-bold text-left text-gray-700">Upcoming Events</h2> */}
    <Carousel className="rounded-none shadow-xl" autoPlay autoFocus infiniteLoop showThumbs={false}>
                {EventUrls.map((url, index) => (
                <div className="h-48 p-3 text-white bg-black rounded-none card card-side glass">
                <figure><img src={url} width="30" height="auto" /></figure>
                <div className="card-body">
                  <h2 className="text-left card-title">New movie is released!</h2>
                  <p className="flex text-sm text-left">Click the button to watch on Jetflix app.
                  <div className="justify-end mt-2 card-actions">
                    <button className="btn btn-primary btn-sm"></button>
                  </div>
                  </p>
                </div>
              </div>
                ))
                }
            </Carousel>
            </div>
    </>
    );
}
