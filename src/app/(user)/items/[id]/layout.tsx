export default function ItemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className='mx-4 flex'>{children}</main>;
}
