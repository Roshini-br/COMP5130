export interface UserInfoModel {
  username: string; // Username
  email: string; // Unique email
  password: string; // User's password
  createdAt: Date; // Account creation timestamp
  address: string; // User's delivery address
  phoneNumber?: string; // Optional phone number
}
