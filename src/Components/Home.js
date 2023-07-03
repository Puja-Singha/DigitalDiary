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
      url: "https://vxpqzmpeuyfnwecitjud.hasura.ap-southeast-1.nhost.run/api/rest/entry",
      headers: {
        'x-hasura-admin-secret': `daeb7c71e1acf5615bd900c4ddfdd6a7`,
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
                'x-hasura-admin-secret': `daeb7c71e1acf5615bd900c4ddfdd6a7`,
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
        </div>



      <h1 className='my-3'style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '4px 2px 2px yellow',
          borderRadius: '10px',
          padding: '10px',
          fontSize: "5em"
        }}>
        ENTRIES
      </h1>
      {loading ? (
        <div className="loading-bar text-white">Loading...</div>
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
          <div className='pb-4' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button className="btn btn-primary mx-3 overflow-hidden " style={{backgroundColor: "yellow", color: "black"}} onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <button className="btn btn-primary " style={{backgroundColor: "yellow", color: "black", }} onClick={nextPage} disabled={currentPage === Math.ceil(entryData.length / entriesPerPage)}>Next</button>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
    </div>
  );
}
