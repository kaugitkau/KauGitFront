import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { Rating } from 'react-daisyui';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
}

export default function HousingPreview() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://dummyjson.com/products/search?q=phone')
            .then(res => res.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="lg:mt-3">
            <h2 className="mb-3 ml-1 text-xl font-bold text-left text-gray-700">Top Housings</h2>
            <div className="bg-gray-200">
            <Carousel responsive={responsive} className="rounded-md shadow-xl" autoPlay autoFocus infiniteLoop showThumbs={false}>
                {products.map(product => (
                    <div key={product.id} className="h-40 p-1 mx-2 text-white rounded-md bg-slate-50 opacity-85 card card-side glass">
                        <div className="card-body">
                            <img src={product.thumbnail} alt={product.title} width="w-fit"/>
                            <h2 className="flex text-sm text-left card-title max-w-[180px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">{product.title}</h2>
                            {/* <p className="flex text-sm text-left">{product.description}</p> */}
                            <ul className="text-xs">
                                <li className="mb-2 font-bold text-left text-blue-200">${product.price}
                                <span className="ml-2 text-xs font-thin text-green-200">({product.rating})</span>
                                </li>
                                <li className="text-left text-blue-400">
                                    <Rating value={Math.floor(product.rating * 2)} half={true} hidden className="rating-sm">
                                      <Rating.Item name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
                                      <Rating.Item name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
                                      <Rating.Item name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
                                      <Rating.Item name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
                                      <Rating.Item name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
                                      <Rating.Item name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
                                      <Rating.Item name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
                                      <Rating.Item name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
                                      <Rating.Item name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
                                      <Rating.Item name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
                                    </Rating>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </Carousel>
            </div>
        </div>
    );
}
