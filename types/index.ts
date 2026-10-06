/**
 * Shared TypeScript type definitions
 */

export type UserRole = "developer" | "hospital_admin" | "staff" | "doctor";

export type ContentStatus = "draft" | "published" | "archived";

export type NotificationStatus = "PENDING" | "SENT" | "FAILED";

export type EnquiryPipelineStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "completed"
  | "cancelled";
