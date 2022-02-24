import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {

    const { user, isAuthenticated } = useAuth0();
    
    return (
        isAuthenticated && 
        <div>
            <img src={user.picture} alt={user.name} height="300" width="300"/>
            <h2>Welcome, {user.name}!</h2>
            <p>Your email is: {user.email}</p>
            {JSON.stringify(user, null, 2)}
        </div>
    );
  };
  
export default Profile;