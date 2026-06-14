param(
    [switch]$SkipBuild,
    [switch]$SkipInvalidate
)

$ErrorActionPreference = "Stop"

$S3Bucket = "receitas-app-137451610933"
$CloudFrontDistId = "E33PHM4029SCEN"
$ProjectDir = Split-Path -Parent $PSScriptRoot

function Log($Message) {
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] $Message" -ForegroundColor Cyan
}

function CheckAwsCli {
    try {
        $null = & "C:\Program Files\Amazon\AWSCLIV2\aws.exe" --version
    } catch {
        Write-Host "AWS CLI not found! Install it first:" -ForegroundColor Red
        Write-Host "  winget install -e --id Amazon.AWSCLI" -ForegroundColor Yellow
        exit 1
    }
}

function CheckEnv {
    $envFile = Join-Path $ProjectDir ".env"
    if (-not (Test-Path $envFile)) {
        Write-Host "Warning: .env file not found. Creating from .env.example..." -ForegroundColor Yellow
        Copy-Item (Join-Path $ProjectDir ".env.example") $envFile
    }

    $content = Get-Content $envFile -Raw
    if ($content -match "127\.0\.0\.1|localhost") {
        Write-Host "WARNING: .env still points to localhost! Update VITE_SUPABASE_URL to your Supabase project URL." -ForegroundColor Red
        exit 1
    }
}

function Build {
    Log "Building project..."
    Set-Location $ProjectDir
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed"
    }
    Log "Build completed!"
}

function Deploy {
    Log "Uploading to S3..."
    & "C:\Program Files\Amazon\AWSCLIV2\aws.exe" s3 sync (Join-Path $ProjectDir "dist") "s3://$S3Bucket" --delete
    if ($LASTEXITCODE -ne 0) {
        throw "S3 upload failed"
    }
    Log "Upload completed!"
}

function InvalidateCache {
    Log "Invalidating CloudFront cache..."
    & "C:\Program Files\Amazon\AWSCLIV2\aws.exe" cloudfront create-invalidation `
        --distribution-id $CloudFrontDistId `
        --paths "/*" `
        --output text
    if ($LASTEXITCODE -ne 0) {
        throw "Cache invalidation failed"
    }
    Log "Cache invalidated!"
}

function ShowUrl {
    Log "Getting CloudFront URL..."
    $url = & "C:\Program Files\Amazon\AWSCLIV2\aws.exe" cloudfront get-distribution `
        --id $CloudFrontDistId `
        --query "Distribution.DomainName" `
        --output text
    Write-Host ""
    Write-Host "==============================" -ForegroundColor Green
    Write-Host "  Site: https://$url" -ForegroundColor Green
    Write-Host "==============================" -ForegroundColor Green
    Write-Host ""
}

# --- Main ---
Write-Host ""
Write-Host "  Receitas App - Deploy Script" -ForegroundColor Magenta
Write-Host "  =============================" -ForegroundColor Magenta
Write-Host ""

CheckAwsCli
CheckEnv

if (-not $SkipBuild) {
    Build
} else {
    Log "Skipping build..."
}

Deploy

if (-not $SkipInvalidate) {
    InvalidateCache
} else {
    Log "Skipping cache invalidation..."
}

ShowUrl

Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Deploy completed successfully!" -ForegroundColor Green
