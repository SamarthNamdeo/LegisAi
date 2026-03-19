/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: policiesandschemes
 * Interface for PoliciesandSchemes
 */
export interface PoliciesandSchemes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  policyTitle?: string;
  /** @wixFieldType text */
  policyDescription?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  caseType?: string;
  /** @wixFieldType text */
  keywords?: string;
}


/**
 * Collection ID: schemealerts
 * Interface for SchemeAlerts
 */
export interface SchemeAlerts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  alertTitle?: string;
  /** @wixFieldType text */
  alertMessage?: string;
  /** @wixFieldType datetime */
  notificationDate?: Date | string;
  /** @wixFieldType url */
  relevantLink?: string;
  /** @wixFieldType text */
  schemeName?: string;
}
