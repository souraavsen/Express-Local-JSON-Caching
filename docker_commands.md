# Run Docker with Volume
# docker run -p [host_port]:[container_port] --name [container_name] --rm -v "[host_code_path] : [host_code_path]"

# Details :-

# 🧩 1. docker run
# This tells Docker to create and run a new container from an image.

# ⚙️ 2. -p 8000:5500
# This maps ports between host and container:
# Left (8000) → Host port (your local machine)
# Right (5500) → Container port (inside Docker)
# 👉 So when you open http://localhost:8000
# , Docker forwards traffic to port 5500 inside the container.
# If your Node.js app listens on port 5500 (app.listen(5500)), this is correct.
# 💡 If your Node app listens on port 8000 instead, flip it:
# docker run -p 5500:8000 ...

# 🏷️ 3. --name filebased_caching
# This gives your container a readable name (filebased_caching) instead of a random one.
# You can then use:
# docker stop filebased_caching
# docker logs filebased_caching
# docker exec -it filebased_caching bash

# 🧹 4. --rm
# Automatically removes the container when it stops — keeps your system clean.
# Without this, you’d accumulate stopped containers that take up space.

# 📂 5. -v "D:/Personal/[2] Web/[1] Projects/Express-Filebased-Caching:/app"
# This is a bind mount:
# The left side (D:/Personal/...) is a folder on your host (your local code).
# The right side (/app) is the folder inside the container.
# This means your local code replaces /app inside Docker — any code change on your machine instantly appears in the container (good for development).

# 📦 6. -v "/app/node_modules"
# This creates an anonymous volume for /app/node_modules.
# Why? Because your local folder doesn’t have Linux-compatible modules — you don’t want to override the container’s node_modules with your host’s (Windows) ones.
# So this keeps container dependencies separate and safe.

# 🧱 7. filebased_caching:v1
# This is the Docker image name and tag.
# You built it earlier with:
# docker build -t filebased_caching:v1 .
