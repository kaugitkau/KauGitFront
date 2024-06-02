// src/dashboard/profile/ProfilePage.js
import { Button, Avatar } from 'daisyui';

function ProfilePage() {
  return (
  <>
  <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-5xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">HANZ8M</h1>
          </div>
          <div className="flex items-center space-x-2">
            <input type="text" placeholder="Search" className="input input-bordered" />
            <Button className="ml-2">Support</Button>
          </div>
        </header>

        <div className="flex mt-6 space-x-6">
          <div className="w-1/4">
            <Avatar className="w-24 h-24 mx-auto" src="path_to_profile_image" />
            <h2 className="mt-4 text-xl font-semibold text-center">Dave C. Brown</h2>
            <p className="text-center text-gray-500">Exchange Student in KAU</p>
            <div className="text-center text-gray-500">@dave_brown</div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Lv.50 (PLATINUM)</p>
              <div className="flex items-center justify-center space-x-1">
                <progress className="w-24 progress" value="28800" max="30000"></progress>
                <span className="text-sm text-gray-500">28800/30000</span>
              </div>
              <Button className="mt-2">EDIT</Button>
            </div>
          </div>

          <div className="w-3/4 space-y-6">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xl font-bold">100</p>
                <p>Community</p>
              </div>
              <div>
                <p className="text-xl font-bold">10k</p>
                <p>Likes</p>
              </div>
              <div>
                <p className="text-xl font-bold">10k</p>
                <p>Comments</p>
              </div>
              <div>
                <p className="text-xl font-bold">10k</p>
                <p>Blog</p>
              </div>
            </div>

            <div className="flex space-x-6">
              <div className="w-1/2">
                <h3 className="text-lg font-semibold">My Community</h3>
                <ul className="pl-5 space-y-2 list-disc">
                  <li>Lorem ipsum dolor sit amet consectetuer.</li>
                  <li>Lorem ipsum dolor sit amet consectetuer.</li>
                  <li>Lorem ipsum dolor sit amet consectetuer.</li>
                  <li>Lorem ipsum dolor sit amet consectetuer.</li>
                  <li>Lorem ipsum dolor sit amet consectetuer.</li>
                </ul>
              </div>
              <div className="w-1/2">
                <h3 className="text-lg font-semibold">Bookmarks</h3>
                <ul className="pl-5 space-y-2 list-disc">
                  <li>Lorem ipsum dolor sit amet consectetuer.</li>
                  <li>Lorem ipsum dolor sit amet consectetuer.</li>
                  <li>Lorem ipsum dolor sit amet consectetuer.</li>
                  <li>Lorem ipsum dolor sit amet consectetuer.</li>
                  <li>Lorem ipsum dolor sit amet consectetuer.</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">My Blog</h3>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Description Top</h4>
                    <span className="badge badge-info">hash1</span>
                  </div>
                  <p className="text-gray-500">Title</p>
                  <p>Description Bottom</p>
                </div>
                <div className="p-4 mt-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Description Top</h4>
                    <span className="badge badge-info">hash2</span>
                  </div>
                  <p className="text-gray-500">Title</p>
                  <p>Description Bottom</p>
                </div>
              </div>
              <div className="space-y-4">
                <Button className="w-full">My Housings</Button>
                <Button className="w-full">My Guidings</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Request</h3>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Elbert Inc.</h4>
                    <p className="text-gray-500">18 July</p>
                  </div>
                  <div className="tooltip tooltip-left" data-tip="Details">
                    <Button className="btn-circle btn-outline btn-sm">i</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <h4 className="font-semibold">Owen Inc.</h4>
                    <p className="text-gray-500">17 July</p>
                  </div>
                  <div className="tooltip tooltip-left" data-tip="Details">
                    <Button className="btn-circle btn-outline btn-sm">i</Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
