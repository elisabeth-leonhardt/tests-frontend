import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import {
  Outlet,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeComponent from "./components/Home";
import MemeAdmin from "./components/MemeAdmin";
import { useCookies, CookiesProvider } from "react-cookie";

function App() {
  const queryClient = new QueryClient();
  const [filterContent, setFilterContent] = useState("");
  const [cookies, setCookie] = useCookies();
  const [user, setUser] = useState(cookies["bitmemes-user"] || "");

  useEffect(() => {
    setCookie("bitmemes-user", user);
  }, [user, setCookie]);
  return (
    <div>
      <CookiesProvider>
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
                element={
                  user.length === 0 ? (
                    <Navigate to='/' />
                  ) : (
                    <MemeAdmin user={user}></MemeAdmin>
                  )
                }
              ></Route>
            </Routes>
            <Outlet></Outlet>
          </QueryClientProvider>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
