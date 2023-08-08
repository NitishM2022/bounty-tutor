export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      classes: {
        Row: {
          creator_id: string | null
          current_students: number | null
          description: string | null
          id: string
          max_students: number | null
          title: string | null
        }
        Insert: {
          creator_id?: string | null
          current_students?: number | null
          description?: string | null
          id?: string
          max_students?: number | null
          title?: string | null
        }
        Update: {
          creator_id?: string | null
          current_students?: number | null
          description?: string | null
          id?: string
          max_students?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_creator_id_fkey"
            columns: ["creator_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      countries: {
        Row: {
          full_name: string | null
          id: number
        }
        Insert: {
          full_name?: string | null
          id?: number
        }
        Update: {
          full_name?: string | null
          id?: number
        }
        Relationships: []
      }
      participants: {
        Row: {
          class_id: string
          person_id: string
        }
        Insert: {
          class_id: string
          person_id: string
        }
        Update: {
          class_id?: string
          person_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participants_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participants_person_id_fkey"
            columns: ["person_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          date_of_birth: string | null
          email: string | null
          first_name: string | null
          id: string
          is_tutor: boolean | null
          last_name: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          is_tutor?: boolean | null
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_tutor?: boolean | null
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
