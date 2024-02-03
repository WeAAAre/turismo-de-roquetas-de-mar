interface BusinessContentLinksProps {
  children: React.ReactNode;
}

const BusinessContentLinks = (props: BusinessContentLinksProps) => {
  const { children } = props;

  return (
    <ul className="flex pb-2 flex-nowrap flex-start items-stretch content-stretch m-0 p-0 list-none gap-4">
      {children}
    </ul>
  );
};

export default BusinessContentLinks;
