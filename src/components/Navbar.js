import React from "react";

function Navbar({ user, setUser }) {
  return (
    <nav className="bg-dark-background">
      <div className="max-w-6xl p-4 mx-auto text-white flex justify-between items-center border-1 border-rose-500">
        <img src="bitlogic.png" alt="bitlogic logo" className="w-40" />
        <div className="flex gap-6">
          <a href="/" className="flex gap-2 hover:text-bitlogic-blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </a>
          {user.length > 0 && (
            <a
              href={`/usermemes?username=${user}`}
              className="flex gap-2 hover:text-bitlogic-blue"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Mis Memes
            </a>
          )}
        </div>
        {user.length > 0 ? (
          <button className="text-bitlogic-yellow">{user}</button>
        ) : (
          <butto>Login</butto>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
