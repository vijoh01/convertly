import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WikiInfo = ({ format }:any) => {
  const [wikiContent, setWikiContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (format) {
      const fetchWikiContent = async () => {
        try {
          const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${format}`);
          const summary = response.data.extract;
          console.log("fetch");
          
          if (summary.toLowerCase().includes('format') 
            || summary.toLowerCase().includes('file') 
            || summary.toLowerCase().includes('image')) {
            setWikiContent(summary);
          } else {
            setWikiContent('No specific information about this image format.');
          }
        } catch (error) {
          console.error('Error fetching Wikipedia content:', error);
          setWikiContent('No information available.');
        } finally {
          setLoading(false);
        }
      };

      fetchWikiContent();
    }
  }, [format]);

  return (
    <div className="my-4 p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-2">About {format.toUpperCase()}</h2>
      {loading ? <p>Loading...</p> : <p>{wikiContent}</p>}
    </div>
  );
};

export default WikiInfo;
