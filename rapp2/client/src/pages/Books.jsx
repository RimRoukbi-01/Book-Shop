import React, { useEffect, useState } from 'react'
import axios from'axios'
import { Link } from 'react-router-dom'

const Books = () => {
    const[books,setBooks]= useState([])
    
    useEffect(()=>{
        const fetchAllBooks = async ()=>{
            try{
                 const res = await axios.get("http://localhost:8800/books")
                 setBooks(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8800/books/${id}`);
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      } catch (err) {
        console.log(err);
      }
    };
    

  return (
    <div>
      <h1>  ESI Book-shop</h1> 
      <div className='books'>
        {books.map(book=>(
            <div className='book' key={book.id}>
              {book.cover && <img src={book.cover} alt="" />}
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span> {book.price} MAD</span>
              <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
              <button className='update'><Link style={{ color: "inherit", textDecoration: "none" }} to={`/update/${book.id}`}>Update</Link></button>

                              
            </div>

        ))}
      </div>
      <button className='btn'><Link  style={{ color: "inherit", textDecoration: "none" }}to ="/add">Add new book</Link></button>
    </div>
  )
}

export default Books