// pages/_app.tsx or a custom layout component like RootLayout.tsx

import type { Metadata } from 'next';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import './globals.css'; // Adjust path as necessary for your global styles

const inter = Inter({ subsets: ['latin'] });

const defaultMetadata: Metadata = {
  title: 'Free Online Image Converter - Quick and Easy Image Conversion | Convertly',
  description: 'Use our free online image converter to quickly and easily convert your images between formats like JPG, PNG, and more. High-quality results in seconds.',
  keywords: 'free image converter, jpg to png, png to jpg, online image converter, convert images, image format conversion',
  robots: 'index, follow',
};

const RootLayout = ({ metadata = {}, children }: any) => {
  const mergedMetadata: any = { ...defaultMetadata, ...metadata };

  return (
    <>
      <Head>
        <title>{mergedMetadata.title}</title>
        <meta name="description" content={mergedMetadata.description || ''} />
        <meta name="keywords" content={mergedMetadata.keywords || ''} />
        <meta name="robots" content={mergedMetadata.robots || ''} />
        <link rel="canonical" href={mergedMetadata.canonical || ''} />
    
        <meta name="google-adsense-account" content={'ca-pub-3356299841997010'} />
        
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3356299841997010"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </>
  );
};

export default RootLayout;
