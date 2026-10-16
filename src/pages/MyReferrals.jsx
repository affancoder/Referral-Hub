import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import "../CSS/MyReferrals.css";

const referrals = [
  {
    id: 1,
    name: "Jordan Lee",
    email: "jordan@acmecorp.com",
    company: "Acme Corp",
    date: "Oct 10, 2026",
    status: "In Review",
    reward: "Pending",
  },
  {
    id: 2,
    name: "Taylor Smith",
    email: "taylor@brighttech.com",
    company: "BrightTech Solutions",
    date: "Oct 06, 2026",
    status: "Contacted",
    reward: "Pending",
  },
  {
    id: 3,
    name: "Casey Brown",
    email: "casey@globalind.com",
    company: "Global Industries",
    date: "Sep 28, 2026",
    status: "Sale Completed",
    reward: "$200",
  },
  {
    id: 4,
    name: "Morgan Davis",
    email: "morgan@nextgen.com",
    company: "NextGen Co",
    date: "Sep 21, 2026",
    status: "In Progress",
    reward: "Pending",
  },
  {
    id: 5,
    name: "Riley Wilson",
    email: "riley@techsphere.com",
    company: "TechSphere",
    date: "Sep 15, 2026",
    status: "Contacted",
    reward: "Pending",
  },
  {
    id: 6,
    name: "Jamie Carter",
    email: "jamie@vraion.com",
    company: "Vraion Corp",
    date: "Aug 21, 2026",
    status: "Lost",
    reward: "—",
  },
  {
    id: 7,
    name: "Alex Johnson",
    email: "alex@cloudnine.com",
    company: "CloudNine",
    date: "Aug 14, 2026",
    status: "In Progress",
    reward: "Pending",
  },
  {
    id: 8,
    name: "Sam Wilson",
    email: "sam@brightpath.com",
    company: "BrightPath",
    date: "Aug 05, 2026",
    status: "Contacted",
    reward: "Pending",
  },
  {
    id: 9,
    name: "Chris Martin",
    email: "chris@innovate.com",
    company: "Innovate Ltd",
    date: "Jul 24, 2026",
    status: "Sale Completed",
    reward: "$200",
  },
  {
    id: 10,
    name: "Robin Taylor",
    email: "robin@pinnacle.com",
    company: "Pinnacle Group",
    date: "Jul 15, 2026",
    status: "In Review",
    reward: "Pending",
  },
  {
    id: 11,
    name: "Jamie Morgan",
    email: "jamie@vertex.com",
    company: "Vertex Systems",
    date: "Jun 20, 2026",
    status: "Contacted",
    reward: "Pending",
  },
  {
    id: 12,
    name: "Drew Parker",
    email: "drew@horizon.com",
    company: "Horizon Inc",
    date: "May 12, 2026",
    status: "Sale Completed",
    reward: "$200",
  },
];

const tabs = [
  { label: "All", status: "All" },
  { label: "In Review", status: "In Review" },
  { label: "Contacted", status: "Contacted" },
  { label: "In Progress", status: "In Progress" },
  { label: "Won", status: "Won" },
  { label: "Lost", status: "Lost" },
];

function getStatusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

