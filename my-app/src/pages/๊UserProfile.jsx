import { useState } from 'react';
import './UserProfile.css';

export default function UserProfile() {
  const [page, setPage] = useState('account'); // 'account' | 'location' | 'setting' | 'success'

  const goBack = () => {
    if (page === 'location' || page === 'setting' || page === 'success') {
      setPage('account');
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        {(page === 'location' || page === 'setting' || page === 'success') && (
          <button className="back-button" onClick={goBack}>←</button>
        )}

        {page === 'account' && (
          <UserAccountPage onGoLocation={() => setPage('location')} onGoSetting={() => setPage('setting')} />
        )}

        {page === 'location' && <UserLocationPage onSave={() => setPage('success')} />}

        {page === 'setting' && <UserSettingPage onSave={() => setPage('success')} />}

        {page === 'success' && <SuccessAlert onClose={() => setPage('account')} />}
      </div>
    </div>
  );
}

function UserAccountPage({ onGoLocation, onGoSetting }) {
  return (
    <>
      <h2 className="title">HOLIDAY PASTRY</h2>
      <div className="profile-section">
        <div className="profile-image-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="profile"
            className="profile-image"
          />
          <div className="camera-icon">📷</div>
        </div>
        <p className="edit-profile-text">Edit Profile</p>
      </div>

      <div className="form-section">
        <Label>Username</Label>
        <Input defaultValue="Jennie Lee" />

        <Label>Email</Label>
        <Input defaultValue="SE@gmail.com" />

        <Label>Phone</Label>
        <Input defaultValue="0123456789" />

        <Label>Bank Information</Label>
        <div className="grid-3">
          <Input defaultValue="Jennie" />
          <Input defaultValue="Lee" />
          <Input defaultValue="SCB" />
        </div>

        <div className="button-row">
          <Button color="#0056ff">Change Password</Button>
          <Button color="#e53935" onClick={onGoSetting}>Edit</Button>
          <Button color="#00b257" onClick={onGoLocation}>Address</Button>
        </div>
      </div>
    </>
  );
}

function UserLocationPage({ onSave }) {
  return (
    <>
      <h2 className="title">HOLIDAY PASTRY</h2>
      <div className="form-section">
        <Label>Name–Surname</Label>
        <Input placeholder="Name" />

        <Label>Province/District/Subdistrict</Label>
        <Input placeholder="Province, District, Subdistrict" />

        <Label>House number/Street</Label>
        <Input placeholder="House number, Street" />

        <div className="button-row single">
          <Button color="#0056ff" onClick={onSave}>Save</Button>
        </div>
      </div>
    </>
  );
}

function UserSettingPage({ onSave }) {
  return (
    <>
      <h2 className="title">HOLIDAY PASTRY</h2>
      <div className="form-section">
        <Label>Username</Label>
        <Input defaultValue="Jennie Lee" />

        <Label>Phone</Label>
        <Input defaultValue="0123456789" />

        <Label>Bank Information</Label>
        <div className="grid-3">
          <Input defaultValue="Jennie" />
          <Input defaultValue="Lee" />
          <Input defaultValue="1234567890" />
          <Input defaultValue="SCB" />
        </div>

        <Label>Upload Bank Account Image</Label>
        <img
          src="https://cdn-icons-png.flaticon.com/512/166/166527.png"
          alt="bank slip"
          className="bank-image"
        />

        <div className="button-row">
          <Button color="#0056ff" onClick={onSave}>Save</Button>
          <Button color="#e53935">Cancel</Button>
        </div>
      </div>
    </>
  );
}

function SuccessAlert({ onClose }) {
  return (
    <div className="success-container">
      <div className="success-icon">✅</div>
      <h2 className="success-title">Success</h2>
      <p className="success-text">Well done, you saved your address now</p>
      <Button color="#00b257" onClick={onClose} style={{ marginTop: 20 }}>OK</Button>
    </div>
  );
}

function Label({ children }) {
  return <div className="label">{children}</div>;
}

function Input({ ...props }) {
  return <input {...props} className="input" />;
}

function Button({ children, color, style, ...props }) {
  return <button {...props} className="button" style={{ background: color, ...style }}>{children}</button>;
}
