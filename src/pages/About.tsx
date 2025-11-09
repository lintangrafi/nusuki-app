import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye } from "lucide-react";
import SEO from "@/components/SEO";
import { pageMetadata, siteConfig } from "@/utils/seoConfig";
import { organizationSchema, breadcrumbSchema } from "@/utils/structuredData";

const About = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tentang Kami", url: "/about" }
      ])
    ]
  };

  return (
    <Layout>
      <SEO 
        title={pageMetadata.about.title}
        description={pageMetadata.about.description}
        keywords={pageMetadata.about.keywords}
        canonical={`${siteConfig.url}/about`}
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Kami</h1>
            <p className="text-lg text-muted-foreground">
              PT. Nusuki Mega Utama - Partner Terpercaya untuk Solusi Waterproofing
            </p>
          </div>

          {/* Profile */}
          <Card className="mb-8 border-none shadow-card">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Profil Perusahaan</h2>
              <p className="text-muted-foreground leading-relaxed">
                PT. Nusuki Mega Utama adalah perusahaan yang dapat memberikan solusi pada Mitra/Klien, 
                bekerja tepat waktu sesuai schedule dengan hasil kerja yang berkualitas. Kami berkonsentrasi 
                pada sumberdaya yang tersedia secara internal atau melalui perusahaan asosiasi untuk 
                melaksanakan pekerjaan di seluruh wilayah Indonesia.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Kami meliputi pekerjaan Injeksi kebocoran, Injection Structure, pekerjaan Epoxy Lantai, 
                Pekerjaan Waterproofing, dan pekerjaan Grouting untuk berbagai jenis bangunan seperti 
                basement, rooftop, kamar mandi, kolam renang, water tank, dan pit lift.
              </p>
            </CardContent>
          </Card>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-none shadow-card">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Visi</h3>
                <p className="text-muted-foreground">
                  Menjadikan Perusahaan Injection dan Waterproofing dengan tingkat keselamatan kerja 
                  yang memberikan solusi bagi Mitra dan Klien dengan penuh tanggung jawab.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Misi</h3>
                <p className="text-muted-foreground">
                  Berperan aktif dalam Pembangunan Indonesia yang sejahtera di bidang pekerjaan 
                  Injection kebocoran, Injection Structure, dan pekerjaan Waterproofing pembangunan 
                  konstruksi dan perbaikan.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Keunggulan */}
          <Card className="border-none shadow-card">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Keunggulan Kami</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong>Teknologi Terkini:</strong> Menggunakan mesin injeksi khusus bertekanan 10-30 Bar 
                    untuk hasil yang maksimal
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong>Sistem Efisien:</strong> Pekerjaan injeksi yang simpel dan efisien tanpa perlu 
                    pembongkaran keramik atau marmer
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong>Tim Profesional:</strong> Tenaga ahli berpengalaman yang terlatih dalam menangani 
                    berbagai jenis permasalahan kebocoran
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong>Jaminan Kualitas:</strong> Hasil kerja berkualitas dengan garansi dan layanan 
                    purna jual yang memuaskan
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;