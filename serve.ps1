# Simple PowerShell Static File Web Server
# Serves the current directory on http://localhost:8080/

$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

# Trap Ctrl+C to close listener cleanly
$sigIntReceived = $false
[System.Management.Automation.PSEventJob].Assembly.GetType('System.Management.Automation.Utils') | ForEach-Object {
    # Simple trap in standard PowerShell loop
}

Write-Output "Starting Web Server..."
try {
    $listener.Start()
    Write-Output "=================================================="
    Write-Output "  Amul Kool Café Premium Experience is Live!     "
    Write-Output "  Localhost Server: http://localhost:$port/      "
    Write-Output "=================================================="
    Write-Output "Press Ctrl+C in your terminal to stop the server."

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        
        # URL Decoding to handle spaces/symbols correctly
        $urlPath = [Uri]::UnescapeDataString($urlPath)
        
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }

        # Normalize relative path and map to current directory
        $cleanPath = $urlPath.Replace("/", "\").TrimStart("\")
        $filePath = Join-Path (Get-Location).Path $cleanPath

        if (Test-Path $filePath -PathType Leaf) {
            # Determine content type
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css" }
                ".js"   { "application/javascript" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".svg"  { "image/svg+xml" }
                ".ico"  { "image/x-icon" }
                default { "application/octet-stream" }
            }

            try {
                $response.ContentType = $contentType
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } catch {
                $response.StatusCode = 500
                $errorBytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>500 Internal Server Error</h1><p>$($_.Exception.Message)</p>")
                $response.ContentLength64 = $errorBytes.Length
                $response.OutputStream.Write($errorBytes, 0, $errorBytes.Length)
            }
        } else {
            # File Not Found
            $response.StatusCode = 404
            $response.ContentType = "text/html; charset=utf-8"
            $errorBytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>The requested file could not be found.</p>")
            $response.ContentLength64 = $errorBytes.Length
            $response.OutputStream.Write($errorBytes, 0, $errorBytes.Length)
        }
        $response.Close()
    }
}
catch {
    Write-Error "Server error: $_"
}
finally {
    $listener.Close()
    Write-Output "Server stopped."
}
