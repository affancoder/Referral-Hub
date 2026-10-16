
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import "../CSS/SubmitReferral.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  companyWebsite: "",
  industry: "",
  location: "",
  notes: "",
  consent: false,
};

const industries = [
  "Technology",
  "Healthcare",
  "Finance & Banking",
  "Retail & E-commerce",
  "Manufacturing",
  "Education",
  "Real Estate",
  "Other",
];

const locations = [
  "United States",
  "United Kingdom",
  "India",
  "Canada",
  "Australia",
  "Singapore",
  "Other",
];

export default function SubmitReferral() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (submitted) setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Frontend demonstration only; no data is sent to a server.
    setSubmitted(true);
  }

  return (
    <section className="submit-referral-page">
      <div className="submit-referral-heading">
        <div>
          <h1>Submit a New Referral</h1>
          <p>Share a potential customer and help us grow together.</p>
        </div>

        <span className="submit-referral-page-status">In Progress</span>
      </div>

      {submitted && (
        <div className="referral-form-success" role="status">
          <CheckCircle2 size={19} />
          <div>
            <strong>Form completed successfully!</strong>
            <p>
              This is a frontend demo. Your referral has not been saved to a
              server.
            </p>
          </div>
        </div>
      )}

      <form className="submit-referral-form" onSubmit={handleSubmit}>
        <div className="submit-form-grid">
          <div className="submit-form-field">
            <label htmlFor="firstName">
              First Name <span>*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="John"
              autoComplete="given-name"
              required
            />
          </div>

          <div className="submit-form-field">
            <label htmlFor="lastName">
              Last Name <span>*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
              autoComplete="family-name"
              required
            />
          </div>

          <div className="submit-form-field">
            <label htmlFor="email">
              Email Address <span>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="erkibjn@company.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="submit-form-field">
            <label htmlFor="phone">
              Phone Number <span>*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 0101010101"
              autoComplete="tel"
              required
            />
          </div>

          <div className="submit-form-field">
            <label htmlFor="companyName">
              Company Name <span>*</span>
            </label>
            <input
              id="companyName"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="XYTE Corp"
              autoComplete="organization"
              required
            />
          </div>

          <div className="submit-form-field">
            <label htmlFor="companyWebsite">Company Website</label>
            <input
              id="companyWebsite"
              name="companyWebsite"
              type="text"
              value={form.companyWebsite}
              onChange={handleChange}
              placeholder="https://www.xyz.com"
            />
          </div>

          <div className="submit-form-field">
            <label htmlFor="industry">Industry</label>
            <div className="submit-select-wrap">
              <select
                id="industry"
                name="industry"
                value={form.industry}
                onChange={handleChange}
              >
                <option value="">Select Industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </div>
          </div>

          <div className="submit-form-field">
            <label htmlFor="location">Location</label>
            <div className="submit-select-wrap">
              <select
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </div>
          </div>

          <div className="submit-form-field submit-form-field-full">
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any important details about this opportunity..."
              rows={4}
            />
          </div>
        </div>

        <label className="submit-referral-consent">
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            required
          />
          <span>
            I confirm that the information provided is accurate and I have the
            right to share these details with the company.
          </span>
        </label>

        <div className="submit-referral-actions">
          <button
            type="button"
            className="submit-referral-cancel"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>

          <button type="submit" className="submit-referral-submit">
            Submit Referral
          </button>
        </div>
      </form>
    </section>
  );
}
