interface BusinessContentHeaderProps {
  children: React.ReactNode;
}

const BusinessContentHeader = (props: BusinessContentHeaderProps) => {
  const { children } = props;

  return (
    <div className="bg-white sticky z-10 rounded-t pt-4 -mx-4 px-4">
      {children}
    </div>
  );
};

export default BusinessContentHeader;
