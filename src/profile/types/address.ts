export interface SavedAddress {
  id: string;
  addressName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  addressNumber: string | null;
}

export type SavedAddressRequest = Omit<SavedAddress, "id">;
