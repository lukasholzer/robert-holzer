export interface IWPTaxonomy {
  term_id?: number;
  name?: string;
  slug?: string;
  term_group?: number;
  term_taxonomy_id?: number;
  taxonomy?: string;
  description?: string;
  parent?: number;
  count?: number;
  filter?: string;

  errors?: {
    invalid_taxonomy: string[];
  };
  error_data?: any[];
}
