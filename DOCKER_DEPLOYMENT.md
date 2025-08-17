# 🐳 Docker Deployment Guide

## 📋 Overview

This project uses a **two-container architecture**:
- **Frontend Container**: Nginx serving built SvelteKit application
- **Backend Container**: Python FastAPI application

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │
│   (Port 80)     │◄──►│   (Port 8000)   │
│   Nginx + SPA   │    │   FastAPI       │
└─────────────────┘    └─────────────────┘
         │                       │
         └─────── neira-network ─┘
```

## 🚀 Quick Start

### 1. Local Development

```bash
# Start both services
docker-compose -f docker-compose.full.yml up -d

# View logs
docker-compose -f docker-compose.full.yml logs -f

# Stop services
docker-compose -f docker-compose.full.yml down
```

### 2. Production Deployment

The system automatically deploys to your SSH server when you push to `main` or `brand/OHIS` branches.

## 🔧 Manual Deployment

### Frontend Only

```bash
# Build and deploy frontend
gh workflow run "Build Frontend and Deploy to Docker" --ref brand/OHIS
```

### Backend Only

```bash
# Build and deploy backend
gh workflow run "Deploy Backend to SSH Server" --ref brand/OHIS
```

## 📁 Container Details

### Frontend Container

- **Base Image**: `nginx:alpine`
- **Port**: 80
- **Features**:
  - SPA routing support
  - Gzip compression
  - Static asset caching
  - Security headers
  - Health checks

### Backend Container

- **Base Image**: `python:3.11.1-slim`
- **Port**: 8000
- **Features**:
  - FastAPI application
  - Health check endpoint
  - Volume mounts for data persistence

## 🌐 Network Configuration

Both containers use the `neira-network` Docker network for internal communication.

## 📊 Health Checks

- **Frontend**: HTTP GET to `/` endpoint
- **Backend**: HTTP GET to `/health` endpoint

## 🔍 Monitoring

### Check Container Status

```bash
# On your SSH server
docker ps | grep neira-webui
```

### View Logs

```bash
# Frontend logs
docker logs neira-webui-frontend

# Backend logs
docker logs neira-webui-backend
```

### Check Network

```bash
# List networks
docker network ls

# Inspect network
docker network inspect neira-network
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 80 and 8000 are available
2. **Network Issues**: Check if `neira-network` exists
3. **Disk Space**: Run `docker system prune -f` if needed

### Reset Everything

```bash
# Stop and remove containers
docker stop neira-webui-frontend neira-webui-backend
docker rm neira-webui-frontend neira-webui-backend

# Remove network
docker network rm neira-network

# Clean up images
docker image prune -f
```

## 📝 Environment Variables

### Frontend
- None required (static files)

### Backend
- `NODE_ENV`: production
- `PORT`: 8000

## 🔐 Security

- Frontend serves static files only
- Backend API accessible on port 8000
- Internal communication via Docker network
- Security headers enabled on frontend

## 📈 Scaling

To scale the backend:

```bash
# Scale backend to 3 instances
docker-compose -f docker-compose.full.yml up -d --scale backend=3
```

## 🔄 Updates

The system automatically updates when you push to GitHub:
1. GitHub Actions builds new images
2. Images are pushed to GHCR
3. SSH server pulls and deploys new images
4. Containers are restarted with zero downtime
