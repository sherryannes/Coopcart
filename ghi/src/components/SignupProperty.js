import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import MemberForm from "./MemberForm.js";
import KMForm from "./KMForm.js";
import "../SignupProperty.css";

function SignupProperty() {
  const { token } = useAuthContext();
  const [isKM, setIsKM] = useState(false);
  const [isMember, setIsMember] = useState(true);

  const handleKMChange = (e) => {
    setIsKM(!isKM);
    setIsMember(!isMember);
  };
  console.log("is member: ", isMember);

  return (
    <div className="signup-property-container">
      <h1 className="header">Create an Account</h1>
      <div className="role-selection">
        <input
          type="radio"
          name="role"
          id="member"
          checked={isMember}
          onChange={handleKMChange}
        />
        <label htmlFor="member" className="role-label">
          I'm a Member
        </label>
        <input
          type="radio"
          name="role"
          id="km"
          checked={isKM}
          onChange={handleKMChange}
        />
        <label htmlFor="km" className="role-label">
          I'm a Kitchen Manager
        </label>
      </div>
      {isMember && (
        <div>
          <MemberForm />
        </div>
      )}
      {isKM && <KMForm />}
    </div>
  );
}

export default SignupProperty;