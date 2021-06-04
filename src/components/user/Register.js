import React, {useState} from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Header from "../../utils/Header";
import background from "../../assets/background.png";
import {Link} from "@material-ui/core";
import {ClipLoader} from "react-spinners";

const Register = () => {
  const history = useHistory();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pack, setPackage] = useState('Silver');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [apiCall, setApiCall] = useState(false);
  const [message, setMessage] = useState('');
  const handleSubmit = e => {
    setApiCall(true);
    e.preventDefault();
    axios.post('/user/register', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        pack: pack,
        username: username,
        password: password,
        confirm_password: confirm_password
      },
    ).then(async () => {
        axios.post('/email/confirm', {
            first_name: first_name,
            last_name: last_name,
            receiver: email,
            pack: pack,
          }
        ).then(() => {
          alert('User created!');
          history.push('/');
        })
      }
    ).catch(async e => {
      setMessage(e.response.data.error);
      setApiCall(false);
    });
  }
  return (
    <>
      <Header/>
      <div className="c-app c-default-layout flex-row align-items-center" style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "top right"
      }}>
        <CContainer>
          <CRow className="justify-content-center" style={{marginBottom: 120}}>
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={e => handleSubmit(e)}>
                    <h1>Register</h1>
                    <p className="text-danger">{message}</p>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CSelect
                        defaultValue={"Silver"}
                        onChange={e => setPackage(e.target.value)}
                      >
                        <option value="">Select Package</option>
                        <option value="Silver">Silver</option>
                        <option value="Platinum">Platinum</option>
                        <option value="Diamond">Diamond</option>
                      </CSelect>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Repeat password"
                              onChange={e => setConfirmPassword(e.target.value)}/>
                    </CInputGroup>
                    {!apiCall ? <CButton color="success">
                      <input type="submit" value="Create Account"
                             style={{background: 'none', color: 'white', border: 'none'}}
                      />
                    </CButton> : <ClipLoader color={'black'} loading={true} size={40}/>
                    }
                  </CForm>
                  <div className="mt-2">
                    <Link href={'/'} className="text-primary text-decoration-none">Already have an account?</Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>

    </>
  )
}

export default Register;
