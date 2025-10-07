import React, { useState } from 'react';

export default function HolidayPastryApp() {
  const [page, setPage] = useState('account'); // 'account' | 'location' | 'setting' | 'success'

  const goBack = () => {
    if (page === 'location' || page === 'setting') setPage('account');
    else if (page === 'success') setPage('account');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(180deg, #ffe082 0%, #ffca28 100%)',
      fontFamily: 'Poppins, Inter, sans-serif',
    }}>
      <div style={{
        width: '420px',
        background: 'linear-gradient(180deg, #ffd34d 0%, #ff9f1c 100%)',
        padding: '40px 30px',
        borderRadius: '16px',
        color: '#0b0b0b',
        position: 'relative'
      }}>
        {(page === 'location' || page === 'setting' || page === 'success') && (
          <button onClick={goBack} style={{
            position: 'absolute', top: '20px', left: '20px',
            background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#000'
          }}>←</button>
        )}

        {page === 'account' && (
          <UserAccountPage onGoLocation={() => setPage('location')} onGoSetting={() => setPage('setting')} />
        )}

        {page === 'location' && (
          <UserLocationPage onSave={() => setPage('success')} />
        )}

        {page === 'setting' && (
          <UserSettingPage onSave={() => setPage('success')} />
        )}

        {page === 'success' && (
          <SuccessAlert onClose={() => setPage('account')} />
        )}
      </div>
    </div>
  );
}

function UserAccountPage({ onGoLocation, onGoSetting }) {
  return (
    <>
      <h2 style={{ textAlign: 'center', color: '#fff', fontWeight: 800 }}>HOLIDAY PASTRY</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" alt="profile" style={{ width: 120, height: 120, borderRadius: '50%', background: '#fff', padding: 6 }} />
          <div style={{ position: 'absolute', right: 0, bottom: 0, background: '#fff', borderRadius: '50%', padding: 5 }}>📷</div>
        </div>
        <p style={{ marginTop: 10, fontWeight: 600 }}>Edit Profile</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <Label>Username</Label>
        <Input defaultValue="Jennie Lee" />

        <Label>Email</Label>
        <Input defaultValue="SE@gmail.com" />

        <Label>Phone</Label>
        <Input defaultValue="0123456789" />

        <Label>Bank Information</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          <Input defaultValue="Jennie" />
          <Input defaultValue="Lee" />
          <Input defaultValue="SCB" />
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
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
      <h2 style={{ textAlign: 'center', color: '#fff', fontWeight: 800 }}>HOLIDAY PASTRY</h2>
      <div style={{ textAlign: 'left', marginTop: 40 }}>
        <Label>Name–Surname</Label>
        <Input placeholder="Name" />

        <Label>Province/District/Subdistrict</Label>
        <Input placeholder="Province, District, Subdistrict" />

        <Label>House number/Street</Label>
        <Input placeholder="House number, Street" />

        <div style={{ marginTop: 20 }}>
          <Button color="#0056ff" onClick={onSave}>Save</Button>
        </div>
      </div>
    </>
  );
}

function UserSettingPage({ onSave }) {
  return (
    <>
      <h2 style={{ textAlign: 'center', color: '#fff', fontWeight: 800 }}>HOLIDAY PASTRY</h2>
      <div style={{ textAlign: 'left', marginTop: 40 }}>
        <Label>Username</Label>
        <Input defaultValue="Jennie Lee" />

        <Label>Phone</Label>
        <Input defaultValue="0123456789" />

        <Label>Bank Information</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          <Input defaultValue="Jennie" />
          <Input defaultValue="Lee" />
          <Input defaultValue="1234567890" />
          <Input defaultValue="SCB" />
        </div>

        <Label>Upload Bank Account Image</Label>
        <img src="https://cdn-icons-png.flaticon.com/512/166/166527.png" alt="bank slip" style={{ width: '100%', borderRadius: 10, marginTop: 8 }} />

        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <Button color="#0056ff" onClick={onSave}>Save</Button>
          <Button color="#e53935">Cancel</Button>
        </div>
      </div>
    </>
  );
}

function SuccessAlert({ onClose }) {
  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <div style={{ fontSize: 64 }}>✅</div>
      <h2 style={{ color: '#00b257', marginBottom: 8 }}>Success</h2>
      <p style={{ color: '#333' }}>Well done, you saved your address now</p>
      <Button color="#00b257" onClick={onClose} style={{ marginTop: 20 }}>OK</Button>
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontWeight: 600, margin: '8px 0 4px', color: '#333' }}>{children}</div>;
}

function Input({ ...props }) {
  return <input {...props} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: 'none', fontSize: 15, boxSizing: 'border-box' }} />;
}

function Button({ children, color, style, ...props }) {
  return <button {...props} style={{ background: color, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', fontWeight: 700, cursor: 'pointer', flex: 1, ...style }}>{children}</button>;
}
