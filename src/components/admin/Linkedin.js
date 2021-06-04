import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {TextField} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function Linkedin(props) {
  const classes = useStyles();
  const {users} = props;
  const [filter, setFilter] = useState([]);
  const filterUsers = (query) => {
    if (query !== '') {
      const filteredData = users.filter(function (item) {
        if (item.email.toLowerCase().includes(query.toLowerCase())) return item.email.toLowerCase().includes(query.toLowerCase());
        else if (item.package.toLowerCase().includes(query.toLowerCase())) return item.package.toLowerCase().includes(query.toLowerCase());
      });
      setFilter(filteredData);
    } else setFilter([]);
  };
  return (
    <TableContainer component={Paper}>
      <div className="d-flex justify-content-between">
        <h2 className="ml-2 text-primary">Linkedin</h2>
        <TextField label="Search by email or package" variant="outlined" size={'small'}
                   className="mt-2 mr-2"
                   onChange={e => filterUsers(e.target.value)}/>
      </div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="font-weight-bold" align="center">#</TableCell>
            <TableCell className="font-weight-bold" align="center">Email</TableCell>
            <TableCell className="font-weight-bold" align="center">Package</TableCell>
            <TableCell className="font-weight-bold" align="center">Connections</TableCell>
            <TableCell className="font-weight-bold" align="center">Followers Gained</TableCell>
            <TableCell className="font-weight-bold" align="center">Connection Requests</TableCell>
            <TableCell className="font-weight-bold" align="center">StartedAt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filter && filter.length > 0 ?
            filter.map((user, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.package}</TableCell>
                <TableCell align="center">{user.connections}</TableCell>
                <TableCell align="center">{user.gained}</TableCell>
                <TableCell align="center">{user.requests}</TableCell>
                <TableCell align="center">{user.createdAt ? user.createdAt.split('T')[0] : null}</TableCell>
              </TableRow>
            )) :
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.package}</TableCell>
                <TableCell align="center">{user.connections}</TableCell>
                <TableCell align="center">{user.gained}</TableCell>
                <TableCell align="center">{user.requests}</TableCell>
                <TableCell align="center">{user.createdAt ? user.createdAt.split('T')[0] : null}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
