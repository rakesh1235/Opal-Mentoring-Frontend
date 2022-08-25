import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context';

const Logout = () => {

    const history = useHistory();

    const authCtx = useContext(AuthContext);

    const logoutHandler = ()=>{
        authCtx.logout();
        history.push('/');
    }


  return (
        <button type="button" onClick={logoutHandler} className="btn btn-light d-flex m-2">Logout</button>
  )
}

export default Logout
