# Convex installer for end users (Windows PowerShell).
# Downloads the latest convex.jar and creates a 'convex' command on PATH.
#
# SYNC: canonical source is convex repo scripts/install.ps1 — keep in sync.
#
# Usage:
#   irm https://convex.world/install.ps1 | iex
#
# Options (environment variables):
#   $env:CONVEX_VERSION = "0.8.3"            Install a specific version
#   $env:CONVEX_HOME = "C:\Users\me\.convex"  Installation directory

$ErrorActionPreference = "Stop"

$ConvexHome = if ($env:CONVEX_HOME) { $env:CONVEX_HOME } else { Join-Path $HOME ".convex" }
$ConvexJar = Join-Path $ConvexHome "convex.jar"
$MinJavaVersion = 21
$Repo = "Convex-Dev/convex"

# ── Helpers ──────────────────────────────────────────────

function Info($msg)  { Write-Host "  $msg" }
function Ok($msg)    { Write-Host "  [OK] $msg" -ForegroundColor Green }
function Warn($msg)  { Write-Host "  [!!] $msg" -ForegroundColor Yellow }
function Fail($msg)  { Write-Host "  [FAIL] $msg" -ForegroundColor Red; exit 1 }

function Test-DirectoryWritable($path) {
    if (-not (Test-Path -LiteralPath $path -PathType Container)) {
        return $false
    }

    $probe = Join-Path $path ".convex-write-test-$([Guid]::NewGuid().ToString('N'))"
    try {
        New-Item -ItemType File -Path $probe -Force | Out-Null
        Remove-Item -LiteralPath $probe -Force
        return $true
    }
    catch {
        return $false
    }
}

function Test-PathEntry($pathValue, $entry) {
    if (-not $pathValue) {
        return $false
    }

    $normalizedEntry = $entry.TrimEnd('\')
    foreach ($part in $pathValue.Split(';')) {
        if ($part.Trim().TrimEnd('\').Equals($normalizedEntry, [StringComparison]::OrdinalIgnoreCase)) {
            return $true
        }
    }
    return $false
}

# ── Check Java ───────────────────────────────────────────

function Check-Java {
    $javaCmd = Get-Command java -ErrorAction SilentlyContinue
    if (-not $javaCmd) {
        Fail "Java not found. Please install Java $MinJavaVersion or later."
    }

    $ErrorActionPreference = "Continue"
    $versionOutput = & java -version 2>&1 | Out-String
    $ErrorActionPreference = "Stop"
    if ($versionOutput -match '"(\d+)') {
        $version = [int]$Matches[1]
    }
    else {
        Fail "Could not determine Java version."
    }

    if ($version -lt $MinJavaVersion) {
        Fail "Java $MinJavaVersion+ required, found Java $version."
    }

    Ok "Java $version"
}

# ── Download ─────────────────────────────────────────────

function Download-Convex {
    if ($env:CONVEX_VERSION) {
        $url = "https://github.com/$Repo/releases/download/$env:CONVEX_VERSION/convex.jar"
    }
    else {
        $url = "https://github.com/$Repo/releases/latest/download/convex.jar"
    }

    if (-not (Test-Path $ConvexHome)) {
        New-Item -ItemType Directory -Path $ConvexHome -Force | Out-Null
    }

    Info "Downloading from $url ..."
    $tmpJar = "$ConvexJar.tmp"
    Invoke-WebRequest -Uri $url -OutFile $tmpJar -UseBasicParsing
    Move-Item -LiteralPath $tmpJar -Destination $ConvexJar -Force

    if (-not (Test-Path $ConvexJar)) {
        Fail "Download failed."
    }

    Ok "Downloaded convex.jar"
}

# ── Create wrapper script ────────────────────────────────

function Install-Wrapper {
    if (-not (Test-DirectoryWritable $ConvexHome)) {
        Fail "$ConvexHome is not writable. Set CONVEX_HOME to a writable directory."
    }

    $wrapper = Join-Path $ConvexHome "convex.cmd"

    Set-Content -Path $wrapper -Encoding ASCII -Value @"
@echo off
java -jar "$ConvexJar" %*
"@

    Ok "Created convex.cmd wrapper"

    # Add to PATH if not already there
    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if (-not (Test-PathEntry $userPath $ConvexHome)) {
        $reply = Read-Host "  Add $ConvexHome to your PATH? [Y/n]"
        if ($reply -eq "" -or $reply -match "^[Yy]") {
            $newUserPath = if ($userPath) { "$userPath;$ConvexHome" } else { $ConvexHome }
            [Environment]::SetEnvironmentVariable("Path", $newUserPath, "User")
            $env:Path = "$env:Path;$ConvexHome"
            Ok "Added $ConvexHome to user PATH"
            Warn "Restart your terminal for PATH changes to take effect."
        }
        else {
            Info "Skipped. To use 'convex' add $ConvexHome to your PATH manually."
        }
    }
    else {
        Ok "$ConvexHome already on PATH"
    }
}

# ── Verify ───────────────────────────────────────────────

function Verify {
    if (Test-Path $ConvexJar) {
        Ok "Installed to $ConvexJar"
    }
    else {
        Fail "Installation failed - convex.jar not found."
    }
}

# ── Main ─────────────────────────────────────────────────

Write-Host ""
Write-Host "  Convex Installer"
Write-Host "  -----------------"
Write-Host ""

Check-Java
Download-Convex
Install-Wrapper
Verify

Write-Host ""
Info "Run 'convex --help' to get started."
Write-Host ""
