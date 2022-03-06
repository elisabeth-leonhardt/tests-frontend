import "./App.css";
import FileUpload from "./components/FileUpload";
import { QueryClient, QueryClientProvider } from "react-query";
import MemeList from "./components/MemeList";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState("funny-eli");
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Navbar user={user} setUser={setUser}></Navbar>

        {/* <div className="bg-gray-100">
          <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl">
            <img className="h-10" src="logo.svg" alt="Workation" />
            <img
              className="mt-6 rounded-lg shadow-xl"
              src="beach-work.jpg"
              alt="Woman"
            />
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              You can work from anywhere.{" "}
              <span className="text-indigo-500">Take advantage of it.</span>
            </h1>
            <p className="mt-2 text-gray-600">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut
              tenetur et esse in ex culpa facere animi ullam aut iure unde
              impedit eos accusantium, voluptate doloribus deleniti vero cumque
              id?
            </p>
            <a
              href="/"
              className="inline-block mt-4 rounded-lg bg-indigo-500 px-5 py-3 text-white uppercase font-semibold tracking-wider"
            >
              Book your escape
            </a>
          </div>
        </div> */}
        {/* <FileUpload></FileUpload>
        <MemeList></MemeList> */}
      </QueryClientProvider>
    </div>
  );
}

export default App;
