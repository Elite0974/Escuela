import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const SEED_POSTS = [
  {
    id: "p1",
    type: "quote",
    title: "No necesitas ganas para empezar.",
    body: "Empieza pequeño. La motivación muchas veces aparece después de dar el primer paso.",
    author: "Impulso",
    category: "Disciplina",
    tag: "#PrimerPaso",
    likes: 12400,
    comments: 186,
    accent: "violet"
  },
  {
    id: "p2",
    type: "video",
    title: "Un mal día no define tu carrera.",
    body: "Respira. Resuelve una cosa. Después otra. No tienes que arreglar toda tu vida hoy.",
    author: "Marina",
    category: "Trabajo",
    tag: "#DíaDifícil",
    likes: 8700,
    comments: 93,
    accent: "sunset",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "p3",
    type: "quote",
    title: "Tu progreso también cuenta cuando nadie lo ve.",
    body: "Hay avances silenciosos que solo notarás cuando mires hacia atrás.",
    author: "Leo",
    category: "Progreso",
    tag: "#Sigue",
    likes: 6300,
    comments: 61,
    accent: "ocean"
  },
  {
    id: "p4",
    type: "quote",
    title: "Hazlo imperfecto, pero hazlo.",
    body: "La acción imperfecta suele llevarte más lejos que esperar el momento perfecto.",
    author: "Impulso",
    category: "Productividad",
    tag: "#Hecho",
    likes: 15800,
    comments: 247,
    accent: "mint"
  },
  {
    id: "p5",
    type: "video",
    title: "Cuando no tengas energía, reduce el objetivo.",
    body: "No necesitas dar el 100%. A veces un 10% consistente es exactamente lo que necesitas.",
    author: "Sofía",
    category: "Energía",
    tag: "#Constancia",
    likes: 9400,
    comments: 132,
    accent: "rose",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  }
];

const CATEGORIES = ["Para ti", "Trabajo", "Disciplina", "Progreso", "Productividad", "Energía"];

