import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

/**
 * LoginPage - المحدث لربط الواجهة بالسيرفر (Project 2)
 * يستخدم axios لإرسال بيانات تسجيل الدخول وتفعيل الجلسات.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // إرسال طلب تسجيل الدخول إلى السيرفر
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email, password },
        { 
          withCredentials: true // ضروري جداً للسماح للسيرفر بإرسال الـ Session Cookie
        }
      );

      if (response.status === 200) {
        // إذا نجح تسجيل الدخول، نتوجه للصفحة الرئيسية
        navigate("/");
      }
    } catch (err) {
      // عرض رسالة الخطأ القادمة من السيرفر
      setError(err.response?.data?.error || "Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-sub">Login to continue</p>

        {/* عرض الخطأ إن وجد */}
        {error && <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{error}</p>}

<<<<<<< HEAD
        <form className="login-form" onSubmit={handleSubmit}>
          {/* حقل الإيميل */}
=======
{/* email */}
>>>>>>> 14a522cd9f72998e0c256eec0fb045a8bbc020b4
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
<<<<<<< HEAD

          {/* حقل كلمة المرور */}
=======
{/* password */}
>>>>>>> 14a522cd9f72998e0c256eec0fb045a8bbc020b4
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>

          <p className="signup-text">
            Don't have an account?
            <span 
              onClick={() => navigate("/register")} 
              style={{ cursor: "pointer", color: "#4F46E5", textDecoration: "underline" }}
            > Create one</span>
          </p>
        </form>
      </div>
    </div>
  );
}