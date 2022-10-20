// import First from "../pages/First";
import Second from "../pages/Second";
import {roles} from "./constants";
import {HomeWork, ShortText} from "@mui/icons-material";
import Home from "../pages/Home";


// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    name: "Home",
    path: "home",
    icon: <HomeWork/>,
    element: (props)=><Home {...props}/>,
    pageable: {
      show: true,
      fetchLink: '/user/users',
      filter: {
        from: null,
        to: null,
      },
      size: 20,
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
    name: "Second",
    path: "second",
    icon: <ShortText/>,
    element: (props)=><Second {...props}/>,
    roles: [roles.admin, roles.director]
  },
]
