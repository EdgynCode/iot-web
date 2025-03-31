#Requires -RunAsAdministrator

# Script configuration
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"  # Speeds up downloads

# Function to enable a Windows feature and handle restarts
function Enable-Feature {
    param([string]$FeatureName)
    $feature = Get-WindowsOptionalFeature -Online | Where-Object { $_.FeatureName -eq $FeatureName }
    if ($feature.State -ne "Enabled") {
        Write-Host "Enabling feature: $FeatureName..."
        Enable-WindowsOptionalFeature -Online -FeatureName $FeatureName -NoRestart -ErrorAction Stop
        Write-Host "$FeatureName has been enabled. A restart may be required."
        $global:restartNeeded = $true
    } else {
        Write-Host "Feature $FeatureName is already enabled."
    }
}

# Track if a restart is needed
$global:restartNeeded = $false

try {
    # Check and install WSL
    Write-Host "Checking if WSL is installed..."
    $wslFeature = Get-WindowsOptionalFeature -Online | Where-Object { $_.FeatureName -eq "Microsoft-Windows-Subsystem-Linux" }
    if ($wslFeature.State -ne "Enabled") {
        Enable-Feature -FeatureName "Microsoft-Windows-Subsystem-Linux"
    } else {
        Write-Host "WSL is already installed."
    }

    # Check and enable WSL2
    Write-Host "Checking WSL2 support..."
    $wsl2Feature = Get-WindowsOptionalFeature -Online | Where-Object { $_.FeatureName -eq "VirtualMachinePlatform" }
    if ($wsl2Feature.State -ne "Enabled") {
        Enable-Feature -FeatureName "VirtualMachinePlatform"
    } else {
        Write-Host "WSL2 support is already enabled."
    }

    # Install WSL if not fully set up and set WSL2 as default
    if (-not (Get-Command wsl -ErrorAction SilentlyContinue)) {
        Write-Host "Installing WSL and setting WSL2 as default..."
        wsl --install
        Write-Host "WSL installation initiated. Please restart if prompted and rerun the script."
        exit
    } else {
        Write-Host "WSL is installed. Setting WSL2 as default..."
        wsl --set-default-version 2
    }

    # Check for Docker Desktop
    Write-Host "Checking if Docker Desktop is installed..."
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Host "Docker is not installed. Downloading Docker Desktop installer..."
        $installerUrl = "https://desktop.docker.com/win/stable/Docker Desktop Installer.exe"
        $installerPath = "$env:USERPROFILE\Downloads\DockerDesktopInstaller.exe"
        
        Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath
        Write-Host "Running Docker Desktop installer..."
        Start-Process -FilePath $installerPath -ArgumentList "--quiet" -Wait
        
        Write-Host "Docker Desktop installation complete. Restart may be required."
        $global:restartNeeded = $true
    } else {
        Write-Host "Docker is already installed."
    }

    # Check if restart is needed
    if ($global:restartNeeded) {
        Write-Host "A system restart is required to complete the setup. Please restart and rerun the script."
        Read-Host "Press Enter to exit..."
        exit
    }

    # Start Docker Desktop
    Write-Host "Starting Docker Desktop..."
    $dockerDesktopPath = "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    if (Test-Path $dockerDesktopPath) {
        Start-Process -FilePath $dockerDesktopPath
        Start-Sleep -Seconds 30  # Wait for Docker to initialize
    } else {
        Write-Host "Docker Desktop not found at $dockerDesktopPath. Please start it manually."
        exit
    }

    # Verify Docker is running
    Write-Host "Verifying Docker is running..."
    if (-not (docker info > $null 2>&1)) {
        Write-Host "Docker is not running. Please start Docker Desktop manually and rerun the script." -ForegroundColor Red
        exit 1
    }

    # Set up your application
    Write-Host "Setting up your application..."
    $scriptDirectory = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
    Set-Location -Path $scriptDirectory

    # Run Docker Compose
    Write-Host "Starting Docker Compose..."
    docker-compose up -d

    Write-Host "Your application is now running."
} catch {
    Write-Host "An error occurred: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "Setup complete!"
Read-Host "Press Enter to exit..."