/* eslint-disable max-len */


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function get_random_meals(data){
  let random_meals = []
  for (i = 0; i < 10; i++){
    let current_random_meal = getRandomInt(data.length-1);
    random_meals.push(data[current_random_meal]);
    data.splice(current_random_meal,1)
  }
  return random_meals;
}




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



    let macro_data =[
      {
        type: "stackedBar",
        name: "Calories",
        showInLegend: "true",
        dataPoints: []
      },

      {
        type: "stackedBar",
        name: "Serving Size",
        showInLegend: "true",
        dataPoints: []
      },
      {
        type: "stackedBar",
        name: "Cholesterol",
        showInLegend: "true",
        dataPoints: []
      },
      {
        type: "stackedBar",
        name: "Sodium",
        showInLegend: "true",
        dataPoints: []
      },
      {
        type: "stackedBar",
        name: "Carbs",
        showInLegend: "true",
        dataPoints: []
      },
      {
        type: "stackedBar",
        name: "Protein",
        showInLegend: "true",
        dataPoints: []
      },
      {
        type: "stackedBar",
        name: "Fat",
        showInLegend: "true",
        dataPoints: []
      },
   

      
    ]

    let random_meal_list = get_random_meals(api_data);

    //looping through the data 
    for(i =0; i < random_meal_list.length; i++){
      element = random_meal_list[i]

    




      const name_request = await fetch(`/api/meals/${element.meal_id}`);

      //getting .json values from api data 
      const name_data = await name_request.json();

      console.log(name_data);
  

      macro_data[0].dataPoints.push({ label: name_data[0].meal_name, y: element.calories })
      macro_data[1].dataPoints.push({ label: name_data[0].meal_name, y: element.serving_size })
      macro_data[2].dataPoints.push({ label: name_data[0].meal_name, y: element.cholesterol })
      macro_data[3].dataPoints.push({ label: name_data[0].meal_name, y: element.sodium })
      macro_data[4].dataPoints.push({ label: name_data[0].meal_name, y: element.carbs })
      macro_data[5].dataPoints.push({ label: name_data[0].meal_name, y: element.protein })
      macro_data[6].dataPoints.push({ label: name_data[0].meal_name, y: element.fat })
      
      
    };



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
  