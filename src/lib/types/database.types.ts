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
          guessed: number | null
          guessed_right: number | null
          updated_at: string | null
        }
        Insert: {
          capital_guessed_count?: number
          capital_guessed_right?: number
          country_id?: number
          created_at?: string | null
          flag_guessed_count?: number
          flag_guessed_right?: number
          guessed?: number | null
          guessed_right?: number | null
          updated_at?: string | null
        }
        Update: {
          capital_guessed_count?: number
          capital_guessed_right?: number
          country_id?: number
          created_at?: string | null
          flag_guessed_count?: number
          flag_guessed_right?: number
          guessed?: number | null
          guessed_right?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
          guessed: number | null
          guessed_right: number | null
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
          success_rate: number | null
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
        Args: {
          _deckid: number
          _questiontypeid: number
        }
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
        Args: {
          data: Json
        }
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
