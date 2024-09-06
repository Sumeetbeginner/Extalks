import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { resetToken } = useParams();

  const validatePassword = (passwordbhai) => {
    return passwordbhai.length > 5;
  };

  const resetPassword = async () => {
    if (!validatePassword(password)) {
      alert("⚠️ Kindly Enter Password with more than 5 letters");
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/auth/updatepassword/${resetToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // setLoading(false);
        alert(
          "✅ Password Reset Successfully. Now you can login with new password"
        );
        navigate("/login");
      } else {
        setLoading(false);
        alert("⚠️ Failed Updating New Password");
        navigate("/welcome");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  if (loading) return <div className="loader"></div>;

  return (
    <div className="resetPB">
      <h2>Reset Password</h2>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a New Password"
      />

      <button onClick={resetPassword}>Update Password</button>
    </div>
  );
};

export default ResetPassword;
