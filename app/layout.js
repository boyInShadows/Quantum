import "./globals.css";

export const metadata = {
  title: "Single Page Application",
  description: "A modern single page application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
