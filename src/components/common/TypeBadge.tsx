import { Badge } from "@/components/ui/badge";
import { EMPLOYEE_TYPE_COLORS, EMPLOYEE_TYPE_LABELS } from "@/src/constants";
import type { EmployeeType } from "@/src/types";

interface TypeBadgeProps {
  type: EmployeeType;
  className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  return (
    <Badge className={`${EMPLOYEE_TYPE_COLORS[type]} text-white font-semibold ${className || ""}`}>
      {EMPLOYEE_TYPE_LABELS[type]}
    </Badge>
  );
}