import React from 'react'

const About = (props) => {
  return (
    <div className='bg-black'>
    <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
       <h1 className='py-6 pl-9 my-3' style={{ fontWeight: 'bold', alignSelf: 'flex-start',textShadow: '2px 2px 4px yellow', color: 'white' }}>{props.title}</h1>
       <div  style={{ display: 'flex', justifyContent: 'center' }}>
       <p className='container py-3'style={{fontSize: 'larger', background:"yellow", border: '4px solid black'}}><strong>DigitalDiary is a journaling/diary app that allows you to pendown your thoughts, ideas, secrets or whatever comes to your mind at any moment of the day and also you can organise them by date, and delete or update any entry according to your wish.</strong> It can be accessible through any digital device with a good internet connection and also all the contents of the user are kept highly confidential and can be accessible by the user only.</p>
    </div>
    </div>
    </div>
    </div>
  )
}

export default About
