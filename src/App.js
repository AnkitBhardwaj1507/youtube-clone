import { Provider } from 'react-redux';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import store from "./utils/store";
import { createBrowserRouter, RouterProvider, Outlet, Router } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage';
import SearchResultsPage from "./components/SearchResultsPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <></>,
    children: [
      {
        path: "/",
        element: <Body />,
        children:[
          {
            path:"/",
            element:<MainContainer />
          },
          {
            path: "watch",
            element: <WatchPage />,
          },
          {
            path: "search",
            element: <SearchResultsPage />
          }
        ]
      },
      
    ],
  },
]);


function App() {
  

  return (
    <Provider store={store}>
    {/* <div className=""> */}
      
      <Header />
      <Outlet />
      {/* <RouterProvider router={appRouter} /> */}
{/* /**
    * Header
    * Body
    *  Sidebar
    *   MenuItems List
    *  MainContainer
    *   ButtonList
    *   VideoContainer
    *     VideoCard 
*/}

    {/* </div> */}
    </Provider>
  );
}

export default App;
