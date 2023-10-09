// update routes accordingly
export enum RoleRedirects {
  'others/404', // placeholder for index 0
  'patient',
  'admin',
  'dentist',
  'dental-assistant',
  'front-office-manager',
  'hygienist',
  'practice-manager',
  'super-admin',
};

export enum Roles {
  PATIENT = 'patient',
  ADMIN = 'admin',
  DENTAL_ASSISTANT = 'dental-assistant',
  DENTIST = 'dentist',
  FRONT_OFFICE_MANAGER = 'front-office-manager',
  HYGIENIST = 'hygienist',
  PRACTICE_MANAGER = 'practice-manager',
  SUPER_ADMIN = 'super-admin',
}

export enum ERoles {
  UNKNOWN,
  PATIENT,
  ADMIN,
  DENTAL_ASSISTANT,
  DENTIST,
  FRONT_OFFICE_MANAGER,
  HYGIENIST,
  PRACTICE_MANAGER,
  SUPER_ADMIN
}
