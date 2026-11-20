import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API_BASE_URL from '../config'

function BulkDetails() {
    const[fresherslist,setfresherslist]=useState([])

    useEffect(()=>{
        getfreshers();
    },[])

    const getfreshers=async()=>{
        let result=await fetch(`${API_BASE_URL}/freshers`)
        result=await result.json()
        setfresherslist(result)
    }
  return (
    <div>
      <h1>Freshers details</h1>
      {
            fresherslist.length>0?fresherslist.map((items)=>
    <div key={items._id || items.applicantemailid}> 

            <h3>{items.applicantDomain}</h3>
            <h3>{items.applicantname}</h3>
            <h4>{items.applicantemailid}</h4>
            <h4>{items.applicantphoneno}</h4>
    </div>
  ):<h1>No candidate listed yet in this domain</h1>
}
<Link to='/meeting' style={{ display: 'inline-block', marginTop: '15px', padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Host a Meeting</Link>
</div>
)}

export default BulkDetails
