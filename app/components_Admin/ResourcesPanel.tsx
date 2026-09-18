"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { ExternalLink, Pencil, Plus, Trash2, Upload, X } from "lucide-react";

interface ResourceCard {
  id: string;
  sort_order: number;
  title: string;
  event: string;
  description: string;
  date: string;
  image: string;
  slides_url: string;
  is_active: boolean;
}

const defaultResource: Omit<ResourceCard, "id"> = {
  sort_order: 1,
  title: "",
  event: "Workshop Slides",
  description: "",
  date: "ColorStack MSU",
  image: "",
  slides_url: "",
  is_active: true,
};

const fallbackResourceCards: ResourceCard[] = [
  {
    id: "freshman-schedule-help-day",
    sort_order: 1,
    title: "Freshman Schedule Help Day",
    event: "Workshop Slides",
    description:
      "Presentation deck from our schedule planning session, built to help members choose classes and plan a stronger semester.",
    date: "ColorStack MSU",
    image: "/resources/ScheduleHelpDay.png",
    slides_url: "https://canva.link/xk9xdoog1q9nt89",
    is_active: true,
  },
];

function validateUrl(value: string) {
  return /^https?:\/\//.test(value);
}

export default function ResourcesPanel() {
  const supabase = createClient();
  const [resources, setResources] = useState<ResourceCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schemaMissing, setSchemaMissing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<Omit<ResourceCard, "id">>(defaultResource);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  async function fetchResources() {
    setLoading(true);
    setError(null);
    setSchemaMissing(false);

    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      if (error.code === "PGRST205") {
        setSchemaMissing(true);
        setResources(fallbackResourceCards);
      } else {
        setError(error.message);
      }
    } else {
      setResources((data ?? []) as ResourceCard[]);
    }

    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => { fetchResources(); }, []);

  async function uploadResourceImage(file: File): Promise<string | null> {
    setImageUploading(true);
    setError(null);

    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("resource-images")
      .upload(path, file, { upsert: true });

    setImageUploading(false);

    if (error) {
      setError(error.message);
      return null;
    }

    const { data } = supabase.storage.from("resource-images").getPublicUrl(path);
    return data.publicUrl;
  }

  function openAdd() {
    if (schemaMissing) return;

    const nextOrder = resources.length > 0
      ? Math.max(...resources.map((resource) => resource.sort_order)) + 1
      : 1;

    setEditingId(null);
    setForm({ ...defaultResource, sort_order: nextOrder });
    setShowAddForm(true);
  }

  function openEdit(resource: ResourceCard) {
    if (schemaMissing) return;

    setEditingId(resource.id);
    setShowAddForm(false);
    setForm({
      sort_order: resource.sort_order,
      title: resource.title,
      event: resource.event,
      description: resource.description,
      date: resource.date,
      image: resource.image,
      slides_url: resource.slides_url,
      is_active: resource.is_active,
    });
  }

  function cancelForm() {
    setEditingId(null);
    setShowAddForm(false);
    setForm(defaultResource);
  }

  function validateResource() {
    if (!form.title.trim()) return "Title is required.";
    if (!form.description.trim()) return "Description is required.";
    if (!form.image.trim()) return "Resource image is required.";
    if (!form.slides_url.trim()) return "Resource URL is required.";
    if (!validateUrl(form.slides_url)) return "Resource URL must be a valid http:// or https:// URL.";
    return null;
  }

  async function saveResource() {
    const validationError = validateResource();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      sort_order: Number(form.sort_order) || 1,
      title: form.title.trim(),
      event: form.event.trim() || "Resource",
      description: form.description.trim(),
      date: form.date.trim() || "ColorStack MSU",
      image: form.image.trim(),
      slides_url: form.slides_url.trim(),
    };

    const { error } = editingId
      ? await supabase.from("resources").update(payload).eq("id", editingId)
      : await supabase.from("resources").insert(payload);

    if (error) {
      setError(error.message);
    } else {
      cancelForm();
      await fetchResources();
    }

    setSaving(false);
  }

  async function deleteResource(id: string) {
    if (schemaMissing) return;

    const { error } = await supabase.from("resources").delete().eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      if (editingId === id) cancelForm();
      await fetchResources();
    }
  }

  const formOpen = showAddForm || editingId;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Resources"
        description="Add, edit, reorder, or hide cards shown on the Events & Resources page."
      />

      {schemaMissing && (
        <InfoBanner message="The Supabase resources table is missing. Apply supabase/resources_setup.sql, then reload this panel to enable editing." />
      )}
      {error && <ErrorBanner message={error} />}

      <Card title="Current Resources">
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={openAdd}
            disabled={schemaMissing}
            className="inline-flex items-center gap-2 rounded-lg bg-[#D1190D] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#A8140A] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add resource
          </button>
        </div>

        {loading ? (
          <LoadingState />
        ) : (
          <div className="space-y-3">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className={`flex items-start gap-4 overflow-hidden rounded-xl border p-4 transition-colors ${
                  editingId === resource.id
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="h-14 w-20 max-w-20 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  {resource.image ? (
                    <img src={resource.image} alt={resource.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-white/20">No img</div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-white">{resource.title}</p>
                    {!resource.is_active && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/45">Hidden</span>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-white/40">{resource.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">{resource.event}</span>
                    <span className="text-[10px] text-white/30">Order: {resource.sort_order}</span>
                    <span className="text-[10px] text-white/30">{resource.date}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {resource.slides_url && (
                    <a
                      href={resource.slides_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                      aria-label={`Open ${resource.title}`}
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => openEdit(resource)}
                    disabled={schemaMissing}
                    className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Edit ${resource.title}`}
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteResource(resource.id)}
                    disabled={schemaMissing}
                    className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Delete ${resource.title}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}

            {resources.length === 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-10 text-center text-sm text-white/40">
                No resources yet.
              </div>
            )}
          </div>
        )}
      </Card>

      {formOpen && (
        <Card title={editingId ? "Edit Resource" : "Add Resource"}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
            <TextField label="Event label" value={form.event} onChange={(value) => setForm({ ...form, event: value })} />
            <TextField label="Date label" value={form.date} onChange={(value) => setForm({ ...form, date: value })} />
            <TextField
              label="Sort order"
              type="number"
              value={String(form.sort_order)}
              onChange={(value) => setForm({ ...form, sort_order: Number(value) })}
            />
            <TextField
              label="Resource URL"
              value={form.slides_url}
              onChange={(value) => setForm({ ...form, slides_url: value })}
              className="md:col-span-2"
            />
            <TextArea
              label="Description"
              value={form.description}
              onChange={(value) => setForm({ ...form, description: value })}
              className="md:col-span-2"
            />
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/45">Image URL</label>
              <div className="flex gap-2">
                <input
                  value={form.image}
                  onChange={(event) => setForm({ ...form, image: event.target.value })}
                  className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/30"
                  placeholder="/resources/example.png"
                />
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10">
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  {imageUploading ? "Uploading..." : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={imageUploading}
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      const publicUrl = await uploadResourceImage(file);
                      if (publicUrl) setForm({ ...form, image: publicUrl });
                    }}
                  />
                </label>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-white/70">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(event) => setForm({ ...form, is_active: event.target.checked })}
                className="h-4 w-4 accent-[#D1190D]"
              />
              Show on resources page
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={cancelForm}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Cancel
            </button>
            <button
              type="button"
              onClick={saveResource}
              disabled={saving}
              className="rounded-lg bg-[#D1190D] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#A8140A] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save resource"}
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="mt-1 text-sm text-white/45">{description}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-white/45">{title}</h3>
      {children}
    </section>
  );
}

function LoadingState() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-10 text-center text-sm text-white/40">
      Loading resources...
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
      {message}
    </div>
  );
}

function InfoBanner({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-yellow-300/20 bg-yellow-300/10 px-4 py-3 text-sm text-yellow-50">
      {message}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`space-y-2 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-white/45">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/30"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`space-y-2 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-white/45">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/30"
      />
    </label>
  );
}
