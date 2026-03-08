import { supabase } from './supabase';

export interface Profile {
    id: string;
    name: string;
    bio: string;
    profile_image: string;
    resume_url?: string;
}

export interface Achievement {
    id: string;
    title: string;
    location: string;
    event: string;
    date: string;
    image_url: string;
}

export interface Skill {
    id: string;
    name: string;
    type: 'technical' | 'soft';
    level: string;
}

export interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    technologies: string[];
    github_url: string;
    image_url: string;
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    duration: string;
    cgpa: string;
}

export interface Leadership {
    id: string;
    role: string;
    organization: string;
}

export const getProfile = async () => {
    const { data, error } = await supabase.from('profile').select('*').maybeSingle();
    if (error) {
        console.error('Error in getProfile:', error);
        throw error;
    }
    return data as Profile | null;
};

export const getAchievements = async () => {
    const { data, error } = await supabase.from('achievements').select('*').order('created_at', { ascending: true });
    if (error) {
        console.error('Error in getAchievements:', error);
        throw error;
    }
    return data as Achievement[];
};

export const getSkills = async () => {
    const { data, error } = await supabase.from('skills').select('*').order('created_at', { ascending: true });
    if (error) {
        console.error('Error in getSkills:', error);
        throw error;
    }
    return data as Skill[];
};

export const getProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: true });
    if (error) {
        console.error('Error in getProjects:', error);
        throw error;
    }
    return data as Project[];
};

export const getEducation = async () => {
    const { data, error } = await supabase.from('education').select('*').order('created_at', { ascending: true });
    if (error) {
        console.error('Error in getEducation:', error);
        throw error;
    }
    return data as Education[];
};

export const getLeadership = async () => {
    const { data, error } = await supabase.from('leadership').select('*').order('created_at', { ascending: true });
    if (error) {
        console.error('Error in getLeadership:', error);
        throw error;
    }
    return data as Leadership[];
};

export const getPortfolioData = async () => {
    try {
        const [profile, achievements, skills, projects, education, leadership] = await Promise.all([
            getProfile().catch(err => { console.error('Profile fetch failed:', err); return null; }),
            getAchievements().catch(err => { console.error('Achievements fetch failed:', err); return []; }),
            getSkills().catch(err => { console.error('Skills fetch failed:', err); return []; }),
            getProjects().catch(err => { console.error('Projects fetch failed:', err); return []; }),
            getEducation().catch(err => { console.error('Education fetch failed:', err); return []; }),
            getLeadership().catch(err => { console.error('Leadership fetch failed:', err); return []; })
        ]);

        return {
            profile: profile || { id: '', name: 'Guest', bio: 'Update your bio in the dashboard', profile_image: '/images/m2.png', resume_url: '' },
            achievements: achievements || [],
            skills: {
                technical: (skills || []).filter(s => s.type === 'technical'),
                soft: (skills || []).filter(s => s.type === 'soft').map(s => s.name)
            },
            projects: projects || [],
            education: education || [],
            leadership: leadership || []
        };
    } catch (err) {
        console.error('Fatal error in getPortfolioData:', err);
        return {
            profile: { id: '', name: 'Error', bio: 'Failed to connect to database.', profile_image: '' },
            achievements: [],
            skills: { technical: [], soft: [] },
            projects: [],
            education: [],
            leadership: []
        };
    }
};

export const updateProfile = async (id: string, updates: Partial<Profile>) => {
    const { data, error } = await supabase.from('profile').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data as Profile;
};

export const updateAchievement = async (id: string, updates: Partial<Achievement>) => {
    const { data, error } = await supabase.from('achievements').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data as Achievement;
};

export const addAchievement = async (achievement: Omit<Achievement, 'id'>) => {
    const { data, error } = await supabase.from('achievements').insert(achievement).select().single();
    if (error) throw error;
    return data as Achievement;
};

export const deleteAchievement = async (id: string) => {
    const { error } = await supabase.from('achievements').delete().eq('id', id);
    if (error) throw error;
};

export const uploadFile = async (file: File, path: string) => {
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(path, file, {
            upsert: true,
            contentType: file.type
        });

    if (uploadError) {
        console.error('Error in uploadFile:', uploadError);
        throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
        .from('portfolio')
        .getPublicUrl(uploadData.path);

    return publicUrlData.publicUrl;
};

export const updateSkill = async (id: string, updates: Partial<Skill>) => {
    const { data, error } = await supabase.from('skills').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data as Skill;
};

export const addSkill = async (skill: Omit<Skill, 'id'>) => {
    const { data, error } = await supabase.from('skills').insert(skill).select().single();
    if (error) throw error;
    return data as Skill;
};

export const deleteSkill = async (id: string) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;
};

export const updateProject = async (id: string, updates: Partial<Project>) => {
    const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data as Project;
};

export const addProject = async (project: Omit<Project, 'id'>) => {
    const { data, error } = await supabase.from('projects').insert(project).select().single();
    if (error) throw error;
    return data as Project;
};

export const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
};

export const updateEducation = async (id: string, updates: Partial<Education>) => {
    const { data, error } = await supabase.from('education').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data as Education;
};

export const updateLeadership = async (id: string, updates: Partial<Leadership>) => {
    const { data, error } = await supabase.from('leadership').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data as Leadership;
};

export const addLeadership = async (leadership: Omit<Leadership, 'id'>) => {
    const { data, error } = await supabase.from('leadership').insert(leadership).select().single();
    if (error) throw error;
    return data as Leadership;
};

export const deleteLeadership = async (id: string) => {
    const { error } = await supabase.from('leadership').delete().eq('id', id);
    if (error) throw error;
};
