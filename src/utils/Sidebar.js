import React, {useContext} from 'react'
import {CSidebar, CSidebarBrand, CSidebarNav} from '@coreui/react'
import CIcon from "@coreui/icons-react";
import {ContextApi} from "./ContextApi";
import "../scss/styles.css";

const SideBar = () => {
  const {User, Stage} = useContext(ContextApi);
  const [stage, setStage] = Stage;
  const [user] = User;
  return (
    <CSidebar className="side-bar">
      {user && user.first_name ?
        <CSidebarBrand className="d-md-down-none">
          <h4>{user.first_name.toUpperCase()} {user.last_name.toUpperCase()}</h4><br/>
        </CSidebarBrand> : null
      }
      <CSidebarNav style={{marginTop: 75}}>
        <div
          className={stage === 'dashboard' ? "text-center d-flex btn btn-block bg-success" : "text-center d-flex btn btn-block not-active"}
          onClick={() => setStage("dashboard")}>
          <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" color='white'/>
          <h6 className='text-white'>Overview</h6>
        </div>
        <div
          className={stage === 'users' ? "text-center d-flex btn btn-block mt-3 bg-success" : "text-center d-flex btn btn-block mt-3 not-active"}
          onClick={() => setStage("users")}>
          <CIcon name="cil-user" customClasses="c-sidebar-nav-icon" color='white'/>
          <h6 className='text-white'>Users</h6>
        </div>
        <div
          className={stage === 'transactions' ? "text-center d-flex btn btn-block mt-3 bg-success" : "text-center d-flex btn btn-block mt-3 not-active"}
          onClick={() => setStage("transactions")}>
          <CIcon name="cil-user" customClasses="c-sidebar-nav-icon" color='white'/>
          <h6 className='text-white'>Transactions</h6>
        </div>
        <div
          className={stage === 'reports' ? "text-center d-flex btn btn-block mt-3 bg-success" : "text-center d-flex btn btn-block mt-3 not-active"}
          onClick={() => setStage("reports")}>
          <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon" color='white'/>
          <h6 className='text-white'>Reports</h6>
        </div>
      </CSidebarNav>
    </CSidebar>
  )
}

export default SideBar;
