import { useState, useEffect } from "react";
import { createClient } from "@insforge/sdk";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const INSFORGE_URL = import.meta.env.VITE_INSFORGE_URL || "https://6w3sgde5.us-east.insforge.app";
const INSFORGE_ANON_KEY = import.meta.env.VITE_INSFORGE_ANON_KEY || "ik_70965bdd4ef84eae1800692c1cdf68fd";
const supabase = createClient({ baseUrl: INSFORGE_URL, anonKey: INSFORGE_ANON_KEY });

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.database
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();
      if (data) setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Post no encontrado</h1>
      <Link to="/blog" className="text-blue-600 hover:underline">Volver al blog</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver a artículos
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex items-center text-slate-500 mb-8 pb-8 border-b border-slate-100">
              <span>Publicado el {new Date(post.created_at).toLocaleDateString()}</span>
            </div>

            {post.image_url && (
              <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-sm border border-slate-100">
                <img src={post.image_url} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            )}
            
            {/* The dangerouslySetInnerHTML is required because quill saves HTML */}
            <div 
              className="prose prose-lg prose-slate max-w-none 
                         prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800
                         prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
