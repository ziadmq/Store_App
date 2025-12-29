import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // إرسال طلب إنشاء مستخدم جديد للسيرفر
      await axios.post("http://localhost:5000/api/register", { email, password });
      alert("Registration successful! Now you can login.");
      navigate("/login"); // التوجه لصفحة تسجيل الدخول بعد النجاح
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Create Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form className="login-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-btn">Register</button>
        </form>
      </div>
    </div>
  );
}