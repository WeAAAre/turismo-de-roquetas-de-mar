export interface AppTranslation {
  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  group: AppTranslationGroup | AppTranslationGroup['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  translations: AppTranslationTranslation[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface AppTranslationEntry {
  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  field: AppTranslationField | AppTranslationField['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  sort: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  value: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  value_1827jhas1292:
    | AppTranslationTranslation
    | AppTranslationTranslation['id']
    | null;
}

export interface AppTranslationField {
  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface AppTranslationGroup {
  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  app_translation_group_12839ksh19zg71:
    | AppTranslation
    | AppTranslation['id']
    | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  sort: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface AppTranslationTranslation {
  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  app_translation_id: AppTranslation | AppTranslation['id'] | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  entries: AppTranslationEntry[] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  languages_code: Language | Language['code'] | null;
}

export interface App {
  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  logo: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  theme: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  url: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface Business {
  /**
   * No description.
   *
   * Type in directus: geometry
   * Type in database: point
   */
  address: {
    type: string;
    coordinates: [number, number];
  };

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'];

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  carousel: BusinessFile[] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  category: Category;

  /**
   * No se mostrará en la web
   *
   * Type in directus: string
   * Type in database: varchar
   */
  contact_person: string | null;

  /**
   * No se mostrará en la web
   *
   * Type in directus: string
   * Type in database: varchar
   */
  contact_phone: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  display_options: ('image' | 'content' | 'social_media')[];

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  email: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  facebook: string | null;

  /**
   * No description.
   *
   * Type in directus: date
   * Type in database: date
   */
  finalization_date: string;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  image: DirectusFile | DirectusFile['id'];

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  image360: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  instagram: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  locality: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  oldId: number | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  pdfs: BusinessFiles1[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  phone: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  postalCode: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  redirect_to: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  region: string | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  renovations: Renovation[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  send_to_google: 'complete' | 'no_complete' | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  seo: Seo | Seo['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  sluglify: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  sort: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  status_seo: 'complete' | 'image' | 'no_complete' | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  streetAddress: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  tiktok: string | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  translations: BusinessTranslation[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  tripadvisor: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  twitter: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  type: 'site' | 'business' | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  web: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  whatsapp: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  youtube: string | null;
}

export interface BusinessFile {
  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  business_id: Business | Business['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  directus_files_id: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  sort: number | null;
}

export interface BusinessFiles1 {
  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  business_id: Business | Business['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  directus_files_id: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;
}

export interface BusinessTranslation {
  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  business_id: Business | Business['id'] | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  content: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  languages_code: Language | Language['code'] | null;
}

export interface Category {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  image: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  mode: 'asc' | 'desc' | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  oldId: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  redirect_to: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  seo: Seo | Seo['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  sluglify: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  sort: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  sort_by: 'name' | 'finalization_date' | 'sort' | '?' | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  translations: CategoryTranslation[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  type: 'site' | 'business' | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface CategoryTranslation {
  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  category_id: Category | Category['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  languages_code: Language | Language['code'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string | null;
}

export interface Collaborator {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  image: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  oldId: number | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  sort: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  url: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface DirectusActivity {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  action: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  collection: string;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  comment: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  ip: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  item: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  origin: string | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  revisions: DirectusRevision[] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  timestamp: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user: DirectusUser | string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  user_agent: string | null;
}

export interface DirectusCollection {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  accountability: string | null;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  archive_app_filter: boolean;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  archive_field: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  archive_value: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  collapse: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  collection: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  color: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  display_template: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  group: DirectusCollection | DirectusCollection['collection'] | null;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  hidden: boolean;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  icon: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  item_duplication_fields: any | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  note: string | null;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  singleton: boolean;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  sort: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  sort_field: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  translations: any | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  unarchive_value: string | null;
}

export interface DirectusDashboard {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  color: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  icon: string;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  id: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  note: string | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  panels: DirectusPanel[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;
}

export interface DirectusField {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  collection: DirectusCollection | string;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  conditions: any | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  display: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  display_options: any | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  field: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  group: DirectusField | string | null;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  hidden: boolean;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  interface: string | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  note: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  options: any | null;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  readonly: boolean;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  required: boolean | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  sort: number | null;

  /**
   * No description.
   *
   * Type in directus: csv
   * Type in database: varchar
   */
  special: string[] | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  translations: any | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  validation: any | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  validation_message: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  width: string | null;
}

export interface DirectusFile {
  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  business: Business[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  charset: string | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  description: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  duration: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  embed: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  filename_disk: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  filename_download: string;

  /**
   * No description.
   *
   * Type in directus: bigInteger
   * Type in database: bigint
   */
  filesize: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  folder: DirectusFolder | DirectusFolder['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  height: number;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  id: string;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  location: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  metadata: any | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  modified_by: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  modified_on: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  storage: string;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: text
   */
  tags: any | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  testing_buisness: Business | Business['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  title: string | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  translations: JunctionDirectusFilesTranslation[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  type: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  uploaded_by: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  uploaded_on: string;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  width: number;
}

export interface DirectusFlow {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  accountability: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  color: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  description: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  icon: string | null;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  id: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  operation: DirectusOperation | string | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  operations: DirectusOperation[] | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  options: any | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  status: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  trigger: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;
}

export interface DirectusFolder {
  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  id: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  parent: DirectusFolder | DirectusFolder['id'] | null;
}

export interface DirectusMigration {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  timestamp: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  version: string;
}

export interface DirectusNotification {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  collection: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  item: string | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  message: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  recipient: DirectusUser | DirectusUser['id'];

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  sender: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  status: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  subject: string;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  timestamp: string | null;
}

export interface DirectusOperation {
  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  flow: DirectusFlow | DirectusFlow['id'];

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  id: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  key: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  options: any | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  position_x: number;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  position_y: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  reject: DirectusOperation | DirectusOperation['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  resolve: DirectusOperation | DirectusOperation['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  type: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;
}

export interface DirectusPanel {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  color: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  dashboard: DirectusDashboard | DirectusDashboard['id'];

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  height: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  icon: string | null;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  id: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  note: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  options: any | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  position_x: number;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  position_y: number;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  show_header: boolean;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  type: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  width: number;
}

export interface DirectusPermission {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  action: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  collection: string;

  /**
   * No description.
   *
   * Type in directus: csv
   * Type in database: text
   */
  fields: string[] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  permissions: any | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  presets: any | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  role: DirectusRole | DirectusRole['id'] | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  validation: any | null;
}

export interface DirectusPreset {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  bookmark: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  collection: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  color: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  filter: any | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  icon: string;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  layout: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  layout_options: any | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  layout_query: any | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  refresh_interval: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  role: DirectusRole | DirectusRole['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  search: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user: DirectusUser | DirectusUser['id'] | null;
}

export interface DirectusRelation {
  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  junction_field: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  many_collection: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  many_field: string;

  /**
   * No description.
   *
   * Type in directus: csv
   * Type in database: text
   */
  one_allowed_collections: string[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  one_collection: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  one_collection_field: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  one_deselect_action: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  one_field: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  sort_field: string | null;
}

export interface DirectusRevision {
  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  activity: DirectusActivity | DirectusActivity['id'];

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  collection: string;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  data: any | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  delta: any | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  item: string;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  parent: DirectusRevision | DirectusRevision['id'] | null;
}

export interface DirectusRole {
  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  admin_access: boolean;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  app_access: boolean;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  description: string | null;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  enforce_tfa: boolean;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  icon: string;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  id: string;

  /**
   * No description.
   *
   * Type in directus: csv
   * Type in database: text
   */
  ip_access: string[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  users: DirectusUser[] | null;
}

export interface DirectusSession {
  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  expires: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  ip: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  origin: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  share: DirectusShare | DirectusShare['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  token: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  user_agent: string | null;
}

export interface DirectusSetting {
  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  auth_login_attempts: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  auth_password_policy: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  basemaps: any | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  custom_aspect_ratios: any | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  custom_css: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  default_language: string;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  mapbox_key: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  module_bar: any | null;

  /**
   * $t:field_options.directus_settings.project_color_note
   *
   * Type in directus: string
   * Type in database: varchar
   */
  project_color: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  project_descriptor: string | null;

  /**
   * $t:field_options.directus_settings.project_logo_note
   *
   * Type in directus: string
   * Type in database: char
   */
  project_logo: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  project_name: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  project_url: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  public_background: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  public_foreground: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  public_note: string | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  storage_asset_presets: any | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  storage_asset_transform: string | null;

  /**
   * $t:interfaces.system-folder.field_hint
   *
   * Type in directus: string
   * Type in database: char
   */
  storage_default_folder: DirectusFolder | DirectusFolder['id'] | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  translation_strings: any | null;
}

export interface DirectusShare {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  collection: DirectusCollection | DirectusCollection['collection'] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string;

  /**
   * $t:shared_leave_blank_for_unlimited
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_end: string | null;

  /**
   * $t:shared_leave_blank_for_unlimited
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_start: string | null;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  id: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  item: string | null;

  /**
   * $t:shared_leave_blank_for_unlimited
   *
   * Type in directus: integer
   * Type in database: int
   */
  max_uses: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string | null;

  /**
   * $t:shared_leave_blank_for_unlimited
   *
   * Type in directus: hash
   * Type in database: varchar
   */
  password: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  role: DirectusRole | DirectusRole['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  times_used: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;
}

export interface DirectusUser {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'] | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  auth_data: any | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  avatar: DirectusFile | string | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  description: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  email: string | null;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  email_notifications: boolean | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  external_identifier: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  first_name: string | null;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  id: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  language: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  last_access: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  last_name: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  last_page: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  location: string | null;

  /**
   * No description.
   *
   * Type in directus: hash
   * Type in database: varchar
   */
  password: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  provider: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  role: DirectusRole | DirectusRole['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  status: string;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  tags: any | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  tfa_secret: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  theme: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  title: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  token: string | null;
}

export interface DirectusWebhook {
  /**
   * No description.
   *
   * Type in directus: csv
   * Type in database: varchar
   */
  actions: string[];

  /**
   * No description.
   *
   * Type in directus: csv
   * Type in database: varchar
   */
  collections: string[];

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  data: boolean;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  headers: any | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  method: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  status: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  url: string;
}

export interface Event {
  /**
   * No description.
   *
   * Type in directus: geometry
   * Type in database: point
   */
  address: {
    type: string;
    coordinates: [number, number];
  };

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'] | null;

  /**
   * No description.
   *
   * Type in directus: dateTime
   * Type in database: datetime
   */
  date: string;

  /**
   * No description.
   *
   * Type in directus: date
   * Type in database: date
   */
  date_complete: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: date
   * Type in database: date
   */
  end_date: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  image: DirectusFile | DirectusFile['id'];

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  link: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int
   */
  oldId: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  phone: string | null;

  /**
   * Desde que precio empiezan las entradas
   *
   * Type in directus: float
   * Type in database: float
   */
  price: number | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  seo: Seo | Seo['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  sluglify: string | null;

  /**
   * No description.
   *
   * Type in directus: date
   * Type in database: date
   */
  start_date: string | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  translations: EventsTranslation[];

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  type: 'one_day_event' | 'long_event' | 'one_day_complete' | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface EventsPage {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  seo: Seo | Seo['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface EventsTranslation {
  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  content: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  events_id: Event | Event['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  languages_code: Language | Language['code'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string | null;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  smallDescription: string | null;
}

export interface HomePage {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  facebook: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  images: HomePageFiles1[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  instagram: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  seo: Seo | Seo['id'] | null;

  /**
   * No description.
   *
   * Type in directus: float
   * Type in database: float
   */
  slide_time: number | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  translations: HomePageTranslation[];

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  whatsapp: string | null;
}

export interface HomePageFile {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  directus_files_id: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  home_page_id: HomePage | HomePage['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;
}

export interface HomePageFiles1 {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  directus_files_id: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  home_page_id: HomePage | HomePage['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;
}

export interface HomePageTranslation {
  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  home_page_id: HomePage | HomePage['id'];

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  languages_id: Language | Language['code'];

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  subtitle: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  title: string;
}

export interface IdeasOfferPage {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  seo: Seo | Seo['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface IdeasOffer {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  business: Business | Business['id'] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: date
   * Type in database: date
   */
  end_date: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  image: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  oldId: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  seo: Seo | Seo['id'] | null;

  /**
   * No description.
   *
   * Type in directus: date
   * Type in database: date
   */
  start_date: string | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  translations: IdeasOffersTranslation[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface IdeasOffersTranslation {
  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  description: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  ideas_offers_id: IdeasOffer | IdeasOffer['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  languages_code: Language | Language['code'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  title: string | null;
}

export interface JunctionDirectusFilesTranslation {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  directus_files_id: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  languages_code: Language | Language['code'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  title: string | null;
}

export interface Language {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  code: string;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  direction: 'ltr' | 'rtl' | null;

  /**
   * No description.
   *
   * Type in directus: uuid
   * Type in database: char
   */
  image: DirectusFile | DirectusFile['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  name: string | null;
}

export interface PrivacyPolicyPage {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  seo: Seo | Seo['id'] | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  translations: PrivacyPolicyPageTranslation[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface PrivacyPolicyPageTranslation {
  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  content: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  languages_code: Language | Language['code'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  privacy_policy_page_id: PrivacyPolicyPage | PrivacyPolicyPage['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  title: string | null;
}

export interface Renovation {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  bussiness_rennovations: Business | Business['id'] | null;

  /**
   * No description.
   *
   * Type in directus: date
   * Type in database: date
   */
  date: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  duration:
    | '7'
    | '14'
    | '30'
    | '60'
    | '180'
    | '365'
    | '730'
    | '1095'
    | '1460'
    | '1825'
    | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  note: string | null;

  /**
   * No description.
   *
   * Type in directus: float
   * Type in database: float
   */
  price: number | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  status: 'pay' | 'extra_time' | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface Seo {
  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  json_ld: any | null;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  nofollow: boolean | null;

  /**
   * No description.
   *
   * Type in directus: boolean
   * Type in database: boolean
   */
  noindex: boolean | null;

  /**
   * No description.
   *
   * Type in directus: json
   * Type in database: json
   */
  roobotProps: any | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  translations: SeoTranslation[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  type_json_ld: 'local_business' | null;
}

export interface SeoTranslation {
  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  description: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  languages_code: Language | Language['code'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  seo_id: Seo | Seo['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  title: string | null;
}

export interface TermsConditionsPage {
  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  app: App | App['url'] | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_created: string | null;

  /**
   * No description.
   *
   * Type in directus: timestamp
   * Type in database: timestamp
   */
  date_updated: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  seo: Seo | Seo['id'] | null;

  /**
   * No description.
   *
   * Type in directus: alias
   * Type in database: no column
   */
  translations: TermsConditionsPageTranslation[] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_created: DirectusUser | DirectusUser['id'] | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: char
   */
  user_updated: DirectusUser | DirectusUser['id'] | null;
}

export interface TermsConditionsPageTranslation {
  /**
   * No description.
   *
   * Type in directus: text
   * Type in database: text
   */
  content: string | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  id: number;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  languages_code: Language | Language['code'] | null;

  /**
   * No description.
   *
   * Type in directus: integer
   * Type in database: int unsigned
   */
  terms_conditions_page_id:
    | TermsConditionsPage
    | TermsConditionsPage['id']
    | null;

  /**
   * No description.
   *
   * Type in directus: string
   * Type in database: varchar
   */
  title: string | null;
}

export interface FeatureFlags {
  features: {
    name: string;
    value: boolean;
  }[];
}

export interface BlogPost {
  title: string;
  status: 'published' | 'draft' | 'archived';
  image: DirectusFile | DirectusFile['id'];
  content: unknown;
  sort: number;
  date_created: string;
  date_updated: string;
  categories: string[] | null;
  id: number;
  sluglify: string;
  description: string;
}

export type Collections = {
  app_translation: AppTranslation[];
  app_translation_entry: AppTranslationEntry[];
  app_translation_field: AppTranslationField[];
  app_translation_group: AppTranslationGroup[];
  app_translation_translations: AppTranslationTranslation[];
  apps: App[];
  business: Business[];
  business_files: BusinessFile[];
  business_files_1: BusinessFiles1[];
  business_translations: BusinessTranslation[];
  category: Category[];
  blog_post: BlogPost[];
  category_translations: CategoryTranslation[];
  collaborator: Collaborator[];
  directus_activity: DirectusActivity[];
  directus_collections: DirectusCollection[];
  directus_dashboards: DirectusDashboard[];
  directus_fields: DirectusField[];
  directus_files: DirectusFile[];
  directus_flows: DirectusFlow[];
  directus_folders: DirectusFolder[];
  directus_migrations: DirectusMigration[];
  directus_notifications: DirectusNotification[];
  directus_operations: DirectusOperation[];
  directus_panels: DirectusPanel[];
  directus_permissions: DirectusPermission[];
  directus_presets: DirectusPreset[];
  directus_relations: DirectusRelation[];
  directus_revisions: DirectusRevision[];
  directus_roles: DirectusRole[];
  directus_sessions: DirectusSession[];
  directus_settings: DirectusSetting;
  directus_shares: DirectusShare[];
  directus_users: DirectusUser[];
  directus_webhooks: DirectusWebhook[];
  events: Event[];
  events_page: EventsPage[];
  events_translations: EventsTranslation[];
  home_page: HomePage[];
  home_page_files: HomePageFile[];
  home_page_files_1: HomePageFiles1[];
  home_page_translations: HomePageTranslation[];
  ideas_offer_page: IdeasOfferPage[];
  ideas_offers: IdeasOffer[];
  ideas_offers_translations: IdeasOffersTranslation[];
  junction_directus_files_translations: JunctionDirectusFilesTranslation[];
  languages: Language[];
  features_flags: FeatureFlags;
  privacy_policy_page: PrivacyPolicyPage[];
  privacy_policy_page_translations: PrivacyPolicyPageTranslation[];
  renovations: Renovation[];
  seo: Seo[];
  seo_translations: SeoTranslation[];
  terms_conditions_page: TermsConditionsPage[];
  terms_conditions_page_translations: TermsConditionsPageTranslation[];
};

export type CollectionName = keyof Collections;

export type ItemIn<CollectionKey extends CollectionName> =
  Collections[CollectionKey] extends (infer Item extends Record<string, any>)[]
    ? Item
    : Collections[CollectionKey];
