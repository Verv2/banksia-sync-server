/* eslint-disable @typescript-eslint/no-explicit-any */
export type TArthurToken = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: string;
  userId: number;
  email: string;
};

export type TProperty = {
  arthurId: number;
  property_type: string;
  property_description: string;
  ref: string;
  full_address: string;
  address_line_1: string;
  country: string;
  lat: number;
  lng: number;
  total_units: number;
  rentable_units: number;
  property_owner_id: number;
  property_owner_full_name: string;
  max_occupancy: string;
  bathrooms: string;
  bedrooms: string;
  receptions: string;
  council_tax_band: string;
  i_manage_this: boolean;
  latitude: number;
  longitude: number;
  modified: Date;
  created: Date;
  entity_id: number;

  address_line_2?: string;
  city?: string;
  county?: string;
  area?: string;
  postcode?: string;
  letting_agent_id?: number | null;
  floors?: string;
  smart_meters?: string;
  council_account_no?: string;
  council_id?: number | null;
  portal_market_rent?: number;
  portal_market_rent_frequency?: string;
  main_image_url?: string | null;
  epc_urls?: string[];
  floor_plan_urls?: string[];
  thumbnail_urls?: string[];
  image_urls?: string[];
  features?: string[];
  property_features?: string[];
  additional_features?: string[];
  tags?: string[];
  notes: {
    id: number;
    content: string;
    tags: string[];
  }[];
  custom_fields?: any[];
};
