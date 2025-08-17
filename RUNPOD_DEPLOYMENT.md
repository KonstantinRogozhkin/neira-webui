# 🚀 Deploy Backend to RunPod.io

This guide explains how to deploy the Open WebUI backend to RunPod.io using Docker and GitHub Actions.

## 📋 Prerequisites

1. **RunPod Account**: Sign up at [runpod.io](https://runpod.io)
2. **GitHub Repository**: Your forked repository with backend code
3. **Docker Hub or GitHub Container Registry**: For storing Docker images

## 🔑 Setup RunPod API Key

1. Go to [RunPod Console](https://www.runpod.io/console/user/settings)
2. Navigate to **API Keys** section
3. Create a new API key with **Full Access** permissions
4. Copy the API key (starts with `rpa_`)

## 🔐 Add GitHub Secrets

Add the following secrets to your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add new repository secret:
   - **Name**: `RUNPOD_API_KEY`
   - **Value**: Your RunPod API key (e.g., `rpa_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

## 🐳 Docker Configuration

### Backend Dockerfile
- Located at `backend/Dockerfile`
- Uses Python 3.11.1-slim base image
- Installs dependencies from `requirements.txt`
- Exposes port 8000
- Includes health check endpoint

### Docker Ignore
- Located at `backend/.dockerignore`
- Excludes unnecessary files (cache, logs, IDE files)
- Optimizes build context and image size

## 🔄 Automated Deployment

### GitHub Actions Workflow
- **File**: `.github/workflows/backend-deploy.yml`
- **Triggers**: 
  - Push to `main` or `brand/OHIS` branches
  - Changes in `backend/` directory
  - Manual trigger (`workflow_dispatch`)

### What Happens
1. **Build**: Creates Docker image from backend code
2. **Push**: Uploads image to GitHub Container Registry
3. **Deploy**: Automatically deploys to RunPod.io
4. **Scale**: Creates new pod with specified resources

## ⚙️ RunPod Configuration

### Resource Allocation
- **CPU**: 2 cores
- **Memory**: 4 GB
- **Disk**: 10 GB
- **GPU**: None (CPU-only deployment)
- **Port**: 8000 (mapped to host)

### Environment Variables
- `NODE_ENV=production`
- `PORT=8000`

## 🧪 Local Testing

### Using Docker Compose
```bash
# Build and run locally
docker-compose up --build

# Test health endpoint
curl http://localhost:8000/health

# View logs
docker-compose logs -f backend
```

### Manual Docker Build
```bash
cd backend
docker build -t neira-webui-backend .
docker run -p 8000:8000 neira-webui-backend
```

## 📊 Monitoring & Management

### RunPod Console
- **URL**: [console.runpod.io](https://console.runpod.io)
- **Features**: 
  - Pod status monitoring
  - Resource usage graphs
  - Log viewing
  - Pod management (start/stop/restart)

### Health Checks
- **Endpoint**: `/health`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Dockerfile syntax
   - Verify requirements.txt exists
   - Check GitHub Actions logs

2. **Deployment Failures**
   - Verify RUNPOD_API_KEY secret
   - Check RunPod account status
   - Verify resource availability

3. **Runtime Errors**
   - Check RunPod pod logs
   - Verify environment variables
   - Check port mappings

### Debug Commands
```bash
# Check pod status
runpodctl pod list

# View pod logs
runpodctl pod logs <pod-id>

# Connect to pod
runpodctl pod exec <pod-id> -- bash
```

## 📈 Scaling & Optimization

### Auto-scaling
- Currently manual deployment
- Can be enhanced with RunPod's auto-scaling features
- Consider using RunPod's serverless workers for cost optimization

### Cost Optimization
- **Spot Instances**: Use RunPod's spot pricing
- **Resource Right-sizing**: Monitor actual usage and adjust
- **Auto-shutdown**: Configure idle timeout policies

## 🔗 Useful Links

- [RunPod Documentation](https://docs.runpod.io/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [SvelteKit Deployment](https://kit.svelte.dev/docs/adapter-static)

## 📞 Support

- **RunPod Support**: [support.runpod.io](https://support.runpod.io)
- **GitHub Issues**: Create issue in your repository
- **Community**: [RunPod Discord](https://discord.gg/runpod)
