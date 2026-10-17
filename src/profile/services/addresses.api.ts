import { createInstance } from "../../shared/api/axios-factory";
import { envs } from "../../shared/config/env.config";
import { SavedAddress, SavedAddressRequest } from "../types/address";

const addresses = createInstance(`${envs.API}/app/addresses`);

const withToken = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });

export const getAddresses = (token: string) =>
  addresses.get<SavedAddress[]>("", withToken(token)).then(res => res.data);

export const createAddress = (token: string, address: SavedAddressRequest) =>
  addresses.post<SavedAddress>("", address, withToken(token)).then(res => res.data);

export const updateAddress = (token: string, id: string, address: SavedAddressRequest) =>
  addresses.put<SavedAddress>(`/${encodeURIComponent(id)}`, address, withToken(token)).then(res => res.data);

export const deleteAddress = (token: string, id: string) =>
  addresses.delete(`/${encodeURIComponent(id)}`, withToken(token));