function loadJSON(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function Icon({ name }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    heart: <path d="M20.8 8.9c0 5.1-8.8 10.1-8.8 10.1S3.2 14 3.2 8.9A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.7Z"/>,
    bookmark: <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z"/>,
    share: <><circle cx="18" cy="5" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="19" r="2"/><path d="m8 11 8-5M8 13l8 5"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    spark: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M5 21a7 7 0 0 1 14 0"/></>,
    play: <path d="m9 6 10 6-10 6V6Z"/>,
    x: <><path d="m6 6 12 12M18 6 6 18"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>
  };

  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function App() {
  const [posts, setPosts] = useState(() => loadJSON("impulso_posts", SEED_POSTS));
  const [liked, setLiked] = useState(() => loadJSON("impulso_liked", []));
  const [saved, setSaved] = useState(() => loadJSON("impulso_saved", []));
  const [activeCategory, setActiveCategory] = useState("Para ti");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [boostId, setBoostId] = useState(null);

  useEffect(() => localStorage.setItem("impulso_posts", JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem("impulso_liked", JSON.stringify(liked)), [liked]);
  useEffect(() => localStorage.setItem("impulso_saved", JSON.stringify(saved)), [saved]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryOk = activeCategory === "Para ti" || post.category === activeCategory;
      const query = search.trim().toLowerCase();
      const searchOk =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query);
      const savedOk = !showSaved || saved.includes(post.id);
      return categoryOk && searchOk && savedOk;
    });
  }, [posts, activeCategory, search, showSaved, saved]);

  const toggleLike = (id) => {
    setLiked((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const toggleSave = (id) => {
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const randomMotivation = () => {
    const id = posts[Math.floor(Math.random() * posts.length)]?.id;
    if (!id) return;
    setBoostId(id);
    setShowSaved(false);
    setActiveCategory("Para ti");
    setTimeout(() => document.getElementById(`post-${id}`)?.scrollIntoView({ behavior: "smooth" }), 50);
    setTimeout(() => setBoostId(null), 1400);
  };

  const addPost = (newPost) => {
    setPosts((current) => [newPost, ...current]);
    setShowCreate(false);
    setActiveCategory("Para ti");
    setShowSaved(false);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" onClick={() => { setActiveCategory("Para ti"); setShowSaved(false); setShowProfile(false); }}>
          <div className="brand-mark">↗</div>
          <div>
            <strong>Impulso</strong>
            <span>motivación laboral</span>
          </div>
        </div>

        <div className="search-box">
          <Icon name="search" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar motivación..."
            aria-label="Buscar"
          />
        </div>

        <div className="top-actions">
          <button className="ghost-button" onClick={randomMotivation}>
            <Icon name="spark" />
            <span>Necesito motivación</span>
          </button>
          <button className="icon-button" onClick={() => setShowSaved(true)} aria-label="Guardados">
            <Icon name="bookmark" />
          </button>
          <button className="avatar" onClick={() => setShowProfile(true)} aria-label="Perfil">M</button>
        </div>
      </header>

      <main className="content">
        <section className="hero">
          <div>
            <p className="eyebrow">UN PEQUEÑO IMPULSO</p>
            <h1>No necesitas sentirte motivado para <span>seguir avanzando.</span></h1>
            <p className="hero-copy">
              Frases, ideas y videos breves para esos días en los que el trabajo pesa un poco más.
            </p>
          </div>
          <button className="hero-cta" onClick={randomMotivation}>
            Dame un impulso <span>↗</span>
          </button>
        </section>

        <div className="category-row" role="tablist">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={activeCategory === category && !showSaved ? "category active" : "category"}
              onClick={() => { setActiveCategory(category); setShowSaved(false); }}
            >
              {category}
            </button>
          ))}
          <button
            className={showSaved ? "category active" : "category"}
            onClick={() => setShowSaved(true)}
          >
            <Icon name="bookmark" /> Guardados
          </button>
        </div>

        {showSaved && (
          <div className="filter-note">
            <span>Mostrando tus publicaciones guardadas</span>
            <button onClick={() => setShowSaved(false)}><Icon name="x" /></button>
          </div>
        )}

        <section className="feed" aria-label="Feed de motivación">
          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✦</div>
              <h2>No encontramos nada todavía.</h2>
              <p>Prueba otra búsqueda o crea tu propio mensaje.</p>
              <button className="hero-cta small" onClick={() => setShowCreate(true)}>Crear publicación</button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isLiked={liked.includes(post.id)}
                isSaved={saved.includes(post.id)}
                isBoosted={boostId === post.id}
                onLike={() => toggleLike(post.id)}
                onSave={() => toggleSave(post.id)}
              />
            ))
          )}
        </section>
      </main>

      <nav className="mobile-nav">
        <button onClick={() => { setShowSaved(false); setActiveCategory("Para ti"); }} className={!showSaved ? "active" : ""}>
          <Icon name="home" /><span>Inicio</span>
        </button>
        <button onClick={() => setShowCreate(true)}>
          <span className="mobile-plus"><Icon name="plus" /></span><span>Crear</span>
        </button>
        <button onClick={() => setShowSaved(true)} className={showSaved ? "active" : ""}>
          <Icon name="bookmark" /><span>Guardados</span>
        </button>
        <button onClick={() => setShowProfile(true)}>
          <Icon name="user" /><span>Perfil</span>
        </button>
      </nav>

      <button className="floating-create" onClick={() => setShowCreate(true)} aria-label="Crear publicación">
        <Icon name="plus" />
      </button>

      {showCreate && <CreateModal onClose={() => setShowCreate(false)} onCreate={addPost} />}
      {showProfile && <ProfileModal posts={posts} liked={liked} saved={saved} onClose={() => setShowProfile(false)} />}
    </div>
  );
}

