export const handler = async (event) => {

    console.log(event)
    console.log("Event Body Data")
    const body = JSON.parse(event.body)
    console.log(JSON.stringify(body, null, 2))
  
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
  };
  