import React from 'react'

export default function Profile({ userDetails, setUserDetails }) {
    return (
        <div>
            <h2>Profile</h2>
            <p>User Type: {userDetails.userType}</p>
            {JSON.stringify(userDetails)}
        </div>
    )
}
