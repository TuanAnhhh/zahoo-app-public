import { Avatar, Button } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import TableUser from '../../components/TableUser'
import { logout } from '../../redux/actions/authAction'
import useStyles from './styles'

function AdminPage() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleLogout = ()=> {
        dispatch(logout())
    }
    useEffect(() => {
        document.title = 'Trang quản trị';
    })
    return (

    <div className={classes.adminPage}> 
         <div className={classes.header} >
         <div> 
         <Link to="/messenger"  > 
            <Avatar className={classes.avatar} src={process.env.PUBLIC_URL+"logo1.png"} />
            </Link>
             <p style={{fontWeight:'bold', fontSize:20}}>QUẢN LÍ NGƯỜI DÙNG</p>
         </div>
             
            <Button onClick={handleLogout} color="primary" variant="contained" style={{marginBottom:'50px',width:'70%'}} >
                 <ExitToApp color="secondary"/> 
                 Logout</Button>
        </div>
       
       <div className={classes.body}>
            <TableUser/>
        </div>
           
    </div>
    )
}

export default AdminPage
