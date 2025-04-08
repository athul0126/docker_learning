# 🚀 MongoDB + Mongo Express (Docker Setup)

This project sets up a basic **MongoDB** database with a web-based admin UI using **Mongo Express**, all running in Docker containers.

---

## 📦 Requirements

- [Docker](https://docs.docker.com/get-docker/) installed
- Basic terminal knowledge

---

## 🯡 Setup Steps

### 1. Create a Docker network

```bash
docker network create demo-mongo-net
```

---

### 2. Start MongoDB container

```bash
docker run -d \
  --name demo-mongo-container \
  --network demo-mongo-net \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo
```

---

### 3. Start Mongo Express container

```bash
docker run -d \
  --name demo-mongo-express \
  --network demo-mongo-net \
  -e ME_CONFIG_MONGODB_URL="mongodb://admin:password@demo-mongo-container:27017/?authSource=admin" \
  -e ME_CONFIG_BASICAUTH_USERNAME=admin \
  -e ME_CONFIG_BASICAUTH_PASSWORD=password \
  -p 8081:8081 \
  mongo-express
```

---

## 🌐 Access Mongo Express UI

Open your browser and go to:

👉 [http://localhost:8081](http://localhost:8081)

### Login Credentials:
- **Username:** `admin`
- **Password:** `password`

---

## 🧼 Cleanup

To stop and remove the containers:

```bash
docker rm -f demo-mongo-container demo-mongo-express
docker network rm demo-mongo-net
```

---

