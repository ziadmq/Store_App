import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-container">

      <div className="about-card">
        <h1 className="about-title">About Our Store App</h1>
        <p className="about-subtitle">
          A modern React web application built as part of the Web course in the Software Engineering Department.
        </p>

        <div className="about-section">
          <h2>Course Information</h2>
          <p><b>Course:</b> Web – Software Engineering Department</p>
          <p><b>Instructor:</b> Dr. Bashar Abdul Kareem Mahmoud Al-Shboul</p>
        </div>

        <div className="about-section">
          <h2>Team Members</h2>
          <ul>
            <li><b>ZIAD MANSOOR MOH'D YOUSEF QAFISHEH</b> — ID: 2231993</li>
            <li><b>IYAD AWAD ABDEL RAHMAN A. ABUFARES</b> — ID: 2232519</li>
            <li><b>SHAHD YOUSEF ISMAIL AL-ARYAN</b> — ID: 2336972</li>
          </ul>
        </div>


        <div className="about-section">
          <h2>Features Included</h2>
          <ul>
            <li>Component-based architecture</li>
            <li>Client-side routing with React Router</li>
            <li>Dynamic filtering & sorting</li>
            <li>Modern card-based layout</li>
            <li>Responsive design for mobile & desktop</li>
            <li>Login & Register UI pages</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Technologies Used</h2>
          <p>React.js</p>
        </div>

      </div>
    </div>
  );
}
