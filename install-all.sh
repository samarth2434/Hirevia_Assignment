#!/bin/bash

echo "🚀 Installing All Dependencies for Complete Authentication & Assessment System"
echo "============================================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    # Check Java
    if ! command -v java &> /dev/null; then
        print_error "Java is not installed. Please install Java 17+ from https://adoptium.net/"
        exit 1
    fi
    
    # Check Maven (optional, we have wrapper)
    if ! command -v mvn &> /dev/null; then
        print_warning "Maven not found globally, but that's okay - we'll use the Maven wrapper"
    fi
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker from https://docker.com/"
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose."
        exit 1
    fi
    
    print_success "All prerequisites are installed!"
}

# Install Frontend Dependencies
install_frontend() {
    print_status "Installing Frontend Dependencies (Main App)..."
    
    if [ -d "frontend" ]; then
        cd frontend
        
        # Clean previous installations
        print_status "Cleaning previous installations..."
        rm -rf node_modules package-lock.json .next
        
        # Install dependencies
        print_status "Installing npm packages..."
        npm install
        
        if [ $? -eq 0 ]; then
            print_success "Frontend dependencies installed successfully!"
        else
            print_error "Failed to install frontend dependencies"
            exit 1
        fi
        
        cd ..
    else
        print_error "Frontend directory not found!"
        exit 1
    fi
}

# Install Video Interview Dependencies
install_video_interview() {
    print_status "Installing Video Interview Dependencies..."
    
    if [ -d "video-interview" ]; then
        cd video-interview
        
        # Clean previous installations
        print_status "Cleaning previous installations..."
        rm -rf node_modules package-lock.json .next
        
        # Install dependencies
        print_status "Installing npm packages..."
        npm install
        
        if [ $? -eq 0 ]; then
            print_success "Video Interview dependencies installed successfully!"
        else
            print_error "Failed to install video interview dependencies"
            exit 1
        fi
        
        cd ..
    else
        print_error "Video Interview directory not found!"
        exit 1
    fi
}

# Install Backend Dependencies
install_backend() {
    print_status "Installing Backend Dependencies (Spring Boot)..."
    
    if [ -d "backend" ]; then
        cd backend
        
        # Clean previous builds
        print_status "Cleaning previous builds..."
        ./mvnw clean
        
        # Download dependencies and compile
        print_status "Downloading Maven dependencies and compiling..."
        ./mvnw compile
        
        if [ $? -eq 0 ]; then
            print_success "Backend dependencies installed successfully!"
        else
            print_error "Failed to install backend dependencies"
            exit 1
        fi
        
        cd ..
    else
        print_error "Backend directory not found!"
        exit 1
    fi
}

# Setup Keycloak
setup_keycloak() {
    print_status "Setting up Keycloak..."
    
    # Pull Keycloak Docker image
    print_status "Pulling Keycloak Docker image..."
    docker pull quay.io/keycloak/keycloak:23.0.0
    
    if [ $? -eq 0 ]; then
        print_success "Keycloak Docker image pulled successfully!"
    else
        print_error "Failed to pull Keycloak Docker image"
        exit 1
    fi
}

# Create startup scripts
create_startup_scripts() {
    print_status "Creating startup scripts..."
    
    # Create start-all script
    cat > start-all.sh << 'EOF'
#!/bin/bash

echo "🚀 Starting Complete Authentication & Assessment System"
echo "======================================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Start Keycloak
print_status "Starting Keycloak..."
docker-compose up -d keycloak

# Wait for Keycloak to be ready
print_status "Waiting for Keycloak to start (this may take a minute)..."
sleep 30

# Start Backend
print_status "Starting Spring Boot Backend..."
cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!
cd ..

# Wait for backend to start
print_status "Waiting for backend to start..."
sleep 15

# Start Frontend
print_status "Starting Next.js Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Start Video Interview App
print_status "Starting Video Interview App..."
cd video-interview
npm run dev -- -p 3001 &
VIDEO_PID=$!
cd ..

print_success "All services started!"
echo ""
echo "🌐 Access URLs:"
echo "   • Main App: http://localhost:3000"
echo "   • Video Interview: http://localhost:3001"
echo "   • Keycloak Admin: http://localhost:8080/admin (admin/admin)"
echo "   • Backend API: http://localhost:8081"
echo ""
echo "📋 Next Steps:"
echo "   1. Configure Keycloak realm (see keycloak/README.md)"
echo "   2. Login with test users:"
echo "      - User: testuser / password123"
echo "      - Admin: admin / admin123"
echo ""
echo "🛑 To stop all services, run: ./stop-all.sh"

# Save PIDs for cleanup
echo $BACKEND_PID > .backend.pid
echo $FRONTEND_PID > .frontend.pid
echo $VIDEO_PID > .video.pid
EOF

    # Create stop-all script
    cat > stop-all.sh << 'EOF'
#!/bin/bash

echo "🛑 Stopping All Services..."

# Stop Docker containers
docker-compose down

# Stop Node.js processes
if [ -f .frontend.pid ]; then
    kill $(cat .frontend.pid) 2>/dev/null
    rm .frontend.pid
fi

if [ -f .video.pid ]; then
    kill $(cat .video.pid) 2>/dev/null
    rm .video.pid
fi

# Stop Spring Boot
if [ -f .backend.pid ]; then
    kill $(cat .backend.pid) 2>/dev/null
    rm .backend.pid
fi

# Kill any remaining processes
pkill -f "spring-boot:run"
pkill -f "next dev"

echo "✅ All services stopped!"
EOF

    # Make scripts executable
    chmod +x start-all.sh
    chmod +x stop-all.sh
    
    print_success "Startup scripts created!"
}

# Create development environment file
create_env_template() {
    print_status "Creating environment template..."
    
    if [ ! -f "frontend/.env.local" ]; then
        cat > frontend/.env.local << 'EOF'
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production

KEYCLOAK_ID=nextjs-client
KEYCLOAK_SECRET=your-client-secret-from-keycloak
KEYCLOAK_ISSUER=http://localhost:8080/realms/demo-realm

NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_REALM=demo-realm
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=nextjs-client

NEXT_PUBLIC_API_URL=http://localhost:8081/api
EOF
        print_success "Environment template created at frontend/.env.local"
        print_warning "Remember to update KEYCLOAK_SECRET after configuring Keycloak!"
    fi
}

# Main installation process
main() {
    echo ""
    print_status "Starting installation process..."
    echo ""
    
    check_prerequisites
    echo ""
    
    install_frontend
    echo ""
    
    install_video_interview
    echo ""
    
    install_backend
    echo ""
    
    setup_keycloak
    echo ""
    
    create_startup_scripts
    echo ""
    
    create_env_template
    echo ""
    
    print_success "🎉 Installation completed successfully!"
    echo ""
    echo "📋 Next Steps:"
    echo "   1. Configure Keycloak: Follow keycloak/README.md"
    echo "   2. Update frontend/.env.local with Keycloak client secret"
    echo "   3. Start all services: ./start-all.sh"
    echo "   4. Access the application at http://localhost:3000"
    echo ""
    echo "📚 Documentation:"
    echo "   • Setup Guide: SETUP.md"
    echo "   • Assessment System: ASSESSMENT_SYSTEM.md"
    echo "   • Video Interview: video-interview/WEBRTC_FLOW.md"
    echo "   • Keycloak Config: keycloak/README.md"
    echo ""
    print_success "Happy coding! 🚀"
}

# Run main function
main
EOF