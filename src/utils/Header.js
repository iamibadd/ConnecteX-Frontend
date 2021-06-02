import React from 'react';
import {Link} from "@material-ui/core";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="text-center pt-3">
      <Link href={'/'} style={{textDecoration: 'none'}}>
        <img src={logo} alt={'logo'} height={75}/>
      </Link>
    </div>
  );
};

export default Header;
