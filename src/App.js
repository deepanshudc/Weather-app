import logo from './logo.svg';
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import RootLayout from './components/RootLayout';
import WelcomePage from './pages/WelcomePage';
import CurrentCity from './pages/CurrentCity';
import SearchCity from './pages/SearchCity';
import ErrorPage from './pages/ErrorPage';


const router= createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
  <Route index element={<WelcomePage></WelcomePage> } ></Route>
  <Route path='/currentcity' element={<CurrentCity></CurrentCity>} ></Route>
  <Route path='/searchcity' element={<SearchCity></SearchCity>}></Route>
  </Route>
)
)

function App() {
    return <RouterProvider router={router}></RouterProvider>
}

export default App;
