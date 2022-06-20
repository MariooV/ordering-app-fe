import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from '../../Services/Axios';
import { User, USER_TYPES } from '../../Contex/UserContex';
import Button from '@mui/material/Button';

const AdminPanel = () => {
    const [users, setUsers] = useState<User[]>([] as User[]);

    useEffect(() => {
        Axios.get('/users')
            .then(({data}) => {
                setUsers(data.data as User[]);
            })
            .catch(response => {
                console.log(response)
                setUsers([] as User[]);
            })
    }, []);

    const approveUser = (userId: number) => {
        let oldUsers = [...users];
        let editedUser = oldUsers.find(user => user.id === userId) as User;
        if (!editedUser) return;

        Axios.post(`/user/verify`, {id: userId})
            .then(({data}) => {
                editedUser.approved = Boolean(data.data.approved);
                setUsers(oldUsers);
            })
            .catch(response => {
                console.log(response);
            })
    }
   
    return Object.values(users).length > 0 ? (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Admin Panel">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Approved</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user, index) => (
                        <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index}
                            </TableCell>
                            <TableCell align="right">{user.username}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.first_name}</TableCell>
                            <TableCell align="right">{user.last_name}</TableCell>
                            <TableCell align="right">{USER_TYPES[user.type]}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color={user.approved === true ? 'success' : 'error'} onClick={() => approveUser(user.id)}>
                                    {user.approved === true ? 'Approved' : 'Not Approved'}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : <>There is no users in database</>
}

export default AdminPanel;