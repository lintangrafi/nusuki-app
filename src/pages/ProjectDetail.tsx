import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MapPin, User, Calendar, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { siteConfig } from "@/utils/seoConfig";
import { projectSchema, breadcrumbSchema, imageObjectSchema } from "@/utils/structuredData";

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

interface ProjectImage {
  id: string;
  image_url: string;
  display_order: number;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      // Fetch project details
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (projectError) throw projectError;
      setProject(projectData);

      // Set main image as selected
      if (projectData.image_url) {
        setSelectedImage(projectData.image_url);
      }

      // Fetch additional images
      const { data: imagesData, error: imagesError } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", id)
        .order("display_order", { ascending: true });

      if (imagesError) throw imagesError;
      setImages(imagesData || []);

      // If no main image but has additional images, set first additional image
      if (!projectData.image_url && imagesData && imagesData.length > 0) {
        setSelectedImage(imagesData[0].image_url);
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
      toast.error("Gagal memuat detail proyek");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Proyek tidak ditemukan</h1>
          <Link to="/projects">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Portfolio
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Combine main image and additional images for gallery
  const allImages = [
    ...(project.image_url ? [{ id: "main", image_url: project.image_url, display_order: -1 }] : []),
    ...images
  ];

  const structuredData = project ? {
    "@context": "https://schema.org",
    "@graph": [
      projectSchema({
        title: project.title,
        description: project.description,
        location: project.location,
        client: project.client,
        date: project.project_date,
        image: project.image_url
      }),
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Portfolio", url: "/projects" },
        { name: project.title, url: `/projects/${project.id}` }
      ]),
      ...(project.image_url ? [imageObjectSchema({ 
        url: project.image_url, 
        title: project.title,
        description: `${project.title} - ${project.location || 'Indonesia'}`
      })] : [])
    ]
  } : undefined;

  return (
    <Layout>
      {project && (
        <SEO 
          title={`${project.title} - Portfolio PT Nusuki Mega Utama`}
          description={`${project.description.substring(0, 150)}... Proyek ${project.category || 'waterproofing'} di ${project.location || 'Indonesia'}`}
          keywords={`${project.category || 'waterproofing'}, ${project.location || 'indonesia'}, portfolio, proyek injection`}
          canonical={`${siteConfig.url}/projects/${id}`}
          ogImage={project.image_url}
          structuredData={structuredData}
        />
      )}
      <div className="container mx-auto px-4 py-16">
        <Link to="/projects">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Portfolio
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Display Image */}
            {selectedImage && (
              <div className="aspect-video overflow-hidden rounded-lg border border-border">
                <img
                  src={selectedImage}
                  alt={`${project.title} - ${project.location || 'Indonesia'} - Portfolio Waterproofing PT Nusuki Mega Utama`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.image_url)}
                    className={`aspect-video overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === img.image_url
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`${project.title} - ${project.location || 'Indonesia'} - Foto ${img.display_order + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-4xl font-bold">{project.title}</h1>
                {project.category && (
                  <Badge variant="secondary" className="text-base">
                    {project.category}
                  </Badge>
                )}
              </div>
              <p className="text-lg text-muted-foreground">{project.description}</p>
            </div>

            <Card className="border-none shadow-card">
              <CardContent className="pt-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">Informasi Proyek</h2>
                
                {project.client && (
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Klien</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  </div>
                )}

                {project.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Lokasi</p>
                      <p className="font-medium">{project.location}</p>
                    </div>
                  </div>
                )}

                {project.project_date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tanggal Proyek</p>
                      <p className="font-medium">
                        {new Date(project.project_date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
