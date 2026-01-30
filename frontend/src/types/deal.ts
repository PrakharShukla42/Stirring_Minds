export interface Deal {
  _id: string; 
  title: string;
  description: string;
  partnerName: string;
  accessLevel: "public" | "locked";
  eligibilityText?: string;
}
