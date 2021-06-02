import React, {useState, useEffect, useContext} from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import WidgetsBrand from "../../utils/WidgetsBrand";
import Header from "../../utils/Header";
import Logout from "../../utils/Logout";
import {ClipLoader} from "react-spinners";
import {ContextApi} from "../../utils/ContextApi";
import {Typography} from "@material-ui/core";

const Dashboard = (props) => {
  const history = useHistory();
  const {User} = useContext(ContextApi);
  const [user, setUser] = User;
  const [apiCall, setApiCall] = useState(false);
  const current_user = props.match.params.username;
  const loggedInUser = localStorage.getItem('user');
  const route = localStorage.getItem('route');
  const token = localStorage.getItem('token');
  const current_date = new Date().toJSON().slice(0, 10).replaceAll('/', '-');
  useEffect(() => {
    if (token === null) history.push('/');
    else if (loggedInUser !== current_user || route !== 'user') history.push(`/${route}/${loggedInUser}`);
    axios.post(`/user/${current_user}`, {username: current_user}, {headers: {token: token}})
      .then(async response => setUser(response.data.data))
      .catch(() => alert('Something went wrong!'));
  }, [current_user, token, history, route, loggedInUser, setUser])

  const generateReports = () => {
    setApiCall(true);
    setTimeout(function () {
      window.open(`http://localhost:5000/reports?email=${user.email}`, "_parent");
      setApiCall(false);
    }, 2000);
  }

  return (
    <>
      <Header/>
      <Logout/>
      {user && user.payment ?
        <>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="12">
                  <div className="text-center">
                    <Typography color={"textPrimary"}
                                variant={'body1'}>Welcome, <strong>{user.first_name} {user.last_name}</strong>
                    </Typography>
                    <strong>{current_date}</strong>
                    <Typography color={'primary'}>You can view your <strong>{user.package}</strong> package details by
                      clicking on the below social media icons.</Typography>
                  </div>
                </CCol>
                <CCol className="d-md-block">
                  <CButton className="float-right" style={{backgroundColor: '#00bfff'}} onClick={generateReports}>
                    <h4 className="text-white font-weight-lighter">Generate CSV</h4>
                    {apiCall ? <ClipLoader color={'black'} loading={apiCall} size={40}/>
                      : <CIcon name="cil-cloud-download" className="text-white" size="2xl"/>
                    }
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <WidgetsBrand/>
        </> : <div className="text-center">
          <Typography color={"textPrimary"}
                      variant={'body1'}>Welcome, <strong>{user.first_name} {user.last_name}</strong>
          </Typography>
          <strong>{current_date}</strong>
          <Typography color={'secondary'}>You haven't completed payment for
            your <strong>{user.package}</strong> package.
            <strong className="text-black-50"
                    onClick={() => history.push(`/user/${user.username}/payment`)}> Click here </strong>
            to complete your process.
          </Typography>
        </div>
      }
    </>
  )
}

export default Dashboard;
