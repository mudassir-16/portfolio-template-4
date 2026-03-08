"use client";

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import {
    getPortfolioData,
    updateProfile,
    updateAchievement,
    addAchievement,
    deleteAchievement,
    updateSkill,
    addSkill,
    deleteSkill,
    updateProject,
    addProject,
    deleteProject,
    updateEducation,
    updateLeadership,
    addLeadership,
    deleteLeadership,
    uploadFile
} from '@/lib/db_service';
import { LogOut, Save, Plus, Trash2, Image as ImageIcon, Loader2, GraduationCap, Briefcase, Code, Star, FileText } from 'lucide-react';

// Image Upload Helper Component
const ImageUploader = ({ onUpload, initialUrl }: { onUpload: (url: string) => void, initialUrl: string }) => {
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
            const publicUrl = await uploadFile(file, fileName);
            onUpload(publicUrl);
        } catch (err) {
            alert('Upload failed: ' + (err as any).message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 aspect-video flex items-center justify-center">
            {initialUrl && (
                <img src={initialUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-60" />
            )}
            <div className="z-10 bg-black/40 backdrop-blur-md p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer border border-white/20" onClick={() => fileRef.current?.click()}>
                {uploading ? <Loader2 className="animate-spin text-accent-gold" /> : <ImageIcon className="text-white" />}
            </div>
            <input type="file" ref={fileRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>
    );
};

// Universal File Upload Component
const FileUploader = ({ onUpload, initialUrl, label }: { onUpload: (url: string) => void, initialUrl?: string, label: string }) => {
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
            const publicUrl = await uploadFile(file, fileName);
            onUpload(publicUrl);
        } catch (err: any) {
            alert('Upload failed: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            onClick={() => fileRef.current?.click()}
            className="group cursor-pointer glass-card p-6 flex flex-col items-center justify-center border-white/5 hover:border-accent-gold/40 transition-all gap-4"
        >
            {uploading ? (
                <Loader2 className="animate-spin text-accent-gold" size={32} />
            ) : (
                <FileText className={initialUrl ? 'text-accent-gold' : 'text-white/20'} size={32} />
            )}
            <div className="text-center">
                <p className="text-[10px] uppercase font-bold tracking-[0.2em]">{label}</p>
                <p className="text-[8px] text-white/40 mt-1">{initialUrl ? 'Document Linked' : 'No File Uploaded'}</p>
            </div>
            <input type="file" ref={fileRef} onChange={handleFileChange} className="hidden" />
        </div>
    );
};

export default function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('identity');

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                fetchData();
            } else {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const fetchData = async () => {
        try {
            const portfolioData = await getPortfolioData();
            setData(portfolioData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert(error.message);
        } else {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            fetchData();
        }
        setAuthLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setData(null);
    };

    const updateLocalItem = (collection: string, id: string, field: string, value: any) => {
        setData((prev: any) => {
            if (!prev) return prev;

            if (collection === 'skills') {
                return {
                    ...prev,
                    skills: {
                        ...prev.skills,
                        technical: prev.skills.technical.map((s: any) => s.id === id ? { ...s, [field]: value } : s)
                    }
                };
            }

            return {
                ...prev,
                [collection]: prev[collection].map((item: any) => item.id === id ? { ...item, [field]: value } : item)
            };
        });
    };

    if (loading) return <div className="min-h-screen bg-[#1a0202] text-white flex items-center justify-center font-serif italic text-2xl">Loading Dashboard...</div>;

    if (!user) {
        return (
            <div className="min-h-screen bg-[#1a0202] text-white flex items-center justify-center p-6">
                <div className="glass-card p-12 max-w-md w-full border-accent-gold/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 blur-3xl" />
                    <h1 className="editorial-title text-4xl mb-8 italic">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-gold transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-gold transition-all"
                                required
                            />
                        </div>
                        <button
                            disabled={authLoading}
                            className="w-full py-4 bg-accent-gold text-black font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all disabled:opacity-50"
                        >
                            {authLoading ? 'Authenticating...' : 'Enter Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (!data) return <div className="min-h-screen bg-[#1a0202] text-white flex flex-col items-center justify-center text-xl italic">Syncing with database...</div>;

    const sections = [
        { id: 'identity', label: 'Identity', icon: Star },
        { id: 'achievements', label: 'Snapshots', icon: ImageIcon },
        { id: 'skills', label: 'Expertise', icon: Code },
        { id: 'projects', label: 'Work', icon: Briefcase },
        { id: 'education', label: 'Studies', icon: GraduationCap }
    ];

    return (
        <div className="min-h-screen bg-[#1a0202] text-white flex">
            {/* Sidebar Navigation */}
            <aside className="w-72 border-r border-white/5 flex flex-col p-8 fixed h-full bg-[#1a0202]">
                <div className="mb-12">
                    <h1 className="editorial-title text-3xl italic">Editor.</h1>
                    <p className="text-[9px] uppercase tracking-widest text-white/40 mt-1 font-bold">Authenticated Profile Management</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-sans text-xs tracking-widest font-bold uppercase ${activeTab === section.id
                                ? 'bg-accent-gold text-black'
                                : 'bg-transparent text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <section.icon size={16} />
                            {section.label}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 hover:bg-accent-red hover:text-white transition-all text-xs tracking-widest font-bold uppercase"
                >
                    <LogOut size={16} /> Logout
                </button>
            </aside>

            {/* Main Content Areas */}
            <main className="flex-1 ml-72 p-16 pb-32 max-w-7xl">
                <div className="max-w-4xl mx-auto">

                    {/* Identity Tab */}
                    {activeTab === 'identity' && (
                        <div className="space-y-12">
                            <div className="flex items-center gap-6">
                                <h1 className="editorial-title text-6xl italic">Identity</h1>
                                <div className="h-[1px] flex-1 bg-white/5" />
                            </div>

                            <div className="glass-card p-12 border-white/10 space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                    <div className="md:col-span-1 space-y-4">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">Profile Image</label>
                                        <ImageUploader
                                            initialUrl={data.profile.profile_image}
                                            onUpload={(url) => setData({ ...data, profile: { ...data.profile, profile_image: url } })}
                                        />
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 mt-8 block">Professional CV</label>
                                        <FileUploader
                                            label="Resume / Portfolio"
                                            initialUrl={data.profile.resume_url}
                                            onUpload={(url) => setData({ ...data, profile: { ...data.profile, resume_url: url } })}
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">Full Name</label>
                                            <input
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent-gold outline-none transition-all text-xl"
                                                value={data.profile.name}
                                                onChange={(e) => setData({ ...data, profile: { ...data.profile, name: e.target.value } })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">Bio</label>
                                            <textarea
                                                className="w-full h-40 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-accent-gold outline-none transition-all text-lg italic font-serif leading-relaxed"
                                                value={data.profile.bio}
                                                onChange={(e) => setData({ ...data, profile: { ...data.profile, bio: e.target.value } })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => updateProfile(data.profile.id, data.profile)}
                                    className="flex items-center gap-4 px-10 py-5 bg-accent-gold text-black font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-white transition-all ml-auto hover:scale-105 active:scale-95"
                                >
                                    <Save size={18} /> Update Profile
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Achievements Tab */}
                    {activeTab === 'achievements' && (
                        <div className="space-y-12">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6 flex-1">
                                    <h1 className="editorial-title text-6xl italic">Snapshots</h1>
                                    <div className="h-[1px] flex-1 bg-white/5" />
                                </div>
                                <button
                                    onClick={async () => {
                                        const newAch = await addAchievement({ title: 'Untitled', date: 'Date', location: 'Location', event: '', image_url: '/images/m2.png' });
                                        setData({ ...data, achievements: [...data.achievements || [], newAch] });
                                    }}
                                    className="ml-6 p-5 rounded-3xl bg-white/5 hover:bg-accent-gold hover:text-black transition-all border border-white/10"
                                >
                                    <Plus size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {(data.achievements || []).map((ach: any) => (
                                    <div key={ach.id} className="glass-card p-8 border-white/10 space-y-6 group">
                                        <ImageUploader
                                            initialUrl={ach.image_url}
                                            onUpload={(url) => {
                                                updateLocalItem('achievements', ach.id, 'image_url', url);
                                                updateAchievement(ach.id, { image_url: url });
                                            }}
                                        />
                                        <div className="space-y-4">
                                            <input
                                                className="bg-transparent text-2xl font-serif font-bold w-full focus:outline-none border-b border-transparent focus:border-white/10 pb-2"
                                                value={ach.title || ''}
                                                onChange={(e) => updateLocalItem('achievements', ach.id, 'title', e.target.value)}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input placeholder="Date" className="bg-transparent text-[10px] text-white/40 uppercase font-bold tracking-widest focus:outline-none" value={ach.date || ''} onChange={(e) => updateLocalItem('achievements', ach.id, 'date', e.target.value)} />
                                                <input placeholder="Location" className="bg-transparent text-[10px] text-white/40 uppercase font-bold tracking-widest text-right focus:outline-none" value={ach.location || ''} onChange={(e) => updateLocalItem('achievements', ach.id, 'location', e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-6 pt-4 border-t border-white/5">
                                            <button onClick={() => updateAchievement(ach.id, ach)} className="text-accent-gold hover:text-white transition-all"><Save size={20} /></button>
                                            <button
                                                onClick={async () => {
                                                    if (confirm('Delete?')) {
                                                        await deleteAchievement(ach.id);
                                                        setData({ ...data, achievements: data.achievements.filter((a: any) => a.id !== ach.id) });
                                                    }
                                                }}
                                                className="text-white/20 hover:text-accent-red transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Expertise/Skills Tab */}
                    {activeTab === 'skills' && (
                        <div className="space-y-12">
                            <div className="flex items-center gap-6">
                                <h1 className="editorial-title text-6xl italic">Expertise</h1>
                                <div className="h-[1px] flex-1 bg-white/5" />
                                <button
                                    onClick={async () => {
                                        await addSkill({ name: 'New Skill', type: 'technical', level: 'Intermediate' });
                                        fetchData();
                                    }}
                                    className="p-5 rounded-3xl bg-white/5 hover:bg-accent-gold transition-all"
                                >
                                    <Plus size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {(data.skills?.technical || []).map((skill: any) => (
                                    <div key={skill.id} className="glass-card px-8 py-6 flex items-center justify-between border-white/5">
                                        <input
                                            className="bg-transparent text-xl font-serif font-bold focus:outline-none"
                                            value={skill.name || ''}
                                            onChange={(e) => updateLocalItem('skills', skill.id, 'name', e.target.value)}
                                        />
                                        <div className="flex items-center gap-8">
                                            <select className="bg-white/5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest outline-none border border-white/10" value={skill.level} onChange={(e) => {
                                                updateLocalItem('skills', skill.id, 'level', e.target.value);
                                                updateSkill(skill.id, { level: e.target.value });
                                            }}>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Proficient">Proficient</option>
                                                <option value="Expert">Expert</option>
                                            </select>
                                            <button onClick={() => updateSkill(skill.id, skill)} className="text-accent-gold"><Save size={18} /></button>
                                            <button onClick={() => deleteSkill(skill.id).then(fetchData)} className="text-white/20 hover:text-accent-red"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects Tab */}
                    {activeTab === 'projects' && (
                        <div className="space-y-12">
                            <div className="flex items-center gap-6">
                                <h1 className="editorial-title text-6xl italic">Work</h1>
                                <div className="h-[1px] flex-1 bg-white/5" />
                                <button onClick={async () => {
                                    await addProject({ title: 'New Project', subtitle: '', description: '', technologies: [], github_url: '', image_url: '' });
                                    fetchData();
                                }} className="p-5 rounded-3xl bg-white/5 hover:bg-accent-gold transition-all"><Plus size={24} /></button>
                            </div>
                            <div className="space-y-8">
                                {(data.projects || []).map((proj: any) => (
                                    <div key={proj.id} className="glass-card p-10 border-white/10 grid grid-cols-1 md:grid-cols-3 gap-12">
                                        <div className="md:col-span-1">
                                            <ImageUploader initialUrl={proj.image_url} onUpload={(url) => {
                                                updateLocalItem('projects', proj.id, 'image_url', url);
                                                updateProject(proj.id, { image_url: url });
                                            }} />
                                        </div>
                                        <div className="md:col-span-2 space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    placeholder="Year/Date"
                                                    className="bg-transparent text-[10px] text-white/40 uppercase font-bold tracking-widest focus:outline-none"
                                                    value={proj.subtitle || ''}
                                                    onChange={(e) => updateLocalItem('projects', proj.id, 'subtitle', e.target.value)}
                                                />
                                                <div className="text-[10px] text-white/20 uppercase font-bold tracking-widest text-right">Project Era</div>
                                            </div>
                                            <textarea
                                                className="bg-transparent text-white/60 w-full h-32 focus:outline-none italic"
                                                value={proj.description || ''}
                                                onChange={(e) => updateLocalItem('projects', proj.id, 'description', e.target.value)}
                                            />
                                            <div className="flex justify-end gap-6 pt-6 border-t border-white/5">
                                                <button onClick={() => updateProject(proj.id, proj)} className="text-accent-gold"><Save size={24} /></button>
                                                <button onClick={() => deleteProject(proj.id).then(fetchData)} className="text-white/20 hover:text-accent-red"><Trash2 size={24} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education Tab */}
                    {activeTab === 'education' && (
                        <div className="space-y-12">
                            <div className="flex items-center gap-6">
                                <h1 className="editorial-title text-6xl italic">Studies</h1>
                                <div className="h-[1px] flex-1 bg-white/5" />
                            </div>
                            <div className="space-y-8">
                                {(data.education || []).map((edu: any) => (
                                    <div key={edu.id} className="glass-card p-10 border-white/10 space-y-6">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">Degree</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent-gold"
                                                    value={edu.degree || ''}
                                                    onChange={(e) => updateLocalItem('education', edu.id, 'degree', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">Institution</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent-gold"
                                                    value={edu.institution || ''}
                                                    onChange={(e) => updateLocalItem('education', edu.id, 'institution', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">Year</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent-gold"
                                                    value={edu.duration || ''}
                                                    onChange={(e) => updateLocalItem('education', edu.id, 'duration', e.target.value)}
                                                    placeholder="2021 — 2025"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40">CGPA / Percentage</label>
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent-gold"
                                                    value={edu.cgpa || ''}
                                                    onChange={(e) => updateLocalItem('education', edu.id, 'cgpa', e.target.value)}
                                                    placeholder="e.g. 8.5"
                                                />
                                            </div>
                                        </div>
                                        <button onClick={() => updateEducation(edu.id, edu)} className="flex items-center gap-4 px-8 py-4 bg-accent-gold text-black font-bold uppercase tracking-widest text-[10px] rounded-xl ml-auto"><Save size={16} /> Update Academy</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
