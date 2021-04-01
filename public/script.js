/* eslint-disable max-len */


  async function dataHandler(){
   
    //getting data from the api 

    //fetching data from api 
    const request = await fetch('/api/dining');

    //getting .json values from api data 
    const api_data = await request.json();

    //getting data values from the api data 
    const data = api_data.data;

    //returns the element that matches table 
    const table = document.querySelector('.table');

    console.log(data);

    //looping through the data 
    data.forEach(element => {
      //logging all rhe elements of the data 
      console.log(element.hall_name);
      console.log(element.hall_address);
      console.log(element.hall_id)

      //creating row for table 
      const appendItem = document.createElement('tr');

      //changing this item w the elements of the data 
      appendItem.innerHTML = `<td>${element.hall_id}</td><td>${element.hall_name}</td><td>${element.hall_address}</td>`;
      
      //adding all this to the table 
      table.append(appendItem);
      
    });



    
   

    //targetList.append(appendItem);
 
  }
  
    async function windowActions(){
    
      await dataHandler();
    }
  
  window.onload = windowActions;
  