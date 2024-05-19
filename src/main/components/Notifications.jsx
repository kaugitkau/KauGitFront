import React, { useRef, useState } from 'react';
import { FaRegBell, FaTimes } from 'react-icons/fa';
import { Modal, Button } from 'react-daisyui';

export default function NotificationsModal() {
  const modalRef = useRef(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your trip to Paris is confirmed!' },
    { id: 2, message: 'You have a new message from John.' },
    { id: 3, message: 'Your profile was viewed 10 times today.' },
    { id: 4, message: 'Your friend Anna joined the platform.' }
  ]);

  const handleRemoveNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="mx-2 font-sans">
      <Button shape="circle" className="border-none hover:bg-cyan-700 bg-cyan-600 bg-opacity-45 btn-sm" onClick={() => modalRef.current?.showModal()}>
        <FaRegBell className="text-lg text-white"/>
      </Button>
      <Modal ref={modalRef} className="w-full py-2 bg-opacity-50 border shadow-xl bg-cyan-500 min-w-96 max-w-96">
        <Modal.Header className="py-5 text-lg font-bold text-center text-white rounded-sm bg-cyan-600 bg-opacity-70">Notifications</Modal.Header>
        <Modal.Body className="flex flex-col items-center justify-center p-6 bg-gray-50">
          {notifications.map(notification => (
            <div key={notification.id} className="w-full p-2 pl-4 mb-3 bg-white border rounded-md shadow-md">
              <div className="flex items-center justify-between">
                <div className="text-gray-800">{notification.message}</div>
                <Button color="transparent" onClick={() => handleRemoveNotification(notification.id)} className="ml-2">
                  <FaTimes className="text-gray-400 transition duration-150 hover:text-red-500"/>
                </Button>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-gray-600">No notifications</div>
          )}
          <div className="mt-6">
            <Button size='sm' onClick={() => modalRef.current?.close()} className="px-4 py-2 text-white shadow-md bg-cyan-600 bg-opacity-80 hover:bg-cyan-700">Close</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
