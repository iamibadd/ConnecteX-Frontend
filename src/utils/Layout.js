import React from 'react'
import TheContent from "./Content";
import TheFooter from "./Footer";

const Layout = () => {

  return (
    <div className="c-app c-default-layout" style={{marginLeft: 250}}>
      <div className="c-wrapper">
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default Layout
