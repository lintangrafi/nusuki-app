import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import SEO from "@/components/SEO";
import { pageMetadata, siteConfig } from "@/utils/seoConfig";
import { localBusinessSchema, breadcrumbSchema } from "@/utils/structuredData";

const Contact = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      ...siteConfig.contact.offices.map(office => localBusinessSchema(office)),
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Kontak", url: "/contact" }
      ])
    ]
  };

  return (
    <Layout>
      <SEO 
        title={pageMetadata.contact.title}
        description={pageMetadata.contact.description}
        keywords={pageMetadata.contact.keywords}
        canonical={`${siteConfig.url}/contact`}
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
            <p className="text-lg text-muted-foreground">
              Kami siap membantu Anda dengan solusi terbaik untuk kebutuhan waterproofing dan injection
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Office Jakarta */}
            <Card className="border-none shadow-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Kantor Pusat Jakarta</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">
                      Jl. Raya Pos Pengumben No.1<br />
                      Jakarta
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <a 
                      href="tel:081212084150" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      081212084150
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Tangerang */}
            <Card className="border-none shadow-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Cabang Tangerang</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">
                      Tangerang
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                      <a 
                        href="tel:081285106668" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        0812-8510-6668
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                      <a 
                        href="tel:089535785613" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        0895-3578-56136
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Email Card */}
          <Card className="border-none shadow-card mt-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a 
                    href="mailto:lukmanlucan68@gmail.com" 
                    className="text-lg hover:text-primary transition-colors"
                  >
                    lukmanlucan68@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp CTA */}
          <div className="mt-8 text-center">
            <Card className="border-none shadow-card bg-gradient-to-r from-primary to-primary/80">
              <CardContent className="pt-6 text-primary-foreground">
                <h3 className="text-2xl font-bold mb-2">Butuh Konsultasi?</h3>
                <p className="mb-4 opacity-90">Hubungi kami melalui WhatsApp untuk konsultasi gratis</p>
                <a
                  href="https://wa.me/6281212084150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Hubungi via WhatsApp
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;