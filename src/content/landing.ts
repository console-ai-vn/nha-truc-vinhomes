import { Award, BriefcaseBusiness, GraduationCap, Network } from "lucide-react";

export const landingContent = {
  links: {
    zaloRoom: "https://zalo.me/g/pmlijy761",
    tiktok: "https://www.tiktok.com/@tranthuyduong1987",
    facebook: "https://www.facebook.com/thuy.duong.40234",
    openAccount: "https://iboard.ssi.com.vn/open-account/?moigioi=2122",
    email: "duongttt@ssi.com.vn",
    phone: "0933153333"
  },
  stats: [
    { value: "10 nam", label: "dong hanh cung thi truong" },
    { value: "SSI", label: "Hoi so 03 / TVCK 09" },
    { value: "2025", label: "KOL xuat sac Retail Awards" },
    { value: "2024", label: "Retail Awards ghi nhan thanh tich" },
    { value: "HS09", label: "xay dung doi ngu tu van" }
  ],
  proofs: [
    {
      title: "KOL xuat sac 2025",
      text: "Ghi nhan tu SSI Retail Awards cho hoat dong thuong hieu ca nhan va dong gop trong chuong trinh Diem Tin Sang.",
      image: "/assets/selected/proof-kol-2025.jpg",
      alt: "SSI Retail Awards 2025 certificate"
    },
    {
      title: "Thanh tich Retail Awards 2024",
      text: "Bang vinh danh cho cac chi so tang truong trong hoat dong tu van chung khoan tai Hoi so.",
      image: "/assets/selected/proof-retail-awards-2024.jpg",
      alt: "Retail Awards 2024 certificates"
    },
    {
      title: "Lanh dao co dau an ca nhan",
      text: "Hinh anh vinh danh truong phong moi gioi xuat sac chi nhanh 2025, cho thay nang luc dan doi va tao ket qua.",
      image: "/assets/selected/proof-branch-award-2025.jpg",
      alt: "Tran Thi Thuy Duong branch recognition"
    }
  ],
  roles: [
    {
      title: "Tu van chung khoan",
      text: "Phu hop nguoi muon phat trien nghe tai chinh, ban hang tu van va cham soc khach hang dau tu.",
      icon: BriefcaseBusiness
    },
    {
      title: "Hoc viec / thuc tap sinh",
      text: "Bat dau tu nen tang FA, TA, quy trinh tu van va cach xay dung thuong hieu ca nhan.",
      icon: GraduationCap
    },
    {
      title: "CTV / xay team rieng",
      text: "Mo rong mang luoi khach hang va nhan su theo co che duoc xac nhan truc tiep voi doi ngu.",
      icon: Network
    },
    {
      title: "Dinh huong leader",
      text: "Danh cho nguoi da co kinh nghiem sales, tai chinh hoac quan ly nhom va muon tang toc.",
      icon: Award
    }
  ],
  training: [
    "Phan tich co ban, phan tich ky thuat va nhan dinh thi truong.",
    "Ky nang tu van, ban hang va quan tri moi quan he khach hang.",
    "Phat trien khach hang qua Facebook, TikTok, Zalo va cong dong.",
    "Xay dung thuong hieu ca nhan theo cach co ky luat, dung quy dinh.",
    "Dao tao nguoi moi va mo rong doi ngu CTV khi du nang luc."
  ]
};
