import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults, setSearchQuery } from './redux_slice';
import { Button, Modal } from 'react-bootstrap';


function App() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search_result.searchQuery);
  const searchResults = useSelector((state) => state.search_result.searchResults);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const modalRef = useRef(null);


  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };


  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchResults(searchQuery));
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleSeachInputChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleData = (data) => {
    setResult(data);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={isModalOpen ? 'blur-background' : ''}>
        <div className="mb-6 m-3">
          <input
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={searchQuery}
            onChange={handleSeachInputChange}
            placeholder='Search...'
          />
        </div>

        {searchQuery && (
          <div>
            {searchResults.length > 0 ? (
              <div className="space-y-4 m-5">
                {searchResults.map((data) => (
                  <div
                    key={data.pageid}
                    onClick={() => handleData(data)}
                    className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-blue-100"
                  >
                    <h3 className="text-lg font-extrabold">Title</h3>
                    <hr className="border-gray-300 border-b-2 mb-2" />
                    <p className="text-sm font-semibold">{data.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="text-xl font-bold text-red-500">No Result Found</h1>
            )}
          </div>
        )}


      </div>
      {isModalOpen && (

        <>
          <div
            className="modal show flex justify-center items-center"
            style={{ display: 'block' }}

          >
            <Modal.Dialog ref={modalRef}>
              <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>{result.title}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p dangerouslySetInnerHTML={{ __html: result.snippet }} />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        </>
      )}
    </>
  );
}


export default App;
