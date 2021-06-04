import React from 'react';
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';
import Header from "../../utils/Header";
import background from "../../assets/background.png";
import "../../scss/styles.css";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm";

const Payment = () => {
  const stripeTestPromise = loadStripe("pk_test_51IyMfsLK5FajKwn1xZiT4s0yTbPGNZyAt1Y3zNCsYMWrKr1dq4Vas7ModjWrGMClC83KiYyMOE4f1CEpcRGpgpxU00raLZ9YOJ");
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
                  <Elements stripe={stripeTestPromise}>
                    <PaymentForm/>
                  </Elements>
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
