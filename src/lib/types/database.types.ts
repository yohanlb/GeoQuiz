export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.0.2 (a4e00ff)"
  }
  public: {
    Tables: {
      countries: {
        Row: {
          capital: string
          closest_country_ids: number[] | null
          currency: string | null
          currency_name: string | null
          currency_symbol: string | null
          custom_difficulty: number | null
          emoji: string | null
          emojiU: string | null
          id: number
          is_disabled: boolean
          iso2: string
          iso3: string
          latitude: number | null
          longitude: number | null
          name: string
          native: string | null
          numeric_code: number | null
          phone_code: string | null
          region: string
          sovereignCountry: string | null
          special_classification: string | null
          subregion: string
          timezones: string | null
          tld: string | null
        }
        Insert: {
          capital: string
          closest_country_ids?: number[] | null
          currency?: string | null
          currency_name?: string | null
          currency_symbol?: string | null
          custom_difficulty?: number | null
          emoji?: string | null
          emojiU?: string | null
          id: number
          is_disabled?: boolean
          iso2: string
          iso3: string
          latitude?: number | null
          longitude?: number | null
          name: string
          native?: string | null
          numeric_code?: number | null
          phone_code?: string | null
          region: string
          sovereignCountry?: string | null
          special_classification?: string | null
          subregion: string
          timezones?: string | null
          tld?: string | null
        }
        Update: {
          capital?: string
          closest_country_ids?: number[] | null
          currency?: string | null
          currency_name?: string | null
          currency_symbol?: string | null
          custom_difficulty?: number | null
          emoji?: string | null
          emojiU?: string | null
          id?: number
          is_disabled?: boolean
          iso2?: string
          iso3?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          native?: string | null
          numeric_code?: number | null
          phone_code?: string | null
          region?: string
          sovereignCountry?: string | null
          special_classification?: string | null
          subregion?: string
          timezones?: string | null
          tld?: string | null
        }
        Relationships: []
      }
      countries_stats: {
        Row: {
          capital_guessed_count: number
          capital_guessed_right: number
          country_id: number
          created_at: string | null
          flag_guessed_count: number
          flag_guessed_right: number
          updated_at: string | null
        }
        Insert: {
          capital_guessed_count?: number
          capital_guessed_right?: number
          country_id: number
          created_at?: string | null
          flag_guessed_count?: number
          flag_guessed_right?: number
          updated_at?: string | null
        }
        Update: {
          capital_guessed_count?: number
          capital_guessed_right?: number
          country_id?: number
          created_at?: string | null
          flag_guessed_count?: number
          flag_guessed_right?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "countries_stats_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: true
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "countries_stats_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: true
            referencedRelation: "countries_complete_view"
            referencedColumns: ["id"]
          },
        ]
      }
      country_details: {
        Row: {
          capital_summary: string | null
          country_id: number
          famous_landmarks: Json | null
          faqs: Json | null
          fun_facts: Json | null
          is_verified: boolean | null
          last_updated: string | null
          map_embed_url: string | null
          notable_people: Json | null
          quick_facts: Json | null
          sources: Json | null
          summary: string | null
        }
        Insert: {
          capital_summary?: string | null
          country_id: number
          famous_landmarks?: Json | null
          faqs?: Json | null
          fun_facts?: Json | null
          is_verified?: boolean | null
          last_updated?: string | null
          map_embed_url?: string | null
          notable_people?: Json | null
          quick_facts?: Json | null
          sources?: Json | null
          summary?: string | null
        }
        Update: {
          capital_summary?: string | null
          country_id?: number
          famous_landmarks?: Json | null
          faqs?: Json | null
          fun_facts?: Json | null
          is_verified?: boolean | null
          last_updated?: string | null
          map_embed_url?: string | null
          notable_people?: Json | null
          quick_facts?: Json | null
          sources?: Json | null
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "country_details_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: true
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "country_details_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: true
            referencedRelation: "countries_complete_view"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_cotd: {
        Row: {
          average_score: number | null
          countryId: number
          created_at: string
          date: string | null
          id: number
          is_display_validated: boolean
          right_answers: number
          times_completed: number
          times_played: number
          wrong_answers: number
        }
        Insert: {
          average_score?: number | null
          countryId: number
          created_at?: string
          date?: string | null
          id?: number
          is_display_validated?: boolean
          right_answers?: number
          times_completed?: number
          times_played?: number
          wrong_answers?: number
        }
        Update: {
          average_score?: number | null
          countryId?: number
          created_at?: string
          date?: string | null
          id?: number
          is_display_validated?: boolean
          right_answers?: number
          times_completed?: number
          times_played?: number
          wrong_answers?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_cotd_countryid_fkey"
            columns: ["countryId"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_cotd_countryid_fkey"
            columns: ["countryId"]
            isOneToOne: false
            referencedRelation: "countries_complete_view"
            referencedColumns: ["id"]
          },
        ]
      }
      decks: {
        Row: {
          categories: string[] | null
          countryIds: number[]
          created_at: string
          description: string | null
          displayName: string
          displayPriority: number | null
          id: number
          image_name: string | null
          isAvailable: boolean
          isDynamic: boolean
          isTextTransparent: boolean
          name: string
        }
        Insert: {
          categories?: string[] | null
          countryIds: number[]
          created_at?: string
          description?: string | null
          displayName: string
          displayPriority?: number | null
          id?: number
          image_name?: string | null
          isAvailable?: boolean
          isDynamic?: boolean
          isTextTransparent?: boolean
          name: string
        }
        Update: {
          categories?: string[] | null
          countryIds?: number[]
          created_at?: string
          description?: string | null
          displayName?: string
          displayPriority?: number | null
          id?: number
          image_name?: string | null
          isAvailable?: boolean
          isDynamic?: boolean
          isTextTransparent?: boolean
          name?: string
        }
        Relationships: []
      }
      decks_stats: {
        Row: {
          averageScore: number
          created_at: string
          deckId: number
          id: number
          playCount: number
          questionTypeId: number
          updated_at: string
        }
        Insert: {
          averageScore?: number
          created_at?: string
          deckId: number
          id?: number
          playCount?: number
          questionTypeId: number
          updated_at?: string
        }
        Update: {
          averageScore?: number
          created_at?: string
          deckId?: number
          id?: number
          playCount?: number
          questionTypeId?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "decks_stats_deckId_fkey"
            columns: ["deckId"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decks_stats_questionTypeId_fkey"
            columns: ["questionTypeId"]
            isOneToOne: false
            referencedRelation: "question_types"
            referencedColumns: ["id"]
          },
        ]
      }
      logs: {
        Row: {
          created_at: string
          id: number
          level: string
          message: string
          metadata: Json | null
          source: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          level?: string
          message?: string
          metadata?: Json | null
          source?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          level?: string
          message?: string
          metadata?: Json | null
          source?: string | null
        }
        Relationships: []
      }
      question_types: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      test: {
        Row: {
          created_at: string
          id: number
          statsObject: Json | null
          text: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          statsObject?: Json | null
          text?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          statsObject?: Json | null
          text?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_guesses_history: {
        Row: {
          country_id: number
          created_at: string
          guess_results: boolean[] | null
          id: string
          question_type_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          country_id: number
          created_at?: string
          guess_results?: boolean[] | null
          id?: string
          question_type_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          country_id?: number
          created_at?: string
          guess_results?: boolean[] | null
          id?: string
          question_type_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_stats_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries_complete_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_stats_question_type_id_fkey"
            columns: ["question_type_id"]
            isOneToOne: false
            referencedRelation: "question_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      countries_complete_view: {
        Row: {
          capital: string | null
          capital_guessed_count: number | null
          capital_guessed_right: number | null
          closest_country_ids: number[] | null
          custom_difficulty: number | null
          emoji: string | null
          flag_guessed_count: number | null
          flag_guessed_right: number | null
          id: number | null
          is_disabled: boolean | null
          iso2: string | null
          iso3: string | null
          latitude: number | null
          longitude: number | null
          name: string | null
          region: string | null
          sovereignCountry: string | null
          special_classification: string | null
          subregion: string | null
          success_rate_capital: number | null
          success_rate_flag: number | null
          updated_at: string | null
        }
        Relationships: []
      }
      view_cotd_with_country_names: {
        Row: {
          average_score: number | null
          capital: string | null
          country_name: string | null
          countryId: number | null
          date: string | null
          id: number | null
          is_display_validated: boolean | null
          times_completed: number | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_cotd_countryid_fkey"
            columns: ["countryId"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_cotd_countryid_fkey"
            columns: ["countryId"]
            isOneToOne: false
            referencedRelation: "countries_complete_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      count_consecutive_cotd_days_from_today: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      incrementdeckplaycount: {
        Args: { _deckid: number; _questiontypeid: number }
        Returns: undefined
      }
      update_countries_stats: {
        Args: {
          countryid: number
          guessedright: boolean
          _questiontype: string
        }
        Returns: {
          country_id: number
          new_capital_guessed: number
          new_capital_guessed_right: number
          new_flag_guessed: number
          new_flag_guessed_right: number
        }[]
      }
      update_countries_stats_bulk: {
        Args: { data: Json }
        Returns: {
          country_id: number
          new_guessed: number
          new_guessed_right: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
