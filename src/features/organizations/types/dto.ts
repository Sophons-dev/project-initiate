// TODO: change the file name or structure in the future

export type Organization = {
  id: string;
  name: string;
  type: OrganizationType;
  description: string;
  website: string;
  logoUrl: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum OrganizationType {
  company = 'company',
  university = 'university',
  bootcamp = 'bootcamp',
  online_platform = 'online_platform',
  government = 'government',
  ngo = 'ngo',
  other = 'other',
}