export default function MyReferrals() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [page, setPage] = useState(1);

  const counts = useMemo(
    () => ({
      All: referrals.length,
      "In Review": referrals.filter((r) => r.status === "In Review").length,
      Contacted: referrals.filter((r) => r.status === "Contacted").length,
      "In Progress": referrals.filter((r) => r.status === "In Progress").length,
      Won: referrals.filter((r) => r.status === "Sale Completed").length,
      Lost: referrals.filter((r) => r.status === "Lost").length,
    }),
    [],
  );

  const filteredReferrals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return referrals.filter((referral) => {
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Won"
          ? referral.status === "Sale Completed"
          : referral.status === activeTab);

      const matchesStatus =
        statusFilter === "All Status" || referral.status === statusFilter;

      const matchesSearch =
        !query ||
        [referral.name, referral.email, referral.company].some((value) =>
          value.toLowerCase().includes(query),
        );

      const month = new Date(`${referral.date} 00:00:00`).getMonth();
      const matchesTime =
        timeFilter === "All Time" ||
        (timeFilter === "Last 3 Months" && month >= 7) ||
        (timeFilter === "Last 6 Months" && month >= 4);

      return matchesTab && matchesStatus && matchesSearch && matchesTime;
    });
  }, [activeTab, search, statusFilter, timeFilter]);

  const pageSize = 5;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredReferrals.length / pageSize),
  );
  const safePage = Math.min(page, totalPages);
  const visibleReferrals = filteredReferrals.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function changeTab(status) {
    setActiveTab(status);
    setPage(1);
  }

  return (
    <section className="my-referrals-page">
      <div className="my-referrals-heading">
        <h1>My Referrals</h1>
        <p>View and track all your submitted referrals.</p>
      </div>

      <div
        className="referrals-tabs"
        role="tablist"
        aria-label="Referral status"
      >
        {tabs.map((tab) => (
          <button
            key={tab.status}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.status}
            className={`referrals-tab ${activeTab === tab.status ? "active" : ""}`}
            onClick={() => changeTab(tab.status)}
          >
            {tab.label} ({counts[tab.status]})
          </button>
        ))}
      </div>

      <div className="my-referrals-toolbar">
        <label className="my-referrals-search">
          <Search size={16} />
          <input
            type="search"
            value={search}
            placeholder="Search by name, company or email..."
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            aria-label="Search referrals"
          />
        </label>

        <label className="referrals-filter">
          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
            aria-label="Filter by status"
          >
            <option>All Status</option>
            <option>In Review</option>
            <option>Contacted</option>
            <option>In Progress</option>
            <option>Sale Completed</option>
            <option>Lost</option>
          </select>
          <ChevronDown size={14} />
        </label>

        <label className="referrals-filter referrals-time-filter">
          <select
            value={timeFilter}
            onChange={(event) => {
              setTimeFilter(event.target.value);
              setPage(1);
            }}
            aria-label="Filter by time"
          >
            <option>All Time</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
          </select>
          <ChevronDown size={14} />
        </label>
      </div>

      <div className="my-referrals-table-panel">
        <div className="my-referrals-table-scroll">
          <table className="my-referrals-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Contact Name</th>
                <th>Company</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th>Reward</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleReferrals.map((referral) => (
                <tr key={referral.id}>
                  <td>{referral.id}</td>
                  <td>
                    <div className="my-referral-contact">
                      <td>
                        <button
                          type="button"
                          className="referral-name-link"
                          onClick={() =>
                            navigate(`/referral-details/${referral.id}`)
                          }
                        >
                          {referral.name}
                        </button>
                      </td>
                      {/* <span>{referral.email}</span> */}
                    </div>
                  </td>
                  <td>{referral.company}</td>
                  <td>{referral.date}</td>
                  <td>
                    <span
                      className={`my-referral-status ${getStatusClass(referral.status)}`}
                    >
                      {referral.status}
                    </span>
                  </td>
                  <td
                    className={
                      referral.reward.startsWith("$")
                        ? "my-referral-earned"
                        : ""
                    }
                  >
                    {referral.reward}
                  </td>
                  <td>
                    <div className="my-referral-actions">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/referral-details/${referral.id}`)
                        }
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="my-referral-more"
                        aria-label={`View more details for ${referral.name}`}
                        onClick={() =>
                          navigate(`/referral-details/${referral.id}`)
                        }
                      >
                        ⋮
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {visibleReferrals.length === 0 && (
                <tr>
                  <td colSpan="7" className="my-referrals-empty">
                    No referrals match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="my-referrals-pagination">
          <span>
            Showing{" "}
            {filteredReferrals.length === 0 ? 0 : (safePage - 1) * pageSize + 1}
            {"–"}
            {Math.min(safePage * pageSize, filteredReferrals.length)} of{" "}
            {filteredReferrals.length} referrals
          </span>

          <div className="my-referrals-page-buttons">
            <button
              type="button"
              aria-label="Previous page"
              disabled={safePage === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <button
                  type="button"
                  key={number}
                  className={safePage === number ? "active" : ""}
                  aria-label={`Page ${number}`}
                  aria-current={safePage === number ? "page" : undefined}
                  onClick={() => setPage(number)}
                >
                  {number}
                </button>
              ),
            )}

            <button
              type="button"
              aria-label="Next page"
              disabled={safePage === totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
