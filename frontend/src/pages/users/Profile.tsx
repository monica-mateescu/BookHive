import { Container } from "@/components";
import {
  EmailForm,
  PasswordForm,
  ProfileDetailsForm,
} from "@/components/users";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const isActive = (tab: string) => activeTab === tab;

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileDetailsForm />;
      case "email":
        return <EmailForm />;
      case "password":
        return <PasswordForm />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <h1 className="text-center text-3xl font-semibold">Profile</h1>
      <div className="mt-2 text-center text-(--gray-primary)">
        Update your account details, email, and password.
      </div>
      <div className="my-5 w-full">
        <div className="mx-auto w-full max-w-xl space-y-5">
          <div role="tablist" className="tabs tabs-border">
            <button
              role="tab"
              className={`tab ${isActive("profile") ? "tab-active" : ""}`}
              onClick={() => handleChangeTab("profile")}
            >
              Profile details
            </button>
            <button
              role="tab"
              className={`tab ${isActive("email") ? "tab-active" : ""}`}
              onClick={() => handleChangeTab("email")}
            >
              Email
            </button>
            <button
              role="tab"
              className={`tab ${isActive("password") ? "tab-active" : ""}`}
              onClick={() => handleChangeTab("password")}
            >
              Password
            </button>
          </div>
          {renderActiveTab()}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
