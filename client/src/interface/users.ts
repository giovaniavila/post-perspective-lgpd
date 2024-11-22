export interface UserProps {
  admin: false;
  username: string;
  full_name: string;
  profession: string;
  password_hash: string;
  birthplace: string;
  email: string;
  terms_accepted: boolean;
}

export interface SendEmailProps {
  toEmail: string;
  userDataFile: string[];
}
