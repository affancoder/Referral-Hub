import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  UserRound,
  CircleDollarSign,
} from "lucide-react";
import "../CSS/ReferralDetail.css";

const referrals = [
  {
    id: "1",
    name: "Jordan Lee",
    firstName: "Jordan",
    lastName: "Lee",
    company: "Acme Corp",
    email: "jordan.lee@example.com",
    phone: "+1 (555) 123-4567",
    website: "https://acmecorp.example.com",
    industry: "Technology",
    location: "New York, USA",
    date: "Oct 10, 2026",
    status: "In Review",
    reward: "Pending",
    notes: "Interested in learning more about our services.",
    timeline: [
      { title: "Referral Submitted", date: "Oct 10, 2026", done: true },
      { title: "Initial Review", date: "Pending", done: false },
      { title: "Contacted", date: "Pending", done: false },
      { title: "Sale Completed", date: "Pending", done: false },
    ],
  },
  {
    id: "2",
    name: "Taylor Smith",
    firstName: "Taylor",
    lastName: "Smith",
    company: "BrightTech Solutions",
    email: "taylor.smith@example.com",
    phone: "+1 (555) 234-5678",
    website: "https://brighttech.example.com",
    industry: "Software",
    location: "California, USA",
    date: "Oct 06, 2026",
    status: "Contacted",
    reward: "Pending",
    notes: "Looking for a business technology solution.",
    timeline: [
      { title: "Referral Submitted", date: "Oct 06, 2026", done: true },
      { title: "Initial Review", date: "Oct 07, 2026", done: true },
      { title: "Contacted", date: "Oct 09, 2026", done: true },
      { title: "Sale Completed", date: "Pending", done: false },
    ],
  },
  {
    id: "3",
    name: "Casey Brown",
    firstName: "Casey",
    lastName: "Brown",
    company: "Global Industries",
    email: "casey.brown@example.com",
    phone: "+1 (555) 345-6789",
    website: "https://globalindustries.example.com",
    industry: "Manufacturing",
    location: "Chicago, USA",
    date: "Sep 28, 2026",
    status: "Sale Completed",
    reward: "$200",
    notes: "Successful referral.",
    timeline: [
      { title: "Referral Submitted", date: "Sep 28, 2026", done: true },
      { title: "Initial Review", date: "Sep 29, 2026", done: true },
      { title: "Contacted", date: "Oct 01, 2026", done: true },
      { title: "Sale Completed", date: "Oct 12, 2026", done: true },
    ],
  },
  {
    id: "4",
    name: "Morgan Davis",
    firstName: "Morgan",
    lastName: "Davis",
    company: "NextGen Co",
    email: "morgan.davis@example.com",
    phone: "+1 (555) 456-7890",
    website: "https://nextgen.example.com",
    industry: "Consulting",
    location: "Austin, USA",
    date: "Sep 21, 2026",
    status: "In Progress",
    reward: "Pending",
    notes: "Follow-up discussion is in progress.",
    timeline: [
      { title: "Referral Submitted", date: "Sep 21, 2026", done: true },
      { title: "Initial Review", date: "Sep 22, 2026", done: true },
      { title: "Contacted", date: "Sep 25, 2026", done: true },
      { title: "Sale Completed", date: "Pending", done: false },
    ],
  },
  {
    id: "5",
    name: "Riley Wilson",
    firstName: "Riley",
    lastName: "Wilson",
    company: "TechSphere",
    email: "riley.wilson@example.com",
    phone: "+1 (555) 567-8901",
    website: "https://techsphere.example.com",
    industry: "Technology",
    location: "Seattle, USA",
    date: "Sep 15, 2026",
    status: "Contacted",
    reward: "Pending",
    notes: "The contact has been reached.",
    timeline: [
      { title: "Referral Submitted", date: "Sep 15, 2026", done: true },
      { title: "Initial Review", date: "Sep 16, 2026", done: true },
      { title: "Contacted", date: "Sep 18, 2026", done: true },
      { title: "Sale Completed", date: "Pending", done: false },
    ],
  },
];

const fallbackTimeline = [
  { title: "Referral Submitted", date: "Submitted", done: true },
  { title: "Initial Review", date: "Pending", done: false },
  { title: "Contacted", date: "Pending", done: false },
  { title: "Sale Completed", date: "Pending", done: false },
];

