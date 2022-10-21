// import UserManagementPage from "../pages/UserManagementPage";
import TestPage from "../pages/TestPage";
import {roles} from "./constants";
import {BugReport, Home, HomeWork, ManageAccounts, ShortText} from "@mui/icons-material";
import HomePage from "../pages/HomePage";
import UserManagementPage from "../pages/UserManagementPage";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    name: "Home",
    path: "home",
    icon: <Home/>,
    element: (props)=><HomePage {...props}/>,
    roles: [roles.admin, roles.director]
  },
  {
    name: "Users",
    path: "user-management",
    icon: <ManageAccounts/>,
    element: (props)=><UserManagementPage {...props}/>,
    pageable: {
      show: true,
      fetchLink: '/user/users',
      filter: {
        from: null,
        to: null,
      },
      size: 25,
      page: 0,
      sort: {
        desc: false,
        options: [
          {name: 'Yaratilgan vaqt', value: 'createdAt'},
          {name: 'Yangilangan vaqt', value: 'updatedAt'},
          {name: 'Ism bo\'yicha', value: 'name'},
        ]
      }
    },
    roles: [roles.admin, roles.director]
  },
  {
    name: "Test",
    path: "test",
    icon: <BugReport/>,
    element: (props)=><TestPage {...props}/>,
    roles: [roles.admin, roles.director]
  },
]
