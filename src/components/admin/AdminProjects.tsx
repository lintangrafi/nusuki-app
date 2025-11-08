import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { cn } from "@/lib/utils";

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

const PROJECT_CATEGORIES = [
  "Injection",
  "Waterproofing",
  "Coating",
  "Grouting",
  "Perbaikan Struktur",
  "Lainnya"
];

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);
  const [additionalImages, setAdditionalImages] = useState<ProjectImage[]>([]);
  const [uploadingAdditional, setUploadingAdditional] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    client: "",
    project_date: undefined as Date | undefined,
    image_url: "",
    category: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("project_date", { ascending: false, nullsFirst: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Gagal memuat proyek");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectImages = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", projectId)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setAdditionalImages(data || []);
    } catch (error) {
      console.error("Error fetching project images:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("File harus berupa gambar");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast.success("Gambar utama berhasil diupload");
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "Gagal mengupload gambar");
    } finally {
      setUploading(false);
    }
  };

  const handleAdditionalImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!editingProject) {
      toast.error("Simpan proyek terlebih dahulu sebelum menambahkan gambar tambahan");
      return;
    }

    setUploadingAdditional(true);
    try {
      const uploadPromises = Array.from(files).map(async (file, index) => {
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} bukan file gambar`);
        }

        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} melebihi ukuran maksimal 5MB`);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('project-images')
          .getPublicUrl(filePath);

        // Insert into project_images table
        const { error: insertError } = await supabase
          .from('project_images')
          .insert({
            project_id: editingProject.id,
            image_url: publicUrl,
            display_order: additionalImages.length + index
          });

        if (insertError) throw insertError;

        return publicUrl;
      });

      await Promise.all(uploadPromises);
      toast.success("Gambar tambahan berhasil diupload");
      await fetchProjectImages(editingProject.id);
    } catch (error: any) {
      console.error("Error uploading additional images:", error);
      toast.error(error.message || "Gagal mengupload gambar tambahan");
    } finally {
      setUploadingAdditional(false);
    }
  };

  const handleDeleteAdditionalImage = async (imageId: string, imageUrl: string) => {
    if (!confirm("Yakin ingin menghapus gambar ini?")) return;

    try {
      // Delete from database
      const { error: deleteError } = await supabase
        .from('project_images')
        .delete()
        .eq('id', imageId);

      if (deleteError) throw deleteError;

      // Delete from storage
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('project-images')
          .remove([fileName]);
      }

      toast.success("Gambar berhasil dihapus");
      if (editingProject) {
        await fetchProjectImages(editingProject.id);
      }
    } catch (error: any) {
      console.error("Error deleting image:", error);
      toast.error("Gagal menghapus gambar");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        project_date: formData.project_date ? format(formData.project_date, 'yyyy-MM-dd') : null,
      };

      if (editingProject) {
        const { error } = await supabase
          .from("projects")
          .update(submitData)
          .eq("id", editingProject.id);

        if (error) throw error;
        toast.success("Proyek berhasil diperbarui");
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([submitData]);

        if (error) throw error;
        toast.success("Proyek berhasil ditambahkan");
      }

      setDialogOpen(false);
      resetForm();
      fetchProjects();
    } catch (error: any) {
      console.error("Error saving project:", error);
      toast.error(error.message || "Gagal menyimpan proyek");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus proyek ini? Semua gambar terkait juga akan dihapus.")) return;

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Proyek berhasil dihapus");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Gagal menghapus proyek");
    }
  };

  const handleEdit = async (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      location: project.location || "",
      client: project.client || "",
      project_date: project.project_date ? new Date(project.project_date) : undefined,
      image_url: project.image_url || "",
      category: project.category || "",
    });
    await fetchProjectImages(project.id);
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      client: "",
      project_date: undefined,
      image_url: "",
      category: "",
    });
    setEditingProject(null);
    setAdditionalImages([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Kelola Proyek</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Proyek
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Proyek" : "Tambah Proyek Baru"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Klien</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project_date">Tanggal Proyek</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.project_date && "text-muted-foreground"
                        )}
                      >
                        {formData.project_date ? (
                          format(formData.project_date, "d MMMM yyyy", { locale: idLocale })
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.project_date}
                        onSelect={(date) => setFormData({ ...formData, project_date: date })}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Gambar Utama</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="flex-1"
                  />
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                {formData.image_url && (
                  <div className="mt-2">
                    <img 
                      src={formData.image_url} 
                      alt="Preview" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {editingProject && (
                <div className="space-y-2">
                  <Label>Gambar Tambahan</Label>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleAdditionalImagesUpload}
                      disabled={uploadingAdditional}
                      className="flex-1"
                    />
                    {uploadingAdditional && <Loader2 className="h-4 w-4 animate-spin" />}
                  </div>
                  {additionalImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {additionalImages.map((img) => (
                        <div key={img.id} className="relative group">
                          <img 
                            src={img.image_url} 
                            alt={`Additional ${img.display_order}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteAdditionalImage(img.id, img.image_url)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Simpan proyek terlebih dahulu untuk menambahkan gambar tambahan
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full">
                {editingProject ? "Perbarui" : "Simpan"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            Belum ada proyek. Klik "Tambah Proyek" untuk memulai.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              {project.image_url && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-2">
                  <span className="flex-1">{project.title}</span>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(project)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                {project.category && (
                  <Badge variant="secondary" className="w-fit">{project.category}</Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                {project.location && (
                  <p className="text-xs text-muted-foreground">📍 {project.location}</p>
                )}
                {project.client && (
                  <p className="text-xs text-muted-foreground">👤 {project.client}</p>
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
      )}
    </div>
  );
};

export default AdminProjects;
