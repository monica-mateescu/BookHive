import { Users } from "lucide-react";

type MembersBadgeProps = {
  current: number;
  max: number;
};

const MembersBadge = ({ current, max }: MembersBadgeProps) => {
  return (
    <span className="badge badge-outline rounded-2xl bg-(--gray-secondary)">
      <Users className="text-(--brand-primary)" size={18} />
      {current} / {max}
    </span>
  );
};

export default MembersBadge;
