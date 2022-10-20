import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import pageList from "./utills/pageList";
import "bootstrap/dist/css/bootstrap-grid.min.css"
import "bootstrap/dist/css/bootstrap-utilities.min.css"
import "./global.css"
import 'react-toastify/dist/ReactToastify.css';
import Error404 from "./pages/Error404";
import Dashboard from "./components/Dashboard";
import SignIn from "./pages/SignIn";
import {PrivateRoute} from "./components/PrivateRoute";
import {useState} from "react";

function App() {
  const [user, setUser] = useState(null);
  const [initialData, setInitialData] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Error404/>}/>
          <Route path="/" element={<Navigate to="/dashboard/home"/>}/>
          <Route path='/sign-in' element={<SignIn setUser={setUser}/>}/>
          <Route path={'/dashboard'} element={
            <PrivateRoute user={user} setUser={setUser}>
              <Dashboard user={user}
                         setInitialData={setInitialData}
                         initialLoading={initialLoading}
                         setInitialLoading={setInitialLoading}/>
            </PrivateRoute>}>
            <Route path='*' element={<Error404/>}/>
            {pageList.map((page, i) => {
              return <Route key={i} path={page.path} element={page.element({initialData, initialLoading, user})}/>
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
