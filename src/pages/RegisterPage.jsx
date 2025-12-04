import "./RegisterPage.css";

export default function RegisterPage() {
  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="register-title">Create Account</h2>
        <p className="register-sub">Join our store community</p>

        <form className="register-form">

          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Your full name" />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="register-btn">Create Account</button>

          <p className="login-text">
            Already have an account?
            <span> Login</span>
          </p>

        </form>

      </div>
    </div>
  );
}
