interface BusinessContentHeaderProps {
  children: React.ReactNode;
}

const BusinessContentHeader = (props: BusinessContentHeaderProps) => {
  const { children } = props;

  return (
    <div className="bg-white sticky md:top-[4.6rem] top-[5.04rem] pt-4">
      {children}
    </div>
  );
};

export default BusinessContentHeader;
