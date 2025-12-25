"use client"

import { useState } from "react"
import "./ProfilePage.css"

function ProfilePage({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(user)

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(updatedUser)
        setIsEditing(false)
      }
    } catch (err) {
      console.error("Error updating profile:", err)
    }
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="profile-name-section">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {isEditing ? (
            <form className="edit-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <h3>Address</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Street</label>
                  <input
                    type="text"
                    value={profile.address?.street || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, street: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={profile.address?.city || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, city: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    value={profile.address?.state || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, state: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    value={profile.address?.zipCode || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, zipCode: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <button type="button" onClick={handleUpdateProfile} className="save-btn">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-section">
                <h3>Contact Information</h3>
                <p>
                  <strong>Phone:</strong> {user.phone || "Not provided"}
                </p>
              </div>
              <div className="info-section">
                <h3>Address</h3>
                {user.address ? (
                  <div>
                    <p>{user.address.street}</p>
                    <p>
                      {user.address.city}, {user.address.state} {user.address.zipCode}
                    </p>
                    <p>{user.address.country}</p>
                  </div>
                ) : (
                  <p>No address added</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
