# Node.js Express Server API Documentation

This project is a Node.js server built using Express. It includes several endpoints for managing user authentication, STAC (SpatioTemporal Asset Catalogs) collections, and related data.

## Table of Contents
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Providers](#providers)
  - [Keywords](#keywords)
  - [STAC Endpoints](#stac-endpoints)

## Getting Started
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=1h
   LOG_DIR=./logs
   ```
4. Run the server using `node server.js` or `npm start`.

The server will start at `http://localhost:<PORT>`.

## Endpoints

### Authentication

#### Register a new user
**POST** `/api/register`
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "full_name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - `200`: Registration successful
  - `400`: Missing required fields
  - `500`: Internal server error

#### Login and retrieve a JWT token
**POST** `/api/token`
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "password": "password123"
  }
  ```
- **Response:**
  - `200`: `{ "token": "<JWT_TOKEN>" }`
  - `400`: Missing username or password
  - `401`: Invalid credentials
  - `500`: Internal server error

#### Validate a JWT token
**POST** `/api/validatetoken`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response:**
  - `200`: Token is valid
  - `401`: Unauthorized

### Users

#### Get user details by username
**POST** `/api/user/:username`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response:**
  - `200`: User details
  - `400`: Missing username
  - `403`: Forbidden
  - `500`: Internal server error

### Providers

#### Get providers
**GET** `/api/providers`
- **Query Parameters:**
  - `limit` (optional): Number of providers to retrieve (default: 20)
  - `offset` (optional): Offset for pagination (default: 0)
- **Response:**
  - `200`: List of providers
  - `500`: Internal server error

### Keywords

#### Get keywords
**GET** `/api/keywords`
- **Query Parameters:**
  - `limit` (optional): Number of keywords to retrieve (default: 20)
  - `offset` (optional): Offset for pagination (default: 0)
- **Response:**
  - `200`: List of keywords
  - `500`: Internal server error

### STAC Endpoints

#### Conformance
**GET** `/stac/conformance`
- **Response:**
  - `200`: Conformance information

#### Get STAC catalog
**GET** `/stac`
- **Response:**
  - `200`: STAC catalog
  - `500`: Internal server error

#### Search STAC items
**GET** `/stac/search`
- **Query Parameters:**
  - `limit` (optional): Number of items to retrieve (default: 20)
  - `offset` (optional): Offset for pagination (default: 0)
  - `search` (optional): Search term for item descriptions
- **Response:**
  - `200`: List of matching items
  - `500`: Internal server error

#### Get all STAC collections
**GET** `/stac/collections`
- **Query Parameters:**
  - `limit` (optional): Number of collections to retrieve (default: 20)
  - `offset` (optional): Offset for pagination (default: 0)
- **Response:**
  - `200`: List of collections
  - `500`: Internal server error

#### Get a specific STAC collection
**GET** `/stac/collections/:cid`
- **Response:**
  - `200`: Collection details
  - `500`: Internal server error

#### Get items in a specific collection
**GET** `/stac/collections/:cid/items`
- **Query Parameters:**
  - `limit` (optional): Number of items to retrieve (default: 20)
  - `offset` (optional): Offset for pagination (default: 0)
- **Response:**
  - `200`: List of items
  - `500`: Internal server error

#### Get a specific item in a collection
**GET** `/stac/collections/:cid/items/:iid`
- **Response:**
  - `200`: Item details
  - `500`: Internal server error

#### Upload a STAC collection
**POST** `/api/collections/upload`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Request Body:**
  ```json
  {
    "stac_version": "1.0.0",
    "stac_extensions": [],
    "type": "Collection",
    "id": "example-collection",
    "title": "Example Collection",
    "description": "This is an example collection.",
    "license": "CC-BY-4.0",
    "extent": {},
    "summaries": {},
    "providers": ["Provider Name"],
    "keywords": ["keyword1", "keyword2"]
  }
  ```
- **Response:**
  - `200`: Collection uploaded successfully
  - `500`: Internal server error

#### Upload a STAC item
**POST** `/api/items/upload`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Request Body:**
  ```json
  {
    "stac_version": "1.0.0",
    "stac_extensions": [],
    "type": "Feature",
    "id": "example-item",
    "collection": "example-collection",
    "geometry": {},
    "bbox": [],
    "properties": {
      "description": "Example item",
      "datetime": "2023-01-01T00:00:00Z"
    },
    "assets": {}
  }
  ```
- **Response:**
  - `200`: Item uploaded successfully
  - `500`: Internal server error
