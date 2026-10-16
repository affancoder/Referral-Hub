import {
  UsersRound,
  Clock3,
  Check,
  Gift,
  ArrowUpRight,
  ArrowRight,
  Plus,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../CSS/Dashboard.css";

const referrals = [
  {
    id: 1,
    name: "Jordan Lee",
    email: "jordan@acmecorp.com",
    company: "Acme Corp",
    date: "Oct 10, 2026",
    status: "In Review",
    reward: "Pending",
    statusClass: "in-review",
  },
  {
    id: 2,
    name: "Taylor Smith",
    email: "taylor@brighttech.com",
    company: "BrightTech Solutions",
    date: "Oct 06, 2026",
    status: "Contacted",
    reward: "Pending",
    statusClass: "contacted",
  },
  {
    id: 3,
    name: "Casey Brown",
    email: "casey@globalind.com",
    company: "Global Industries",
    date: "Sep 28, 2026",
    status: "Sale Completed",
    reward: "$200",
    statusClass: "sale-completed",
  },
];

const chartData = [
  { month: "May 2026", value: 2 },
  { month: "Jun 2026", value: 3.5 },
  { month: "Jul 2026", value: 4 },
  { month: "Aug 2026", value: 4.5 },
  { month: "Sep 2026", value: 5.5 },
  { month: "Oct 2026", value: 8 },
];

function ReferralActivityChart() {
  const width = 600;
  const height = 155;
  const left = 35;
  const right = 12;
  const top = 10;
  const bottom = 31;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  const points = chartData.map((item, index) => ({
    x: left + (index * plotWidth) / (chartData.length - 1),
    y: top + plotHeight - (item.value / 10) * plotHeight,
    ...item,
  }));

  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPoints = `${left},${top + plotHeight} ${linePoints} ${
    left + plotWidth
  },${top + plotHeight}`;

  return (
    <div className="activity-chart">
      <svg
        className="activity-chart-svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Referral submissions increased from 2 in May 2026 to 8 in October 2026."
        preserveAspectRatio="none"
      >
        {[0, 2, 4, 6, 8, 10].map((value) => {
          const y = top + plotHeight - (value / 10) * plotHeight;

          return (
            <g key={value}>
              <line
                x1={left}
                y1={y}
                x2={width - right}
                y2={y}
                stroke="#e9e9e9"
                strokeWidth="1"
              />
              <text
                x={left - 10}
                y={y + 3}
                fontSize="10"
                textAnchor="end"
                fill="#555"
              >
                {value}
              </text>
            </g>
          );
        })}

        <polygon points={areaPoints} fill="#111111" opacity="0.07" />

        <polyline
          points={linePoints}
          fill="none"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point) => (
          <g key={point.month}>
            <circle
              cx={point.x}
              cy={point.y}
              r="3.5"
              fill="#111111"
            />
            <text
              x={point.x}
              y={height - 7}
              fontSize="10"
              textAnchor="middle"
              fill="#555"
            >
              {point.month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  note,
  variant,
}) {
  return (
    <article className="dashboard-stat-card">
      <div className={`dashboard-stat-icon ${variant}`}>
        <Icon size={25} strokeWidth={2} />
      </div>

      <div className="dashboard-stat-info">
        <span className="dashboard-stat-label">{label}</span>
        <strong className="dashboard-stat-value">{value}</strong>
        <span className="dashboard-stat-note">{note}</span>
      </div>
    </article>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="customer-dashboard">
      <section className="dashboard-welcome">
        <h1>Welcome back, Alex</h1>
        <p>Track your referrals and rewards in one place.</p>
      </section>

      <section className="dashboard-stats" aria-label="Referral summary">
        <StatCard
          icon={UsersRound}
          label="Total Referrals"
          value="12"
          note={
            <>
              <ArrowUpRight size={13} />
              <span>2 this month</span>
            </>
          }
          variant="people"
        />

        <StatCard
          icon={Clock3}
          label="In Progress"
          value="5"
          note="Under review or in sales process"
          variant="progress"
        />

        <StatCard
          icon={Check}
          label="Successful"
          value="4"
          note="Sales completed"
          variant="success"
        />

        <StatCard
          icon={Gift}
          label="Available Rewards"
          value="$400"
          note="Ready to be claimed"
          variant="rewards"
        />
      </section>

      <section className="dashboard-middle">
        <article className="dashboard-panel activity-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Referral Activity</h2>
              <p>Your referral submissions over the last 6 months</p>
            </div>

            <select
              className="activity-period-select"
              aria-label="Activity period"
              defaultValue="6"
            >
              <option value="6">Last 6 Months</option>
              <option value="3">Last 3 Months</option>
              <option value="12">Last 12 Months</option>
            </select>
          </div>

          <ReferralActivityChart />
        </article>

        <article className="dashboard-panel rewards-panel">
          <div className="rewards-panel-top">
            <div>
              <h2>Your Rewards</h2>
              <span>Available Balance</span>
              <strong className="rewards-balance">$400</strong>
            </div>

            <div className="rewards-large-icon">
              <Gift size={30} strokeWidth={1.8} />
            </div>
          </div>

          <p className="rewards-description">
            Rewards are issued once the referred sale reaches the eligible
            milestone.
          </p>

          <button
            type="button"
            className="dashboard-primary-button rewards-button"
            onClick={() => navigate("/rewards")}
          >
            View Rewards <ArrowRight size={16} />
          </button>
        </article>
      </section>

      <section className="dashboard-panel recent-referrals-panel">
        <div className="recent-referrals-heading">
          <div>
            <h2>Recent Referrals</h2>
            <p>Your latest submitted referrals and their status</p>
          </div>

          <button
            type="button"
            className="dashboard-primary-button new-referral-button"
            onClick={() => navigate("/submit-referral")}
          >
            <Plus size={16} />
            Submit New Referral
          </button>
        </div>

        <div className="referrals-table-wrapper">
          <table className="referrals-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Referral</th>
                <th>Company</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th>Reward</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {referrals.map((referral) => (
                <tr key={referral.id}>
                  <td>{referral.id}</td>

                  <td>
                    <div className="referral-contact">
                      <strong>{referral.name}</strong>
                      <span>{referral.email}</span>
                    </div>
                  </td>

                  <td>{referral.company}</td>
                  <td>{referral.date}</td>

                  <td>
                    <span
                      className={`referral-status ${referral.statusClass}`}
                    >
                      {referral.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        referral.reward === "$200"
                          ? "referral-reward earned"
                          : "referral-reward"
                      }
                    >
                      {referral.reward}
                    </span>
                  </td>

                  <td>
                    <div className="referral-row-actions">
                      <button
                        type="button"
                        className="referral-view-button"
                        onClick={() =>
                          navigate(`/referral-details/${referral.id}`)
                        }
                        aria-label={`View ${referral.name}'s referral`}
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="referral-more-button"
                        onClick={() =>
                          navigate(`/referral-details/${referral.id}`)
                        }
                        aria-label={`More details for ${referral.name}`}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
