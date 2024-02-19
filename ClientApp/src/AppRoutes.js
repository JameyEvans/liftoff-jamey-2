import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { RegisterDonor } from "./components/Donor/RegisterDonor";
import { RegisterEmployee } from "./components/Employee/RegisterEmployee";
import DonorLoginFunction, { DonorLogin } from "./components/Donor/DonorLogin";
import { DonorDashboard } from "./components/Donor/DonorDashboard";
import EmployeeLoginFunction, { EmployeeLogin } from "./components/Employee/EmployeeLogin";
import { EmployeeDashboard } from "./components/Employee/EmployeeDashboard";
import { EditDonorInfo } from "./components/Donor/EditDonorInfo";
import { EditEmployeeInfo } from "./components/Employee/EditEmployeeInfo"
import { DonorList } from "./components/Employee/DonorList"
import { BloodbankLocation } from "./components/Donor/BloodbankLocation"
import Questionnaire from "./components/Donor/Questionnaire";

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
    },
    {
        path: '/edit-donor-info',
        element: <EditDonorInfo />
    },
    {
        path: '/edit-employee-info',
        element: <EditEmployeeInfo />
    },
    {
        path: '/donor-list',
        element: <DonorList />
    },
    {
        path: '/locate-bloodbank',
        element: <BloodbankLocation />
    },
    {
        path: '/questionnaire',
        element: <Questionnaire />
    }
];

export default AppRoutes;
