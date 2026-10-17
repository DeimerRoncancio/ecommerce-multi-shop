export type PurchaseStatus = "PROCESSING" | "APPROVED" | "REJECTED";

export interface PurchaseItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface PurchaseAddress {
  addressName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  addressNumber: string | null;
}

export interface Purchase {
  id: string;
  status: PurchaseStatus;
  date: string;
  totalPrice: number;
  shippingAddress: PurchaseAddress | null;
  items: PurchaseItem[];
}

export interface PurchaseProduct {
  image?: string;
  category?: string;
}

export type PurchaseView = Purchase & {
  dateLabel: string;
  timeLabel: string;
  monthLabel: string;
};
