import './globals.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return children;
};

export const revalidate = 60 * 10;

export default Layout;
