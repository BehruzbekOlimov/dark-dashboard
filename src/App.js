import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import pageList from "./utills/pageList";
import "bootstrap/dist/css/bootstrap-grid.min.css"
import "bootstrap/dist/css/bootstrap-utilities.min.css"
import "./global.css"
import 'react-toastify/dist/ReactToastify.css';
import Error404Page from "./pages/Error404Page";
import Dashboard from "./components/Dashboard";
import SignInPage from "./pages/SignInPage";
import {PrivateRoute} from "./components/PrivateRoute";
import {useState} from "react";

function App() {
    const [user, setUser] = useState(null);
    const [initialData, setInitialData] = useState([]);
    const [initialLoading, setInitialLoading] = useState(false);
    console.log(user)
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='*' element={<Error404Page/>}/>
                    <Route path="/" element={<Navigate to="/dashboard/home"/>}/>
                    <Route path='/sign-in' element={<SignInPage setUser={setUser}/>}/>
                    <Route path={'/dashboard'} element={
                        <PrivateRoute user={user} setUser={setUser}>
                            <Dashboard user={user}
                                       setInitialData={setInitialData}
                                       initialLoading={initialLoading}
                                       setInitialLoading={setInitialLoading}/>
                        </PrivateRoute>}>
                        <Route path='*' element={<Error404Page/>}/>
                        {pageList.map((page, i) => {
                            return <Route key={i} path={page.path}
                                          element={page.element({initialData, initialLoading, user})}/>
                        })}
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
