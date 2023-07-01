import React, { useState } from 'react';
import axios from 'axios';


 const CreateEntry = () => {
    const [newEntry, setNewEntry] = useState({ date: '', content: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = JSON.stringify({
          input: {
            date: newEntry.date,
            content: newEntry.content
          }
        });
        const config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'https://vxpqzmpeuyfnwecitjud.hasura.ap-southeast-1.nhost.run/api/rest/entry',
              headers: {
                'x-hasura-admin-secret': `${process.env.REACT_APP_API_KEY}`
              },
              data: requestData
            };

          try {
            const response = await axios(config);
            console.log('New entry created:', response.data.entry);
            setNewEntry({ date: '', content: '' });
          } catch (error) {
            console.error('Error creating new entry:', error);
          }
        };

  return (
    <div className='bg-skyBlue' style={{position: 'relative', minHeight: '100vh' }}>
     {/* <img src={Image} alt='' style={{ position: 'absolute', width: '100%', height: '100%', zIndex: '-1' }} loading="lazy" /> */}
    <div className="container" style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit}>
    <div>
      <h1 className='text-center text-black' style={{paddingTop: "50px", fontSize:"5em",  textShadow: '4px 4px 4px blue'}}>Create Enteries</h1>
      <input
        type="date"
        className="my-3"
        value={newEntry.date}
        name="date"
        onChange={handleInputChange}
        style={{background:"skyBlue", border: '4px solid skyBlue'}}
      />
    </div>
    <div>
      <textarea
        type="text"
        className="form-control my-2"
        value={newEntry.content}
        name="content"
        rows={"8"}
        // cols={"30"}
        onChange={handleInputChange}
        style={{ width: '100%', backgroundColor: "skyBlue" , color: "blue", border: '4px solid skyBlue' }}
      ></textarea>
    </div>
    <button type="submit" className="btn btn-sml btn-primary my-3" style={{background: "skyBlue", color: "black", hover:"blue",  border: '4px solid skyBlue'}}>
      SUBMIT
    </button>
  </form>
</div>
</div>

  )
}
export default CreateEntry