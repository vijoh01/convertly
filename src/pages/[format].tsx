import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import '../app/globals.css';
import Head from 'next/head';
import axios from 'axios';

const types = ["jpeg", "png", "bmp", "tiff", "webp", "gif", "ico", "jp2", "avif"];

const ImageConverter = ({ fromWiki, toWiki }:any) => {
  const router = useRouter();
  const { format }: any = router.query;

  const from = format ? format.split('-to-')[0].toLowerCase() : '';
  const to = format ? format.split('-to-')[1].toLowerCase() : '';

  const goToRoute = (obj: any) => {
    const [beforeTo, afterTo] = format.split('-to-');
    if (obj.from !== null) {
      console.log("from", obj.from);

      const newRoute = `${obj.from}-to-${afterTo}`;
      router.replace(`/${newRoute}`);
    } else if (obj.to !== null) {
      console.log(beforeTo, "to", obj.to);
      const newRoute = `${beforeTo}-to-${obj.to}`;
      router.replace(`/${newRoute}`);
    }
  };

  useEffect(() => {
    setSelectedFrom(from);
    setSelectedTo(to);
  }, [from, to]);

  const isValidFormat = (inputFormat: any) => {
    if (!inputFormat) return false;

    const [from, to] = inputFormat.split('-to-');

    return types.includes(from.toLowerCase()) &&
      types.includes(to.toLowerCase()) &&
      from.toLowerCase() !== to.toLowerCase();
  };

  const [file, setFile]: any = useState(null);
  const [selectedFrom, setSelectedFrom] = useState(from);
  const [selectedTo, setSelectedTo] = useState(to);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleFromChange = (e: any) => {
    const [beforeTo, afterTo] = format.split('-to-');

    if (e.target.value !== afterTo) {
      setSelectedFrom(e.target.value);
      goToRoute({ from: e.target.value, to: null });
    }
  };

  const handleToChange = (e: any) => {
    const [beforeTo, afterTo] = format.split('-to-');

    if (e.target.value !== beforeTo) {
      setSelectedTo(e.target.value);
      goToRoute({ from: null, to: e.target.value });
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    const formData: any = new FormData();
    formData.append('file', file);
    formData.append('format', selectedTo);

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted.${selectedTo}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      console.log('Conversion successful!');
    } catch (error) {
      console.error('Error during conversion:', error);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  console.log(selectedTo);

  return (
    <>
      <Head>
        <title>{`Convert ${from.toUpperCase()} to ${to.toUpperCase()} Online - Fast Image Converter | Convertly`}</title>
        <meta name="description" content={`Convert ${from.toUpperCase()} to ${to.toUpperCase()} images online for free. Quick, easy, and high-quality image conversion with Convertly.`} />
        <meta name="keywords" content={`convert ${from}, ${from} to ${to}, convert ${from} to ${to}, from ${from} to ${to}, convert image, online converter`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://convertly.org/${format}`} />
        <meta name="google-adsense-account" content={'ca-pub-3356299841997010'} />
        
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3356299841997010"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div className="flex justify-center items-center h-full">
        <div className='max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md'>
          {!isValidFormat(format) || format == null ? <p>Invalid format</p>
            : (<div>



              <div>
              <h1 className="text-3xl font-semibold mb-4">{from.toUpperCase()} to {to.toUpperCase()} Image Converter</h1>

              <p className="mb-4">Convert your images quickly and easily with our free online image converter. Select your file, choose the desired format, and click convert to get high-quality results in seconds.</p>
              <p>Convert image from {from.toUpperCase()} to {to.toUpperCase()}</p>

              {/* Rest of your component */}
            </div>
              <div
                className="border-dashed border-2 border-gray-300 p-4 pt-40 mb-4 rounded-md relative"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <p className="text-gray-500">
                  Drag & Drop your image here or{' '}
                  <label htmlFor="file-input" className="cursor-pointer text-blue-500">
                    click to select
                  </label>
                </p>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {file && <p className="mt-2 text-sm">{file.name}</p>}
              </div>
              <p className=''>From:</p>
              <select
                value={selectedFrom}
                onChange={handleFromChange}
                className="w-full border p-2 mb-4 rounded-md"
              >
                {types.map((sort, index) => (
                  <option key={index} value={sort}>{sort.toUpperCase()}</option>
                ))}
              </select>
              <p className=''>To:</p>
              <select
                value={selectedTo}
                onChange={handleToChange}
                className="w-full border p-2 mb-5 rounded-md"
              >
                {types.map((sort, index) => (
                  <option key={index} value={sort}>{sort.toUpperCase()}</option>
                ))}
              </select>

              <button
                onClick={handleConvert}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Convert
              </button>

              <div className="my-4 p-4 border rounded-md">
                <h2 className="text-xl font-semibold mb-2">About {from.toUpperCase()}</h2>
                <p>{fromWiki}</p>
              </div>
              <div className="my-4 p-4 border rounded-md">
                <h2 className="text-xl font-semibold mb-2">About {to.toUpperCase()}</h2>
                <p>{toWiki}</p>
              </div>
            </div>
            )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context:any) {
  const { format } = context.query;

  let fromWiki = 'No specific information about this image format.';
  let toWiki = 'No specific information about this image format.';

  try {
    if (format) {
      const [from, to] = format.split('-to-');
      
      if (from) {
        const fromResponse = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${from}`);
        fromWiki = fromResponse.data.extract;
        if (!(fromWiki.toLowerCase().includes('format') 
          || fromWiki.toLowerCase().includes('file') 
          || fromWiki.toLowerCase().includes('image'))) {
          fromWiki = "No specific information about this image format."
        }
        
      }

      if (to) {
        const toResponse = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${to}`);
        toWiki = toResponse.data.extract;
        if (!(toWiki.toLowerCase().includes('format') 
          || toWiki.toLowerCase().includes('file') 
          || toWiki.toLowerCase().includes('image'))) {
            toWiki = "No specific information about this image format."
        }
      }
    }
  } catch (error) {
    console.error('Error fetching Wikipedia content:', error);
  }

  return {
    props: {
      fromWiki,
      toWiki,
    },
  };
}

export default ImageConverter;
