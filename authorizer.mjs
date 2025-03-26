export const handler = async (event) => {
    // Log the event for debugging
    console.log('Event:', JSON.stringify(event));
   
    // Define your expected API key
    const EXPECTED_API_KEY = '123';
   
    // Get the API key from identitySource or query parameters
    let apiKey;
    
    // API Gateway V2 format (HTTP API) typically uses identitySource
    if (event.identitySource && event.identitySource.length > 0) {
      apiKey = event.identitySource[0];
    } else {
      // Fall back to query parameters
      const queryParams = event.queryStringParameters || {};
      apiKey = queryParams.key;
    }
   
    // Get the resource ARN that we need to allow/deny
    const methodArn = event.routeArn || event.methodArn;
   
    if (!methodArn) {
      console.error('No methodArn or routeArn found in event');
      throw new Error('Unauthorized');
    }
   
    // Check if API key matches
    if (apiKey === EXPECTED_API_KEY) {
      // Allow the request
      return generatePolicy('user', 'Allow', methodArn);
    } else {
      // Deny the request
      return generatePolicy('user', 'Deny', methodArn);
    }
  };
  
  // Helper function to generate IAM policy
  function generatePolicy(principalId, effect, resource) {
    return {
      principalId: principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }]
      }
    };
  }