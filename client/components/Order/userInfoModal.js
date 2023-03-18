import BackDrop from '../SignUpModal/BackDrop'

const userInfoModal = ({ showUserModal, setShowUserModal, userInfo }) => {
  return (
    <BackDrop showSignUp={showUserModal} setShowSignUp={setShowUserModal}>
      <div
        className="userInfoModal"
        style={{ display: showUserModal ? 'flex' : 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>ข้อมูลผู้สั่ง</h3>
        <p>ชื่อ: {userInfo?.name}</p>
        <p>อีเมล: {userInfo?.email}</p>
        <p>โทร: {userInfo?.phone}</p>
        <p>ที่อยู่: {userInfo?.address}</p>
        <p>อำเภอ: {userInfo?.district}</p>
        <p>ตำบล: {userInfo?.subDistrict}</p>
        <p>รหัสไปรษณีย์: {userInfo?.postalCode}</p>
        <p>โซเชียลมีเดีย: {userInfo?.socialLink}</p>
      </div>
    </BackDrop>
  )
}

export default userInfoModal
