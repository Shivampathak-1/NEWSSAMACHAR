import React, { useState, useEffect } from 'react';
import userPlaceholder from "../assets/user.png";

function Profile() {
    const [data, setData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:3001/auth/fetchUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": window.localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => {
            setData(data);
            setImagePreview(data.profile_image || userPlaceholder);
        });
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
            setImage(file);
        }
    };

    const handleSaveProfile = async () => {
        if (!image) return;
        const formData = new FormData();
        formData.append('profilePic', image);
        try {
            await fetch("http://127.0.0.1:3001/uploads/uploadImg", {
                method: 'POST',
                body: formData,
                headers: { "auth-token": window.localStorage.getItem("token") }
            });
            window.location.reload();
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <div className="text-center mb-3">
                    <div className="position-relative d-inline-block">
                        <img src={imagePreview} alt="Profile" className="rounded-circle" width="120" height="120" />
                        {isEditing && (
                            <label htmlFor="profile-pic" className="btn btn-sm btn-primary position-absolute bottom-0 end-0">
                                <i className="bi bi-pencil-fill"></i>
                            </label>
                        )}
                        <input type="file" id="profile-pic" className="d-none" onChange={handleImageChange} />
                    </div>
                </div>
                {data && (
                    <>
                        <div className="mb-2"><strong>Name:</strong> {isEditing ? <input className="form-control" defaultValue={data.name} /> : data.name}</div>
                        <div className="mb-2"><strong>Email:</strong> {data.email}</div>
                        <div className="mb-2"><strong>Enrollment:</strong> {data.enrollment}</div>
                        <div className="mb-2"><strong>Mobile:</strong> {data.mobile}</div>
                        <div className="mb-2"><strong>Gender:</strong> {data.gender}</div>
                        <div className="mb-2"><strong>Password:</strong> ********</div>
                        <div className="text-center mt-3">
                            {isEditing ? (
                                <button className="btn btn-success" onClick={handleSaveProfile}>Save Profile</button>
                            ) : (
                                <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;
