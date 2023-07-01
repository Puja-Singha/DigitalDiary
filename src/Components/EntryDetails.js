import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export const EntryDetails = () => {
    const [entry, setEntry] = useState(null);
    const { id } = useParams();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const date = params.get('date');
    const content = params.get('content');
  
    useEffect(() => {
      const fetchEntry = async () => {
        try {
          const response = await axios.get(`https://vxpqzmpeuyfnwecitjud.hasura.ap-southeast-1.nhost.run/api/rest/entry/${id}`, {
            headers: {
              'x-hasura-admin-secret': `${process.env.REACT_APP_API_KEY}`
            }
          });
          setEntry(response.data.entry);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchEntry();
    }, [id]);
  
    useEffect(() => {
      console.log('date:', date);
      console.log('content:', content);
    }, [date, content]);
  
    if (!entry) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className='container my-3'>
     
        <h2 className='my-5'> {date}</h2>
        <p> {content}</p>
      
      </div>
    );
  };