import { Users } from "lucide-react";

type MembersBadgeProps = {
  current: number;
  max: number;
};

const MembersBadge = ({ current, max }: MembersBadgeProps) => {
  return (
    <span className="badge-members flex min-w-22 items-center justify-start">
      <Users className="badge-members__icon" size={16} />
      {current} / {max}
    </span>
  );
};

export default MembersBadge;
