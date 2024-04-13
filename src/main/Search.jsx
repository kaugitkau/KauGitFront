import { FaSearch } from "react-icons/fa";
import {Input} from 'react-daisyui';

export default function SearchBox() {
  return (
    <>
    <div className="w-full lg:w-2/3">
    <form class="flex items-center">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="flex justify-end border border-gray-200 text-gray-900 bg-slate-100 p-1.5 rounded-xl block w-full p-2.5">
        <input type="text" id="simple-search" class="w-full pl-5 bg-gray-50 text-sm rounded-lg" placeholder="Search branch name..." required />
        <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-xl hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300">
        <FaSearch />
        </button>
    </div>
    </form>
    </div>

    </>
  );
}
