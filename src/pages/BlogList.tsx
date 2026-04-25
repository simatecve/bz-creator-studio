import { useState, useEffect } from "react";
import { createClient } from "@insforge/sdk";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const INSFORGE_URL = import.meta.env.VITE_INSFORGE_URL || "https://6w3sgde5.us-east.insforge.app";
const INSFORGE_ANON_KEY = import.meta.env.VITE_INSFORGE_ANON_KEY || "ik_70965bdd4ef84eae1800692c1cdf68fd";
const supabase = createClient({ baseUrl: INSFORGE_URL, anonKey: INSFORGE_ANON_KEY });

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.database
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Nuestro Blog</h1>
        
        {posts.length === 0 ? (
          <p className="text-center text-slate-500">Pronto publicaremos nuevos artículos.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-100 flex flex-col group">
                <div className="h-48 bg-slate-200 overflow-hidden relative">
                  {post.image_url ? (
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">Sin Imagen</div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-sm text-blue-600 font-medium mb-2">{new Date(post.created_at).toLocaleDateString()}</span>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-slate-500 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + "..." }}></p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
