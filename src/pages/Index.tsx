import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Shield, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
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