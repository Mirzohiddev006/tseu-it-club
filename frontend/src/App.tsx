import React, { useEffect, useState } from "react";
import sampleClubs from "./sampleClubs";
import { Club } from "./types";

type FormData = {
  clubId: number | null;
  name: string;
  faculty: string;
  course: string;
  phone: string;
  notes: string;
};

const App: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    clubId: null,
    name: "",
    faculty: "",
    course: "",
    phone: "",
    notes: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange =
    (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((s) => ({
        ...s,
        [k]: k === "clubId" ? Number(e.target.value) : e.target.value,
      }));

  const submit = async () => {
    if (!form.clubId || !form.name) {
      setStatus("Iltimos, klub va ismingizni kiriting.");
      return;
    }
    setStatus("Yuborilmoqda...");
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          club: sampleClubs.find((c) => c.id === form.clubId)?.name,
          ...form,
        }),
      });
      setStatus("Muvaffaqiyatli yuborildi.");
      setForm({
        clubId: null,
        name: "",
        faculty: "",
        course: "",
        phone: "",
        notes: "",
      });
    } catch (err) {
      setStatus("Xato: yuborilmadi.");
    }
  };

  useEffect(() => {
    const staticUi = document.getElementById("static-ui");
    if (staticUi) staticUi.style.display = "none";
    return () => {
      if (staticUi) staticUi.style.display = "";
    };
  }, []);

  return (
    <div className="wrap">
      <video
        className="bg-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/image.png"
      >
        <source src="/movie.MOV" type="video/quicktime" />
      </video>

      <div className="container">
        <header>
          <h1>TSUE Clubs — Registration</h1>
          <p className="lead">
            Assalomu alaykum! Bu Toshkent davlat iqtisodiyot universitetining
            klublarini ro'yxatdan o'tkazish uchun sayt. Marhamat klubni tanlang
            va ro'yxatdan o'ting.
          </p>
        </header>

        <section id="react-ui" className="main-card">
          <div className="left" role="region" aria-label="Ro'yxat tafsilotlari">
            <label htmlFor="club">Klub</label>
            <div className="field">
              <select
                id="club"
                name="club"
                value={form.clubId ?? ""}
                onChange={handleChange("clubId")}
              >
                <option value="">— Klub tanlang —</option>
                {sampleClubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <label htmlFor="name">Ism Familiya</label>
            <div className="field">
              <input
                id="name"
                type="text"
                placeholder="Ism Familiya"
                value={form.name}
                onChange={handleChange("name")}
              />
            </div>

            <label htmlFor="fak">Fakultet</label>
            <div className="field small">
              <input
                id="fak"
                type="text"
                placeholder="Fakultet"
                value={form.faculty}
                onChange={handleChange("faculty")}
              />
            </div>

            <label htmlFor="kurs">Kurs</label>
            <div className="field small">
              <input
                id="kurs"
                type="text"
                placeholder="Kurs"
                value={form.course}
                onChange={handleChange("course")}
              />
            </div>

            <label htmlFor="phone">Telefon (+998...)</label>
            <div className="field">
              <input
                id="phone"
                type="number"
                placeholder="+99890xxxxxxx"
                value={form.phone}
                onChange={handleChange("phone")}
              />
            </div>

            <label htmlFor="notes">Qiziqishlar (ixtiyoriy)</label>
            <div className="field">
              <input
                id="notes"
                type="text"
                placeholder="Qiziqishlaringiz (ixtiyoriy)"
                value={form.notes}
                onChange={handleChange("notes")}
              />
            </div>

            <div style={{ marginTop: 14 }}>
              <button className="btn" type="button" onClick={submit}>
                Ro'yxatdan o'tish
              </button>
              {status && (
                <div
                  style={{ marginTop: 8 }}
                  className="text-sm text-slate-700"
                >
                  {status}
                </div>
              )}
            </div>
          </div>

          <aside className="right" aria-hidden="true">
            <img src="/TDIU-logo.png" alt="TDIU" />
          </aside>
        </section>
      </div>
    </div>
  );
};

export default App;
