import React, {useState, useEffect, useContext} from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText,
  CRow
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
import '../../scss/styles.css';

const Dashboard = (props) => {
  const history = useHistory();
  const {User} = useContext(ContextApi);
  const [user, setUser] = User;
  const [niche, setNiche] = useState('');
  const [facebook, setFacebook] = useState('');
  const [facebook_password, setFacebookPassword] = useState('');
  const [instagram, setInstagram] = useState('');
  const [instagram_password, setInstagramPassword] = useState('');
  const [linkedin, setLinkedin] = useState('Silver');
  const [linkedin_password, setLinkedinPassword] = useState('');
  const [twitter, setTwitter] = useState('');
  const [twitter_password, setTwitterPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [credentials, setCredentials] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const current_user = props.match.params.username;
  const loggedInUser = localStorage.getItem('user');
  const route = localStorage.getItem('route');
  const token = localStorage.getItem('token');
  const current_date = new Date().toJSON().slice(0, 10).replaceAll('/', '-');
  useEffect(() => {
    if (token === null) return history.push('/');
    else if (loggedInUser !== current_user || route !== 'user') return history.push(`/${route}/${loggedInUser}`);
    else {
      axios.post(`/user/${current_user}`, {username: current_user}, {headers: {token: token}})
        .then(async response => setUser(response.data.data))
        .catch(() => alert('Something went wrong!'));
    }
  }, [current_user, token, history, route, loggedInUser, setUser, credentials])

  const generateReports = () => {
    setApiCall(true);
    setTimeout(function () {
      window.open(`http://localhost:5000/reports?user=${user.email}`, "_parent");
      setApiCall(false);
    }, 2000);
  }

  const handleSubmit = async e => {
    setLoader(true);
    e.preventDefault();
    axios.post('/user/credentials', {
      username: user.username,
      niche: niche,
      pack: user.package,
      facebook: facebook,
      facebook_password: facebook_password,
      instagram: instagram,
      instagram_password: instagram_password,
      linkedin: linkedin,
      linkedin_password: linkedin_password,
      twitter: twitter,
      twitter_password: twitter_password
    }).then(() => setCredentials(true)).catch(e => {
      setMessage(e.response.data.error);
      setLoader(false);
    });
  }
  return (
    <>
      <Header/>
      <Logout/>
      {user && !user.payment ?
        <div className="text-center">
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
        : user && !user.credentials ?
          <div className="text-center">
            <Typography color={"textPrimary"}
                        variant={'body1'}>Welcome, <strong>{user.first_name} {user.last_name}</strong>
            </Typography>
            <strong>{current_date}</strong>
            <Typography color={'secondary'}>Please enter your credentials to get started.</Typography><br/>
            <CRow className="justify-content-center">
              <CCol lg="2.5">
                <CForm onSubmit={e => handleSubmit(e)}>
                  <Typography color={'secondary'}>{message}</Typography>
                  <CInputGroup className="mb-3 custom-input">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-notes"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Niche (Interests)" onChange={e => setNiche(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3 custom-input">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Facebook" onChange={e => setFacebook(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3 custom-input">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password"
                            onChange={e => setFacebookPassword(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3 custom-input">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Instagram" onChange={e => setInstagram(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3 custom-input">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password"
                            onChange={e => setInstagramPassword(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3 custom-input">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Linkedin" onChange={e => setLinkedin(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3 custom-input">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password"
                            onChange={e => setLinkedinPassword(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3 custom-input">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Twitter" onChange={e => setTwitter(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-4 custom-input">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked"/>
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password"
                            onChange={e => setTwitterPassword(e.target.value)}/>
                  </CInputGroup>
                  {loader ?
                    <ClipLoader color={'black'} loading={true} size={40}/>
                    : <CButton color="success" className="mr-5">
                      <input type="submit" value="Save Credentials"
                             style={{background: 'none', color: 'white', border: 'none'}}
                      />
                    </CButton>
                  }
                </CForm>
              </CCol>
            </CRow>
          </div> :
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
            <WidgetsBrand username={user.username}/>
          </>
      }
    </>
  )
}

export default Dashboard;
