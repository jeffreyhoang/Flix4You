import React, { useState } from "react";
import { fetchUsers, fetchProfiles } from "../api";  // Import API functions

const UserProfilesButton = () => {
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [showData, setShowData] = useState(false);

    const handleShowData = async () => {
        const usersData = await fetchUsers();
        const profilesData = await fetchProfiles();
        setUsers(usersData);
        setProfiles(profilesData);
        setShowData(!showData);
    };

    return (
        <div>
            <button onClick={handleShowData}>
                {showData ? "Hide Users & Profiles" : "Show Users & Profiles"}
            </button>

            {showData && (
                <>
                    <h3>Users</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <h3>Profiles</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Profile Name</th>
                                <th>User</th>
                                <th>Avatar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.length > 0 ? (
                                profiles.map((profile) => (
                                    <tr key={profile.id}>
                                        <td>{profile.name}</td>
                                        <td>{profile.user}</td>
                                        <td>
                                            {profile.avatar ? (
                                                <img src={profile.avatar} alt="Avatar" width="50" />
                                            ) : (
                                                "No Avatar"
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No profiles found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default UserProfilesButton;
