# Local JSON Cache Server

## Overview

The Local JSON Cache Server is a lightweight, file-based caching solution designed for efficient data storage and retrieval. It supports key-value pair storage for multiple users, with unique keys such as user IDs. The server ensures easy access to cached data, automatic expiration using Time-to-Live (TTL), and persistence in JSON files. This project is ideal for applications needing quick, local storage without the complexity of a database.

---

## Features

- **File-Based Storage**: Cache data is stored in user-specific JSON files, ensuring simplicity and persistence.
- **Key-Value Pair Access**: Retrieve and manage data using simple key-value pairs for each user.
- **Time-to-Live (TTL) Support**: Automatically expires stale data based on configurable TTL values.
- **Error Handling**: Handles empty or missing files gracefully, ensuring a seamless user experience.
- **Dynamic Cache Loading**: Reads all cached files from a specified folder for initialization or reporting.
- **Scalable Design**: Easily extendable to support additional functionality or integrations.

---

## How It Works

1. **Data Storage**: Each user's cache is stored in a separate JSON file under the `cache/` directory.
2. **Data Retrieval**: Cached data can be retrieved by user ID and key, with checks for expiration.
3. **Expiration**: A TTL mechanism automatically removes stale entries from the cache.
4. **Initialization**: On server startup, all existing cache files are loaded for quick access.

## Usage

### API Endpoints

#### Add Data to Cache

**POST** `/cache/:userId`  
Add a key-value pair to the cache for a specific user.

#### Retrieve Data

**GET** `/cache/:userId/:key`  
Retrieve the value for a given key and user ID.

#### Delete Data

**DELETE** `/cache/:userId/:key`  
Remove a key-value pair from the cache for a specific user.

#### List All Cached Keys

**GET** `/cache/:userId`  
Retrieve all keys stored for a specific user.
