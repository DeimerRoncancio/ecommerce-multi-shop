type ContainerProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "footer";
  className?: string;
};

export default function Container({
  children,
  as: Tag = "div",
  className = "",
}: ContainerProps) {
  return (
    <Tag className={`w-full max-w-7xl mx-auto px-4 md:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
