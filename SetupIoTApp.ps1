# Check if WSL is installed
Write-Host "Checking if WSL is installed..."

# Check WSL status
$wslFeature = Get-WindowsOptionalFeature -Online | Where-Object { $_.FeatureName -eq "Microsoft-Windows-Subsystem-Linux" }

# Check if WSL2 is available
$wsl2Available = Get-WindowsOptionalFeature -Online | Where-Object { $_.FeatureName -eq "VirtualMachinePlatform" }

# Function to enable a Windows feature
function Enable-Feature {
    param([string]$FeatureName)
    
    # Check the current state of the feature
    $feature = Get-WindowsOptionalFeature -Online | Where-Object { $_.FeatureName -eq $FeatureName }

    if ($feature.State -ne "Enabled") {
        Write-Host "Enabling feature: $FeatureName..."
        Enable-WindowsOptionalFeature -Online -FeatureName $FeatureName -NoRestart -ErrorAction Stop
        Write-Host "$FeatureName has been enabled."
    } else {
        Write-Host "Feature $FeatureName is already enabled. Skipping..."
    }
}

try {
    # Enable WSL if not installed
    if ($wslFeature.State -ne "Enabled") {
        Enable-Feature -FeatureName "Microsoft-Windows-Subsystem-Linux"
    } else {
        Write-Host "WSL is already installed."
    }

    # Enable WSL2 support if available but not enabled
    if ($wsl2Available.State -ne "Enabled") {
        Enable-Feature -FeatureName "VirtualMachinePlatform"
    } else {
        Write-Host "WSL2 support is already enabled."
    }

    Write-Host "Checking if WSL kernel is up-to-date..."
    wsl --update

    wsl --install
    Write-Host "WSL is successfully set up!"
} catch {
    Write-Host "An error occurred: $($_.Exception.Message)" -ForegroundColor Red
}

# Check for Docker
Write-Host "Checking if Docker Desktop is installed..."

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker is not installed."
    Write-Host "Downloading Docker Desktop installer..."

    # Download Docker Desktop installer
    $installerUrl = "https://desktop.docker.com/win/stable/Docker Desktop Installer.exe"
    $installerPath = Join-Path -Path $env:USERPROFILE -ChildPath "Downloads\DockerDesktopInstaller.exe"
    
    Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath
    Write-Host "Running Docker Desktop installer..."
    
    # Install Docker Desktop
    Start-Process -FilePath $installerPath -Wait
    
    Write-Host "Docker Desktop installation complete. Please restart your computer if prompted."
} else {
    Write-Host "Docker is already installed."
}

# Start Docker Desktop
Write-Host "Starting Docker Desktop..."
Start-Process -FilePath "C:\Program Files\Docker\Docker\Docker Desktop.exe"
Start-Sleep -Seconds 20  # Wait for Docker Desktop to initialize

# Set up your application
Write-Host "Setting up your application..."

# Navigate to the directory containing the script
$scriptDirectory = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Set-Location -Path $scriptDirectory

# Run Docker Compose
Write-Host "Starting Docker Compose..."
docker-compose up -d

Write-Host "Your application is now running."
Read-Host "Press Enter to exit..."
