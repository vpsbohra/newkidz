import React, { useEffect, useState } from "react";
import AuthUser from './AuthUser';
const ResetPassword = () => {
  const { http, setToken } = AuthUser();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken2] = useState("");
  const [error, setError] = useState('');


  const isLoginButtonEnabled = newPassword === confirmPassword && newPassword !== "";



  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

  };

  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setError("*Password not matched");
    } else {
      setError('');
    }
  }, [confirmPassword]);
  

const handleLogin = () => {

  http.post('/update-forgot-password', { email: email, token: token, password: newPassword, password_confirmation: confirmPassword }).then((res) => {

    if (res) {

      http.post('/login', { email: email, password: confirmPassword }).then((res) => {
        setToken(res.data.user, res.data.access_token);
      }).catch((error) => {

        console.log(error)
      });

    }

  }).catch((error) => {

    console.log(error);
    setError('oops! may be your token has expired')
  });

};


useEffect(() => {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  setToken2(url.searchParams.get("token"))
  setEmail(url.searchParams.get("email"));


})
return (
  <>
    {email && token ? (
      <>
        <div className="reset_pass">
          <div className="container">
            <div className="reset_pass_main">
              <div className="card login_sr_cnt p-4">
                <h1 class="text-center mb-3">Reset Password</h1>
                <div className="reset_pass_inputs">
                  <div className="reset_pass_inputs_item">
                    <label>New password</label>
                    <input class="form-control" type="password" placeholder="Enter your password" value={newPassword} onChange={handleNewPasswordChange} />
                  </div>
                  <div className="reset_pass_inputs_item">
                    <label>Confirm new password</label>
                    <input class="form-control" type="password" placeholder="Re-enter your password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                  </div>
                </div>
                <button className="reset_pass_login btn btn-primary mt-4" onClick={handleLogin} disabled={!isLoginButtonEnabled}>LOGIN</button>
                <span className="text-danger">{error}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (<></>)}
  </>
);
};

export default ResetPassword;
