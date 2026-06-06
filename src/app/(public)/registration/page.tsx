"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "",
    fatherName: "", motherName: "", dateOfBirth: "", nid: "",
    maritalStatus: "", gender: "", presentAddress: "", permanentAddress: "",
    bloodGroup: "", hobby: "",
    sscYear: "", hscYear: "", lastDegree: "", university: "",
    passingYear: "", professionalDegree: "",
    currentOrg: "", designation: "", officeLocation: "",
    industry: "", yearsOfExperience: "",
    volunteer: "", areaOfInterest: "", linkedin: "", facebook: "",
    otherOrg: "", otherPosition: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth, form.email, form.password
      );
      await updateProfile(user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });
      await setDoc(doc(db, "members", user.uid), {
        ...form,
        password: "",
        uid: user.uid,
        role: "member",
        approved: false,
        createdAt: new Date().toISOString(),
      });
      const token = await user.getIdToken();
      document.cookie = `firebase-token=${token}; path=/; max-age=3600; SameSite=Strict`;
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:border-gray-400 text-sm";
  const labelClass = "block text-sm font-semibold mb-1";

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-0.5 bg-green-500" />
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{title}</span>
      <div className="flex-1 h-0.5 bg-green-500" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-16">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-1">Create Account</h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          Enter your information to create a new account
        </p>

        <div className="bg-white rounded-2xl shadow p-8">
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ── User Profile ── */}
            <SectionTitle title="User Profile (Login/Access Info)" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>1. First Name</label>
                <input name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>2. Last Name</label>
                <input name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>3. Email Address</label>
                <input name="email" type="email" placeholder="john.doe@example.com" value={form.email} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>4. Password (Required)</label>
                <div className="relative">
                  <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={handleChange} required className={`${inputClass} pr-10`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* ── Personal Information ── */}
            <SectionTitle title="Personal Information" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>1. Full Name (Required)</label>
                <input name="fullName" placeholder="Full Name" onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>4. Date of Birth (Required)</label>
                <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>9. Permanent Address (Required)</label>
                <textarea name="permanentAddress" placeholder="Permanent Address" value={form.permanentAddress} onChange={handleChange} required className={`${inputClass} resize-none h-24`} />
              </div>
              <div>
                <label className={labelClass}>2. Father Name (Optional)</label>
                <input name="fatherName" placeholder="Father's Name" value={form.fatherName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>5. NID/Birth Registration No (Optional)</label>
                <input name="nid" placeholder="NID/Birth Registration No" value={form.nid} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>10. Blood Group (Optional)</label>
                <input name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>3. Mother Name (Optional)</label>
                <input name="motherName" placeholder="Mother's Name" value={form.motherName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>6. Marital Status (Required)</label>
                <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} required className={inputClass}>
                  <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>11. Hobby (Optional)</label>
                <input name="hobby" placeholder="Hobby" value={form.hobby} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            {/* Gender + Present Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>7. Gender</label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="gender" value="male" onChange={handleChange} /> Male
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="gender" value="female" onChange={handleChange} /> Female
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>8. Present Address (Required)</label>
                <textarea name="presentAddress" placeholder="Present Address" value={form.presentAddress} onChange={handleChange} required className={`${inputClass} resize-none h-24`} />
              </div>
            </div>

            {/* ── Academic Background ── */}
            <SectionTitle title="Academic Background" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>1. SSC Year of Passing (Required)</label>
                <input name="sscYear" placeholder="SSC Year of Passing" value={form.sscYear} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>4. University/Institute Name (Required)</label>
                <input name="university" placeholder="University/Institute Name" value={form.university} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>6. Professional Degree (Optional)</label>
                <input name="professionalDegree" placeholder="Professional Degree" value={form.professionalDegree} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>2. HSC Year of Passing (Required)</label>
                <input name="hscYear" placeholder="HSC Year of Passing" value={form.hscYear} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>5. Passing Year (Required)</label>
                <input name="passingYear" placeholder="Passing Year" value={form.passingYear} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>7. Upload Last Certificate (Required)</label>
                <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer" />
              </div>
              <div>
                <label className={labelClass}>3. Last Obtained Degree (Required)</label>
                <input name="lastDegree" placeholder="Last Obtained Degree" value={form.lastDegree} onChange={handleChange} required className={inputClass} />
              </div>
            </div>

            {/* ── Professional Information ── */}
            <SectionTitle title="Professional Information" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>1. Current Organization (Required)</label>
                <input name="currentOrg" placeholder="Current Organization" value={form.currentOrg} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>3. Office Location (Required)</label>
                <input name="officeLocation" placeholder="Office Location" value={form.officeLocation} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>5. Years of Experience (Optional)</label>
                <input name="yearsOfExperience" placeholder="Years of Experience" value={form.yearsOfExperience} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>2. Designation/Position (Required)</label>
                <input name="designation" placeholder="Designation/Position" value={form.designation} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>4. Industry/Field of Work (Optional)</label>
                <input name="industry" placeholder="Industry/Field of Work" value={form.industry} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            {/* ── Alumni Engagement ── */}
            <SectionTitle title="Alumni Engagement / Other Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>1. Willingness to Volunteer (Optional)</label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="volunteer" value="yes" onChange={handleChange} /> Yes
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="volunteer" value="no" onChange={handleChange} /> No
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>Social Media Links (Optional)</label>
                <div className="space-y-2">
                  <input name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange} className={inputClass} />
                  <input name="facebook" placeholder="Facebook URL" value={form.facebook} onChange={handleChange} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>2. Area of Interest (Optional)</label>
                <input name="areaOfInterest" placeholder="Area of Interest" value={form.areaOfInterest} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            {/* ── Other Associations ── */}
            <SectionTitle title="Other Associations" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>1. Organization Name (Optional)</label>
                <input name="otherOrg" placeholder="Organization Name" value={form.otherOrg} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>2. Current/Last Position (Optional)</label>
                <input name="otherPosition" placeholder="Current/Last Position" value={form.otherPosition} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition mt-6 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-red-500 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}