function PostCard({ post, isLiked, isSaved, isBoosted, onLike, onSave }) {
  const likes = post.likes + (isLiked ? 1 : 0);

  return (
    <article id={`post-${post.id}`} className={`post-card ${isBoosted ? "boosted" : ""}`}>
      <div className={`post-visual ${post.accent}`}>
        {post.type === "video" ? (
          <video className="post-video" src={post.video} controls playsInline preload="metadata" />
        ) : (
          <>
            <div className="quote-watermark">“</div>
            <div className="quote-content">
              <span className="quote-label">PARA RECORDAR</span>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </>
        )}

        <div className="visual-chip">{post.category}</div>

        <div className="side-actions">
          <ActionButton active={isLiked} icon="heart" label={formatNumber(likes)} onClick={onLike} />
          <ActionButton active={isSaved} icon="bookmark" label="Guardar" onClick={onSave} />
          <ActionButton icon="share" label="Compartir" onClick={() => navigator.clipboard?.writeText(post.title)} />
        </div>
      </div>

      <div className="post-meta">
        <div className="author-row">
          <div className="mini-avatar">{post.author.charAt(0).toUpperCase()}</div>
          <div>
            <strong>{post.author}</strong>
            <span>{post.tag} · {formatNumber(post.comments)} comentarios</span>
          </div>
        </div>
        <button className="follow-button">+ Seguir</button>
      </div>
    </article>
  );
}

function ActionButton({ active, icon, label, onClick }) {
  return (
    <button className={`side-action ${active ? "active" : ""}`} onClick={onClick}>
      <span className="action-circle"><Icon name={icon} /></span>
      <small>{label}</small>
    </button>
  );
}

function CreateModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "Trabajo",
    author: "Tú"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;

    onCreate({
      id: `user-${Date.now()}`,
      type: "quote",
      title: form.title.trim(),
      body: form.body.trim(),
      author: form.author.trim() || "Tú",
      category: form.category,
      tag: `#${form.category.replace(/\s+/g, "")}`,
      likes: 0,
      comments: 0,
      accent: ["violet", "ocean", "mint", "rose", "sunset"][Math.floor(Math.random() * 5)]
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">COMPARTE TU IMPULSO</span>
            <h2>Crear publicación</h2>
          </div>
          <button className="icon-button" onClick={onClose}><Icon name="x" /></button>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <label>
            Tu nombre
            <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          </label>
          <label>
            Frase o título
            <input
              value={form.title}
              maxLength={90}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Ej. Haz una cosa importante y descansa."
              required
            />
          </label>
          <label>
            Mensaje
            <textarea
              value={form.body}
              maxLength={220}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Escribe algo que te habría gustado escuchar en un día difícil..."
              required
            />
          </label>
          <label>
            Categoría
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.filter((x) => x !== "Para ti").map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <button className="submit-button" type="submit">Publicar mi impulso ↗</button>
        </form>
      </div>
    </div>
  );
}

function ProfileModal({ posts, liked, saved, onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal profile-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">TU ESPACIO</span>
            <h2>Mi perfil</h2>
          </div>
          <button className="icon-button" onClick={onClose}><Icon name="x" /></button>
        </div>

        <div className="profile-head">
          <div className="profile-avatar">M</div>
          <div>
            <h3>Mi espacio de impulso</h3>
            <p>Pequeños pasos, todos los días.</p>
          </div>
        </div>

        <div className="stats-grid">
          <div><strong>{posts.filter(p => p.id.startsWith("user-")).length}</strong><span>publicaciones</span></div>
          <div><strong>{liked.length}</strong><span>me gusta</span></div>
          <div><strong>{saved.length}</strong><span>guardados</span></div>
        </div>

        <div className="profile-tip">
          <Icon name="spark" />
          <div>
            <strong>Tu recordatorio</strong>
            <p>No tienes que avanzar rápido. Solo evita quedarte quieto demasiado tiempo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatNumber(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace(".0", "")}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(".0", "")}K`;
  return value;
}

createRoot(document.getElementById("root")).render(<App />);