export default function ReferralDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const referral = referrals.find((item) => item.id === id);

  if (!referral) {
    return (
      <section className="referral-detail-page">
        <button
          className="detail-back-button"
          onClick={() => navigate("/my-referrals")}
        >
          <ArrowLeft size={17} /> Back to My Referrals
        </button>
        <div className="detail-not-found">
          <h2>Referral not found</h2>
          <p>This referral could not be found in the demo data.</p>
        </div>
      </section>
    );
  }

  const timeline = referral.timeline || fallbackTimeline;
  const isWon = referral.status === "Sale Completed";

  return (
    <section className="referral-detail-page">
      <button
        className="detail-back-button"
        onClick={() => navigate("/my-referrals")}
      >
        <ArrowLeft size={17} />
        Back to My Referrals
      </button>

      <div className="detail-page-heading">
        <div>
          <span className="detail-eyebrow">REFERRAL DETAILS</span>
          <h1>{referral.name}</h1>
          <p>
            {referral.company} <span>·</span> Submitted {referral.date}
          </p>
        </div>

        <span
          className={`detail-status ${
            isWon ? "status-won" : ""
          }`}
        >
          {referral.status}
        </span>
      </div>

      <div className="detail-layout">
        <div className="detail-main-column">
          <article className="detail-card">
            <div className="detail-card-heading">
              <div className="detail-heading-icon">
                <UserRound size={19} />
              </div>
              <div>
                <h2>Contact Information</h2>
                <p>Details of your referred contact</p>
              </div>
            </div>

            <div className="detail-info-grid">
              <div className="detail-info-item">
                <span>First Name</span>
                <strong>{referral.firstName}</strong>
              </div>
              <div className="detail-info-item">
                <span>Last Name</span>
                <strong>{referral.lastName}</strong>
              </div>
              <div className="detail-info-item">
                <span>Email Address</span>
                <strong className="detail-contact-value">
                  <Mail size={15} /> {referral.email}
                </strong>
              </div>
              <div className="detail-info-item">
                <span>Phone Number</span>
                <strong className="detail-contact-value">
                  <Phone size={15} /> {referral.phone}
                </strong>
              </div>
            </div>
          </article>

          <article className="detail-card">
            <div className="detail-card-heading">
              <div className="detail-heading-icon">
                <Building2 size={19} />
              </div>
              <div>
                <h2>Company Information</h2>
                <p>Business details for this referral</p>
              </div>
            </div>

            <div className="detail-info-grid">
              <div className="detail-info-item">
                <span>Company Name</span>
                <strong>{referral.company}</strong>
              </div>
              <div className="detail-info-item">
                <span>Industry</span>
                <strong>{referral.industry}</strong>
              </div>
              <div className="detail-info-item">
                <span>Company Website</span>
                <strong>{referral.website}</strong>
              </div>
              <div className="detail-info-item">
                <span>Location</span>
                <strong className="detail-contact-value">
                  <MapPin size={15} /> {referral.location}
                </strong>
              </div>
            </div>

            <div className="detail-notes">
              <span>Additional Notes</span>
              <p>{referral.notes || "No additional notes provided."}</p>
            </div>
          </article>

          <article className="detail-card">
            <div className="detail-card-heading">
              <div className="detail-heading-icon">
                <Clock3 size={19} />
              </div>
              <div>
                <h2>Referral Timeline</h2>
                <p>Track the progress of this referral</p>
              </div>
            </div>

            <div className="detail-timeline">
              {timeline.map((step, index) => (
                <div className="detail-timeline-item" key={step.title}>
                  <div className="detail-timeline-marker">
                    {step.done ? (
                      <CheckCircle2 size={21} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="detail-timeline-content">
                    <strong>{step.title}</strong>
                    <span>{step.date}</span>
                  </div>
                  {index < timeline.length - 1 && (
                    <div
                      className={`detail-timeline-line ${
                        step.done ? "line-complete" : ""
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="detail-side-column">
          <article className="detail-card detail-overview-card">
            <h2>Referral Overview</h2>

            <div className="detail-overview-row">
              <span>Status</span>
              <strong>{referral.status}</strong>
            </div>
            <div className="detail-overview-row">
              <span>Date Submitted</span>
              <strong>
                <CalendarDays size={15} /> {referral.date}
              </strong>
            </div>
            <div className="detail-overview-row">
              <span>Referral Reward</span>
              <strong className="detail-reward-value">
                <CircleDollarSign size={17} /> {referral.reward}
              </strong>
            </div>
          </article>

          <article className="detail-reward-card">
            <div className="detail-reward-icon">
              <CircleDollarSign size={23} />
            </div>
            <h2>Your Referral Reward</h2>
            <div className="detail-reward-amount">
              {isWon ? referral.reward : "Pending"}
            </div>
            <p>
              {isWon
                ? "This referral has been marked as completed in the demo."
                : "Your reward will be updated when this referral qualifies."}
            </p>
          </article>

          <button
            type="button"
            className="detail-secondary-button"
            onClick={() => navigate("/my-referrals")}
          >
            <ArrowLeft size={16} /> Return to My Referrals
          </button>
        </aside>
      </div>
    </section>
  );
}
