import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Vui lòng nhập họ tên"),
  email: z.string().trim().email("Email không hợp lệ"),
  phoneZalo: z.string().trim().min(8, "Vui lòng nhập số điện thoại/Zalo"),
  roleInterest: z.string().trim().min(2, "Vui lòng chọn vị trí quan tâm"),
  experienceLevel: z.string().trim().optional(),
  socialLink: z.string().trim().optional(),
  note: z.string().trim().optional(),
  source: z.string().trim().optional(),
  utmCampaign: z.string().trim().optional()
});

export type LeadPayload = z.infer<typeof leadSchema>;
