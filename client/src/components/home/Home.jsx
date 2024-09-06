
import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate()

  useEffect(() => {
    // console.log("Current Auth State:", { isAuthenticated, user, token });
  }, [isAuthenticated, user, token]);
  return (
    <div>Home </div>
  )
}

export default Home