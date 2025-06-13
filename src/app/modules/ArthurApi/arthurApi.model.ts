import { model, Schema } from "mongoose";
import { TArthurToken, TProperty } from "./arthurApi.interface";

const arthurTokenSchema = new Schema<TArthurToken>(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    tokenType: { type: String, required: true },
    expiresIn: { type: String, required: true },
    userId: { type: Number, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const propertySchema = new Schema<TProperty>(
  {
    arthurId: { type: Number, required: true },
    property_type: { type: String, required: true },
    property_description: { type: String, required: true },
    ref: { type: String, required: true },
    full_address: { type: String, required: true },
    address_line_1: { type: String, required: true },
    country: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    total_units: { type: Number, required: true },
    rentable_units: { type: Number, required: true },
    property_owner_id: { type: Number, required: true },
    property_owner_full_name: { type: String, required: true },
    max_occupancy: { type: String, required: true },
    bathrooms: { type: String, required: true },
    bedrooms: { type: String, required: true },
    receptions: { type: String, required: true },
    council_tax_band: { type: String, required: true },
    i_manage_this: { type: Boolean, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    modified: { type: Date, required: true },
    created: { type: Date, required: true },
    entity_id: { type: Number, required: true },

    // Optional fields
    address_line_2: { type: String },
    city: { type: String },
    county: { type: String },
    area: { type: String },
    postcode: { type: String },
    letting_agent_id: { type: Number },
    floors: { type: String },
    smart_meters: { type: String },
    council_account_no: { type: String },
    council_id: { type: Number },
    portal_market_rent: { type: Number },
    portal_market_rent_frequency: { type: String },
    main_image_url: { type: String },
    epc_urls: { type: [String], default: [] },
    floor_plan_urls: { type: [String], default: [] },
    thumbnail_urls: { type: [String], default: [] },
    image_urls: { type: [String], default: [] },
    features: { type: [String], default: [] },
    property_features: { type: [String], default: [] },
    additional_features: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    notes: {
      type: [
        {
          id: { type: Number, required: true },
          content: { type: String, required: true },
          tags: { type: [String], default: [] },
        },
      ],
      default: [],
    },
    custom_fields: { type: [Schema.Types.Mixed], default: [] },
  },
  {
    timestamps: true,
  }
);

export const ArthurToken = model<TArthurToken>(
  "ArthurToken",
  arthurTokenSchema
);

export const Property = model<TProperty>("Property", propertySchema);
