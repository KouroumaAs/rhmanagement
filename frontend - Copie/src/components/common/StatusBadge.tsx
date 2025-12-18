import { Badge } from "@/components/ui/badge";
import { EMPLOYEE_STATUS_COLORS, EMPLOYEE_STATUS_LABELS } from "@/src/constants";
import type { EmployeeStatus } from "@/src/types";

interface StatusBadgeProps {
  status: EmployeeStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge className={`${EMPLOYEE_STATUS_COLORS[status]} text-white font-semibold ${className || ""}`}>
      {EMPLOYEE_STATUS_LABELS[status]}
    </Badge>
  );
}