import React from 'react';
import {Helmet} from "react-helmet";

const UserManagementPage = () => {
  return (
      <>
          <Helmet>
              <title>User Management</title>
          </Helmet>
          <div className="UserManagementPage">
              <h1 className="mt-0 h1">
                  User Management
              </h1>
          </div>
      </>
  );
};

export default UserManagementPage;
