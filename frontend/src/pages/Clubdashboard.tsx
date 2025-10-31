import React, { useState } from "react";
import { Link } from "react-router-dom";

// Types
type ClubMember = {
  id: string;
  name: string;
  role: "leader" | "deputy" | "member";
  joinDate: string;
  activityScore: number;
  achievements: string[];
};

type ClubEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  participants: number;
  imageUrl?: string;
};

type ClubAchievement = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: "competition" | "project" | "social" | "other";
  imageUrl?: string;
};

type ClubActivity = {
  id: string;
  date: string;
  type: "event" | "meeting" | "achievement" | "other";
  description: string;
};

type ClubStats = {
  totalMembers: number;
  activeMembers: number;
  eventsHeld: number;
  achievementsCount: number;
  foundedDate: string;
};

type ClubDetail = {
  id: number;
  name: string;
  description: string;
  telegram: string;
  logo?: string;
  coverImage?: string;
  leader: ClubMember;
  deputies: ClubMember[];
  members: ClubMember[];
  events: ClubEvent[];
  achievements: ClubAchievement[];
  recentActivities: ClubActivity[];
  stats: ClubStats;
  mission: string;
  vision: string;
  goals: string[];
};

// Sample Data
const clubsData: ClubDetail[] = [
  {
    id: 1,
    name: "Zakovat klubi",
    description: "Intellektual o'yinlar va viktorinalar",
    telegram: "https://t.me/zakovat_quiz_tdiu",
    leader: {
      id: "1",
      name: "Aliyev Sardor",
      role: "leader",
      joinDate: "2022-09-01",
      activityScore: 95,
      achievements: ["Respublika chempioni", "100+ tadbirlar"],
    },
    deputies: [
      {
        id: "2",
        name: "Karimova Madina",
        role: "deputy",
        joinDate: "2022-09-15",
        activityScore: 88,
        achievements: ["O'rinbosar"],
      },
    ],
    members: [],
    events: [
      {
        id: "e1",
        title: "Bahorda Zakovat turniri",
        date: "2024-03-15",
        description: "150+ ishtirokchi",
        participants: 150,
      },
    ],
    achievements: [
      {
        id: "a1",
        title: "O'zbekiston chempionati - 1-o'rin",
        date: "2024-05-10",
        description: "Milliy chempionatda g'olib",
        category: "competition",
      },
    ],
    recentActivities: [
      {
        id: "act1",
        date: "2025-01-15",
        type: "event",
        description: "Yangi yil turniri - 80 ishtirokchi",
      },
    ],
    stats: {
      totalMembers: 85,
      activeMembers: 62,
      eventsHeld: 47,
      achievementsCount: 12,
      foundedDate: "2020-09-01",
    },
    mission: "Intellektual qobiliyatlarni rivojlantirish",
    vision: "Eng yirik intellektual klub",
    goals: ["Har oyda 2 ta turnir", "100 a'zo"],
  },
  {
    id: 13,
    name: "TSUE IT Club",
    description: "Dasturlash va texnologiyalar",
    telegram: "https://t.me/tsueitclub",
    leader: {
      id: "it1",
      name: "Nematov Aziz",
      role: "leader",
      joinDate: "2022-10-01",
      activityScore: 98,
      achievements: ["Google Expert nominanti", "5+ ochiq manba"],
    },
    deputies: [
      {
        id: "it2",
        name: "Islamova Zilola",
        role: "deputy",
        joinDate: "2022-11-01",
        activityScore: 92,
        achievements: ["Frontend mutaxassis"],
      },
    ],
    members: [],
    events: [
      {
        id: "ite1",
        title: "TSUE Hackathon 2024",
        date: "2024-11-15",
        description: "48 soatlik marafon",
        participants: 120,
      },
    ],
    achievements: [
      {
        id: "ita1",
        title: "Hackathon.uz - 1-o'rin",
        date: "2024-11-20",
        description: "Fintech loyihasi",
        category: "competition",
      },
      {
        id: "ita2",
        title: "TSUE Portal loyihasi",
        date: "2024-08-15",
        description: "10,000+ foydalanuvchi",
        category: "project",
      },
    ],
    recentActivities: [
      {
        id: "itact1",
        date: "2025-01-20",
        type: "event",
        description: "React workshop - 35 ishtirokchi",
      },
    ],
    stats: {
      totalMembers: 156,
      activeMembers: 98,
      eventsHeld: 32,
      achievementsCount: 18,
      foundedDate: "2021-10-01",
    },
    mission: "Zamonaviy texnologiyalar bilan qurollantirish",
    vision: "O'rta Osiyoda eng kuchli IT jamoa",
    goals: ["Har oyda 2 workshop", "3 real loyiha"],
  },
];

