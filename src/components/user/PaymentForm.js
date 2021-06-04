import React, {useContext, useState, useEffect} from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import axios from "axios";
import {CButton, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {ClipLoader} from "react-spinners";
import {useHistory} from "react-router-dom";
import {ContextApi} from "../../utils/ContextApi";

const PaymentForm = () => {
  const history = useHistory();
  const {User} = useContext(ContextApi);
  const [user] = User;
  const [first_name] = useState(user ? user.first_name : '');
  const [last_name] = useState(user ? user.last_name : '');
  const [email] = useState(user ? user.email : '');
  const [amount, setAmount] = useState(0);
  const [apiCall, setApiCall] = useState(false);
  const [message, setMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements()
  const CARD_ELEMENT_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: 'black',
        fontFamily: 'Times New Roman", Times, serif',
        fontSize: '20px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#fce883',
        },
      },
      invalid: {
        color: "red",
        iconColor: "red",
      },
    },
  };
  useEffect(() => {
    if (user.package === 'Silver') setAmount(500);
    else if (user.package === 'Platinum') setAmount(750);
    else if (user.package === 'Diamond') setAmount(1000);
    else setAmount(0);
  }, [user.package])
  const handleSubmit = async e => {
    setApiCall(true);
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })
    if (error) setApiCall(false);
    else {
      const {id} = paymentMethod;
      await axios.post('/user/payment', {
          email: email,
          first_name: first_name,
          last_name: last_name,
          pack: user.package,
          amount: amount,
          id
        },
      ).then(async () => {
          await axios.post('/email/payment', {
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
  }

  return (
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
            <CIcon name="cil-user"/>
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput type="text" placeholder="Name on Card"/>
      </CInputGroup>
      <CardElement options={CARD_ELEMENT_OPTIONS}/><br/>
      {!apiCall ?
        <CButton color="success">
          <input type="submit" value="Complete Payment"
                 style={{background: 'none', color: 'white', border: 'none'}}
          />
        </CButton> : <ClipLoader color={'black'} loading={true} size={40}/>
      }
    </CForm>
  );
};

export default PaymentForm;
