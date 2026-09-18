"use client";

import { createClient } from "@/lib/supabase/client";
import ResourcesPanel from "./ResourcesPanel";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Globe,
  LogOut,
  Images,
  Target,
  Building2,
  GraduationCap,
  FileText,
  Users,
  Pencil,
  Trash2,
  Plus,
  X,
  Upload,
} from "lucide-react";

interface AdminShellProps {
  email: string;
}

const sections = [
  { id: "hero",     label: "Hero",              icon: Images },
  { id: "mission",  label: "Mission",           icon: Target },
  { id: "landing",  label: "Where We've Landed", icon: Building2 },
  { id: "resources", label: "Resources",         icon: FileText },
  { id: "programs", label: "Opportunities",      icon: GraduationCap },
  { id: "officers", label: "Officers",           icon: Users },
];


/* ── types ─────────────────────────────────────────────── */

interface HeroPhoto {
  id: string;
  img_path: string;
  url: string;
  height: number;
  sort_order: number;
}

interface MissionPhoto {
  slot: string;
  img_path: string;
}

interface LandingLogo {
  id: string;
  sort_order: number;
  name: string;
  src: string;
  alt: string;
}

interface OfficerCard {
  id: string;
  sort_order: number;
  name: string;
  role: string;
  img: string;
  bio: string | null;
  linkedin: string | null;
  email: string | null;
  is_active: boolean;
}

/* ── Hero Panel ─────────────────────────────────────────── */