const ClubsDashboard = () => {
  const [selectedClub, setSelectedClub] = useState<ClubDetail | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  if (selectedClub) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Header with back button */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={() => setSelectedClub(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Orqaga
            </button>
          </div>
        </div>

        {/* Club Detail View */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="px-8 py-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {selectedClub.name}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {selectedClub.description}
                  </p>
                </div>
                <a
                  href={selectedClub.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">
                {selectedClub.stats.totalMembers}
              </div>
              <div className="text-gray-600 mt-1">Jami a'zolar</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600">
                {selectedClub.stats.activeMembers}
              </div>
              <div className="text-gray-600 mt-1">Faol a'zolar</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600">
                {selectedClub.stats.eventsHeld}
              </div>
              <div className="text-gray-600 mt-1">Tadbirlar</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600">
                {selectedClub.stats.achievementsCount}
              </div>
              <div className="text-gray-600 mt-1">Yutuqlar</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="border-b px-6">
              <div className="flex gap-8">
                {["overview", "leadership", "events", "achievements"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 border-b-2 font-medium transition-colors ${
                        activeTab === tab
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab === "overview" && "Umumiy"}
                      {tab === "leadership" && "Rahbariyat"}
                      {tab === "events" && "Tadbirlar"}
                      {tab === "achievements" && "Yutuqlar"}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="p-8">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Missiya
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedClub.mission}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Viziya
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedClub.vision}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Maqsadlar
                    </h3>
                    <ul className="space-y-2">
                      {selectedClub.goals.map((goal, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span className="text-gray-700">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "leadership" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-8 bg-blue-500 rounded"></div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Rahbar
                      </h3>
                    </div>
                    <div className="bg-white rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {selectedClub.leader.name}
                      </h4>
                      <div className="text-sm text-gray-600 mb-3">
                        A'zo bo'lgan:{" "}
                        {new Date(
                          selectedClub.leader.joinDate
                        ).toLocaleDateString("uz-UZ")}
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm font-medium text-gray-700">
                          Faollik:
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                            style={{
                              width: `${selectedClub.leader.activityScore}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-blue-600">
                          {selectedClub.leader.activityScore}%
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedClub.leader.achievements.map((ach, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {ach}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedClub.deputies.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-8 bg-purple-500 rounded"></div>
                        <h3 className="text-xl font-bold text-gray-900">
                          O'rinbosarlar
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedClub.deputies.map((deputy) => (
                          <div
                            key={deputy.id}
                            className="bg-white rounded-lg p-6 border border-gray-200"
                          >
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              {deputy.name}
                            </h4>
                            <div className="text-sm text-gray-600 mb-3">
                              {new Date(deputy.joinDate).toLocaleDateString(
                                "uz-UZ"
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                                  style={{ width: `${deputy.activityScore}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-purple-600">
                                {deputy.activityScore}%
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {deputy.achievements.map((ach, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                                >
                                  {ach}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "events" && (
                <div className="space-y-6">
                  {selectedClub.events.map((event) => (
                    <div
                      key={event.id}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-bold text-gray-900">
                          {event.title}
                        </h4>
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                          {event.participants} ishtirokchi
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        📅{" "}
                        {new Date(event.date).toLocaleDateString("uz-UZ", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "achievements" && (
                <div className="space-y-6">
                  {selectedClub.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-bold text-gray-900">
                          {achievement.title}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            achievement.category === "competition"
                              ? "bg-yellow-500 text-white"
                              : achievement.category === "project"
                              ? "bg-blue-500 text-white"
                              : achievement.category === "social"
                              ? "bg-green-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {achievement.category === "competition"
                            ? "🏆 Musobaqa"
                            : achievement.category === "project"
                            ? "💼 Loyiha"
                            : achievement.category === "social"
                            ? "🤝 Ijtimoiy"
                            : "⭐ Boshqa"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        📅{" "}
                        {new Date(achievement.date).toLocaleDateString(
                          "uz-UZ",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <p className="text-gray-700">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              So'nggi faoliyat
            </h3>
            <div className="space-y-4">
              {selectedClub.recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === "event"
                        ? "bg-green-100 text-green-600"
                        : activity.type === "meeting"
                        ? "bg-blue-100 text-blue-600"
                        : activity.type === "achievement"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {activity.type === "event"
                      ? "📅"
                      : activity.type === "meeting"
                      ? "👥"
                      : activity.type === "achievement"
                      ? "🏆"
                      : "📌"}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">
                      {new Date(activity.date).toLocaleDateString("uz-UZ")}
                    </div>
                    <div className="text-gray-900">{activity.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Clubs Grid View (Dashboard)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      {/*Navbar*/}
      <header className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="../../public/"
              alt="TSUE / TDIU Logo"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                TSUE Klublar Dashboard
              </h1>
            </div>
          </div>

          <div className="flex-1 px-4 hidden ">
            <label htmlFor="club-search" className="sr-only">
              Klublarni qidiring
            </label>
            <div className="relative">
              <input
                id="club-search"
                type="search"
                placeholder="Klub yoki tadbirni qidiring..."
                className="w-full rounded-lg border bg-gray-50 py-2 pl-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-blue-500">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {clubsData.length}
            </div>
            <div className="text-gray-600 font-medium">Faol klublar</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-green-500">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {clubsData.reduce(
                (sum, club) => sum + club.stats.totalMembers,
                0
              )}
            </div>
            <div className="text-gray-600 font-medium">Jami a'zolar</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-purple-500">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {clubsData.reduce((sum, club) => sum + club.stats.eventsHeld, 0)}
            </div>
            <div className="text-gray-600 font-medium">Tadbirlar</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-orange-500">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {clubsData.reduce(
                (sum, club) => sum + club.stats.achievementsCount,
                0
              )}
            </div>
            <div className="text-gray-600 font-medium">Yutuqlar</div>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubsData.map((club) => (
            <div
              key={club.id}
              onClick={() => setSelectedClub(club)}
              className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Club Header with Gradient */}
              <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {club.name}
                  </h3>
                </div>
              </div>

              {/* Club Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {club.description}
                </p>

                {/* Leader Info */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="text-xs text-blue-600 font-semibold mb-1">
                    RAHBAR
                  </div>
                  <div className="font-medium text-gray-900">
                    {club.leader.name}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {club.stats.totalMembers}
                    </div>
                    <div className="text-xs text-gray-600">A'zolar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {club.stats.eventsHeld}
                    </div>
                    <div className="text-xs text-gray-600">Tadbirlar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {club.stats.achievementsCount}
                    </div>
                    <div className="text-xs text-gray-600">Yutuqlar</div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all">
                  Batafsil ko'rish →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add More Clubs Placeholder */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4">➕</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Ko'proq klublar
          </h3>
          <p className="text-gray-600">
            Qolgan klublar ma'lumotlari tez orada qo'shiladi
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubsDashboard;
