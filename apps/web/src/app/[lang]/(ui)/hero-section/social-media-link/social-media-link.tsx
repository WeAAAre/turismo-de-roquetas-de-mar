import Link from 'next/link';

interface SocialMediaLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialMediaLink = (props: SocialMediaLinkProps) => {
  const { href, icon } = props;

  return (
    <Link
      className="rounded-full border border-white p-2 text-white"
      href={href}
    >
      {icon}
    </Link>
  );
};

export default SocialMediaLink;
