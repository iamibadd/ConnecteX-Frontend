import React, {useContext, useEffect} from 'react';
import Header from "../../utils/Header";
import Logout from "../../utils/Logout";
import SideBar from "../../utils/Sidebar";
import Layout from "../../utils/Layout";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {ContextApi} from "../../utils/ContextApi";


function AdminDashboard(props) {
  const history = useHistory();
  const {User} = useContext(ContextApi);
  const [user, setUser] = User;
  const current_user = props.match.params.username;
  const loggedInUser = localStorage.getItem('user');
  const route = localStorage.getItem('route');
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token === null) return history.push('/');
    else if (loggedInUser !== current_user || route !== 'admin') return history.push(`/${route}/${loggedInUser}`);
    else {
      axios.post(`https://connectexbackend.herokuapp.com/admin/${current_user}`, {username: current_user}, {headers: {token: token}})
        .then(async response => setUser(response.data.data))
        .catch(() => alert('Something went wrong!'));
    }
  }, [current_user, token, history, route, loggedInUser, setUser])

  return (
    <>
      <Header/>
      <Logout/>
      {user !== null ? <SideBar/> : null}
      <Layout/>
    </>
  );
}


export default AdminDashboard;
