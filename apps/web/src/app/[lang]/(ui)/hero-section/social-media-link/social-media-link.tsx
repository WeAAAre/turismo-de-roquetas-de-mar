import Link from 'next/link';

interface SocialMediaLinkProps {
  href: string;
  'aria-label': string;
  icon: React.ReactNode;
}

const SocialMediaLink = (props: SocialMediaLinkProps) => {
  const { href, icon, ...restProps } = props;

  return (
    <Link
      className="rounded-full border border-white p-2 text-white"
      href={href}
      {...restProps}
    >
      {icon}
    </Link>
  );
};

export default SocialMediaLink;
