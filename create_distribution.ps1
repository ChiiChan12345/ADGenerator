# Create a clean distribution package
$distDir = "ideogramFIRE_dist"
$zipFile = "ideogramFIRE.zip"

# Remove existing distribution directory and zip if they exist
if (Test-Path $distDir) {
    Remove-Item -Recurse -Force $distDir
}
if (Test-Path $zipFile) {
    Remove-Item -Force $zipFile
}

# Create new distribution directory
New-Item -ItemType Directory -Path $distDir
New-Item -ItemType Directory -Path "$distDir/frontend"
New-Item -ItemType Directory -Path "$distDir/backend"

# Copy essential files
Copy-Item "ideogramFIRE/frontend/build" -Destination "$distDir/frontend/build" -Recurse
Copy-Item "ideogramFIRE/backend/*" -Destination "$distDir/backend" -Recurse
Copy-Item "ideogramFIRE/package.json" -Destination $distDir
Copy-Item "ideogramFIRE/package-lock.json" -Destination $distDir
Copy-Item "ideogramFIRE/start.bat" -Destination $distDir
Copy-Item "ideogramFIRE/start.sh" -Destination $distDir
Copy-Item "ideogramFIRE/.env" -Destination $distDir
Copy-Item "ideogramFIRE/README.md" -Destination "$distDir/README.md"

# Create ZIP file
Compress-Archive -Path $distDir -DestinationPath $zipFile -Force

Write-Host "Created distribution package: $zipFile"
Write-Host "Contents of the ZIP file:"
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipFile)
$zip.Entries | ForEach-Object { $_.FullName }
$zip.Dispose()

# Clean up
Remove-Item -Recurse -Force $distDir 