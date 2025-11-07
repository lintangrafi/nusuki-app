import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Check if user is admin
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (roles?.role === "admin") {
        navigate("/admin");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegistering) {
        // Register new user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) throw error;

        toast.success("Registrasi berhasil! Anda terdaftar sebagai guest. Hubungi admin untuk upgrade ke admin.");
        
        // Redirect to home page after successful registration
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        // Login existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          // Check if user is admin
          const { data: roles, error: roleError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", data.user.id)
            .single();

          if (roleError || !roles || roles.role !== "admin") {
            await supabase.auth.signOut();
            toast.error("Anda tidak memiliki akses admin");
            return;
          }

          toast.success("Login berhasil!");
          navigate("/admin");
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || (isRegistering ? "Registrasi gagal" : "Login gagal"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md border-none shadow-elegant">
        <CardHeader className="text-center">
          <img src={logo} alt="Nusuki Mega Utama" className="h-16 w-auto mx-auto mb-4" />
          <CardTitle className="text-2xl">
            {isRegistering ? "Register" : "Admin Login"}
          </CardTitle>
          <CardDescription>
            {isRegistering 
              ? "Daftar akun baru sebagai guest"
              : "Masuk untuk mengelola layanan dan proyek"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                isRegistering ? "Register" : "Login"
              )}
            </Button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-primary hover:underline"
                disabled={loading}
              >
                {isRegistering 
                  ? "Sudah punya akun? Login di sini"
                  : "Belum punya akun? Register di sini"
                }
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;