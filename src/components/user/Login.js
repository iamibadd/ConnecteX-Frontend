import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import Header from "../../utils/Header";
import {ClipLoader} from "react-spinners";
import background from "../../assets/background.png";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [apiCall, setApiCall] = useState(false);
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const user = localStorage.getItem('user');
    const route = localStorage.getItem('route');
    if (user !== null) return history.push(`/${route}/${user}`);
  }, [history])
  const handleSubmit = e => {
    setApiCall(true);
    e.preventDefault();
    axios.post(!checked ? `https://connectexbackend.herokuapp.com/user/login` : `https://connectexbackend.herokuapp.com/admin/login`, {
      username: username,
      password: password
    }).then(async response => {
      localStorage.setItem('route', !checked ? 'user' : 'admin');
      localStorage.setItem('token', response.data.data);
      localStorage.setItem('user', username);
      history.push(!checked ? `/user/${username}` : `/admin/${username}`);
    }).catch(e => {
      setApiCall(false);
      setMessage(e.response.data.error);
    });
  }
  return (
    <>
      <Header/>
      <div className="c-app c-default-layout flex-row align-items-center bg-secondary" style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "top right"
      }}>
        <CContainer>
          <CRow className="justify-content-center" style={{marginBottom: 200}}>
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-3">
                  <CCardBody>
                    <CForm onSubmit={e => handleSubmit(e)}>
                      <h1>Login</h1>
                      <p className="text-danger">{message}</p>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user"/>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username" autoComplete="username"
                                onChange={e => setUsername(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked"/>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup>
                        <div>
                          <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}/>
                          <span className='ml-2'>Admin</span>
                        </div>
                      </CInputGroup><br/>
                      <CRow>
                        <CCol xs="6">
                          {!apiCall ?
                            <CButton color="primary" className="px-4">
                              <input type="submit" value="Login"
                                     style={{background: 'none', color: 'white', border: 'none'}}/>
                            </CButton> : <ClipLoader color={'black'} loading={true} size={40}/>}
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-success py-5 d-md-down-none" style={{width: '44%'}}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Please register on Connectex and let's increase your organic growth fast</p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login;
