# Local JSON Cache Server

## Overview

The Local JSON Cache Server is a file-based caching solution for data storage and retrieval. It's a way to access cached data, automatic expiration using Time-to-Live (TTL), and persistence in JSON files.

---

## Features

- **File-Based Storage**: Cache data is stored in user-specific JSON files, ensuring simplicity and persistence.
- **Key-Value Pair Access**: Retrieve and manage data using simple key-value pairs for each user.
- **Time-to-Live (TTL) Support**: Automatically expires stale data based on configurable TTL values.
- **Dynamic Cache Loading**: Reads all cached files from a specified folder for initialization or reporting.
- **Automatic Clearance**: Stored data will be cleared automatically if the TTL is expired.
---

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
