import React, {useContext, useState, useEffect} from 'react';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Header from "../../utils/Header";
import background from "../../assets/background.png";
import {ContextApi} from "../../utils/ContextApi";
import "../../scss/styles.css";
import {ClipLoader} from "react-spinners";

const Payment = () => {
  const history = useHistory();
  const {User} = useContext(ContextApi);
  const [user] = User;
  const [first_name] = useState(user ? user.first_name : '');
  const [last_name] = useState(user ? user.last_name : '');
  const [email] = useState(user ? user.email : '');
  const [amount, setAmount] = useState(0);
  const [card, setCard] = useState(0);
  const [apiCall, setApiCall] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user.package === 'Silver') setAmount(500);
    else if (user.package === 'Platinum') setAmount(750);
    else if (user.package === 'Diamond') setAmount(1000);
    else setAmount(0);
  }, [user.package])
  const handleSubmit = e => {
    setApiCall(true);
    e.preventDefault();
    axios.post('/user/payment', {
        email: email,
        pack: user.package,
        amount: amount,
        card_number: card
      },
    ).then(async () => {
        axios.post('/email/payment', {
          first_name: first_name,
          last_name: last_name,
          receiver: email,
          pack: user.package,
          amount: amount,
        }).then(() => {
          alert('Payment completed!');
          history.push('/');
        })
      }
    ).catch(async e => {
      setApiCall(false);
      setMessage(e.response.data.error)
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
                    <h1>Payment</h1>
                    <p className="text-danger">{message}</p>
                    <p className="text-muted">Complete your payment process here</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="First Name" value={first_name} disabled={true}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Last Name" value={last_name} disabled={true}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" value={email} disabled={true}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-dollar"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        value={amount}
                        disabled={true}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="number" placeholder="Card Number" onChange={e => setCard(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user"/>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Name on Card"/>
                    </CInputGroup>
                    <div className="d-flex justify-content-between">
                      <div>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-warning"/>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Expiration Date (MM/YY)" maxlength="5"/>
                        </CInputGroup>
                      </div>
                      <div>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked"/>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="number" placeholder="CVV" maxlength="4"/>
                        </CInputGroup>
                      </div>
                    </div>
                    {!apiCall ?
                      <CButton color="success">
                        <input type="submit" value="Complete Payment"
                               style={{background: 'none', color: 'white', border: 'none'}}
                        />
                      </CButton> : <ClipLoader color={'black'} loading={true} size={40}/>
                    }
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>

    </>
  )
}

export default Payment;
