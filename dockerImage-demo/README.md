# Node.js + MongoDB using Docker (No Compose)

This is a basic Express.js app connected to MongoDB using Docker containers (without Docker Compose).

## 🔧 Steps to Run

1. Create a Docker network so containers can talk to each other:
   ```bash
   docker network create my-network
   ```

2. Run MongoDB container:
   ```bash
   docker run -d \
     --name mongo-container-demo \
     --network demo-mongo-net \
     -e MONGO_INITDB_ROOT_USERNAME=admin \
     -e MONGO_INITDB_ROOT_PASSWORD=password \
     mongo
   ```

3. Build the Node.js image:
   ```bash
   docker build -t my-node-app .
   ```

4. Run the Node.js app container:
   ```bash
   docker run -d \
     --name node-app \
     --network demo-mongo-net \
     -p 3000:3000 \
     my-node-app
   ```

## ⚙️ MongoDB URL in Code

Use the following in `server.js`:

```js
const mongoUrl = "mongodb://admin:password@mongo-container-demo:27017";
```

## 🌐 Access

Visit the app at: [http://localhost:3000](http://localhost:3000)
