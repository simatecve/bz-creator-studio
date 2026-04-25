import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createClient } from "@insforge/sdk";

const supabase = createClient({ baseUrl: import.meta.env.VITE_INSFORGE_URL, anonKey: import.meta.env.VITE_INSFORGE_ANON_KEY });

export default function AdminPostEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    let imageUrl = "";
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage.from('blog_images').upload(fileName, file);
      if (error) return toast.error("Error al subir imagen");
      
      const { data: urlData } = supabase.storage.from('blog_images').getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const { error } = await supabase.from('posts').insert([{ 
        title, 
        content, 
        slug, 
        image_url: imageUrl, 
        published: true 
    }]);

    if (error) toast.error("Error creando el post");
    else {
        toast.success("Post creado exitosamente");
        setTitle("");
        setContent("");
        setFile(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Post</h1>
      
      <div className="space-y-4">
        <Input placeholder="Título del Post" value={title} onChange={e => setTitle(e.target.value)} />
        
        <div>
          <label className="block text-sm font-medium mb-1">Imagen Principal</label>
          <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        </div>

        <div className="bg-white">
          <ReactQuill theme="snow" value={content} onChange={setContent} className="h-64 mb-12" />
        </div>

        <Button onClick={handleSubmit} className="w-full mt-10">Publicar Post</Button>
      </div>
    </div>
  );
}
