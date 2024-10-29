![My Image](/public/images/postman-icon.png)

# API Documentation

This project includes a RESTful API for managing users, products, and shops. allowing filtering, pagination, and searching based on various criteria. For detailed information about the API endpoints, including request and response examples, you can access the full documentation via Postman.

### Get Postman API Documentation

The API documentation, including details about each endpoint, required parameters, and response formats, can be accessed through the following Postman link:

[View Documentation](https://documenter.getpostman.com/view/38692295/2sAY4shiXb#415213a8-0ce9-4d21-bf3b-406c6f7c48a1)


### How to Use the Postman Documentation:
1. Click the link to open the Postman API documentation.
2. You can explore each endpoint, view request and response examples, and even try out the requests by using the "Run in Postman" button.
3. Make sure to replace placeholders (e.g., `i` and `s`) with actual values when testing the API.

### API Collection:
##### Note:
- `i`: integer (whole number)
- `s`: string (text or character sequence)
#### 1. Products:

<table>
  <thead>
    <tr>
      <th>HTTP Method</th>
      <th>Endpoint URL</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td><code>/api/v1/products</code></td>
      <td>Get all products data</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/products?stock=`i`</code></td>
      <td>Get all product data filter by stock</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/products?productName=`s`</code></td>
      <td>Get all product data filter by product name</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/products?price=`i`</code></td>
      <td>Get all product data filter by price</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/products?shopName=`i`</code></td>
      <td>Get all product data filter by shop name</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/products?stock=`i`&limit=`i`</code></td>
      <td>Get all product data filter by stock with limit for view data</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/products?stock=`i`&limit=`i`&page=`i`</code></td>
      <td>Get all product data filter by stock with limit for view data and choose the page</td>
    </tr>
  </tbody>
</table>

#### 2. Shops:
<table>
  <thead>
    <tr>
      <th>HTTP Method</th>
      <th>Endpoint URL</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td><code>/api/v1/shops</code></td>
      <td>Get all shops data</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/shops?stock=`i`</code></td>
      <td>Get all shops data filter by stock</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/shops?price=`i`</code></td>
      <td>Get all shops data filter by price</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/shops?shopName=`s`</code></td>
      <td>Get all shops data filter by shop name</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/v1/shops?stock=i&limit=i</code></td>
      <td>Get all shops data filter by stock with limit for view</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/v1/shops?stock=i&limit=i&page`i`</code></td>
      <td>Get all shops data filter by stock with limit for view and choose the page</td>
    </tr>
  </tbody>
</table>

#### 3. Users:
<table>
  <thead>
    <tr>
      <th>HTTP Method</th>
      <th>Endpoint URL</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td><code>/api/v1/users</code></td>
      <td>Get all users data</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/users?name=`s`</code></td>
      <td>Get all users data filter by name</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/users?address=`s`</code></td>
      <td>Get all users data filter by address</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/users?role=`s`</code></td>
      <td>Get all users data filter by role</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/users?age=`i`</code></td>
      <td>Get all users data filter by age</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/api/users?name=`s`&limit=`i`</code></td>
      <td>Get all users data filter by name with limit for view</td>
    </tr>
        <tr>
      <td>GET</td>
      <td><code>/api/users?name=`s`&limit=`i`&page=`i`</code></td>
      <td>Get all users data filter by name with limit for view and choose the page</td>
    </tr>
  </tbody>
</table>

## ERD database

![My Image](/public/images/db-diagram.png)
