'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const Product = require('./product');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const headers = {
  "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
};

module.exports.create = async (event, context) => {
  const data = JSON.parse(event.body);
  const product = new Product(
      data.id,
      event.requestContext.authorizer.claims["custom:tenant_id"], 
      data.code, 
      data.description,
      data.height,
      data.length,
      data.name,
      data.revision,
      data.status,
      data.unitOfMeasure,
      data.weight,
      data.width,
      data.isForSale,
      data.isManufacturable,
      data.allowBackorders
  );
  
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: product
  };
  
  try {
    const result = await dynamodb.put(params).promise();
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    };
  }
  catch (error) {
    console.error('error', error);
    return {
      statusCode: error.statusCode || 501,
      headers: headers,
      error: 'Could not create product'
    };
  }
};

module.exports.delete = async (event, context) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    }
  };
  
  try {
    const result = await dynamodb.delete(params).promise();
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({}),
    };
  }
  catch (error) {
    console.error('error', error);
    return {
      statusCode: error.statusCode || 501,
      headers: headers,
      error: 'Could not delete product'
    };
  }
};

module.exports.list = async (event, context) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE
  };
  
  try {
    const result = await dynamodb.scan(params).promise();
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(result.Items)
    };
  }
  catch (error) {
    console.error('error', error);
    return {
      statusCode: error.statusCode || 501,
      headers: headers,
      error: 'Could not get products'
    };
  }
};

module.exports.replace = async (event, context) => {
  const data = JSON.parse(event.body);
  const product = new Product(
      data.id,
      event.requestContext.authorizer.claims["custom:tenant_id"], 
      data.code, 
      data.description,
      data.height,
      data.length,
      data.name,
      data.revision,
      data.status,
      data.unitOfMeasure,
      data.weight,
      data.width,
      data.isForSale,
      data.isManufacturable,
      data.allowBackorders,
      data.created,
      new Date()
  );
  
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: product
  };
  
  try {
    const result = await dynamodb.put(params).promise();
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    };
  }
  catch (error) {
    console.error('error', error);
    return {
      statusCode: error.statusCode || 501,
      headers: headers,
      error: 'Could not update product'
    };
  }
};

module.exports.single = async (event, context) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    }
  };
  
  try {
    const result = await dynamodb.get(params).promise();
    
    // if no items were found
    if (!result || typeof result === 'undefined' || !result.Item) {
      return {
        statusCode: 404,
        headers: headers,
        body: { message: 'Couldn\'t find product' }
      };
    }
    
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(result.Item),
    };
  }
  catch (error) {
    console.error('error', error);
    return {
      statusCode: error.statusCode || 501,
      headers: headers,
      error: 'Could not delete product'
    };
  }
};

module.exports.update = async (event, context) => {
  const data = JSON.parse(event.body);

  var expression = `SET description = :description, height = :height, 
    length = :length, name = :name, revision = :revision, 
    unitOfMeasure = :unitOfMeasure, weight = :weight, width = :width, 
    isForSale = :isForSale, isManufacturable = :isManufacturable,
    allowBackorders = :allowBackorders,
    lastUpdated = :lastUpdated`;

  var expressionValues = {
    ':description': data.description,
    ':height': data.height,
    ':length': data.length,
    ':name': data.name,
    ':revision': data.revision,
    ':unitOfMeasure': data.unitOfMeasure,
    ':weight': data.weight,
    ':width': data.width,
    ':isForSale': data.isForSale,
    ':isManufacturable': data.isManufacturable,
    ':allowBackorders': data.allowBackorders,
    ':lastUpdated': data.lastUpdated
  };

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    },
    UpdateExpression: expression,
    ExpressionAttributeValues: expressionValues,
    ReturnValues: 'ALL_NEW'
  };
  
  try {
    const result = await dynamodb.update(params).promise();
    
    // if no items were found
    if (!result || typeof result === 'undefined' || !result.Item) {
      return {
        statusCode: 404,
        headers: headers,
        body: { message: 'Couldn\'t find product' }
      };
    }
    
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(result.Item),
    };
  }
  catch (error) {
    console.error('error', error);
    return {
      statusCode: error.statusCode || 501,
      headers: headers,
      error: 'Could not update product'
    };
  }
};
