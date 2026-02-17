import { useMemo, useState } from "react";
import {
    FiShield,
    FiSlash,
    FiCheckCircle,
    FiChevronDown,
    FiCopy,
    FiCheck,
} from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Customers = () => {

    const axiosSecure = useAxiosSecure();
    const { data: userData = [] } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/users');
            return res.data;
        }
    })
    console.log(userData);
    const users = userData;

    const [tab, setTab] = useState("all");

    const filteredUsers = useMemo(() => {
        if (tab === "active") return users.filter((u) => u.status === "active");
        if (tab === "blocked") return users.filter((u) => u.status === "blocked");
        return users;
    }, [tab, users]);

    const [copiedUid, setCopiedUid] = useState(null);

    const handleCopyUid = async (uid) => {
        try {
            await navigator.clipboard.writeText(uid);
            setCopiedUid(uid);
            setTimeout(() => setCopiedUid(null), 1200);
        } catch (e) {
            console.log(e.message);
            try {
                const textarea = document.createElement("textarea");
                textarea.value = uid;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                setCopiedUid(uid);
                setTimeout(() => setCopiedUid(null), 1200);
            } catch {
                // silently fail (UI-only)
            }
        }
    };

    return (
        <div className="bg-white">
            <div className="border border-neutral-200 rounded-md p-6 bg-white">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-lg tracking-wide text-neutral-800">Customers</h2>
                        <p className="text-sm text-neutral-500 mt-1">
                            Manage access and roles for store users.
                        </p>
                    </div>

                    <div className="text-sm text-neutral-500">
                        Total Users:{" "}
                        <span className="text-neutral-800 font-medium">{userData.length}</span>
                    </div>
                </div>

                {/* Tabs (simple UX) */}
                <div className="mt-6 flex flex-wrap gap-2">
                    <TabButton active={tab === "all"} onClick={() => setTab("all")}>
                        All
                    </TabButton>
                    <TabButton active={tab === "active"} onClick={() => setTab("active")}>
                        Active
                    </TabButton>
                    <TabButton
                        active={tab === "blocked"}
                        onClick={() => setTab("blocked")}
                    >
                        Blocked
                    </TabButton>
                </div>

                {/* Table wrapper */}
                <div className="mt-6 overflow-x-auto border border-neutral-200 rounded-md">
                    <table className="table w-full">
                        <thead className="bg-neutral-50">
                            <tr className="text-xs tracking-[0.2em] text-neutral-500">
                                <th className="font-medium">USER</th>
                                <th className="font-medium">ROLE</th>
                                <th className="font-medium">STATUS</th>
                                <th className="font-medium hidden md:table-cell">JOINED</th>
                                <th className="font-medium hidden md:table-cell">LAST LOGIN</th>
                                <th className="font-medium text-right">ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map((u) => (
                                <tr key={u._id} className="hover:bg-neutral-50">
                                    {/* USER */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <Avatar name={u.name} photoURL={u.photoURL} />

                                            <div className="min-w-0">
                                                <p className="text-sm text-neutral-800 font-medium truncate">
                                                    {u.name || "Unnamed"}
                                                </p>
                                                <p className="text-[12px] text-neutral-500 truncate">
                                                    {u.email}
                                                </p>

                                                {/* ✅ UID with copy button */}
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <p className="text-[11px] text-neutral-400 truncate">
                                                        UID: {u.uid}
                                                    </p>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleCopyUid(u.uid)}
                                                        className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C] transition"
                                                        title="Copy UID"
                                                        aria-label="Copy UID"
                                                    >
                                                        {copiedUid === u.uid ? (
                                                            <FiCheck className="text-[14px]" />
                                                        ) : (
                                                            <FiCopy className="text-[14px]" />
                                                        )}
                                                    </button>

                                                    {copiedUid === u.uid && (
                                                        <span className="text-[11px] text-[#B08A3C]">
                                                            Copied!
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* ROLE */}
                                    <td>
                                        <RoleBadge role={u.role} />
                                    </td>

                                    {/* STATUS */}
                                    <td>
                                        <StatusBadge status={u.status} />
                                    </td>

                                    {/* ✅ JOIN (added) */}
                                    <td className="hidden md:table-cell">
                                        <p className="text-sm text-neutral-600">
                                            {formatDate(u.createdAt)}
                                        </p>
                                    </td>

                                    {/* LAST LOGIN */}
                                    <td className="hidden md:table-cell">
                                        <p className="text-sm text-neutral-600">
                                            {formatDate(u.lastLoginAt)}
                                        </p>
                                    </td>

                                    {/* ACTIONS */}
                                    <td>
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Block / Unblock */}
                                            <button
                                                type="button"
                                                className={`px-3 py-2 text-xs rounded-md border transition inline-flex items-center gap-2
                          ${u.status === "blocked"
                                                        ? "border-neutral-200 text-neutral-700 hover:border-[#B08A3C] hover:text-[#B08A3C]"
                                                        : "border-red-200 text-red-500 hover:border-red-300"
                                                    }`}
                                            >
                                                {u.status === "blocked" ? (
                                                    <>
                                                        <FiCheckCircle /> Unblock
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiSlash /> Block
                                                    </>
                                                )}
                                            </button>

                                            {/* Role dropdown (UI only) */}
                                            <div className="dropdown dropdown-end">
                                                <button
                                                    type="button"
                                                    className="px-3 py-2 text-xs rounded-md border border-[#B08A3C]/40 text-[#B08A3C] hover:border-[#B08A3C] transition inline-flex items-center gap-2"
                                                >
                                                    <FiShield />
                                                    Role
                                                    <FiChevronDown />
                                                </button>

                                                <ul className="dropdown-content z-50 mt-2 w-40 menu bg-white border border-neutral-200 shadow-md rounded-md p-2">
                                                    <li>
                                                        <button className="text-sm text-neutral-700 hover:text-[#B08A3C]">
                                                            Set Admin
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="text-sm text-neutral-700 hover:text-[#B08A3C]">
                                                            Set Customer
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {!filteredUsers.length && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-12 text-sm text-neutral-500"
                                    >
                                        No users found in this category.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer hint */}
                <p className="mt-4 text-xs text-neutral-400">
                    Tip: Blocking is safer than deleting — it preserves order history and
                    audit logs.
                </p>
            </div>
        </div>
    );
};

