import React from 'react'
import {CFooter} from '@coreui/react'

const Footer = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="/" target="_blank" rel="noopener noreferrer">Connectex</a>
        <span className="ml-1">&copy; 2021 Copyrights</span>
      </div>
    </CFooter>
  )
}

export default React.memo(Footer)
