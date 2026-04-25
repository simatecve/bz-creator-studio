import { useState, useEffect } from "react";
import { createClient } from "@insforge/sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Settings, LogOut, Plus, Trash2, Edit, ExternalLink } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const INSFORGE_URL = import.meta.env.VITE_INSFORGE_URL || "https://6w3sgde5.us-east.insforge.app";
const INSFORGE_ANON_KEY = import.meta.env.VITE_INSFORGE_ANON_KEY || "ik_70965bdd4ef84eae1800692c1cdf68fd";
const supabase = createClient({ baseUrl: INSFORGE_URL, anonKey: INSFORGE_ANON_KEY });

const chartData = [
  { name: 'Lun', vistas: 120 },
  { name: 'Mar', vistas: 200 },
  { name: 'Mie', vistas: 150 },
  { name: 'Jue', vistas: 280 },
  { name: 'Vie', vistas: 350 },
  { name: 'Sab', vistas: 450 },
  { name: 'Dom', vistas: 600 },
];

export default function AdminDashboard() {
  const [view, setView] = useState<"dashboard" | "posts" | "editor">("dashboard");
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  // Editor states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [metaDesc, setMetaDesc] = useState("");
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.database.from('posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas borrar este post?")) return;
    const { error } = await supabase.database.from('posts').delete().eq('id', id);
    if (error) toast.error("Error al borrar el post");
    else {
      toast.success("Post borrado");
      fetchPosts();
    }
  };

  const handleEdit = (post: any) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setMetaDesc(post.meta_description || "");
    setKeywords(post.keywords || "");
    setView("editor");
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setMetaDesc("");
    setKeywords("");
    setFile(null);
    setView("editor");
  };

  const handleSavePost = async () => {
    try {
      let imageUrl = "";
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('blog_images').upload(fileName, file);
        if (uploadError) {
          console.error("Upload error:", uploadError);
          return toast.error("Error al subir imagen: " + uploadError.message);
        }
        const result = supabase.storage.from('blog_images').getPublicUrl(fileName);
        // Supabase returns { data: { publicUrl: string } }, but let's handle variations just in case
        imageUrl = result?.data?.publicUrl || result?.publicURL || (typeof result === 'string' ? result : "");
      }

      const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      
      const postData: any = { 
        title, 
        content, 
        slug, 
        published: true,
        meta_description: metaDesc,
        keywords: keywords 
      };
      if (imageUrl) postData.image_url = imageUrl;

      let error;
      if (editingId) {
        const res = await supabase.database.from('posts').update(postData).eq('id', editingId);
        error = res.error;
      } else {
        const res = await supabase.database.from('posts').insert([postData]);
        error = res.error;
      }

      if (error) {
        console.error("DB Error:", error);
        toast.error("Error guardando el post: " + error.message);
      } else {
        toast.success(editingId ? "Post actualizado" : "Post creado exitosamente");
        setView("posts");
        fetchPosts();
      }
    } catch (err: any) {
      console.error("Fatal error saving post:", err);
      toast.error("Error crítico guardando: " + (err.message || "Desconocido"));
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">BZ CMS</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setView("dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${view === "dashboard" ? "bg-slate-800 text-white" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setView("posts")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${(view === "posts" || view === "editor") ? "bg-slate-800 text-white" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <FileText size={20} />
            <span>Posts</span>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-red-400 hover:text-red-300">
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          
          {/* Dashboard View */}
          {view === "dashboard" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-3xl font-bold text-slate-800">Resumen General</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h3 className="text-slate-500 font-medium">Total de Posts</h3>
                  <p className="text-4xl font-bold text-slate-800 mt-2">{posts.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h3 className="text-slate-500 font-medium">Vistas esta semana</h3>
                  <p className="text-4xl font-bold text-slate-800 mt-2">2,150</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Tráfico de los últimos 7 días</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="vistas" stroke="#0f172a" strokeWidth={3} dot={{ r: 4, fill: '#0f172a' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Posts View */}
          {view === "posts" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-800">Tus Posts</h2>
                <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2" size={20} /> Nuevo Post
                </Button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                {posts.length === 0 ? (
                  <div className="p-12 text-center text-slate-500">No tienes posts aún. ¡Crea el primero!</div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                      <tr>
                        <th className="p-4 font-semibold">Título</th>
                        <th className="p-4 font-semibold">Fecha</th>
                        <th className="p-4 font-semibold text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {posts.map(post => (
                        <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 text-slate-800 font-medium">{post.title}</td>
                          <td className="p-4 text-slate-500">{new Date(post.created_at).toLocaleDateString()}</td>
                          <td className="p-4 text-right space-x-2">
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <Button variant="outline" size="icon" title="Ver Post">
                                <ExternalLink size={16} className="text-blue-600" />
                              </Button>
                            </Link>
                            <Button variant="outline" size="icon" onClick={() => handleEdit(post)} title="Editar">
                              <Edit size={16} className="text-slate-600" />
                            </Button>
                            <Button variant="outline" size="icon" className="hover:bg-red-50 hover:text-red-600 hover:border-red-200" onClick={() => handleDelete(post.id)} title="Borrar">
                              <Trash2 size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* Editor View */}
          {view === "editor" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-800">
                  {editingId ? "Editar Post" : "Crear Nuevo Post"}
                </h2>
                <Button variant="outline" onClick={() => setView("posts")}>Cancelar</Button>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Título del Post</label>
                  <Input 
                    placeholder="Escribe un título impactante..." 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="text-lg px-4 py-6 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl shadow-sm transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Imagen Principal</label>
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => setFile(e.target.files?.[0] || null)} 
                    className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-slate-50 border-slate-200 text-slate-900 h-auto rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Meta Descripción (SEO)</label>
                  <Input 
                    placeholder="Resumen corto del post para Google (max 160 caracteres)..." 
                    value={metaDesc} 
                    onChange={e => setMetaDesc(e.target.value)} 
                    maxLength={160}
                    className="text-sm px-4 py-3 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl shadow-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Palabras Clave (SEO)</label>
                  <Input 
                    placeholder="Ejemplo: marketing, diseño, redes sociales (separadas por coma)..." 
                    value={keywords} 
                    onChange={e => setKeywords(e.target.value)} 
                    className="text-sm px-4 py-3 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl shadow-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Contenido</label>
                  {/* Aquí solucionamos el problema del color del texto envolviéndolo en un contenedor que fuerza el color oscuro */}
                  <div className="text-slate-900 [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-slate-900 [&_.ql-container]:border-slate-200 [&_.ql-toolbar]:border-slate-200 [&_.ql-toolbar]:bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                    <ReactQuill 
                      theme="snow" 
                      value={content} 
                      onChange={setContent}
                      placeholder="Escribe el contenido de tu post aquí..."
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button onClick={handleSavePost} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-12 text-lg">
                    {editingId ? "Actualizar Post" : "Publicar Post"}
                  </Button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
