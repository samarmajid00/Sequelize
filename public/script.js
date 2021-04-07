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

  }



    
   

    //targetList.append(appendItem);

  async function dataHandlerMacros(){
    //getting data from the api 

    //fetching data from api 
    const request = await fetch('/api/macros');

    //getting .json values from api data 
    const api_data = await request.json();

    //getting data values from the api data 
    const data = api_data.data;


    console.log(api_data);

    let macro_data =[
      {
        type: "stackedBar",
        name: "Calories",
        showInLegend: "true",
        
        dataPoints: [

      
        ]
      },
    ]

    //looping through the data 
    api_data.forEach(element => {
      //logging all rhe elements of the data 
      console.log(element.macro_id);
      console.log(element.calories);
      console.log(element.sodium)

      macro_data[0].dataPoints.push({ x: element.meal_id, y: element.calories })
     

      
    });



    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
      text: "Meal Macro Information"
      },

     

      data: macro_data


     

      
    });

    chart.render();

  }



    
  
    async function windowActions(){
    
      await dataHandler();
      await dataHandlerMacros();
    }
  
  window.onload = windowActions;
  