function HeroPanel() {
  const supabase = createClient();
  const [photos, setPhotos] = useState<HeroPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function fetchPhotos() {
    setLoading(true);
    const { data, error } = await supabase
      .from("hero_photos")
      .select("*")
      .order("sort_order");
    if (error) { setError(error.message); setLoading(false); return; }
    setPhotos((data ?? []) as HeroPhoto[]);
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchPhotos(); }, []);

  async function addPhoto(file: File) {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("hero-photos")
      .upload(path, file, { upsert: true });
    if (upErr) { setError(upErr.message); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("hero-photos").getPublicUrl(path);
    const nextOrder = photos.length > 0 ? Math.max(...photos.map(p => p.sort_order)) + 1 : 1;
    const { error: dbErr } = await supabase.from("hero_photos").insert({
      img_path: urlData.publicUrl,
      url: "https://www.colorstack.org/",
      height: 320,
      sort_order: nextOrder,
    });
    if (dbErr) setError(dbErr.message);
    else await fetchPhotos();
    setUploading(false);
  }

  async function deletePhoto(photo: HeroPhoto) {
    // Extract storage path from public URL (last segment)
    const storagePath = photo.img_path.split("/").pop();
    if (storagePath) {
      await supabase.storage.from("hero-photos").remove([storagePath]);
    }
    const { error } = await supabase.from("hero_photos").delete().eq("id", photo.id);
    if (error) setError(error.message);
    else await fetchPhotos();
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Hero Section" description="Manage the Masonry gallery photos shown on the landing page." />
      {error && <ErrorBanner message={error} />}
      <Card title="Gallery Photos">
        {loading ? <LoadingState /> : (
          <div className="columns-2 sm:columns-3 gap-2 space-y-2">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                style={{ height: 100 }}
                className="break-inside-avoid w-full rounded-lg bg-white/5 border border-white/10 overflow-hidden relative group hover:border-white/30 transition-colors"
              >
                <img
                  src={photo.img_path}
                  alt={`Hero photo ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-between p-1.5">
                  <span className="text-white/70 text-[9px] font-mono bg-black/50 px-1 rounded">
                    {i + 1}
                  </span>
                  <button
                    onClick={() => deletePhoto(photo)}
                    className="text-[#D1190D]/80 hover:text-[#D1190D] bg-black/50 hover:bg-black/70 rounded p-0.5 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="mt-4 text-xs text-white/30 text-center">
          {photos.length} photos · displayed as a Masonry grid on the landing page
        </p>
        <label className={`mt-2 w-full py-2 rounded-lg border border-dashed flex items-center justify-center gap-2 text-sm cursor-pointer transition-colors ${
          uploading
            ? "border-white/10 text-white/20 cursor-wait"
            : "border-white/20 text-white/40 hover:border-white/40 hover:text-white/60"
        }`}>
          <Upload size={13} />
          {uploading ? "Uploading..." : "+ Add Photo"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={uploading}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) addPhoto(f); }}
          />
        </label>
      </Card>
    </div>
  );
}

const MISSION_SLOTS = [
  { slot: "eboard",   label: "E-Board Photo",  desc: "Full photo shown on the right side" },
  { slot: "mission",  label: "Mission Card",   desc: "Background for Mission pillar card" },
  { slot: "strategy", label: "Strategy Card",  desc: "Background for Strategy pillar card" },
  { slot: "vision",   label: "Vision Card",    desc: "Background for Vision pillar card" },
];

function MissionPanel() {
  const supabase = createClient();
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  async function fetchPhotos() {
    setLoading(true);
    const { data, error } = await supabase.from("mission_photos").select("slot, img_path");
    if (error) setError(error.message);
    else {
      const map: Record<string, string> = {};
      for (const row of (data ?? []) as MissionPhoto[]) map[row.slot] = row.img_path;
      setPhotos(map);
    }
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchPhotos(); }, []);

  async function changePhoto(slot: string, file: File) {
    setUploadingSlot(slot);
    setError(null);
    const ext = file.name.split(".").pop();
    const path = `${slot}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("mission-photos").upload(path, file);
    if (upErr) { setError(upErr.message); setUploadingSlot(null); return; }
    const { data: urlData } = supabase.storage.from("mission-photos").getPublicUrl(path);
    const { error: dbErr } = await supabase
      .from("mission_photos")
      .upsert({ slot, img_path: urlData.publicUrl }, { onConflict: "slot" });
    if (dbErr) setError(dbErr.message);
    else await fetchPhotos();
    setUploadingSlot(null);
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Mission Section" description="Manage the photos used in the mission section." />
      {error && <ErrorBanner message={error} />}
      <Card title="Section Photos">
        {loading ? <LoadingState /> : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MISSION_SLOTS.map(({ slot, label, desc }) => (
              <div key={slot} className="space-y-2">
                <p className="text-xs font-medium text-white/60">{label}</p>
                <p className="text-[10px] text-white/30 leading-tight">{desc}</p>
                <div className="aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/10 relative">
                  {photos[slot] && (
                    <img src={photos[slot]} alt={label} className="w-full h-full object-cover opacity-70" />
                  )}
                </div>
                <label className={`w-full py-1.5 rounded-lg border border-dashed text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  uploadingSlot === slot
                    ? "border-white/10 text-white/20 cursor-wait"
                    : "border-white/20 text-white/40 hover:border-white/40 hover:text-white/60"
                }`}>
                  <Upload size={10} />
                  {uploadingSlot === slot ? "Uploading..." : "Change Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    disabled={uploadingSlot !== null}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) changePhoto(slot, f); }}
                  />
                </label>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ── Programs (Fellowships) Panel ───────────────────────── */

interface ProgramCard {
  id: string;
  title: string;
  description: string;
  deadline: string;
  tag: string;
  eligibility: string;
  image: string;
  college_image: string | null;
  host_name: string | null;
  location: string | null;
  link: string;
  opportunity_type: "program" | "hackathon";
  proximity_rank: number;
  timeline_status: "Open now" | "Opens soon" | "Expected" | "Watch";
  timeline: string;
  previous_timeline: string;
  opens_on: string | null;
  closes_on: string | null;
  sort_order: number;
  source_checked_on: string;
}

const defaultCard: Omit<ProgramCard, "id"> = {
  title: "",
  description: "",
  deadline: "",
  tag: "Internship",
  eligibility: "All Years",
  image: "",
  college_image: null,
  host_name: null,
  location: null,
  link: "",
  opportunity_type: "program",
  proximity_rank: 999,
  timeline_status: "Expected",
  timeline: "",
  previous_timeline: "",
  opens_on: null,
  closes_on: null,
  sort_order: 999,
  source_checked_on: "",
};

const TAG_OPTIONS = ["Internship", "Fellowship", "Research", "Program", "Hackathon"];
const STATUS_OPTIONS: ProgramCard["timeline_status"][] = ["Open now", "Opens soon", "Expected", "Watch"];

function ProgramsPanel() {
  const supabase = createClient();
  const [cards, setCards] = useState<ProgramCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<Omit<ProgramCard, "id">>(defaultCard);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  async function uploadImage(file: File): Promise<string | null> {
    setImageUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("program-images")
      .upload(path, file, { upsert: true });
    setImageUploading(false);
    if (error) { setError(error.message); return null; }
    const { data } = supabase.storage.from("program-images").getPublicUrl(path);
    return data.publicUrl;
  }

  async function fetchCards() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) setError(error.message);
    else setCards(data ?? []);
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchCards(); }, []);

  function openEdit(card: ProgramCard) {
    setEditingId(card.id);
    setShowAddForm(false);
    setForm({
      title: card.title,
      description: card.description,
      deadline: card.deadline,
      tag: card.tag,
      eligibility: card.eligibility,
      image: card.image,
      college_image: card.college_image,
      host_name: card.host_name,
      location: card.location,
      link: card.link,
      opportunity_type: card.opportunity_type,
      proximity_rank: card.proximity_rank,
      timeline_status: card.timeline_status,
      timeline: card.timeline,
      previous_timeline: card.previous_timeline ?? "",
      opens_on: card.opens_on,
      closes_on: card.closes_on,
      sort_order: card.sort_order,
      source_checked_on: card.source_checked_on,
    });
  }

  function openAdd() {
    setEditingId(null);
    setForm(defaultCard);
    setShowAddForm(true);
  }

  function cancelForm() {
    setEditingId(null);
    setShowAddForm(false);
    setForm(defaultCard);
  }

  function validateLink(url: string): boolean {
    if (!url || url === "#") return true;
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
      return false;
    }
  }

  async function saveEdit() {
    if (!editingId) return;
    if (!validateLink(form.link)) { setError("Link must be a valid https:// URL."); return; }
    setSaving(true);
    const payload = { ...form, deadline: form.timeline, source_checked_on: new Date().toISOString().slice(0, 10) };
    const { error } = await supabase.from("programs").update(payload).eq("id", editingId);
    if (error) setError(error.message);
    else { cancelForm(); await fetchCards(); }
    setSaving(false);
  }

  async function saveAdd() {
    if (!validateLink(form.link)) { setError("Link must be a valid https:// URL."); return; }
    setSaving(true);
    const payload = { ...form, deadline: form.timeline, source_checked_on: new Date().toISOString().slice(0, 10) };
    const { error } = await supabase.from("programs").insert(payload);
    if (error) setError(error.message);
    else { cancelForm(); await fetchCards(); }
    setSaving(false);
  }

  async function deleteCard(id: string) {
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) setError(error.message);
    else { if (editingId === id) cancelForm(); await fetchCards(); }
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Programs, Fellowships & Hackathons" description="Add, edit, or remove cards shown on the Opportunities page." />

      {error && (
        <div className="rounded-lg bg-[#D1190D]/10 border border-[#D1190D]/30 px-4 py-3 text-sm text-[#D1190D]">
          {error}
        </div>
      )}

      {/* Card list */}
      <Card title="Current Cards">
        {loading ? (
          <div className="py-8 text-center text-sm text-white/30">Loading...</div>
        ) : (
          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-colors overflow-hidden ${
                  editingId === card.id
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                {/* Thumbnail */}
                <div className="h-14 w-20 max-w-20 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                  {card.college_image || card.image ? (
                    <img src={card.college_image || card.image} alt={card.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-white/20 text-xs">No img</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{card.title}</p>
                  <p className="text-xs text-white/40 mt-0.5 line-clamp-1">{card.description}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/60">{card.tag}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/60 capitalize">{card.opportunity_type}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/60">{card.eligibility}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/60">{card.timeline_status}</span>
                    <span className="text-[10px] text-white/30">Priority: {card.sort_order}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-white/45 line-clamp-1">{card.timeline}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(card)}
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => deleteCard(card.id)}
                    className="p-1.5 rounded-lg text-[#D1190D]/50 hover:text-[#D1190D] hover:bg-[#D1190D]/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={openAdd}
          className="mt-3 w-full py-2.5 rounded-xl border border-dashed border-white/20 text-white/40 text-sm hover:border-white/40 hover:text-white/60 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Add Card
        </button>
      </Card>

      {/* Edit / Add form */}
      {(editingId !== null || showAddForm) && (
        <Card title={editingId ? "Edit Card" : "New Card"}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Google STEP Internship"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Tag">
              <select
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              >
                {TAG_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>

            <Field label="Opportunity type">
              <select
                value={form.opportunity_type}
                onChange={(e) => setForm({ ...form, opportunity_type: e.target.value as ProgramCard["opportunity_type"] })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              >
                <option value="program">Program</option>
                <option value="hackathon">Hackathon</option>
              </select>
            </Field>

            <Field label="Timeline status">
              <select
                value={form.timeline_status}
                onChange={(e) => setForm({ ...form, timeline_status: e.target.value as ProgramCard["timeline_status"] })}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              >
                {STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </Field>

            <Field label="Eligibility">
              <input
                value={form.eligibility}
                onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
                placeholder="e.g. 1st & 2nd Year"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Sort priority">
              <input
                type="number"
                min={1}
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) || 999 })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Distance priority (lower is closer)">
              <input
                type="number"
                min={0}
                value={form.proximity_rank}
                onChange={(e) => setForm({ ...form, proximity_rank: Number(e.target.value) || 0 })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Host college">
              <input
                value={form.host_name ?? ""}
                onChange={(e) => setForm({ ...form, host_name: e.target.value || null })}
                placeholder="e.g. Rutgers University-New Brunswick"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Location">
              <input
                value={form.location ?? ""}
                onChange={(e) => setForm({ ...form, location: e.target.value || null })}
                placeholder="e.g. Piscataway, NJ"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Campus image path">
              <input
                value={form.college_image ?? ""}
                onChange={(e) => setForm({ ...form, college_image: e.target.value || null })}
                placeholder="/resources/campuses/rutgers.jpg"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Image">
              <label className="flex flex-col gap-2 cursor-pointer">
                <div className={`flex items-center gap-3 w-full border rounded-lg px-3 py-2 text-sm transition-colors ${
                  imageUploading
                    ? "border-white/10 bg-white/5 opacity-60 cursor-wait"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}>
                  <Upload size={14} className="text-white/40 shrink-0" />
                  <span className="text-white/40 truncate">
                    {imageUploading ? "Uploading..." : form.image ? "Change image" : "Choose image from computer"}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  disabled={imageUploading}
                  className="sr-only"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await uploadImage(file);
                    if (url) setForm({ ...form, image: url });
                  }}
                />
              </label>
              {form.image && (
                <div className="mt-2 h-20 w-full rounded-lg overflow-hidden border border-white/10">
                  <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </Field>

            <Field label="Link (URL)">
              <input
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Description" className="sm:col-span-2">
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short description of the opportunity..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 resize-none"
              />
            </Field>

            <Field label="Current / next timeline" className="sm:col-span-2">
              <input
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                placeholder="e.g. Opens Sep 11, 2026; closes Oct 18"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Previous cycle reference" className="sm:col-span-2">
              <textarea
                value={form.previous_timeline}
                onChange={(e) => setForm({ ...form, previous_timeline: e.target.value })}
                placeholder="Specific prior opening window or program dates..."
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 resize-none"
              />
            </Field>

            <Field label="Announced opening date (optional)">
              <input
                type="date"
                value={form.opens_on ?? ""}
                onChange={(e) => setForm({ ...form, opens_on: e.target.value || null })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Announced closing date (optional)">
              <input
                type="date"
                value={form.closes_on ?? ""}
                onChange={(e) => setForm({ ...form, closes_on: e.target.value || null })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              />
            </Field>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={editingId ? saveEdit : saveAdd}
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-[#D1190D] text-white text-sm font-medium hover:bg-[#a82525] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : editingId ? "Save Changes" : "Add Card"}
            </button>
            <button
              onClick={cancelForm}
              className="px-4 py-2 rounded-lg border border-white/15 text-white/50 text-sm hover:border-white/30 hover:text-white/70 transition-colors flex items-center gap-1.5"
            >
              <X size={13} /> Cancel
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

/* Officers Panel */

const defaultOfficer: Omit<OfficerCard, "id"> = {
  sort_order: 1,
  name: "",
  role: "",
  img: "",
  bio: "",
  linkedin: "",
  email: "",
  is_active: true,
};

function OfficersPanel() {
  const supabase = createClient();
  const [officers, setOfficers] = useState<OfficerCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<Omit<OfficerCard, "id">>(defaultOfficer);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  async function fetchOfficers() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("eboard_members")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) setError(error.message);
    else setOfficers((data ?? []) as OfficerCard[]);
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => { fetchOfficers(); }, []);

  async function uploadOfficerImage(file: File): Promise<string | null> {
    setImageUploading(true);
    setError(null);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("officer-images")
      .upload(path, file, { upsert: true });
    setImageUploading(false);
    if (error) { setError(error.message); return null; }
    const { data } = supabase.storage.from("officer-images").getPublicUrl(path);
    return data.publicUrl;
  }

  function openEdit(officer: OfficerCard) {
    setEditingId(officer.id);
    setShowAddForm(false);
    setForm({
      sort_order: officer.sort_order,
      name: officer.name,
      role: officer.role,
      img: officer.img,
      bio: officer.bio ?? "",
      linkedin: officer.linkedin ?? "",
      email: officer.email ?? "",
      is_active: officer.is_active,
    });
  }

  function openAdd() {
    const nextOrder = officers.length > 0 ? Math.max(...officers.map((o) => o.sort_order)) + 1 : 1;
    setEditingId(null);
    setForm({ ...defaultOfficer, sort_order: nextOrder });
    setShowAddForm(true);
  }

  function cancelForm() {
    setEditingId(null);
    setShowAddForm(false);
    setForm(defaultOfficer);
  }

  function validateOfficer() {
    if (!form.name.trim() || !form.role.trim()) return "Name and role are required.";
    if (!form.img.trim()) return "Officer image is required.";
    if (form.linkedin && !validateUrl(form.linkedin)) return "LinkedIn must be a valid http:// or https:// URL.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Email must be a valid email address.";
    return null;
  }

  async function saveOfficer() {
    const validationError = validateOfficer();
    if (validationError) { setError(validationError); return; }

    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      name: form.name.trim(),
      role: form.role.trim(),
      img: form.img.trim(),
      bio: form.bio?.trim() || null,
      linkedin: form.linkedin?.trim() || null,
      email: form.email?.trim() || null,
      sort_order: Number(form.sort_order) || 1,
    };

    const { error } = editingId
      ? await supabase.from("eboard_members").update(payload).eq("id", editingId)
      : await supabase.from("eboard_members").insert(payload);

    if (error) setError(error.message);
    else { cancelForm(); await fetchOfficers(); }
    setSaving(false);
  }

  async function deleteOfficer(id: string) {
    const { error } = await supabase.from("eboard_members").delete().eq("id", id);
    if (error) setError(error.message);
    else { if (editingId === id) cancelForm(); await fetchOfficers(); }
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Officers" description="Add, edit, reorder, or hide leadership cards shown on the Officers page." />
      {error && <ErrorBanner message={error} />}

      <Card title="Current Officers">
        {loading ? <LoadingState /> : (
          <div className="space-y-3">
            {officers.map((officer) => (
              <div
                key={officer.id}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-colors overflow-hidden ${
                  editingId === officer.id
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="h-16 w-14 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                  {officer.img ? (
                    <img src={officer.img} alt={officer.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-white/20 text-[10px]">No img</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">{officer.name}</p>
                    {!officer.is_active && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/45">Hidden</span>
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">{officer.role}</p>
                  <p className="text-xs text-white/35 mt-1 line-clamp-1">{officer.bio}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-[10px] text-white/30">Order: {officer.sort_order}</span>
                    {officer.email && <span className="text-[10px] text-white/30">{officer.email}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(officer)}
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => deleteOfficer(officer.id)}
                    className="p-1.5 rounded-lg text-[#D1190D]/50 hover:text-[#D1190D] hover:bg-[#D1190D]/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={openAdd}
          className="mt-3 w-full py-2.5 rounded-xl border border-dashed border-white/20 text-white/40 text-sm hover:border-white/40 hover:text-white/60 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Add Officer
        </button>
      </Card>

      {(editingId !== null || showAddForm) && (
        <Card title={editingId ? "Edit Officer" : "New Officer"}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Alejandro"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Role">
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. President"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Order">
              <input
                type="number"
                min="1"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Visible">
              <label className="flex h-10 items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white/60">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="h-4 w-4 accent-[#D1190D]"
                />
                Show on officers page
              </label>
            </Field>

            <Field label="Image">
              <label className="flex flex-col gap-2 cursor-pointer">
                <div className={`flex items-center gap-3 w-full border rounded-lg px-3 py-2 text-sm transition-colors ${
                  imageUploading
                    ? "border-white/10 bg-white/5 opacity-60 cursor-wait"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}>
                  <Upload size={14} className="text-white/40 shrink-0" />
                  <span className="text-white/40 truncate">
                    {imageUploading ? "Uploading..." : form.img ? "Change image" : "Choose image from computer"}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  disabled={imageUploading}
                  className="sr-only"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await uploadOfficerImage(file);
                    if (url) setForm({ ...form, img: url });
                  }}
                />
              </label>
              {form.img && (
                <div className="mt-2 h-28 w-24 rounded-lg overflow-hidden border border-white/10">
                  <img src={form.img} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </Field>

            <Field label="Email">
              <input
                value={form.email ?? ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@montclair.edu"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="LinkedIn URL" className="sm:col-span-2">
              <input
                value={form.linkedin ?? ""}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                placeholder="https://www.linkedin.com/in/..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
              />
            </Field>

            <Field label="Bio" className="sm:col-span-2">
              <textarea
                value={form.bio ?? ""}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Short leadership bio..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 resize-none"
              />
            </Field>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={saveOfficer}
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-[#D1190D] text-white text-sm font-medium hover:bg-[#a82525] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : editingId ? "Save Changes" : "Add Officer"}
            </button>
            <button
              onClick={cancelForm}
              className="px-4 py-2 rounded-lg border border-white/15 text-white/50 text-sm hover:border-white/30 hover:text-white/70 transition-colors flex items-center gap-1.5"
            >
              <X size={13} /> Cancel
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-lg bg-[#D1190D]/10 border border-[#D1190D]/30 px-4 py-3 text-sm text-[#D1190D]">
      {message}
    </div>
  );
}

function LoadingState() {
  return <div className="py-8 text-center text-sm text-white/30">Loading...</div>;
}

function validateUrl(url: string): boolean {
  if (!url) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs font-medium text-white/50">{label}</label>
      {children}
    </div>
  );
}

function LandingPanel() {
  const supabase = createClient();
  const [logos, setLogos] = useState<LandingLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", alt: "", src: "" });
  const [addUploading, setAddUploading] = useState(false);

  async function fetchLogos() {
    setLoading(true);
    const { data, error } = await supabase.from("landing_logos").select("*").order("sort_order");
    if (error) setError(error.message);
    else setLogos(data ?? []);
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchLogos(); }, []);

  async function uploadLogoFile(file: File): Promise<string | null> {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("landing-logos").upload(path, file, { upsert: true });
    if (error) { setError(error.message); return null; }
    const { data } = supabase.storage.from("landing-logos").getPublicUrl(path);
    return data.publicUrl;
  }

  async function deleteLogo(id: string) {
    const { error } = await supabase.from("landing_logos").delete().eq("id", id);
    if (error) setError(error.message);
    else await fetchLogos();
  }

  async function addLogo() {
    if (!addForm.name || !addForm.src) { setError("Name and logo image are required."); return; }
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) await supabase.auth.refreshSession();
    const maxOrder = logos.reduce((m, l) => Math.max(m, l.sort_order), 0);
    const { error } = await supabase.from("landing_logos").insert({
      name: addForm.name,
      alt: addForm.alt || addForm.name,
      src: addForm.src,
      sort_order: maxOrder + 1,
    });
    if (error) setError(error.message);
    else { setAddForm({ name: "", alt: "", src: "" }); setShowAddForm(false); await fetchLogos(); }
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Where We've Landed" description="Manage the scrolling company logos strip." />
      {error && <ErrorBanner message={error} />}
      <Card title="Company Logos">
        {loading ? <LoadingState /> : (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {logos.map((logo) => (
              <div key={logo.id} className="group rounded-lg bg-white/5 border border-white/10 p-3 flex flex-col items-center gap-2 hover:border-white/20 transition-colors">
                <div className="h-8 w-full flex items-center justify-center">
                  <img src={logo.src} alt={logo.alt} className="h-5 max-w-full object-contain brightness-0 invert opacity-60" />
                </div>
                <span className="text-[10px] text-white/40 text-center leading-tight">{logo.name}</span>
                <button
                  onClick={() => deleteLogo(logo.id)}
                  className="text-[10px] text-[#D1190D]/50 hover:text-[#D1190D] transition-colors opacity-0 group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {showAddForm && (
          <div className="mt-4 p-4 border border-white/10 rounded-xl space-y-3">
            <p className="text-xs font-medium text-white/60">Add Company</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Company Name">
                <input
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  placeholder="e.g. Google"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
                />
              </Field>
              <Field label="Alt Text">
                <input
                  value={addForm.alt}
                  onChange={(e) => setAddForm({ ...addForm, alt: e.target.value })}
                  placeholder="Defaults to name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30"
                />
              </Field>
              <Field label="Logo File (SVG or PNG)" className="sm:col-span-2">
                <label className={`flex items-center gap-3 w-full border rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors ${
                  addUploading ? "border-white/10 bg-white/5 opacity-60 cursor-wait" : "border-white/10 bg-white/5 hover:border-white/30"
                }`}>
                  <Upload size={14} className="text-white/40 shrink-0" />
                  <span className="text-white/40">{addUploading ? "Uploading..." : addForm.src ? "Change logo" : "Choose logo file"}</span>
                  <input
                    type="file"
                    accept="image/svg+xml,image/png,image/webp"
                    className="sr-only"
                    disabled={addUploading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setAddUploading(true);
                      const url = await uploadLogoFile(file);
                      if (url) setAddForm({ ...addForm, src: url });
                      setAddUploading(false);
                    }}
                  />
                </label>
                {addForm.src && (
                  <div className="mt-2 h-10 w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center px-4">
                    <img src={addForm.src} alt="Preview" className="h-5 max-w-full object-contain brightness-0 invert opacity-60" />
                  </div>
                )}
              </Field>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addLogo}
                disabled={saving}
                className="px-5 py-2 rounded-lg bg-[#D1190D] text-white text-sm font-medium hover:bg-[#a82525] transition-colors disabled:opacity-50"
              >
                {saving ? "Adding..." : "Add Company"}
              </button>
              <button
                onClick={() => { setShowAddForm(false); setAddForm({ name: "", alt: "", src: "" }); }}
                className="px-4 py-2 rounded-lg border border-white/15 text-white/50 text-sm hover:border-white/30 hover:text-white/70 transition-colors flex items-center gap-1.5"
              >
                <X size={13} /> Cancel
              </button>
            </div>
          </div>
        )}

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-3 w-full py-2.5 rounded-xl border border-dashed border-white/20 text-white/40 text-sm hover:border-white/40 hover:text-white/60 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={14} /> Add Company
          </button>
        )}
      </Card>
    </div>
  );
}

/* ── shared sub-components ───────────────────────────────── */

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-b border-white/10 pb-4">
      <h1 className="text-lg font-semibold text-white">{title}</h1>
      <p className="text-sm text-white/40 mt-0.5">{description}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
      <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">{title}</p>
      {children}
    </div>
  );
}

/* main shell */

export default function AdminShell({ email }: AdminShellProps) {
  const router = useRouter();
  const [active, setActive] = useState("hero");

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/Components_Login");
  }

  const panel: Record<string, React.ReactNode> = {
    hero:     <HeroPanel />,
    mission:  <MissionPanel />,
    landing:  <LandingPanel />,
    resources: <ResourcesPanel />,
    programs: <ProgramsPanel />,
    officers: <OfficersPanel />,
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-950 border-r border-white/10 flex flex-col">
        {/* Brand */}
        <div className="px-5 pt-6 pb-4 border-b border-white/10">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest leading-tight">ColorStack</p>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest leading-tight">Admin Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="px-3 pb-1 text-[10px] font-semibold text-white/20 uppercase tracking-widest">Main Site</p>
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active === id
                  ? "bg-[#D1190D] text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-xs text-white/50 truncate">{email}</span>
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 text-sm text-white/70 hover:bg-white/10 transition-colors"
          >
            <Globe size={15} />
            View Site
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-[#D1190D]/40 text-sm text-[#D1190D] hover:bg-[#D1190D]/10 transition-colors"
          >
            <LogOut size={15} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        {panel[active]}
      </main>
    </div>
  );
}

