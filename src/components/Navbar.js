import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const [modalState, setModalState] = useState(false);
  const [userInput, setUserInput] = useState(user);
  const navigate = useNavigate();

  function handleModalClose() {
    setUser(userInput);
    setModalState(false);
    if (userInput.length > 0) {
      navigate("/mis-memes");
    }
  }
  return (
    <nav className='bg-dark-background'>
      <div className='max-w-6xl p-4 mx-auto text-white flex justify-between items-center border-1 border-rose-500'>
        <img src='BITMEMES.png' alt='bitlogic logo' className='w-40' />
        <div className='flex gap-6'>
          <Link to='/' className='flex gap-2 hover:text-bitlogic-blue'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
            Home
          </Link>
          {user.length > 0 && (
            <Link
              to={`/mis-memes`}
              className='flex gap-2 hover:text-bitlogic-blue'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              Mis Memes
            </Link>
          )}
        </div>
        {user.length > 0 ? (
          <button
            className='text-bitlogic-yellow'
            onClick={() => setModalState(true)}
          >
            {user}
          </button>
        ) : (
          <button onClick={() => setModalState(true)}>Login</button>
        )}
      </div>
      {modalState && (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-2xl'>Cambiar usuario:</h3>
                </div>
                {/*body*/}
                <div className='relative p-6 flex-auto'>
                  <label htmlFor='name'>
                    {" "}
                    Nombre de usuario:
                    <input
                      type='text'
                      id='name'
                      name='name'
                      className='border-[1px] ml-4'
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                    />
                  </label>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setModalState(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={handleModalClose}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-50 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
