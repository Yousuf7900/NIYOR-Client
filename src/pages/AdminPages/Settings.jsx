import { useState } from "react";
import {
  FiSettings,
  FiUser,
  FiLock,
  FiBell,
  FiGlobe,
  FiSave,
  FiUploadCloud,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const Settings = () => {
  // UI-only state (no API)
  const [tab, setTab] = useState("profile"); // profile | security | notifications | store
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="bg-white">
      <div className="border border-neutral-200 rounded-md p-6 bg-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg tracking-wide text-neutral-800">Settings</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Manage your account, security and store preferences.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md bg-[#B08A3C] text-white hover:opacity-95 transition"
          >
            <FiSave />
            Save Changes
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          <TabButton active={tab === "profile"} onClick={() => setTab("profile")}>
            <FiUser className="text-base" /> Profile
          </TabButton>
          <TabButton active={tab === "security"} onClick={() => setTab("security")}>
            <FiLock className="text-base" /> Security
          </TabButton>
          <TabButton
            active={tab === "notifications"}
            onClick={() => setTab("notifications")}
          >
            <FiBell className="text-base" /> Notifications
          </TabButton>
          <TabButton active={tab === "store"} onClick={() => setTab("store")}>
            <FiGlobe className="text-base" /> Store
          </TabButton>
        </div>

        {/* Content */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Panel */}
          <div className="lg:col-span-2 border border-neutral-200 rounded-md p-4 sm:p-5 bg-white">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full border border-[#B08A3C]/40 bg-[#B08A3C]/10 text-[#B08A3C] flex items-center justify-center">
                <FiSettings />
              </span>
              <h3 className="text-sm tracking-wide text-neutral-800 font-medium">
                {tab === "profile" && "Profile Settings"}
                {tab === "security" && "Security Settings"}
                {tab === "notifications" && "Notification Settings"}
                {tab === "store" && "Store Settings"}
              </h3>
            </div>

            {/* Profile */}
            {tab === "profile" && (
              <div className="mt-5 space-y-5">
                <div className="rounded-md border border-neutral-200 p-4">
                  <p className="text-sm text-neutral-800 font-medium">Profile Photo</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Upload a square image for best results.
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-14 h-14 rounded-full border border-[#B08A3C]/40 bg-[#B08A3C]/10 text-[#B08A3C] flex items-center justify-center font-medium">
                      A
                    </div>

                    <label className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-[#B08A3C]/40 text-[#B08A3C] hover:border-[#B08A3C] transition cursor-pointer w-fit">
                      <FiUploadCloud />
                      Upload Photo
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" required>
                    <input className={inputClass} placeholder="Your name" />
                  </Field>
                  <Field label="Email" required>
                    <input className={inputClass} placeholder="you@email.com" />
                  </Field>
                  <Field label="Phone">
                    <input className={inputClass} placeholder="01XXXXXXXXX" />
                  </Field>
                  <Field label="Role">
                    <input className={inputClass} value="admin" disabled />
                    <p className="mt-1 text-[11px] text-neutral-400">
                      Role is managed by system.
                    </p>
                  </Field>
                </div>
              </div>
            )}

            {/* Security */}
            {tab === "security" && (
              <div className="mt-5 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Current Password" required>
                    <div className="relative">
                      <input
                        className={`${inputClass} pr-10`}
                        type={showPass ? "text" : "password"}
                        placeholder="********"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((v) => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-md border border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition inline-flex items-center justify-center"
                        title={showPass ? "Hide" : "Show"}
                        aria-label={showPass ? "Hide password" : "Show password"}
                      >
                        {showPass ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </Field>

                  <Field label="New Password" required>
                    <input
                      className={inputClass}
                      type="password"
                      placeholder="At least 8 characters"
                    />
                  </Field>
                </div>

                <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
                  <p className="text-sm text-neutral-800 font-medium">Security Tip</p>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Use a strong password and avoid reusing it across different websites.
                  </p>
                </div>
              </div>
            )}

            {/* Notifications */}
            {tab === "notifications" && (
              <div className="mt-5 space-y-4">
                <ToggleRow title="New order alerts" desc="Get notified when a new order is placed." />
                <ToggleRow title="Low stock alerts" desc="Receive alerts when stock is low." />
                <ToggleRow title="Delivery updates" desc="Notify when orders are shipped/delivered." />
                <ToggleRow title="Weekly summary" desc="Get a weekly store performance email." />
              </div>
            )}

            {/* Store */}
            {tab === "store" && (
              <div className="mt-5 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Store Name" required>
                    <input className={inputClass} placeholder="Niyor" />
                  </Field>
                  <Field label="Currency" required>
                    <select className={inputClass} defaultValue="BDT">
                      <option value="BDT">BDT (৳)</option>
                      <option value="USD">USD ($)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                  </Field>
                </div>

                <Field label="Store Address">
                  <input className={inputClass} placeholder="Dhaka, Bangladesh" />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Timezone">
                    <select className={inputClass} defaultValue="Asia/Dhaka">
                      <option value="Asia/Dhaka">Asia/Dhaka</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </Field>
                  <Field label="Language">
                    <select className={inputClass} defaultValue="en">
                      <option value="en">English</option>
                      <option value="bn">বাংলা</option>
                    </select>
                  </Field>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="border border-neutral-200 rounded-md p-4 sm:p-5 bg-white">
            <p className="text-sm tracking-wide text-neutral-800 font-medium">
              Quick Notes
            </p>

            <div className="mt-4 space-y-3">
              <InfoCard title="Theme" desc="Keeping your gold accent (#B08A3C) consistent." />
              <InfoCard title="Safe Updates" desc="Prefer disabling users/products over deleting." />
              <InfoCard title="Backups" desc="Export orders regularly once you go live." />
            </div>

            <div className="mt-5 rounded-md border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 leading-relaxed">
                Settings UI only. You can connect Firebase/Mongo updates later.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-neutral-400">
          Tip: Save changes after updating each section to avoid losing edits.
        </p>
      </div>
    </div>
  );
};

export default Settings;

/* ---------- UI pieces ---------- */

const TabButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 text-sm rounded-md border transition-colors inline-flex items-center gap-2
      ${
        active
          ? "border-[#B08A3C] text-[#B08A3C]"
          : "border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C]"
      }
    `}
  >
    {children}
  </button>
);

const Field = ({ label, required, children }) => (
  <label className="block">
    <span className="text-sm text-neutral-700">
      {label} {required && <span className="text-red-500">*</span>}
    </span>
    <div className="mt-2">{children}</div>
  </label>
);

const ToggleRow = ({ title, desc }) => (
  <div className="rounded-md border border-neutral-200 p-4 flex items-start justify-between gap-4">
    <div>
      <p className="text-sm text-neutral-800 font-medium">{title}</p>
      <p className="text-xs text-neutral-500 mt-1">{desc}</p>
    </div>

    {/* UI-only toggle */}
    <button
      type="button"
      className="w-11 h-6 rounded-full border border-neutral-200 bg-neutral-50 relative"
      title="Toggle (UI only)"
      aria-label="Toggle"
    >
      <span className="w-5 h-5 rounded-full bg-white border border-neutral-200 absolute top-1/2 -translate-y-1/2 left-0.5" />
    </button>
  </div>
);

const InfoCard = ({ title, desc }) => (
  <div className="rounded-md border border-neutral-200 p-3">
    <p className="text-sm text-neutral-800 font-medium">{title}</p>
    <p className="text-xs text-neutral-500 mt-1">{desc}</p>
  </div>
);

/* ---------- classes ---------- */

const inputClass =
  "w-full px-3 py-2 text-sm rounded-md border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#B08A3C] transition";
