import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-sub">Login to continue</p>

        <form className="login-form">

{/* email */}
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
{/* password */}
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="login-btn">Login</button>

          <p className="signup-text">
            Don't have an account?
            <span> Create one</span>
          </p>

        </form>

      </div>
    </div>
  );
}
