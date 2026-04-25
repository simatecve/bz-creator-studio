import { useState } from "react";
import { createClient } from "@insforge/sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Usamos las credenciales directamente aquí para evitar problemas si Vite no recargó el archivo .env
const INSFORGE_URL = import.meta.env.VITE_INSFORGE_URL || "https://6w3sgde5.us-east.insforge.app";
const INSFORGE_ANON_KEY = import.meta.env.VITE_INSFORGE_ANON_KEY || "ik_70965bdd4ef84eae1800692c1cdf68fd";

const supabase = createClient({ 
  baseUrl: INSFORGE_URL, 
  anonKey: INSFORGE_ANON_KEY 
});

export default function AdminLogin() {
  const [email, setEmail] = useState("bz@bz.com");
  const [password, setPassword] = useState("Pandejamon_000");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistering) {
      // Flujo de Registro
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error("Signup error:", error);
        toast.error(`Error al registrar: ${error.message}`);
      } else {
        toast.success("Registro exitoso. Ahora puedes iniciar sesión.");
        setIsRegistering(false);
      }
    } else {
      // Flujo de Login
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error("Login error:", error);
        toast.error(`Error al iniciar sesión: ${error.message}`);
      } else {
        toast.success("Sesión iniciada correctamente.");
        navigate("/admin/dashboard");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            {isRegistering ? "Crear Admin" : "Panel de Control"}
          </h1>
          <p className="text-slate-500 mt-2">
            {isRegistering 
              ? "Registra una nueva cuenta de administrador" 
              : "Ingresa tus credenciales para continuar"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Correo electrónico</label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@correo.com"
              className="w-full px-4 py-2 border-slate-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Contraseña</label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              className="w-full px-4 py-2 border-slate-200"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg transition-colors">
            {isRegistering ? "Registrar cuenta" : "Iniciar Sesión"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button 
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {isRegistering 
              ? "¿Ya tienes cuenta? Inicia sesión aquí" 
              : "¿No tienes cuenta? Regístrate aquí"}
          </button>
        </div>
      </div>
    </div>
  );
}
