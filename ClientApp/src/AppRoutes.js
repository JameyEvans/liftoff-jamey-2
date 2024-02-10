import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { RegisterDonor } from "./components/RegisterDonor";
import { RegisterEmployee } from "./components/RegisterEmployee";
import { DonorLogin } from "./components/DonorLogin";
import { DonorDashboard } from "./components/DonorDashboard";

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
        path: '/register-donor',
        element: <RegisterDonor />
    },
    {
        path: '/register-employee',
        element: <RegisterEmployee />
    },
    {
        path: '/donor-login',
        element: <DonorLogin />
    },
    {
        path: 'donor-dashboard',
        element: <DonorDashboard />
    }
];

export default AppRoutes;
