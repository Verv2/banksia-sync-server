import QueryBuilder from "../../builder/QueryBuilder";
import config from "../../config";
import { propertySearchableFields } from "./arthurApi.constant";
import { TArthurToken } from "./arthurApi.interface";
import { ArthurToken, Property } from "./arthurApi.model";

const getArthurOAuthUrl = async () => {
  const clientId = config.client_id;
  const redirectUri = encodeURIComponent(config.redirect_uri as string);
  const state = "random_generated_state";

  const authUrl = `https://auth.arthuronline.co.uk/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;

  return authUrl;
};

const getAccessToken = async (code: string) => {
  //   const redirectUri = "https://banksialondon.com";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", config.redirect_uri as string);
  params.append("client_id", config.client_id as string);
  params.append("client_secret", config.client_secret as string);

  const response = await fetch("https://auth.arthuronline.co.uk/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const result = await response.json();

  if (result.message) {
    throw new Error(`Arthur OAuth Error: ${result.message}`);
  }

  const tokenData: TArthurToken = {
    accessToken: result.access_token,
    refreshToken: result.refresh_token,
    tokenType: result.token_type,
    expiresIn: result.expires_in,
    userId: result.info.user_id,
    email: result.info.email,
  };

  await ArthurToken.findOneAndUpdate({}, tokenData, {
    upsert: true,
    new: true,
  });

  return result;
};

// const getArthurProperties = async () => {
//   const tokenData = await ArthurToken.findOne();
//   if (!tokenData || !tokenData.accessToken) {
//     throw new Error("No valid Arthur access token found");
//   }

//   const { accessToken } = tokenData;

//   const entityId = config.X_Entity_Id as string;

//   const headers = {
//     Authorization: `Bearer ${accessToken}`,
//     "X-EntityID": entityId,
//   };

//   const response = await fetch("https://api.arthuronline.co.uk/v2/properties", {
//     method: "GET",
//     headers,
//   });

//   if (!response.ok) {
//     const err = await response.text();
//     throw new Error(`Arthur API error: ${err}`);
//   }

//   const data = await response.json();
//   return data;
// };

export const syncArthurProperties = async () => {
  const token = await ArthurToken.findOne();
  if (!token || !token.accessToken) {
    throw new Error("No Arthur access token found");
  }

  let page = 1;
  let totalCreated = 0;
  let totalUpdated = 0;
  let pageCount = 1;

  do {
    const res = await fetch(
      `https://api.arthuronline.co.uk/v2/properties?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "X-EntityID": config.X_Entity_Id as string,
        },
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to fetch properties (Page ${page}): ${errText}`);
    }

    const result = await res.json();
    const properties = result.data;
    pageCount = result.pagination?.pageCount || 1;

    for (const prop of properties) {
      const existing = await Property.findOne({ arthurId: prop.id });
      const modifiedDate = new Date(prop.modified);

      const mappedFields = {
        arthurId: prop.id,
        ref: prop.ref,
        full_address: prop.full_address,
        address_line_1: prop.address_line_1,
        address_line_2: prop.address_line_2 || undefined,
        city: prop.city || undefined,
        county: prop.county || undefined,
        country: prop.country,
        area: prop.area || undefined,
        postcode: prop.postcode,
        property_type: prop.property_type,
        property_description: prop.property_description,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        receptions: prop.receptions,
        max_occupancy: prop.max_occupancy,
        floors: prop.floors || undefined,
        smart_meters: prop.smart_meters || undefined,
        council_tax_band: prop.council_tax_band,
        council_account_no: prop.council_account_no || undefined,
        council_id: prop.council_id ?? undefined,
        letting_agent_id: prop.letting_agent_id ?? undefined,
        total_units: prop.total_units,
        rentable_units: prop.rentable_units,
        property_owner_id: prop.property_owner_id,
        property_owner_full_name: prop.property_owner_full_name,
        portal_market_rent: prop.portal_market_rent || undefined,
        portal_market_rent_frequency:
          prop.portal_market_rent_frequency || undefined,
        lat: prop.lat,
        lng: prop.lng,
        latitude: prop.latitude,
        longitude: prop.longitude,
        i_manage_this: prop.i_manage_this,
        main_image_url: prop.main_image_url || undefined,
        epc_urls: prop.epc_urls || [],
        floor_plan_urls: prop.floor_plan_urls || [],
        thumbnail_urls: prop.thumbnail_urls || [],
        image_urls: prop.image_urls || [],
        features: prop.features || [],
        property_features: prop.property_features || [],
        additional_features: prop.additional_features || [],
        tags: prop.tags || [],
        notes: prop.notes || [],
        custom_fields: prop.custom_fields || [],
        modified: new Date(prop.modified),
        created: new Date(prop.created),
        entity_id: prop.entity_id,
      };

      if (!existing) {
        await Property.create(mappedFields);
        totalCreated++;
      } else if (existing.modified.getTime() !== modifiedDate.getTime()) {
        await Property.updateOne({ arthurId: prop.id }, mappedFields);
        totalUpdated++;
      }
    }

    page++;
  } while (page <= pageCount);

  console.log({
    message: "Sync complete",
    created: totalCreated,
    updated: totalUpdated,
  });

  return {
    message: "Sync complete",
    created: totalCreated,
    updated: totalUpdated,
  };
};

const getAllPropertiesFromDB = async (query: Record<string, unknown>) => {
  const propertyQuery = new QueryBuilder(Property.find(), query)
    .search(propertySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await propertyQuery.countTotal();
  const result = await propertyQuery.modelQuery;

  return {
    meta,
    result,
  };
};

export const ArthurApiService = {
  getArthurOAuthUrl,
  getAccessToken,
  syncArthurProperties,
  getAllPropertiesFromDB,
  // getArthurProperties,
};
