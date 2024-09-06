import React, {useEffect} from "react";
import { useSelector } from 'react-redux';

const Profile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // console.log("Current Auth State:", { isAuthenticated, user, token });
  }, [isAuthenticated, user, token]);

  return <div>Profile</div>;
};

export default Profile;
