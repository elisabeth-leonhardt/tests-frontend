import "./App.css";
import FileUpload from "./components/FileUpload";
import { QueryClient, QueryClientProvider } from "react-query";
import MemeList from "./components/MemeList";
import Navbar from "./components/Navbar";
import { useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import MemeGrid from "./components/MemeGrid";
import { Outlet, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import HomeComponent from "./components/Home";
import MemeAdmin from "./components/MemeAdmin";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState("");
  const [filterContent, setFilterContent] = useState("");
  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar user={user} setUser={setUser}></Navbar>
          <Routes>
            <Route
              path='/'
              element={
                <HomeComponent
                  filterContent={filterContent}
                  setFilterContent={setFilterContent}
                ></HomeComponent>
              }
            ></Route>
            <Route
              path='/mis-memes'
              element={<MemeAdmin user={user}></MemeAdmin>}
            ></Route>
          </Routes>
          <Outlet></Outlet>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

{
  /* <BrowserRouter>
<Routes>
  <Route path='/' element={<App />}>

  </Route>
</Routes>
</BrowserRouter>, */
}
