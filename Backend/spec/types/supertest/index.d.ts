import { IUser } from "@src/models/Cart";
import "supertest";

declare module "supertest" {
  export interface Response {
    headers: Record<string, string[]>;
    body: {
      error: string;
      users: IUser[];
    };
  }
}
