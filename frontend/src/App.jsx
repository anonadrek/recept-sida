import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/recipes";

const emptyForm = { title: "", description: "", ingredients: "", instructions: "", cooking_time: "" };

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    const res = await axios.get(API);
    setRecipes(res.data);
  };

  useEffect(() => { fetchRecipes(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = { ...form, cooking_time: form.cooking_time ? Number(form.cooking_time) : null };
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, payload);
      } else {
        await axios.post(API, payload);
      }
      setForm(emptyForm);
      setEditId(null);
      fetchRecipes();
    } catch (err) {
      setError("Något gick fel. Kontrollera fälten.");
    }
  };

  const handleEdit = (recipe) => {
    setEditId(recipe.id);
    setForm({ title: recipe.title, description: recipe.description || "", ingredients: recipe.ingredients, instructions: recipe.instructions, cooking_time: recipe.cooking_time || "" });
    setSelected(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    if (selected?.id === id) setSelected(null);
    fetchRecipes();
  };

  const handleView = async (id) => {
    const res = await axios.get(`${API}/${id}`);
    setSelected(res.data);
    setEditId(null);
    setForm(emptyForm);
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <h1>🍽️ Receptdatabas</h1>

      {/* Form */}
      <div style={{ background: "#f5f5f5", padding: "1.5rem", borderRadius: 8, marginBottom: "2rem" }}>
        <h2>{editId ? "Redigera recept" : "Lägg till recept"}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label>Titel *</label><br />
              <input name="title" value={form.title} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label>Tillagningstid (min)</label><br />
              <input name="cooking_time" type="number" value={form.cooking_time} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label>Beskrivning</label><br />
              <input name="description" value={form.description} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label>Ingredienser *</label><br />
              <textarea name="ingredients" value={form.ingredients} onChange={handleChange} required rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label>Instruktioner *</label><br />
              <textarea name="instructions" value={form.instructions} onChange={handleChange} required rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <button type="submit" style={btnStyle("#2d6a4f")}>
              {editId ? "Spara ändringar" : "Lägg till"}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setForm(emptyForm); }} style={btnStyle("#888")}>
                Avbryt
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Recipe list */}
        <div>
          <h2>Alla recept ({recipes.length})</h2>
          {recipes.length === 0 && <p style={{ color: "#888" }}>Inga recept ännu.</p>}
          {recipes.map((r) => (
            <div key={r.id} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: "1rem", marginBottom: "0.75rem" }}>
              <strong>{r.title}</strong>
              {r.cooking_time && <span style={{ marginLeft: 8, color: "#888", fontSize: 13 }}>⏱ {r.cooking_time} min</span>}
              <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                <button onClick={() => handleView(r.id)} style={btnStyle("#4a90d9", "small")}>Visa</button>
                <button onClick={() => handleEdit(r)} style={btnStyle("#f0a500", "small")}>Redigera</button>
                <button onClick={() => handleDelete(r.id)} style={btnStyle("#d9534f", "small")}>Ta bort</button>
              </div>
            </div>
          ))}
        </div>

        {/* Detail view */}
        <div>
          {selected && (
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: "1.5rem" }}>
              <h2>{selected.title}</h2>
              {selected.cooking_time && <p>⏱ {selected.cooking_time} minuter</p>}
              {selected.description && <p style={{ color: "#555" }}>{selected.description}</p>}
              <h3>Ingredienser</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{selected.ingredients}</p>
              <h3>Instruktioner</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{selected.instructions}</p>
              <button onClick={() => setSelected(null)} style={btnStyle("#888", "small")}>Stäng</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc", boxSizing: "border-box", fontSize: 14 };
const btnStyle = (color, size) => ({
  background: color, color: "#fff", border: "none", borderRadius: 4,
  padding: size === "small" ? "0.3rem 0.7rem" : "0.6rem 1.2rem",
  cursor: "pointer", fontSize: size === "small" ? 13 : 14
});
