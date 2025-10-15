import React, { useEffect, useState } from "react";
import sampleClubs from "./sampleClubs";
import { createClient } from "@supabase/supabase-js";

// ✅ TO‘G‘RI SUPABASE MA’LUMOTLARINI KIRIT
const supabaseUrl = "https://baockrrdriayusqpeeqw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhb2NrcnJkcmlheXVzcXBlZXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMTU5OTksImV4cCI6MjA3NDc5MTk5OX0.0bnIuVbwD-rFNX0acXhtNiofi6slJJTAohaEHTPsjP4";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type FormData = {
  clubId: number | null;
  name: string;
  faculty: string;
  course: string;
  phone: string;
  notes: string;
};

export const App: React.FC = () => {
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

  // ✅ Supabase orqali ma'lumot yuborish
  const submit = async () => {
    if (!form.clubId || !form.name) {
      setStatus("Iltimos, klub va ismingizni kiriting.");
      return;
    }
    setStatus("Yuborilmoqda...");

    const clubName = sampleClubs.find((c) => c.id === form.clubId)?.name;

    try {
      const { data, error } = await supabase.from("registrations").insert([
        {
          club: clubName,
          name: form.name,
          faculty: form.faculty,
          course: form.course,
          phone: form.phone,
          notes: form.notes,
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Yangi ma'lumot:", data);
      setStatus("✅ Muvaffaqiyatli yuborildi!");
      setForm({
        clubId: null,
        name: "",
        faculty: "",
        course: "",
        phone: "",
        notes: "",
      });
    } catch (err) {
      console.error("Xato:", err);
      setStatus("❌ Xato: yuborilmadi.");
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
      <div className="container">
        <header>
          <h1>TSUE Clubs — Registration</h1>
          <p className="lead">
            Assalomu alaykum! Bu Toshkent davlat iqtisodiyot universitetining
            klublarini ro'yxatdan o'tkazish uchun sayt.
          </p>
        </header>

        <section id="react-ui" className="main-card">
          <div className="left">
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
            <input
              id="name"
              type="text"
              placeholder="Ism Familiya"
              value={form.name}
              onChange={handleChange("name")}
            />

            <label htmlFor="fak">Fakultet</label>
            <input
              id="fak"
              type="text"
              placeholder="Fakultet"
              value={form.faculty}
              onChange={handleChange("faculty")}
            />

            <label htmlFor="kurs">Kurs</label>
            <input
              id="kurs"
              type="text"
              placeholder="Kurs"
              value={form.course}
              onChange={handleChange("course")}
            />

            <label htmlFor="phone">Telefon (+998...)</label>
            <input
              id="phone"
              type="number"
              placeholder="+99890xxxxxxx"
              value={form.phone}
              onChange={handleChange("phone")}
            />

            <label htmlFor="notes">Qiziqishlar (ixtiyoriy)</label>
            <input
              id="notes"
              type="text"
              placeholder="Qiziqishlaringiz (ixtiyoriy)"
              value={form.notes}
              onChange={handleChange("notes")}
            />

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

          <aside className="right">
            <img src="/TDIU-logo.png" alt="TDIU" />
          </aside>
        </section>
      </div>
    </div>
  );
};
