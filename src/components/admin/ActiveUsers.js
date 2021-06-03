import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, TextField} from "@material-ui/core";
import axios from "axios";
import {ContextApi} from "../../utils/ContextApi";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function ActiveUsers(props) {
  const [filter, setFilter] = useState([]);
  const classes = useStyles();
  const {users} = props;
  const {Subscription} = useContext(ContextApi);
  const [subscription, setSubscription] = Subscription;
  const filterUsers = (query) => {
    if (query !== '') {
      const filteredData = users.filter(function (item) {
        if (item.email.toLowerCase().includes(query.toLowerCase())) return item.email.toLowerCase().includes(query.toLowerCase());
        else if (item.username.toLowerCase().includes(query.toLowerCase())) return item.username.toLowerCase().includes(query.toLowerCase());
        else if (item.package.toLowerCase().includes(query.toLowerCase())) return item.package.toLowerCase().includes(query.toLowerCase());
        else if (item.status.toLowerCase().includes(query.toLowerCase())) return item.status.toLowerCase().includes(query.toLowerCase());
      });
      setFilter(filteredData);
    } else setFilter([]);
  };
  const cancelSubscription = async email => await axios.post('/user/cancel-subscription', {email: email}).then(() => setSubscription(true));
  return (
    <TableContainer component={Paper}>
      <div className="d-flex justify-content-between">
        <h2 className="ml-2 text-primary">Active Users</h2>
        <TextField label="Search by email, username, package or status" variant="outlined" size={'small'}
                   className="mt-2 mr-2" style={{width: '30%'}}
                   onChange={e => filterUsers(e.target.value)}/>
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="font-weight-bold">Full Name</TableCell>
            <TableCell className="font-weight-bold" align="center">Username</TableCell>
            <TableCell className="font-weight-bold" align="center">Email</TableCell>
            <TableCell className="font-weight-bold" align="center">Package</TableCell>
            <TableCell className="font-weight-bold" align="center">Status</TableCell>
            <TableCell className="font-weight-bold" align="center">Payment</TableCell>
            <TableCell className="font-weight-bold" align="center">StartedAt</TableCell>
            <TableCell className="font-weight-bold" align="center">Cancel Subscription</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filter && filter.length > 0 ?
            filter.map((user, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.package}</TableCell>
                <TableCell align="center">{user.status}</TableCell>
                <TableCell align="center"
                           className={user.payment ? "text-success" : "text-danger"}>{user.payment ? "Done" : "Pending"}</TableCell>
                <TableCell align="center">{user.createdAt ? user.createdAt.split('T')[0] : null}</TableCell>
                <TableCell align="center"><Button size={'small'} color={'secondary'}
                                                  onClick={() => cancelSubscription(user.email)}>Cancel</Button></TableCell>
              </TableRow>
            )) :
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.package}</TableCell>
                <TableCell align="center">{user.status}</TableCell>
                <TableCell align="center"
                           className={user.payment ? "text-success" : "text-danger"}>{user.payment ? "Done" : "Pending"}</TableCell>
                <TableCell align="center">{user.createdAt ? user.createdAt.split('T')[0] : null}</TableCell>
                <TableCell align="center"><Button size={'small'} color={'secondary'}
                                                  onClick={() => cancelSubscription(user.email)}>Cancel</Button></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
