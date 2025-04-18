export type MysteryCountryStatus = {
  availableDays: number;
  nextAvailableDate: string;
  latestAvailableDate: string;
  totalEntries: number;
  upcomingCountries: Array<{
    date: string;
    countryName: string;
  }>;
};

export type RefillResult = {
  addedEntries: number;
  nextAvailableDate: string;
  message: string;
}; 