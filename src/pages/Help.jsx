
import { useState } from "react";
import {
  Search,
  MessageCircle,
  Mail,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Send,
  BookOpen,
  FileText,
} from "lucide-react";
import "../CSS/Help.css";

const faqs = [
  {
    question: "How do I submit a new referral?",
    answer:
      "Open Submit Referral from the sidebar, complete the contact and company details, review the information, and submit the form. This demo does not send data to a server.",
  },
  {
    question: "How can I track my referrals?",
    answer:
      "Visit My Referrals to search your referrals, filter by status, and open a referral's details by clicking its contact name.",
  },
  {
    question: "When will I receive my referral reward?",
    answer:
      "Reward eligibility and payment timing depend on the referral program's rules. The statuses and amounts in this frontend demo are sample data and do not represent real payments.",
  },
  {
    question: "What do the referral statuses mean?",
    answer:
      "In Review means the referral is being reviewed. Contacted means the contact has been reached. In Progress means follow-up is underway. Sale Completed means the referral is marked as successful in the demo.",
  },
  {
    question: "Can I update my profile information?",
    answer:
      "Open Profile from the sidebar, edit your details, and select Save Changes. In this demo, updates remain in React state and are not saved permanently.",
  },
  {
    question: "How do I update my account password?",
    answer:
      "Password management is not connected in this frontend-only demo. A real application should provide a secure password reset flow.",
  },
];

export default function Help() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Referral Submission",
    message: "",
  });
  const [feedback, setFeedback] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  const updateForm = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setFeedback("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedback(
      "Your demo request has been validated. No message was sent because support is not connected."
    );
  };

  return (
    <main className="help-page">
      <header className="help-page-heading">
        <div>
          <h1>Help & Support</h1>
          <p>
            Find answers to common questions or get help with your account.
          </p>
        </div>
      </header>

      <section className="help-hero">
        <div className="help-hero-icon">
          <CircleHelp size={28} />
        </div>
        <h2>How can we help you?</h2>
        <p>Search our frequently asked questions to find an answer.</p>

        <div className="help-search">
          <Search size={18} />
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setOpenFaq(-1);
            }}
            placeholder="Search for answers..."
            aria-label="Search frequently asked questions"
          />
        </div>
      </section>

      <div className="help-content-grid">
        <section className="help-faq-card">
          <div className="help-section-heading">
            <div className="help-heading-icon">
              <BookOpen size={19} />
            </div>
            <div>
              <h2>Frequently Asked Questions</h2>
              <p>Quick answers to common questions.</p>
            </div>
          </div>

          <div className="help-faq-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const originalIndex = faqs.indexOf(faq);
                const isOpen = openFaq === originalIndex;

                return (
                  <article className="help-faq-item" key={faq.question}>
                    <button
                      type="button"
                      className="help-faq-question"
                      onClick={() =>
                        setOpenFaq(isOpen ? -1 : originalIndex)
                      }
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {isOpen && (
                      <p className="help-faq-answer">{faq.answer}</p>
                    )}
                  </article>
                );
              })
            ) : (
              <div className="help-no-results">
                <Search size={22} />
                <h3>No matching questions</h3>
                <p>Try another keyword or browse all questions.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setOpenFaq(0);
                  }}
                >
                  Show all FAQs
                </button>
              </div>
            )}
          </div>
        </section>

        <aside className="help-contact-column">
          <section className="help-contact-card">
            <div className="help-section-heading">
              <div className="help-heading-icon">
                <MessageCircle size={19} />
              </div>
              <div>
                <h2>Contact Support</h2>
                <p>Need more assistance?</p>
              </div>
            </div>

            <p className="help-contact-description">
              If you cannot find your answer, you can prepare a support
              request using the form below.
            </p>

            <div className="help-contact-option">
              <div className="help-contact-option-icon">
                <Mail size={18} />
              </div>
              <div>
                <strong>Email Support</strong>
                <span>Support email is not configured</span>
              </div>
            </div>

            <div className="help-contact-option">
              <div className="help-contact-option-icon">
                <FileText size={18} />
              </div>
              <div>
                <strong>Help Center</strong>
                <span>Browse the FAQs on this page</span>
              </div>
            </div>
          </section>

          <section className="help-request-card">
            <div className="help-section-heading">
              <div className="help-heading-icon">
                <Send size={18} />
              </div>
              <div>
                <h2>Send a Request</h2>
                <p>Describe the issue you're facing.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="help-request-form">
              <div className="help-field">
                <label htmlFor="help-name">Full Name</label>
                <input
                  id="help-name"
                  name="name"
                  value={form.name}
                  onChange={updateForm}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="help-field">
                <label htmlFor="help-email">Email Address</label>
                <input
                  id="help-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="help-field">
                <label htmlFor="help-topic">Topic</label>
                <select
                  id="help-topic"
                  name="topic"
                  value={form.topic}
                  onChange={updateForm}
                >
                  <option>Referral Submission</option>
                  <option>Referral Status</option>
                  <option>Rewards & Payments</option>
                  <option>Profile & Account</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="help-field">
                <label htmlFor="help-message">Message</label>
                <textarea
                  id="help-message"
                  name="message"
                  value={form.message}
                  onChange={updateForm}
                  placeholder="Tell us how we can help..."
                  rows={4}
                  required
                />
              </div>

              {feedback && (
                <p className="help-feedback" role="status">
                  {feedback}
                </p>
              )}

              <button type="submit" className="help-submit-button">
                <Send size={15} />
                Submit Request
              </button>
            </form>
          </section>
        </aside>
      </div>
    </main>
  );
}
