
import {
  Gift,
  CircleDollarSign,
  Wallet,
  TrendingUp,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
  Download,
} from "lucide-react";
import "../CSS/Rewards.css";

const rewards = [
  {
    id: "RWD-1001",
    contact: "Casey Brown",
    company: "Global Industries",
    date: "Oct 12, 2026",
    amount: 200,
    status: "Paid",
  },
  {
    id: "RWD-1002",
    contact: "Alex Morgan",
    company: "TechVision Inc.",
    date: "Oct 08, 2026",
    amount: 150,
    status: "Processing",
  },
  {
    id: "RWD-1003",
    contact: "Jamie Wilson",
    company: "Cloud Systems",
    date: "Sep 29, 2026",
    amount: 250,
    status: "Pending",
  },
  {
    id: "RWD-1004",
    contact: "Taylor Brooks",
    company: "Bright Solutions",
    date: "Sep 21, 2026",
    amount: 100,
    status: "Paid",
  },
  {
    id: "RWD-1005",
    contact: "Morgan Davis",
    company: "NextGen Co",
    date: "Sep 15, 2026",
    amount: 200,
    status: "Pending",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

export default function Rewards() {
  const totalEarned = rewards
    .filter((reward) => reward.status === "Paid")
    .reduce((sum, reward) => sum + reward.amount, 0);

  const pendingAmount = rewards
    .filter((reward) => reward.status !== "Paid")
    .reduce((sum, reward) => sum + reward.amount, 0);

  const paidCount = rewards.filter(
    (reward) => reward.status === "Paid"
  ).length;

  const handleExport = () => {
    const headers = [
      "Reward ID",
      "Contact",
      "Company",
      "Date",
      "Amount",
      "Status",
    ];

    const rows = rewards.map((reward) => [
      reward.id,
      reward.contact,
      reward.company,
      reward.date,
      reward.amount,
      reward.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "referral-rewards.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="rewards-page">
      <div className="rewards-page-heading">
        <div>
          <h1>Rewards</h1>
          <p>Track your earnings and referral reward payments.</p>
        </div>

        <button
          type="button"
          className="rewards-export-button"
          onClick={handleExport}
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      <section className="rewards-stats">
        <article className="rewards-stat-card">
          <div className="rewards-stat-top">
            <span>Total Earned</span>
            <div className="rewards-stat-icon earned-icon">
              <CircleDollarSign size={19} />
            </div>
          </div>
          <h2>{formatCurrency(totalEarned)}</h2>
          <p className="rewards-stat-footnote">
            <TrendingUp size={14} />
            From completed payments
          </p>
        </article>

        <article className="rewards-stat-card">
          <div className="rewards-stat-top">
            <span>Pending Rewards</span>
            <div className="rewards-stat-icon pending-icon">
              <Clock3 size={19} />
            </div>
          </div>
          <h2>{formatCurrency(pendingAmount)}</h2>
          <p className="rewards-stat-footnote">
            Awaiting payment or approval
          </p>
        </article>

        <article className="rewards-stat-card">
          <div className="rewards-stat-top">
            <span>Rewards Paid</span>
            <div className="rewards-stat-icon paid-icon">
              <CheckCircle2 size={19} />
            </div>
          </div>
          <h2>{paidCount}</h2>
          <p className="rewards-stat-footnote">
            Successfully paid rewards
          </p>
        </article>

        <article className="rewards-stat-card">
          <div className="rewards-stat-top">
            <span>Total Opportunities</span>
            <div className="rewards-stat-icon opportunities-icon">
              <Gift size={19} />
            </div>
          </div>
          <h2>{rewards.length}</h2>
          <p className="rewards-stat-footnote">
            Reward records in this demo
          </p>
        </article>
      </section>

      <section className="rewards-info-banner">
        <div className="rewards-banner-icon">
          <Wallet size={23} />
        </div>
        <div className="rewards-banner-content">
          <h2>Earn rewards for successful referrals</h2>
          <p>
            Refer potential customers, follow their progress, and
            track eligible rewards here. Payment information shown
            is illustrative demo data.
          </p>
        </div>
        <ArrowUpRight className="rewards-banner-arrow" size={20} />
      </section>

      <section className="rewards-table-card">
        <div className="rewards-table-heading">
          <div>
            <h2>Reward History</h2>
            <p>View your referral rewards and payment status.</p>
          </div>
          <span className="rewards-record-count">
            {rewards.length} records
          </span>
        </div>

        <div className="rewards-table-wrapper">
          <table className="rewards-table">
            <thead>
              <tr>
                <th>Reward ID</th>
                <th>Contact</th>
                <th>Company</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {rewards.map((reward) => (
                <tr key={reward.id}>
                  <td className="rewards-id">{reward.id}</td>
                  <td className="rewards-contact">{reward.contact}</td>
                  <td>{reward.company}</td>
                  <td>{reward.date}</td>
                  <td className="rewards-amount">
                    {formatCurrency(reward.amount)}
                  </td>
                  <td>
                    <span
                      className={`reward-status reward-status-${reward.status.toLowerCase()}`}
                    >
                      {reward.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rewards-table-footer">
          <span>Showing {rewards.length} demo records</span>
          <span>Amounts shown in USD</span>
        </div>
      </section>
    </main>
  );
}