export default Customers;

/* ---------- UI pieces ---------- */

const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm rounded-md border transition-colors
      ${active
                ? "border-[#B08A3C] text-[#B08A3C]"
                : "border-neutral-200 text-neutral-600 hover:border-[#B08A3C] hover:text-[#B08A3C]"
            }
    `}
    >
        {children}
    </button>
);

const Avatar = ({ name, photoURL }) => {
    const initial = (name || "U").charAt(0).toUpperCase();

    return (
        <div className="w-10 h-10 rounded-full border border-[#B08A3C]/40 overflow-hidden flex items-center justify-center bg-[#B08A3C]/10 text-[#B08A3C] font-medium">
            {photoURL ? (
                <img
                    src={photoURL}
                    alt={name || "User"}
                    className="w-full h-full object-cover"
                />
            ) : (
                <span className="text-sm">{initial}</span>
            )}
        </div>
    );
};

const RoleBadge = ({ role }) => {
    const isAdmin = role === "admin";
    return (
        <span
            className={`text-xs px-3 py-1 rounded-full border tracking-wide
        ${isAdmin
                    ? "border-[#B08A3C]/40 text-[#B08A3C]"
                    : "border-neutral-200 text-neutral-700"
                }
      `}
        >
            {role || "customer"}
        </span>
    );
};

const StatusBadge = ({ status }) => {
    const isBlocked = status === "blocked";
    return (
        <span
            className={`text-xs px-3 py-1 rounded-full border tracking-wide
        ${isBlocked
                    ? "border-red-200 text-red-500"
                    : "border-[#B08A3C]/30 text-[#B08A3C]"
                }
      `}
        >
            {status || "active"}
        </span>
    );
};

const formatDate = (d) => {
    if (!d) return "—";
    const date = new Date(d);
    if (Number.isNaN(date.getTime())) return d;
    return date.toLocaleDateString("en-BD", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
