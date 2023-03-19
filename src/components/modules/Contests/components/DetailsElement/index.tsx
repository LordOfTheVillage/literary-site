import React from "react";
import { IconType } from "react-icons/lib";
import { DetailsIcon } from "./DetailsIcon";

type DetailsElementProps = {
  title: string;
  description: string;
  icon: IconType;
  className?: string;
};

export const DetailsElement: React.FC<DetailsElementProps> = ({
  title,
  description,
  icon,
  className = "",
}) => {
  return (
    <div className={`flex flex-1 gap-1 ${className}`}>
      <DetailsIcon icon={icon} />
      <div>
        <p className="mb-1 text-xs uppercase text-slate-500">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};
