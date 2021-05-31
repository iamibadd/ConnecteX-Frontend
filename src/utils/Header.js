import React from 'react';
import {Container, Typography, Link} from "@material-ui/core";

const Header = () => {
  return (
    <Container component={"main"} maxWidth={"sm"}>
      <Link href={'/'} style={{textDecoration: 'none'}}>
        <Typography variant={"h3"} color={"secondary"} style={{marginLeft: '125px'}}>ConnectEx</Typography>
      </Link>
    </Container>
  );
};

export default Header;
