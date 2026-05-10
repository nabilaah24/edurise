import React from "react";

function PageContainer({
  title,
  children,
}: Readonly<{
  title: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-medium text-2xl font-poppins">{title}</div>
      {children}
    </div>
  );
}

export { PageContainer };
