/* eslint-disable max-len */


  //taking in map 
  async function dataHandler(){
   
    //getting data from the api 
    const request = await fetch('/api/dining');
    const api_data = await request.json();
    const data = api_data.data;
    const table = document.querySelector('.table');

    console.log(data);

    data.forEach(element => {
      console.log(element.hall_name);
      console.log(element.hall_address);
      const appendItem = document.createElement('tr');
      appendItem.innerHTML = `<td>${element.hall_name}</td><td>${element.hall_address}</td>`;
      table.append(appendItem);
      
    });



    
   

    //targetList.append(appendItem);
 
  }
  
    async function windowActions(){
    
      await dataHandler();
    }
  
  window.onload = windowActions;
  