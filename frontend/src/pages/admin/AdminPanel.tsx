import React, { useState } from "react";

type TabType = "overview" | "clubs" | "members" | "events" | "settings";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  // Login handler (demo - replace with real auth)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin" && loginForm.password === "admin") {
      setIsAuthenticated(true);
    } else {
      alert("Noto'g'ri login yoki parol");
    }
  };

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600">TSUE Klublar boshqaruvi</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foydalanuvchi nomi
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parol
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all"
            >
              Kirish
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Demo: admin / admin
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              TSUE Klublar Admin
            </h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Chiqish
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-screen sticky top-0 border-r">
          <nav className="p-4 space-y-2">
            {[
              { id: "overview", label: "Dashboard", icon: "📊" },
              { id: "clubs", label: "Klublar", icon: "🏛️" },
              { id: "members", label: "A'zolar", icon: "👥" },
              { id: "events", label: "Tadbirlar", icon: "📅" },
              { id: "settings", label: "Sozlamalar", icon: "⚙️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "clubs" && <ClubsManagementTab />}
          {activeTab === "members" && <MembersTab />}
          {activeTab === "events" && <EventsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
};

// Overview Tab
const OverviewTab = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

    {/* Stats Grid */}
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
        <div className="text-sm text-gray-600 mb-1">Jami klublar</div>
        <div className="text-3xl font-bold text-gray-900">22</div>
        <div className="text-xs text-green-600 mt-2">↑ 2 yangi</div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
        <div className="text-sm text-gray-600 mb-1">Jami a'zolar</div>
        <div className="text-3xl font-bold text-gray-900">1,247</div>
        <div className="text-xs text-green-600 mt-2">↑ 34 yangi</div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
        <div className="text-sm text-gray-600 mb-1">Oy tadbirlari</div>
        <div className="text-3xl font-bold text-gray-900">18</div>
        <div className="text-xs text-blue-600 mt-2">5 rejalashtirilgan</div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
        <div className="text-sm text-gray-600 mb-1">Faol ro'yxatlar</div>
        <div className="text-3xl font-bold text-gray-900">67</div>
        <div className="text-xs text-orange-600 mt-2">Ko'rib chiqish kerak</div>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">So'nggi faoliyat</h3>
      <div className="space-y-3">
        {[
          {
            time: "10 daqiqa oldin",
            text: "IT Club - yangi tadbir qo'shildi",
            type: "event",
          },
          {
            time: "1 soat oldin",
            text: "5 ta yangi ro'yxatdan o'tish",
            type: "registration",
          },
          {
            time: "2 soat oldin",
            text: "Zakovat klubi - a'zo ma'lumotlari yangilandi",
            type: "update",
          },
          {
            time: "Bugun 09:30",
            text: "Sport Club - yangi yutuq qo'shildi",
            type: "achievement",
          },
        ].map((activity, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                activity.type === "event"
                  ? "bg-blue-500"
                  : activity.type === "registration"
                  ? "bg-green-500"
                  : activity.type === "update"
                  ? "bg-purple-500"
                  : "bg-orange-500"
              }`}
            ></div>
            <div className="flex-1">
              <div className="text-gray-900">{activity.text}</div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Clubs Management Tab
const ClubsManagementTab = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          Klublarni boshqarish
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          + Yangi klub
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Yangi klub qo'shish
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Klub nomi"
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Telegram"
              className="px-4 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Tavsif"
              className="col-span-2 px-4 py-2 border rounded-lg"
              rows={3}
            ></textarea>
            <div className="col-span-2 flex gap-3">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Saqlash
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clubs Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Klub
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Rahbar
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                A'zolar
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {["IT Club", "Zakovat", "Art Club", "Sport Club"].map(
              (club, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {club}
                  </td>
                  <td className="px-6 py-4 text-gray-600">Rahbar {idx + 1}</td>
                  <td className="px-6 py-4 text-gray-600">{50 + idx * 20}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Faol
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded">
                        Tahrirlash
                      </button>
                      <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded">
                        O'chirish
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Members Tab
const MembersTab = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">A'zolarni monitoring</h2>

    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Qidirish..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select className="px-4 py-2 border rounded-lg">
          <option>Barcha klublar</option>
          <option>IT Club</option>
          <option>Zakovat</option>
        </select>
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="font-semibold text-gray-900">A'zo {i}</div>
              <div className="text-sm text-gray-600">IT Club • 85% faollik</div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                Profil
              </button>
              <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                Baholash
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Events Tab
const EventsTab = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">Tadbirlarni boshqarish</h2>
    <div className="text-gray-600">Tadbirlar tizimi ishlab chiqilmoqda...</div>
  </div>
);

// Settings Tab
const SettingsTab = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">Sozlamalar</h2>
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Universitet nomi
          </label>
          <input
            type="text"
            defaultValue="Toshkent davlat iqtisodiyot universiteti"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin email
          </label>
          <input
            type="email"
            defaultValue="admin@tsue.uz"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Saqlash
        </button>
      </div>
    </div>
  </div>
);

export default AdminPanel;
