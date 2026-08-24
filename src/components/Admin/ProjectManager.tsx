// components/Admin/ProjectManager.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Save, X, Image, Link as LinkIcon, 
  Video, Code, Palette, PenTool, Camera, Star, Upload,
  ChevronDown, ChevronUp, Loader2, AlertCircle, Globe,
  ExternalLink, Github, ShoppingCart, Eye
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  featured: boolean;
  images: { imageUrl: string; altText?: string; displayOrder: number }[];
  links: { label: string; url: string; linkType: string; displayOrder: number }[];
  videos: { videoUrl: string; title: string; description: string; displayOrder: number }[];
  softwareMeta?: {
    techStack: string[];
    liveUrl: string;
    repoUrl: string;
    lighthouseScore: number;
    pageLoadMs: number;
    monthlyVisitors: number;
    uptime: number;
    analyticsNote: string;
  };
  artMeta?: {
    medium: string;
    dimensions: string;
    year: number;
    isAvailable: boolean;
    price: number;
    shopUrl: string;
  };
  designMeta?: {
    software: string[];
    clientName: string;
    year: number;
    behanceUrl: string;
  };
}

// Normalized so it NEVER includes a trailing /api, regardless of whether
// VITE_API_URL was set with or without it. Matches Portfolio.tsx's convention
// — every fetch below appends /api/... explicitly.
const RAW_API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_BASE = RAW_API_BASE.replace(/\/$/, '').replace(/\/api$/, '');

const categories = ['WEB_DEV', 'DESIGN', 'FINE_ART', 'PHOTOGRAPHY'];
const categoryLabels = {
  WEB_DEV: 'Web Dev',
  DESIGN: 'Design',
  FINE_ART: 'Fine Art',
  PHOTOGRAPHY: 'Photography'
};
const categoryIcons = {
  WEB_DEV: Code,
  DESIGN: Palette,
  FINE_ART: PenTool,
  PHOTOGRAPHY: Camera
};
const categoryColors = {
  WEB_DEV: 'amber',
  DESIGN: 'cyan',
  FINE_ART: 'rose',
  PHOTOGRAPHY: 'violet'
};

const linkTypes = ['live', 'demo', 'repo', 'shop', 'other'];
const linkIcons = {
  live: Globe,
  demo: Eye,
  repo: Github,
  shop: ShoppingCart,
  other: ExternalLink
};

