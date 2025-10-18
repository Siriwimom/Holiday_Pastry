import { useState } from 'react';
import './UserProfile.css';

// URL รูปโปรไฟล์เริ่มต้น
const DEFAULT_PROFILE_IMAGE = "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";

export default function UserProfile() {
  const [page, setPage] = useState('account');
  // 1. เพิ่ม state สำหรับเก็บ URL ของรูปโปรไฟล์
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);

  const goBack = () => {
    if (page === 'location' || page === 'setting' || page === 'success' || page === 'password') {
      setPage('account');
    }
  };

  return (
    <div className="card">
      {(page === 'location' || page === 'setting' || page === 'success' || page === 'password') && (
        <button className="back-button" onClick={goBack}>←</button>
      )}

      {page === 'account' && (
        <UserAccountPage
          onGoLocation={() => setPage('location')}
          onGoSetting={() => setPage('setting')}
          onGoPassword={() => setPage('password')}
          // 2. ส่ง state และฟังก์ชันสำหรับจัดการรูปภาพลงไปเป็น props
          profileImage={profileImage}
          onImageChange={setProfileImage}
        />
      )}

      {page === 'location' && <UserLocationPage onSave={() => setPage('success')} />}

      {page === 'setting' && <UserSettingPage onSave={() => setPage('success')} />}
      
      {page === 'password' && <ChangePasswordPage onSave={() => setPage('success')} onCancel={goBack} />}

      {page === 'success' && <SuccessAlert onClose={() => setPage('account')} />}
    </div>
  );
}

// 3. แก้ไข UserAccountPage ให้รองรับการเปลี่ยนรูป
function UserAccountPage({ onGoLocation, onGoSetting, onGoPassword, profileImage, onImageChange }) {
  // ฟังก์ชันที่ทำงานเมื่อผู้ใช้เลือกไฟล์รูปภาพ
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // อัปเดต state ด้วย URL ของรูปภาพที่ถูกแปลงแล้ว
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h2 className="title">HOLIDAY PASTRY</h2>
      <div className="profile-section">
        <div className="profile-image-container">
          {/* แสดงรูปภาพจาก state */}
          <img
            src={profileImage}
            alt="profile"
            className="profile-image"
          />
          {/* เพิ่ม input สำหรับอัปโหลดไฟล์ที่ซ่อนไว้ */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="profile-image-upload"
          />
          {/* ทำให้ไอคอนกล้องเป็นปุ่มกดสำหรับ input */}
          <label htmlFor="profile-image-upload" className="camera-icon">
            📷
          </label>
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
          <Button color="#0056ff" onClick={onGoPassword}>Change Password</Button>
          <Button color="#e53935" onClick={onGoSetting}>Edit</Button>
          <Button color="#00b257" onClick={onGoLocation}>Address</Button>
        </div>
      </div>
    </>
  );
}

// --- Component อื่นๆ ไม่มีการเปลี่ยนแปลง ---

function ChangePasswordPage({ onSave, onCancel }) {
  return (
    <>
      <h2 className="title">CHANGE PASSWORD</h2>
      <div className="form-section">
        <Label>Current Password</Label>
        <Input type="password" placeholder="Enter your current password" />

        <Label>New Password</Label>
        <Input type="password" placeholder="Enter a new password" />

        <Label>Confirm New Password</Label>
        <Input type="password" placeholder="Confirm your new password" />

        <div className="button-row" style={{marginTop: '30px'}}>
          <Button color="#0056ff" onClick={onSave}>Save Changes</Button>
          <Button color="#e53935" onClick={onCancel}>Cancel</Button>
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
      <p className="success-text">Your information has been saved</p>
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