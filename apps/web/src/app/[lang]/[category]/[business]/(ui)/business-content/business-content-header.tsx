interface BusinessContentHeaderProps {
  children: React.ReactNode;
}

const BusinessContentHeader = (props: BusinessContentHeaderProps) => {
  const { children } = props;

  return (
    <div className="bg-white sticky z-10 md:top-[4.57rem] top-[5.04rem] pt-4 -mx-4 px-4">
      {children}
    </div>
  );
};

export default BusinessContentHeader;