export const ProjectManager: React.FC = () => {
  const { token, logout } = useAuth(); // was: const { token, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state for new/edit
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: 'WEB_DEV',
    description: '',
    tags: [],
    featured: false,
    images: [],
    links: [],
    videos: [],
  });

  // Helper to get auth headers
  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/api/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      // Transform snake_case to camelCase for display
      const transformed = data.map((p: any) => ({
        ...p,
        images: (p.images || []).map((img: any) => ({
          imageUrl: img.imageUrl || img.image_url,
          altText: img.altText || img.alt_text || '',
          displayOrder: img.displayOrder || img.display_order || 0
        })),
        links: (p.links || []).map((link: any) => ({
          label: link.label,
          url: link.url,
          linkType: link.linkType || link.link_type || 'other',
          displayOrder: link.displayOrder || link.display_order || 0
        })),
        videos: (p.videos || []).map((video: any) => ({
          videoUrl: video.videoUrl || video.video_url,
          title: video.title || '',
          description: video.description || '',
          displayOrder: video.displayOrder || video.display_order || 0
        })),
        softwareMeta: p.softwareMeta ? {
          techStack: p.softwareMeta.techStack || p.softwareMeta.tech_stack || [],
          liveUrl: p.softwareMeta.liveUrl || p.softwareMeta.live_url || '',
          repoUrl: p.softwareMeta.repoUrl || p.softwareMeta.repo_url || '',
          lighthouseScore: p.softwareMeta.lighthouseScore || p.softwareMeta.lighthouse_score || 0,
          pageLoadMs: p.softwareMeta.pageLoadMs || p.softwareMeta.page_load_ms || 0,
          monthlyVisitors: p.softwareMeta.monthlyVisitors || p.softwareMeta.monthly_visitors || 0,
          uptime: p.softwareMeta.uptime || 0,
          analyticsNote: p.softwareMeta.analyticsNote || p.softwareMeta.analytics_note || ''
        } : undefined,
        artMeta: p.artMeta ? {
          medium: p.artMeta.medium || '',
          dimensions: p.artMeta.dimensions || '',
          year: p.artMeta.year || 0,
          isAvailable: p.artMeta.isAvailable !== undefined ? p.artMeta.isAvailable : p.artMeta.is_available !== undefined ? p.artMeta.is_available : true,
          price: p.artMeta.price || 0,
          shopUrl: p.artMeta.shopUrl || p.artMeta.shop_url || ''
        } : undefined,
        designMeta: p.designMeta ? {
          software: p.designMeta.software || [],
          clientName: p.designMeta.clientName || p.designMeta.client_name || '',
          year: p.designMeta.year || 0,
          behanceUrl: p.designMeta.behanceUrl || p.designMeta.behance_url || ''
        } : undefined
      }));
      setProjects(transformed);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Transform camelCase to snake_case for API
  const transformForAPI = (data: Partial<Project>) => {
    const result: any = {
      title: data.title,
      category: data.category,
      description: data.description,
      tags: data.tags || [],
      featured: data.featured || false,
      displayOrder: data.displayOrder || 0,
      images: (data.images || []).map(img => ({
        imageUrl: img.imageUrl,
        altText: img.altText || '',
        displayOrder: img.displayOrder || 0
      })),
      links: (data.links || []).map(link => ({
        label: link.label,
        url: link.url,
        linkType: link.linkType || 'other',
        displayOrder: link.displayOrder || 0
      })),
      videos: (data.videos || []).map(video => ({
        videoUrl: video.videoUrl,
        title: video.title || '',
        description: video.description || '',
        displayOrder: video.displayOrder || 0
      }))
    };

    if (data.softwareMeta) {
      result.softwareMeta = {
        techStack: data.softwareMeta.techStack || [],
        liveUrl: data.softwareMeta.liveUrl || null,
        repoUrl: data.softwareMeta.repoUrl || null,
        lighthouseScore: data.softwareMeta.lighthouseScore || null,
        pageLoadMs: data.softwareMeta.pageLoadMs || null,
        monthlyVisitors: data.softwareMeta.monthlyVisitors || null,
        uptime: data.softwareMeta.uptime || null,
        analyticsNote: data.softwareMeta.analyticsNote || null
      };
    }

    if (data.artMeta) {
      result.artMeta = {
        medium: data.artMeta.medium || null,
        dimensions: data.artMeta.dimensions || null,
        year: data.artMeta.year || null,
        isAvailable: data.artMeta.isAvailable !== undefined ? data.artMeta.isAvailable : true,
        price: data.artMeta.price || null,
        shopUrl: data.artMeta.shopUrl || null
      };
    }

    if (data.designMeta) {
      result.designMeta = {
        software: data.designMeta.software || [],
        clientName: data.designMeta.clientName || null,
        year: data.designMeta.year || null,
        behanceUrl: data.designMeta.behanceUrl || null
      };
    }

    return result;
  };

  const handleSave = async () => {
    if (!token) {
      setError('You must be logged in to save projects');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validate required fields
      if (!formData.title?.trim()) {
        setError('Title is required');
        setSaving(false);
        return;
      }
      if (!formData.category) {
        setError('Category is required');
        setSaving(false);
        return;
      }

      const url = isCreating ? `${API_BASE}/api/projects` : `${API_BASE}/api/projects/${editingProject?.id}`;
      const method = isCreating ? 'POST' : 'PUT';
      
      const submitData = transformForAPI(formData);

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(submitData)
      });

      if (response.status === 401) {
        // Token expired or invalid
        await logout(); // was: await signOut();
        setError('Session expired. Please log in again.');
        setSaving(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save project');
      }
      
      await fetchProjects();
      setSuccess(isCreating ? 'Project created successfully!' : 'Project updated successfully!');
      resetForm();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error saving project:', error);
      setError(error instanceof Error ? error.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) {
      setError('You must be logged in to delete projects');
      return;
    }
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.status === 401) {
        await logout(); // was: await signOut();
        setError('Session expired. Please log in again.');
        return;
      }
      
      if (!response.ok) throw new Error('Failed to delete project');
      await fetchProjects();
      setSuccess('Project deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Failed to delete project');
    }
  };

  const handleFileUpload = async (files: FileList, type: 'image' | 'video') => {
    if (!files || files.length === 0) return;
    if (!token) {
      setError('You must be logged in to upload files');
      return;
    }
    
    setUploading(true);
    setError(null);
    const uploadFormData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      uploadFormData.append('media', files[i]);
    }

    try {
      const response = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      });

      if (response.status === 401) {
        await logout(); // was: await signOut();
        setError('Session expired. Please log in again.');
        setUploading(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      
      const data = await response.json();
      
      // Add uploaded URLs to form data
      if (type === 'image') {
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), ...data.files.map((f: any) => ({
            imageUrl: f.url.startsWith('http') ? f.url : `${API_BASE}${f.url}`,
            altText: f.originalname.replace(/\.[^/.]+$/, ''),
            displayOrder: (prev.images?.length || 0)
          }))]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          videos: [...(prev.videos || []), ...data.files.map((f: any) => ({
            videoUrl: f.url.startsWith('http') ? f.url : `${API_BASE}${f.url}`,
            title: f.originalname.replace(/\.[^/.]+$/, ''),
            description: '',
            displayOrder: (prev.videos?.length || 0)
          }))]
        }));
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'WEB_DEV',
      description: '',
      tags: [],
      featured: false,
      images: [],
      links: [],
      videos: [],
    });
    setEditingProject(null);
    setIsCreating(false);
    setError(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...(prev.links || []), { 
        label: '', 
        url: '', 
        linkType: 'other', 
        displayOrder: prev.links?.length || 0 
      }]
    }));
  };

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: (prev.links || []).filter((_, i) => i !== index)
    }));
  };

  const updateLink = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      links: (prev.links || []).map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const addTag = (tag: string) => {
    if (!tag.trim()) return;
    if ((formData.tags || []).includes(tag.trim())) {
      setError('Tag already exists');
      setTimeout(() => setError(null), 3000);
      return;
    }
    setFormData(prev => ({
      ...prev,
      tags: [...(prev.tags || []), tag.trim()]
    }));
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || []).filter((_, i) => i !== index)
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: (prev.videos || []).filter((_, i) => i !== index)
    }));
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || 'gray';
  };

  const getStatusColor = (isAvailable?: boolean) => {
    if (isAvailable === undefined) return 'text-muted-foreground';
    return isAvailable ? 'text-emerald-400' : 'text-muted-foreground';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Loading projects…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Manage Projects</h2>
          <p className="text-muted-foreground font-body text-sm mt-1">
            Create and manage your portfolio projects
          </p>
        </div>
        {!isCreating && !editingProject && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-xs uppercase tracking-wider hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={16} /> Add Project
          </button>
        )}
      </div>

      {/* Error/Success Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive font-body text-sm flex items-start gap-3"
          >
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-destructive/70 hover:text-destructive">
              <X size={16} />
            </button>
          </motion.div>
        )}
        
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-body text-sm"
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create/Edit Form */}
      <AnimatePresence>
        {(isCreating || editingProject) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card/60 backdrop-blur-xl border border-border/60 rounded-2xl p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-xl font-semibold text-foreground">
                {isCreating ? 'Create New Project' : 'Edit Project'}
              </h3>
              <button 
                onClick={resetForm} 
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                  placeholder="Project title..."
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                  Category *
                </label>
                <select
                  value={formData.category || 'WEB_DEV'}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{categoryLabels[cat as keyof typeof categoryLabels]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground resize-none"
                placeholder="Describe your project..."
              />
            </div>

            <div className="mt-5">
              <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(formData.tags || []).map((tag, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs">
                    {tag}
                    <button 
                      onClick={() => removeTag(index)} 
                      className="hover:text-destructive transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add tag and press Enter..."
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    addTag((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </div>

            {/* Image Upload */}
            <div className="mt-5">
              <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                Images
              </label>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 transition-colors cursor-pointer font-mono text-xs uppercase tracking-wider disabled:opacity-50">
                  <Upload size={16} />
                  {uploading ? 'Uploading...' : 'Upload Images'}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={e => e.target.files && handleFileUpload(e.target.files, 'image')}
                    disabled={uploading}
                  />
                </label>
                <span className="text-sm text-muted-foreground">
                  {(formData.images || []).length} images uploaded
                </span>
              </div>
              {formData.images && formData.images.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary group">
                      <img src={img.imageUrl} alt={img.altText || ''} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 rounded-lg bg-destructive/90 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video Upload */}
            <div className="mt-5">
              <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                Videos
              </label>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 transition-colors cursor-pointer font-mono text-xs uppercase tracking-wider disabled:opacity-50">
                  <Upload size={16} />
                  {uploading ? 'Uploading...' : 'Upload Videos'}
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    className="hidden"
                    onChange={e => e.target.files && handleFileUpload(e.target.files, 'video')}
                    disabled={uploading}
                  />
                </label>
                <span className="text-sm text-muted-foreground">
                  {(formData.videos || []).length} videos uploaded
                </span>
              </div>
              {formData.videos && formData.videos.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {formData.videos.map((video, index) => (
                    <div key={index} className="relative w-32 h-24 rounded-xl overflow-hidden bg-secondary group">
                      <video src={video.videoUrl} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeVideo(index)}
                        className="absolute top-1 right-1 p-1 rounded-lg bg-destructive/90 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <div className="mt-5">
              <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                Links
              </label>
              {(formData.links || []).map((link, index) => {
                const LinkIcon = linkIcons[link.linkType as keyof typeof linkIcons] || ExternalLink;
                return (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <LinkIcon size={16} className="text-muted-foreground flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Label"
                      value={link.label}
                      onChange={e => updateLink(index, 'label', e.target.value)}
                      className="flex-1 px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                    <input
                      type="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={e => updateLink(index, 'url', e.target.value)}
                      className="flex-1 px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                    <select
                      value={link.linkType}
                      onChange={e => updateLink(index, 'linkType', e.target.value)}
                      className="px-3 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    >
                      {linkTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => removeLink(index)} 
                      className="p-2 text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
              <button 
                onClick={addLink} 
                className="text-primary hover:text-primary/80 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                + Add Link
              </button>
            </div>

            {/* Category-specific meta fields */}
            {formData.category === 'WEB_DEV' && (
              <div className="mt-5 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <h4 className="font-display font-semibold text-amber-400 mb-3">Web Dev Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-foreground mb-1">Tech Stack</label>
                    <input
                      type="text"
                      placeholder="React, TypeScript, Tailwind"
                      value={(formData.softwareMeta?.techStack || []).join(', ')}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        softwareMeta: {
                          ...prev.softwareMeta,
                          techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Live URL</label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={formData.softwareMeta?.liveUrl || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        softwareMeta: { ...prev.softwareMeta, liveUrl: e.target.value }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Repo URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={formData.softwareMeta?.repoUrl || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        softwareMeta: { ...prev.softwareMeta, repoUrl: e.target.value }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Lighthouse Score</label>
                    <input
                      type="number"
                      placeholder="95"
                      value={formData.softwareMeta?.lighthouseScore || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        softwareMeta: { ...prev.softwareMeta, lighthouseScore: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Page Load (ms)</label>
                    <input
                      type="number"
                      placeholder="1200"
                      value={formData.softwareMeta?.pageLoadMs || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        softwareMeta: { ...prev.softwareMeta, pageLoadMs: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Monthly Visitors</label>
                    <input
                      type="number"
                      placeholder="5000"
                      value={formData.softwareMeta?.monthlyVisitors || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        softwareMeta: { ...prev.softwareMeta, monthlyVisitors: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-foreground mb-1">Analytics Note</label>
                    <input
                      type="text"
                      placeholder="e.g., Performance metrics from Google Analytics"
                      value={formData.softwareMeta?.analyticsNote || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        softwareMeta: { ...prev.softwareMeta, analyticsNote: e.target.value }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.category === 'FINE_ART' && (
              <div className="mt-5 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20">
                <h4 className="font-display font-semibold text-rose-400 mb-3">Art Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-foreground mb-1">Medium</label>
                    <input
                      type="text"
                      placeholder="Oil on canvas"
                      value={formData.artMeta?.medium || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        artMeta: { ...prev.artMeta, medium: e.target.value }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Dimensions</label>
                    <input
                      type="text"
                      placeholder="24 x 36 inches"
                      value={formData.artMeta?.dimensions || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        artMeta: { ...prev.artMeta, dimensions: e.target.value }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Year</label>
                    <input
                      type="number"
                      placeholder="2024"
                      value={formData.artMeta?.year || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        artMeta: { ...prev.artMeta, year: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Price (USD)</label>
                    <input
                      type="number"
                      placeholder="1200"
                      value={formData.artMeta?.price || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        artMeta: { ...prev.artMeta, price: parseFloat(e.target.value) || 0 }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Shop URL</label>
                    <input
                      type="url"
                      placeholder="https://shop.example.com/..."
                      value={formData.artMeta?.shopUrl || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        artMeta: { ...prev.artMeta, shopUrl: e.target.value }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.artMeta?.isAvailable !== false}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          artMeta: { ...prev.artMeta, isAvailable: e.target.checked }
                        }))}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      Available for purchase
                    </label>
                  </div>
                </div>
              </div>
            )}

            {(formData.category === 'DESIGN' || formData.category === 'PHOTOGRAPHY') && (
              <div className="mt-5 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                <h4 className="font-display font-semibold text-cyan-400 mb-3">
                  {formData.category === 'DESIGN' ? 'Design Details' : 'Photography Details'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-foreground mb-1">Software/Tools</label>
                    <input
                      type="text"
                      placeholder="Photoshop, Illustrator"
                      value={(formData.designMeta?.software || []).join(', ')}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        designMeta: {
                          ...prev.designMeta,
                          software: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Client/Series Name</label>
                    <input
                      type="text"
                      placeholder="Client name or series"
                      value={formData.designMeta?.clientName || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        designMeta: { ...prev.designMeta, clientName: e.target.value }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Year</label>
                    <input
                      type="number"
                      placeholder="2024"
                      value={formData.designMeta?.year || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        designMeta: { ...prev.designMeta, year: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-1">Gallery URL</label>
                    <input
                      type="url"
                      placeholder="https://behance.net/..."
                      value={formData.designMeta?.behanceUrl || ''}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        designMeta: { ...prev.designMeta, behanceUrl: e.target.value }
                      }))}
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Featured toggle */}
            <div className="mt-5">
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <Star size={16} className="text-amber-400" />
                Featured Project
              </label>
            </div>

            {/* Save button */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-xs uppercase tracking-wider hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Saving...' : 'Save Project'}
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl bg-secondary text-foreground font-mono text-xs uppercase tracking-wider hover:bg-secondary/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <Code size={24} className="text-muted-foreground opacity-40" />
            </div>
            <p className="font-display font-semibold text-foreground text-lg mb-1">No projects yet</p>
            <p className="text-muted-foreground font-body text-sm">Create your first project to get started</p>
            <button
              onClick={() => setIsCreating(true)}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-xs uppercase tracking-wider hover:brightness-110 transition-all"
            >
              <Plus size={16} /> Add Your First Project
            </button>
          </div>
        ) : (
          projects.map((project) => {
            const Icon = categoryIcons[project.category as keyof typeof categoryIcons] || Code;
            const isExpanded = expandedProject === project.id;
            const color = getCategoryColor(project.category);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/60 backdrop-blur-xl border border-border/60 rounded-2xl overflow-hidden"
              >
                <div 
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-secondary/20 transition-colors"
                  onClick={() => toggleExpand(project.id)}
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className={`w-11 h-11 rounded-xl bg-${color}-500/10 flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} className={`text-${color}-400`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-semibold text-foreground truncate">{project.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                        <span className={`text-${color}-400`}>{categoryLabels[project.category as keyof typeof categoryLabels]}</span>
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 text-amber-400">
                            <Star size={12} className="fill-current" /> Featured
                          </span>
                        )}
                        <span className="text-xs">
                          • {project.images.length} images
                          {project.videos && project.videos.length > 0 && `, ${project.videos.length} videos`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProject(project);
                        setFormData(project);
                      }}
                      className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                      title="Edit project"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.id);
                      }}
                      className="p-2 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border/60"
                    >
                      <div className="p-5 space-y-4">
                        {/* Description */}
                        {project.description && (
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                            <p className="text-foreground">{project.description}</p>
                          </div>
                        )}

                        {/* Tags */}
                        {project.tags.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-secondary rounded-full text-sm">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Images */}
                        {project.images.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                              <Image size={14} /> Images ({project.images.length})
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.images.map((img, i) => (
                                <div key={i} className="w-20 h-20 rounded-lg overflow-hidden bg-secondary">
                                  <img src={img.imageUrl} alt={img.altText || ''} className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Videos */}
                        {project.videos && project.videos.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                              <Video size={14} /> Videos ({project.videos.length})
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {project.videos.map((video, i) => (
                                <div key={i} className="relative rounded-lg overflow-hidden bg-secondary aspect-video">
                                  <video controls className="w-full h-full">
                                    <source src={video.videoUrl} />
                                  </video>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Links */}
                        {project.links.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                              <LinkIcon size={14} /> Links
                            </h4>
                            <div className="space-y-1">
                              {project.links.map((link, i) => {
                                const LinkIcon = linkIcons[link.linkType as keyof typeof linkIcons] || ExternalLink;
                                return (
                                  <div key={i} className="flex items-center gap-2 text-sm">
                                    <LinkIcon size={14} className="text-muted-foreground" />
                                    <span className="text-muted-foreground">{link.label}:</span>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                                      {link.url}
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Category-specific meta */}
                        {project.softwareMeta && (
                          <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                            <h4 className="text-sm font-medium text-amber-400 mb-1">Tech Details</h4>
                            <div className="flex flex-wrap gap-2 text-sm">
                              {project.softwareMeta.techStack.length > 0 && (
                                <span>Stack: {project.softwareMeta.techStack.join(', ')}</span>
                              )}
                              {project.softwareMeta.lighthouseScore && (
                                <span className="text-amber-300">LH: {project.softwareMeta.lighthouseScore}</span>
                              )}
                              {project.softwareMeta.pageLoadMs && (
                                <span className="text-amber-300">Load: {project.softwareMeta.pageLoadMs}ms</span>
                              )}
                              {project.softwareMeta.monthlyVisitors && (
                                <span className="text-amber-300">{project.softwareMeta.monthlyVisitors.toLocaleString()}/mo</span>
                              )}
                            </div>
                            {project.softwareMeta.analyticsNote && (
                              <p className="text-muted-foreground text-xs mt-1">{project.softwareMeta.analyticsNote}</p>
                            )}
                          </div>
                        )}

                        {project.artMeta && (
                          <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                            <h4 className="text-sm font-medium text-rose-400 mb-1">Art Details</h4>
                            <div className="flex flex-wrap gap-2 text-sm">
                              {project.artMeta.medium && <span>Medium: {project.artMeta.medium}</span>}
                              {project.artMeta.dimensions && <span>Size: {project.artMeta.dimensions}</span>}
                              {project.artMeta.year && <span>Year: {project.artMeta.year}</span>}
                              {project.artMeta.price && (
                                <span className="text-rose-300 font-medium">${project.artMeta.price}</span>
                              )}
                              {project.artMeta.isAvailable !== undefined && (
                                <span className={getStatusColor(project.artMeta.isAvailable)}>
                                  {project.artMeta.isAvailable ? 'Available' : 'Sold'}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {(project.designMeta) && (
                          <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                            <h4 className="text-sm font-medium text-cyan-400 mb-1">
                              {project.category === 'DESIGN' ? 'Design Details' : 'Photography Details'}
                            </h4>
                            <div className="flex flex-wrap gap-2 text-sm">
                              {project.designMeta.software.length > 0 && (
                                <span>Tools: {project.designMeta.software.join(', ')}</span>
                              )}
                              {project.designMeta.clientName && (
                                <span>Client: {project.designMeta.clientName}</span>
                              )}
                              {project.designMeta.year && <span>Year: {project.designMeta.year}</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProjectManager;