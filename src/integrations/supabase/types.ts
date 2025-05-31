export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agencies: {
        Row: {
          achievements: string
          category_id: string
          created_at: string
          description: string
          founded_year: number | null
          id: string
          is_winner: boolean
          location: string
          logo: string | null
          name: string
          specialties: string
          team_size: number | null
          type: string
          updated_at: string
          vote_url: string
          website: string | null
        }
        Insert: {
          achievements: string
          category_id: string
          created_at?: string
          description: string
          founded_year?: number | null
          id?: string
          is_winner?: boolean
          location: string
          logo?: string | null
          name: string
          specialties: string
          team_size?: number | null
          type: string
          updated_at?: string
          vote_url: string
          website?: string | null
        }
        Update: {
          achievements?: string
          category_id?: string
          created_at?: string
          description?: string
          founded_year?: number | null
          id?: string
          is_winner?: boolean
          location?: string
          logo?: string | null
          name?: string
          specialties?: string
          team_size?: number | null
          type?: string
          updated_at?: string
          vote_url?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agencies_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          criteria: string
          description: string
          gala_id: string
          id: string
          name: string
          order_number: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          criteria: string
          description: string
          gala_id: string
          id?: string
          name: string
          order_number: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          criteria?: string
          description?: string
          gala_id?: string
          id?: string
          name?: string
          order_number?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_gala_id_fkey"
            columns: ["gala_id"]
            isOneToOne: false
            referencedRelation: "galas"
            referencedColumns: ["id"]
          },
        ]
      }
      galas: {
        Row: {
          created_at: string
          description: string
          event_date: string
          id: string
          is_active: boolean
          max_participants: number | null
          nomination_end_date: string | null
          nomination_start_date: string | null
          status: Database["public"]["Enums"]["gala_status"]
          ticketing_url: string | null
          title: string
          updated_at: string
          venue: string
          voting_end_date: string | null
          voting_start_date: string | null
          year: number
        }
        Insert: {
          created_at?: string
          description: string
          event_date: string
          id?: string
          is_active?: boolean
          max_participants?: number | null
          nomination_end_date?: string | null
          nomination_start_date?: string | null
          status?: Database["public"]["Enums"]["gala_status"]
          ticketing_url?: string | null
          title: string
          updated_at?: string
          venue: string
          voting_end_date?: string | null
          voting_start_date?: string | null
          year: number
        }
        Update: {
          created_at?: string
          description?: string
          event_date?: string
          id?: string
          is_active?: boolean
          max_participants?: number | null
          nomination_end_date?: string | null
          nomination_start_date?: string | null
          status?: Database["public"]["Enums"]["gala_status"]
          ticketing_url?: string | null
          title?: string
          updated_at?: string
          venue?: string
          voting_end_date?: string | null
          voting_start_date?: string | null
          year?: number
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          caption: string | null
          category: string | null
          created_at: string
          gala_id: string
          id: string
          image_url: string
          order_number: number | null
          photographer: string | null
          updated_at: string
        }
        Insert: {
          caption?: string | null
          category?: string | null
          created_at?: string
          gala_id: string
          id?: string
          image_url: string
          order_number?: number | null
          photographer?: string | null
          updated_at?: string
        }
        Update: {
          caption?: string | null
          category?: string | null
          created_at?: string
          gala_id?: string
          id?: string
          image_url?: string
          order_number?: number | null
          photographer?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_gala_id_fkey"
            columns: ["gala_id"]
            isOneToOne: false
            referencedRelation: "galas"
            referencedColumns: ["id"]
          },
        ]
      }
      panel_speakers: {
        Row: {
          bio: string | null
          company: string
          created_at: string
          id: string
          image: string | null
          linkedin_url: string | null
          name: string
          order_number: number
          panel_id: string
          title: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          company: string
          created_at?: string
          id?: string
          image?: string | null
          linkedin_url?: string | null
          name: string
          order_number: number
          panel_id: string
          title: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          company?: string
          created_at?: string
          id?: string
          image?: string | null
          linkedin_url?: string | null
          name?: string
          order_number?: number
          panel_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "panel_speakers_panel_id_fkey"
            columns: ["panel_id"]
            isOneToOne: false
            referencedRelation: "panels"
            referencedColumns: ["id"]
          },
        ]
      }
      panels: {
        Row: {
          created_at: string
          description: string
          end_time: string | null
          gala_id: string
          id: string
          moderator_bio: string | null
          moderator_image: string | null
          moderator_name: string
          order_number: number
          start_time: string | null
          theme: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          end_time?: string | null
          gala_id: string
          id?: string
          moderator_bio?: string | null
          moderator_image?: string | null
          moderator_name: string
          order_number: number
          start_time?: string | null
          theme: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          end_time?: string | null
          gala_id?: string
          id?: string
          moderator_bio?: string | null
          moderator_image?: string | null
          moderator_name?: string
          order_number?: number
          start_time?: string | null
          theme?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "panels_gala_id_fkey"
            columns: ["gala_id"]
            isOneToOne: false
            referencedRelation: "galas"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          image: string | null
          name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          image?: string | null
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          image?: string | null
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          created_at: string
          description: string | null
          gala_id: string
          id: string
          level: Database["public"]["Enums"]["sponsor_level"]
          logo: string | null
          name: string
          order_number: number | null
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          gala_id: string
          id?: string
          level: Database["public"]["Enums"]["sponsor_level"]
          logo?: string | null
          name: string
          order_number?: number | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          gala_id?: string
          id?: string
          level?: Database["public"]["Enums"]["sponsor_level"]
          logo?: string | null
          name?: string
          order_number?: number | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsors_gala_id_fkey"
            columns: ["gala_id"]
            isOneToOne: false
            referencedRelation: "galas"
            referencedColumns: ["id"]
          },
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
      gala_status:
        | "DRAFT"
        | "NOMINATIONS_OPEN"
        | "VOTING_OPEN"
        | "ENDED"
        | "ARCHIVED"
      sponsor_level: "PLATINUM" | "GOLD" | "SILVER" | "BRONZE"
      user_role: "USER" | "ADMIN" | "SUPER_ADMIN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      gala_status: [
        "DRAFT",
        "NOMINATIONS_OPEN",
        "VOTING_OPEN",
        "ENDED",
        "ARCHIVED",
      ],
      sponsor_level: ["PLATINUM", "GOLD", "SILVER", "BRONZE"],
      user_role: ["USER", "ADMIN", "SUPER_ADMIN"],
    },
  },
} as const
