import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../services/api";
import { useParams } from "react-router-dom";

function Description() {
    const params =  useParams()
    const state = useSelector(state => state)
    const {user} = state
    useEffect(() => {
        console.log('aparms', params);
       console.log('state in desctipion', state);
       getCurrentUser(user.userStatus).then(response => {
        console.log(response)
       })
    },[])
    return ( <div>
        <p>Description</p>
    </div> );
}

export default Description;