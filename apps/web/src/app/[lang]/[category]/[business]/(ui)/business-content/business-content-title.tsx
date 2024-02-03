interface BusinessContentTitle {
  children: string;
}

const BusinessContentTitle = (props: BusinessContentTitle) => {
  const { children } = props;

  return (
    <h1 className="text-black/80 pb-1 md:pb-3 text-xl md:text-[2rem] font-semibold">
      {children}
    </h1>
  );
};

export default BusinessContentTitle;
