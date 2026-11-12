export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole =
  | "platform_super_admin"
  | "org_owner"
  | "org_admin"
  | "recruiter"
  | "hiring_manager"
  | "hr_manager"
  | "employee";

export type ApplicationStage =
  | "new_application"
  | "resume_review"
  | "shortlisted"
  | "interview_scheduled"
  | "interviewing"
  | "assessment"
  | "offer"
  | "hired"
  | "rejected"
  | "withdrawn";

export type JobStatus = "draft" | "active" | "paused" | "closed";
export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "freelance"
  | "internship";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
        };
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          website: string | null;
          industry: string | null;
          size: string | null;
          description: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          logo_url?: string | null;
          website?: string | null;
          industry?: string | null;
          size?: string | null;
          description?: string | null;
          created_by: string;
        };
        Update: {
          name?: string;
          logo_url?: string | null;
          website?: string | null;
          industry?: string | null;
          size?: string | null;
          description?: string | null;
        };
      };
      organization_members: {
        Row: {
          id: string;
          organization_id: string;
          user_id: string;
          role: UserRole;
          joined_at: string;
        };
        Insert: {
          organization_id: string;
          user_id: string;
          role: UserRole;
        };
        Update: {
          role?: UserRole;
        };
      };
      jobs: {
        Row: {
          id: string;
          organization_id: string;
          title: string;
          department: string | null;
          location: string | null;
          employment_type: EmploymentType;
          description: string | null;
          requirements: string | null;
          responsibilities: string | null;
          required_skills: string[];
          preferred_skills: string[];
          salary_min: number | null;
          salary_max: number | null;
          salary_currency: string;
          status: JobStatus;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          organization_id: string;
          title: string;
          department?: string | null;
          location?: string | null;
          employment_type?: EmploymentType;
          description?: string | null;
          requirements?: string | null;
          responsibilities?: string | null;
          required_skills?: string[];
          preferred_skills?: string[];
          salary_min?: number | null;
          salary_max?: number | null;
          salary_currency?: string;
          status?: JobStatus;
          created_by: string;
        };
        Update: {
          title?: string;
          department?: string | null;
          location?: string | null;
          employment_type?: EmploymentType;
          description?: string | null;
          requirements?: string | null;
          responsibilities?: string | null;
          required_skills?: string[];
          preferred_skills?: string[];
          salary_min?: number | null;
          salary_max?: number | null;
          status?: JobStatus;
        };
      };
      candidates: {
        Row: {
          id: string;
          organization_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          location: string | null;
          linkedin_url: string | null;
          portfolio_url: string | null;
          summary: string | null;
          skills: string[];
          years_experience: number | null;
          current_title: string | null;
          current_company: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          organization_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          location?: string | null;
          linkedin_url?: string | null;
          portfolio_url?: string | null;
          summary?: string | null;
          skills?: string[];
          years_experience?: number | null;
          current_title?: string | null;
          current_company?: string | null;
          created_by: string;
        };
        Update: {
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          location?: string | null;
          summary?: string | null;
          skills?: string[];
          years_experience?: number | null;
          current_title?: string | null;
          current_company?: string | null;
        };
      };
      applications: {
        Row: {
          id: string;
          organization_id: string;
          job_id: string;
          candidate_id: string;
          stage: ApplicationStage;
          match_score: number | null;
          notes: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          organization_id: string;
          job_id: string;
          candidate_id: string;
          stage?: ApplicationStage;
          match_score?: number | null;
          notes?: string | null;
          created_by: string;
        };
        Update: {
          stage?: ApplicationStage;
          match_score?: number | null;
          notes?: string | null;
        };
      };
      candidate_match_results: {
        Row: {
          id: string;
          organization_id: string;
          candidate_id: string;
          job_id: string;
          overall_score: number;
          skills_match: Json;
          experience_match: Json;
          ai_explanation: string | null;
          strengths: string[];
          gaps: string[];
          created_at: string;
        };
        Insert: {
          organization_id: string;
          candidate_id: string;
          job_id: string;
          overall_score: number;
          skills_match: Json;
          experience_match: Json;
          ai_explanation?: string | null;
          strengths?: string[];
          gaps?: string[];
        };
        Update: never;
      };
      candidate_documents: {
        Row: {
          id: string;
          candidate_id: string;
          organization_id: string;
          file_name: string;
          file_path: string;
          file_type: string;
          file_size: number;
          extracted_text: string | null;
          created_at: string;
        };
        Insert: {
          candidate_id: string;
          organization_id: string;
          file_name: string;
          file_path: string;
          file_type: string;
          file_size: number;
          extracted_text?: string | null;
        };
        Update: {
          extracted_text?: string | null;
        };
      };
      interviews: {
        Row: {
          id: string;
          organization_id: string;
          application_id: string;
          candidate_id: string;
          job_id: string;
          scheduled_at: string | null;
          duration_minutes: number;
          interview_type: string;
          status: string;
          notes: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          organization_id: string;
          application_id: string;
          candidate_id: string;
          job_id: string;
          scheduled_at?: string | null;
          duration_minutes?: number;
          interview_type?: string;
          status?: string;
          notes?: string | null;
          created_by: string;
        };
        Update: {
          scheduled_at?: string | null;
          duration_minutes?: number;
          status?: string;
          notes?: string | null;
        };
      };
      interview_feedback: {
        Row: {
          id: string;
          interview_id: string;
          interviewer_id: string;
          organization_id: string;
          technical_score: number | null;
          communication_score: number | null;
          problem_solving_score: number | null;
          experience_score: number | null;
          overall_recommendation: string | null;
          strengths: string | null;
          areas_for_development: string | null;
          notes: string | null;
          ai_summary: string | null;
          created_at: string;
        };
        Insert: {
          interview_id: string;
          interviewer_id: string;
          organization_id: string;
          technical_score?: number | null;
          communication_score?: number | null;
          problem_solving_score?: number | null;
          experience_score?: number | null;
          overall_recommendation?: string | null;
          strengths?: string | null;
          areas_for_development?: string | null;
          notes?: string | null;
        };
        Update: {
          technical_score?: number | null;
          communication_score?: number | null;
          problem_solving_score?: number | null;
          experience_score?: number | null;
          overall_recommendation?: string | null;
          strengths?: string | null;
          areas_for_development?: string | null;
          notes?: string | null;
          ai_summary?: string | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          organization_id: string | null;
          type: string;
          title: string;
          message: string;
          read: boolean;
          link: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          organization_id?: string | null;
          type: string;
          title: string;
          message: string;
          link?: string | null;
        };
        Update: {
          read?: boolean;
        };
      };
      demo_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string;
          job_title: string | null;
          company_size: string | null;
          message: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          company: string;
          job_title?: string | null;
          company_size?: string | null;
          message?: string | null;
        };
        Update: never;
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          company?: string | null;
          subject: string;
          message: string;
        };
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      application_stage: ApplicationStage;
      job_status: JobStatus;
      employment_type: EmploymentType;
    };
  };
}
