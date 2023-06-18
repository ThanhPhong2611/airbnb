"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      {title ? <div className="text-2xl font-bold">{title}</div> : null}
      {subtitle ? (
        <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
      ) : null}
    </div>
  );
};

export default Heading;
