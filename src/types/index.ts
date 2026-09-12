export type InquiryStatus = "new" | "contacted" | "confirmed" | "cancelled";

export const INQUIRY_STATUS_LABEL: Record<InquiryStatus, string> = {
  new: "신규",
  contacted: "연락함",
  confirmed: "예약 확정",
  cancelled: "취소",
};

export type Inquiry = {
  id: string;
  /** 희망 객실 id. "undecided"면 상담 후 결정 */
  roomId: string;
  /** 문의 시점의 방 이름을 박제 — 나중에 방 구성이 바뀌어도 과거 문의는 그대로 */
  roomLabel: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  nights: number;
  adults: number;
  children: number;
  name: string;
  phone: string;
  message: string;
  status: InquiryStatus;
  /** 사장님 메모 (관리자만) */
  adminNote: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export type InquiryInput = Pick<
  Inquiry,
  | "roomId"
  | "checkIn"
  | "checkOut"
  | "adults"
  | "children"
  | "name"
  | "phone"
  | "message"
>;
