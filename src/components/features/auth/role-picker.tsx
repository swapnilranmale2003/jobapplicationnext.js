import { Icon, type IconName } from "@/components/ui";
import type { UserRole } from "@/types";
import { cn } from "@/utils";
import styles from "./auth-form.module.css";

const ROLE_OPTIONS: Record<UserRole, { label: string; icon: IconName }> = {
  seeker: { label: "Job Seeker", icon: "user" },
  recruiter: { label: "Recruiter", icon: "briefcase" },
  admin: { label: "Admin", icon: "shield" },
};

type RolePickerProps = {
  roles: UserRole[];
  value: UserRole;
  onChange: (role: UserRole) => void;
  legend: string;
};

export function RolePicker({ roles, value, onChange, legend }: RolePickerProps) {
  return (
    <fieldset className={cn(styles.roleGroup, roles.length === 2 && styles.twoRoles)}>
      <legend>{legend}</legend>
      {roles.map((role) => (
        <label key={role} className={styles.roleOption}>
          <input
            type="radio"
            name="role"
            value={role}
            checked={value === role}
            onChange={() => onChange(role)}
          />
          <Icon name={ROLE_OPTIONS[role].icon} size={18} />
          {ROLE_OPTIONS[role].label}
        </label>
      ))}
    </fieldset>
  );
}
