import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { RegisterUser } from "./components/RegisterUser";
import RegisterUser2 from "./components/RegisterUser2";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/register',
    element: <RegisterUser />
    },
{
        path: '/register2',
        element: <RegisterUser2 />
    }
    
];

export default AppRoutes;
