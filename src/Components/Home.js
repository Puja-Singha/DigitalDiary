import  React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 





export const Home = (props) => {
  const [entryData, setEntryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 8;
  const deletedEntries = JSON.parse(localStorage.getItem('deletedEntries')) || [];

  const fetchData = async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://vxpqzmpeuyfnwecitjud.hasura.ap-southeast-1.nhost.run/api/rest/entry',
      headers: {
        'x-hasura-admin-secret': `${process.env.REACT_APP_API_KEY}`
      }
    };

    try {
      const response = await axios.request(config);
      const filteredData = response.data.entry.filter(entry => !deletedEntries.includes(entry.id));
      setEntryData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchData();
  },);

    
  const sortedEntries = entryData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);


    if (dateA.getMonth() !== dateB.getMonth()) {
      return dateB.getMonth() - dateA.getMonth();
    }
    return dateB.getDate() - dateA.getDate();
  });
  
  
 
  
  const handleDelete = async (entryId) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this entry?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const requestData = JSON.stringify({
              input: {
                id: entryId,
              },
            });
  
            const config = {
              method: 'patch',
              maxBodyLength: Infinity,
              url: `https://vxpqzmpeuyfnwecitjud.hasura.ap-southeast-1.nhost.run/api/rest/entry/${entryId}`,
              headers: {
                'x-hasura-admin-secret': `${process.env.REACT_APP_API_KEY}`,
                'Content-Type': 'application/json',
              },
              data: requestData,
            };
  
            try {
              await axios.request(config);
              const updatedDeletedEntries = [...deletedEntries, entryId];
              localStorage.setItem('deletedEntries', JSON.stringify(updatedDeletedEntries));
              const updatedEntryData = entryData.filter((entry) => entry.id !== entryId);
              setEntryData(updatedEntryData);
              toast.success('Entry deleted',{position:"top-center"},{theme:"colored"});
              console.log('Entry deleted:', entryId);
            } catch (error) {
              console.error('Error deleting entry:', error);
              toast.error('Error deleting entry');
            }
          },
        },
        {
          label: 'No',
          onClick: () => {
           
          },
        },
      ],
    });
  };
  

   const indexOfLastEntry = currentPage * entriesPerPage;
   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
   const currentEntries = sortedEntries.slice(indexOfFirstEntry, indexOfLastEntry);
 
   
   const nextPage = async () => {
    if (currentPage < Math.ceil(entryData.length / entriesPerPage)) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      setCurrentPage(currentPage + 1);
      setLoading(false);
    }
  };
 
   const prevPage = () => {
     if (currentPage > 1) {
       setCurrentPage(currentPage - 1);
     }
   };
  
   

   return (
    <div className='bg-black' style={{position: 'relative', minHeight: '100vh' }} >
      {/* <img src={skyImage} className='relative' alt='' style={{ position: 'absolute', width: '100%', height: '100%', zIndex: '-1' }} loading="lazy"/> */}
    <div className='container items-center px-32 overflow-hidden' >
    <div
          className="welcome-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px 0',
          }}
        >
          {/* <img
            src={image}
            className="item-right"
            alt=""
            style={{
              width: '280px',
              height: '300px',
              fontSize: '6em',
             
              '@media (max-width: @screen-xs-max)': {
                width: '100px',
                height: '180px',
                fontSize: '4em',
              },
            }}
          /> */}
          <h1
            className="items-center md:font-3xl font-2xl"
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '4px 4px 4px pink',
              borderRadius: '100px',
              fontSize: '4em',
              paddingTop: '50px',
              paddingBottom: '50px',
              paddingRight: '0.5em',
              wordSpacing: '0.5em',
              '@media (max-width: 600px)': {
                fontSize: '0.5em',
                paddingTop: '20px',
                paddingBottom: '20px',
              },
            }}
          >
            WELCOME TO DIGITALDIARY
          </h1>
        </div>



      <h1 className='my-3'style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'yellow',
          textShadow: '4px 4px 4px white',
          borderRadius: '10px',
          // border: '2px solid #00008b',
          padding: '10px',
          fontSize: "5em"
        }}>
        ENTRIES
      </h1>
      {loading ? (
        <div className="loading-bar">Loading...</div>
      ) : (
        <div>
          <div className="card-container overflow-hidden" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', background:'black' }}>
            {currentEntries.map((entry, index) => (
              <div className="card flex my-3" key={`${entry.id}-${index}`} style={{ width: '18rem' }}>
                <div className="card-body rounded" style={{ backgroundColor: '#000000', color: "white", right: '0', border: '4px solid yellow' }}>
                  <h5 className="card-date">{entry.date}</h5>
                  <p className="card-text" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>{entry.content}</p>
                     <Link
                      to={`/entry/${entry.id}?date=${encodeURIComponent(entry.date)}&content=${encodeURIComponent(entry.content)}`}
                    className='btn btn-sml'
                    style={{ backgroundColor: 'yellow' }}
                    target='_blank'
                  >
                    Read more
                  </Link>
                  <button className='btn btn-sml btn-danger mx-2 overflow-hidden' value={"delete"} onClick={() => handleDelete(entry.id)} style={{background: "red", color: "white"}}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button className="btn btn-primary mx-3 overflow-hidden" style={{backgroundColor: "yellow", color: "black"}} onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <button className="btn btn-primary" style={{backgroundColor: "yellow", color: "black", }} onClick={nextPage} disabled={currentPage === Math.ceil(entryData.length / entriesPerPage)}>Next</button>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
    </div>
  );
}
