import React from 'react';
import {Container, Grid, Button} from "@material-ui/core";
import {useHistory} from 'react-router-dom';

const Logout = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <Container component={"main"} maxWidth={'xl'}>
      <Grid container={true} justify={"flex-end"}>
        <Grid item={true}>
          <Button className="mt-1" variant={'contained'} color={'secondary'} size={"small"}
                  onClick={handleLogout}>Logout</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Logout;
