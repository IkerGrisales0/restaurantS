export interface SearchRequest {
  cuisineType?: string;
  search?: string;
  priceRange?: [number, number];
  wifi?: boolean;
  parking?: boolean;
  outdoor_seating?: boolean;
  pet_friendly?: boolean;
  wheelchair_accessible?: boolean;
}
