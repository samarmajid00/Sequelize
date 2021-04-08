/* eslint-disable max-len */


//random number function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//returns a list of 10 random meals
function get_random_meals(data){
  //making empty list
  let random_meals = []
  //looping through 10 times
  for (i = 0; i < 10; i++){
    //making a var to hold a random num
    let current_random_meal = getRandomInt(data.length-1);
    //adding that random meal to a list
    random_meals.push(data[current_random_meal]);
    //removing the element from our data so we dont repeat 
    data.splice(current_random_meal,1)
  }
  //returning that list 
  return random_meals;
}

//function for table
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

  //function for macro chart
  async function dataHandlerMacros(){
    //getting data from the api 

    //fetching data from api 
    const request = await fetch('/api/macros');

    //getting .json values from api data 
    const api_data = await request.json();

    //getting data values from the api data 
    const data = api_data.data;


    //getting all the relevent data for the macros and setting it to a list 
    let macro_data =[
      {
        //relevent info attributes for each element in the list 
        type: "stackedBar",
        name: "Calories",
        showInLegend: "true",
        //setting the list to empty -- each element has this list
        //where we put in the x and y values -- in this case calories 
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

    //making the list of random meals with relevent data 
    let random_meal_list = get_random_meals(api_data);

    //looping through the data as a for loop since we only need to do it 10 times
    for(i =0; i < random_meal_list.length; i++){
      element = random_meal_list[i]

      //getting meal data 
      const name_request = await fetch(`/api/meals/${element.meal_id}`);

      //getting .json values from api data 
      const name_data = await name_request.json();

      console.log(name_data);
  
      //formatting the data to be in a chart
      //filling in the empty list for each object in the list
      //adding the name as the label 
      //adding in the macro data as the y 
      //accessing an index of the macro_data list and editing the dataPoints list 
      //that that object has 
      macro_data[0].dataPoints.push({ label: name_data[0].meal_name, y: element.calories })
      macro_data[1].dataPoints.push({ label: name_data[0].meal_name, y: element.serving_size })
      macro_data[2].dataPoints.push({ label: name_data[0].meal_name, y: element.cholesterol })
      macro_data[3].dataPoints.push({ label: name_data[0].meal_name, y: element.sodium })
      macro_data[4].dataPoints.push({ label: name_data[0].meal_name, y: element.carbs })
      macro_data[5].dataPoints.push({ label: name_data[0].meal_name, y: element.protein })
      macro_data[6].dataPoints.push({ label: name_data[0].meal_name, y: element.fat })
      
      
    };


    //setting up chart
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
  