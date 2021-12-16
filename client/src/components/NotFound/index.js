import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import { Typography } from '@material-ui/core'
const useStyles=  makeStyles((theme)=> ({
    root:{
        width:"100vw",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
    },
    
}))
function NotFound() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant="h2" color="textSecondary">
                Not found || 404
            </Typography>
            <Typography variant="h5" >
                <Link to="/">Quay lại</Link>
            </Typography>
        </div>
    )
}

export default NotFound
