import React, {useState, useEffect, useContext} from 'react'
import {CContainer} from '@coreui/react'
import MainChartExample from "./MainChartExample";
import {ContextApi} from "./ContextApi";
import axios from "axios";
import {ClipLoader} from "react-spinners";
import ActiveUsers from "../components/admin/ActiveUsers";
import DoneUsers from "../components/admin/DoneUsers";
import Transactions from "../components/admin/Transactions";
import Facebook from "../components/admin/Facebook";
import FacebookPosts from "../components/admin/FacebookPosts";
import Instagram from "../components/admin/Instagram";

const Content = () => {
  const {Stage, Subscription} = useContext(ContextApi);
  const [stage] = Stage;
  const [subscription, setSubscription] = Subscription;
  const [activeUsers, setActiveUsers] = useState([]);
  const [notActiveUsers, setNotActiveUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [facebook, setFacebook] = useState([]);
  const [facebookPosts, setFacebookPosts] = useState([]);
  const [instagram, setInstagram] = useState([]);
  const [amount, setAmount] = useState(0);
  const [apiCall, setApiCall] = useState(false);
  useEffect(() => {
    if (stage === "dashboard") {
      setApiCall(true);
      let calculateAmount = 0;
      axios.get(`/user/payment/all`).then(response => {
        response.data.data.forEach(value => {
          calculateAmount = calculateAmount + value.amount;
          setAmount(calculateAmount);
        })
        setApiCall(false);
      });
    } else if (stage === "users") {
      setSubscription(false);
      setApiCall(true);
      setAmount(0);
      axios.get(`/user/all`).then(response => {
        setActiveUsers(response.data.data.active);
        setNotActiveUsers(response.data.data.notActive);
        setApiCall(false);
      });
    } else if (stage === "transactions") {
      setApiCall(true);
      setAmount(0);
      axios.get(`/user/payment/all`).then(response => {
        setTransactions(response.data.data);
        setApiCall(false);
      });
    } else if (stage === "reports") {
      setApiCall(true);
      axios.get(`/facebook/all`).then(response => {
        setFacebook(response.data.data.facebook);
        setFacebookPosts(response.data.data.posts);
      });
      axios.get(`/instagram/all`).then(response => {
        setInstagram(response.data.data);
        setApiCall(false);
      });
    }
  }, [stage, subscription])
  return (
    <main className="c-main">
      <CContainer fluid>
        {stage === "dashboard" ?
          <>
            <h4 className="text-primary">Monthly Sale ${amount}</h4>
            <MainChartExample style={{height: '300px', marginTop: '30px'}}/></>
          : stage === "users" ?
            <>
              {!apiCall ? <div>{activeUsers && activeUsers.length > 0 ? <ActiveUsers users={activeUsers}/> :
                null}
                  <br/>
                  {notActiveUsers && notActiveUsers.length > 0 ? <DoneUsers users={notActiveUsers}/> : null}
                </div>
                : <div className="text-center mt-5"><ClipLoader color={'black'} loading={true} size={200}/></div>
              }
            </> : stage === "transactions" ?
              <>
                {!apiCall ? <div>{transactions && transactions.length > 0 ? <Transactions users={transactions}/> :
                  null}
                  </div>
                  : <div className="text-center mt-5"><ClipLoader color={'black'} loading={true} size={200}/></div>
                }
              </> : stage === "reports" ?
                <>
                  {!apiCall ? <div>{facebook && facebook.length > 0 ? <Facebook users={facebook}/> :
                    null}
                      <br/>
                      {facebookPosts && facebookPosts.length > 0 ? <FacebookPosts users={facebookPosts}/> : null}
                      <br/>
                      {instagram && instagram.length > 0 ? <Instagram users={instagram}/> : null}
                    </div>
                    : <div className="text-center mt-5"><ClipLoader color={'black'} loading={true} size={200}/></div>
                  }
                </> : null
        }

      </CContainer>
    </main>
  )
}

export default React.memo(Content)
