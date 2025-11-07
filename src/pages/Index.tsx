import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Shield, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-image.jpg";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  description: string;
  location?: string;
  client?: string;
  project_date?: string;
  image_url?: string;
  category?: string;
}

const Index = () => {
  const [services, setServices] = useState<string[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchServicesAndProjects();
  }, []);

  const fetchServicesAndProjects = async () => {
    try {
      // Fetch distinct categories as services
      const { data: categoriesData } = await supabase
        .from("projects")
        .select("category")
        .not("category", "is", null);

      if (categoriesData) {
        const uniqueCategories = [...new Set(categoriesData.map(p => p.category).filter(Boolean))] as string[];
        setServices(uniqueCategories);
      }

      // Fetch recent projects (limit to 6)
      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .order("project_date", { ascending: false, nullsFirst: false })
        .limit(6);

      if (projectsData) {
        setRecentProjects(projectsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Berkualitas Tinggi",
      description: "Kami menggunakan material dan teknologi terbaik untuk hasil yang maksimal dan tahan lama.",
    },
    {
      icon: Users,
      title: "Tim Profesional",
      description: "Tenaga ahli berpengalaman yang siap memberikan solusi terbaik untuk kebutuhan Anda.",
    },
    {
      icon: Award,
      title: "Terpercaya",
      description: "Dipercaya oleh berbagai perusahaan dan institusi di seluruh Indonesia.",
    },
    {
      icon: CheckCircle2,
      title: "Tepat Waktu",
      description: "Komitmen kami untuk menyelesaikan proyek sesuai dengan jadwal yang telah ditentukan.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Solusi Terpercaya untuk{" "}
              <span className="text-primary">Waterproofing</span> & Injection
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Spesialis dalam pekerjaan injection kebocoran, injection structure, epoxy lantai, dan waterproofing dengan teknologi terkini.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="shadow-elegant">
                <Link to="/services">Layanan Kami</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Hubungi Kami</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami berkomitmen memberikan layanan terbaik dengan standar kualitas tertinggi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Layanan Kami
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Berbagai solusi profesional untuk kebutuhan konstruksi Anda
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {services.map((service, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-lg py-2 px-6 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Projects Section */}
      {recentProjects.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Proyek Terbaru
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Lihat beberapa proyek terbaru yang telah kami selesaikan
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recentProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300">
                  {project.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="pt-6">
                    {project.category && (
                      <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                    )}
                    <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    {project.location && (
                      <p className="text-xs text-muted-foreground">📍 {project.location}</p>
                    )}
                    {project.project_date && (
                      <p className="text-xs text-muted-foreground">
                        📅 {new Date(project.project_date).toLocaleDateString('id-ID', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/projects">Lihat Semua Proyek</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Memulai Proyek Anda?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Konsultasikan kebutuhan waterproofing dan injection Anda dengan tim profesional kami
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Hubungi Kami Sekarang</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;