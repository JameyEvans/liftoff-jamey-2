import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { RegisterDonor } from "./components/RegisterDonor";
import { RegisterEmployee } from "./components/RegisterEmployee";
import DonorLoginFunction, { DonorLogin } from "./components/DonorLogin";
import { DonorDashboard } from "./components/DonorDashboard";
import EmployeeLoginFunction, { EmployeeLogin } from "./components/EmployeeLogin";
import { EmployeeDashboard } from "./components/EmployeeDashboard";

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
        element: <DonorLoginFunction />
    },
    {
        path: '/donor-dashboard',
        element: <DonorDashboard />
    },
    {
        path: '/employee-login',
        element: <EmployeeLoginFunction />
    },
    {
        path: '/employee-dashboard',
        element: <EmployeeDashboard />
    }
];

export default AppRoutes;
