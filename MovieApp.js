import React ,{useState,useEffect} from 'react';
import axios from 'axios';

const MovieRecomm = () => {
    const  [search,setSearch]=useState('');
    const  [data,setData]=useState([]);
    const [cus,setcus]=useState([])
    const changeHandler=(e)=>{
        setSearch(e.target.value);
    }

    useEffect(() => {
      // Fetch data from the API endpoint when the component mounts
      axios.get('http://localhost:3000/api/customers')
          .then(response => {
           
            console.log(response.data)
            setcus(response.data)
              
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }, []); // Empty dependency array ensures useEffect runs only once


    const submitHandler=(e)=>{
      // http://www.omdbapi.com/?s=${search}&apikey=263d22d8
        e.preventDefault();
        fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`).then(
            response=>response.json(),
           
        ).then (
            value=>{
                setData(value.Search);
               })
    }

    const download=url=>{
        fetch(url).then(response=>{
            response.arrayBuffer().then(function(buffer){
                const url=window.URL.createObjectURL(new Blob([buffer]));
                const link=document.createElement("a");
                link.href=url;
                link.setAttribute("download","image.png");
                document.body.appendChild(link);
                link.click();
            });


        })
        .catch(err=>{
            console.log(err);
        })
    }





  return (
    <div>
      <div>
      {cus.map((item, index) => {
    // Create a new Date object from the created_at string
    const createdAtDate = new Date(item.created_at);

    // Extract date components
    const year = createdAtDate.getFullYear();
    const month = String(createdAtDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(createdAtDate.getDate()).padStart(2, '0'); // Add leading zero if needed

    // Extract time components
    const hours = String(createdAtDate.getHours()).padStart(2, '0'); // Add leading zero if needed
    const minutes = String(createdAtDate.getMinutes()).padStart(2, '0'); // Add leading zero if needed
    const seconds = String(createdAtDate.getSeconds()).padStart(2, '0'); // Add leading zero if needed

    // Construct formatted date and time strings
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return (
        <div key={index}>
            <li>{index}</li>
            <li>{item.customer_name}</li>
            <li>{item.age}</li>
            <li>Date: {formattedDate}</li>
            <li>Time: {formattedTime}</li>
        </div>
    );
})}









      </div>
        <center>
          <h1>Search Your Favorite Movie</h1>


            <form onClick={submitHandler}>
                <input type="text" value={search} onChange={changeHandler}/><br/><br/>
                <input type="button" value="search"/>
            </form>
            <div className="row" >
          {data && data.length>=1?data.map(movie=>
          <div className="col-md-4" key={movie.imdbID}>
            <div className="card" style={{"width": "18rem"}}>
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
              <div className="card-body">
                <h4 className="card-title">{movie.Title}</h4>
                <a className="btn btn-primary" onClick={()=>download(movie.Poster)}>Download Poster</a>
              </div>
            </div>
          </div>
            ):null}
            </div>
        </center>
       
    </div>
  )
}

export default MovieRecomm;