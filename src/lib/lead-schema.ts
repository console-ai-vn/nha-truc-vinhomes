import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Nhap ho ten"),
  email: z.string().trim().email("Email khong hop le"),
  phoneZalo: z.string().trim().min(8, "Nhap phone/Zalo"),
  roleInterest: z.string().trim().min(2, "Chon vi tri quan tam"),
  experienceLevel: z.string().trim().optional(),
  socialLink: z.string().trim().optional(),
  note: z.string().trim().optional(),
  source: z.string().trim().optional(),
  utmCampaign: z.string().trim().optional()
});

export type LeadPayload = z.infer<typeof leadSchema>;
