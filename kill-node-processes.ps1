# Script to kill Node.js processes running on specific ports
# Usage: .\kill-node-processes.ps1 [port1] [port2] ...
# Example: .\kill-node-processes.ps1 5173 3000 8080
# If no ports are specified, it will kill processes on port 5173 by default

# Function to kill processes on a specific port
function Kill-ProcessOnPort {
    param (
        [Parameter(Mandatory=$true)]
        [int]$Port
    )

    Write-Host "Looking for processes on port $Port..."
    
    # Find the process ID using the port
    # For IPv4 addresses (format like 0.0.0.0:5173)
    $processInfoIPv4 = netstat -ano | Select-String -Pattern "TCP\s+\d+\.\d+\.\d+\.\d+:$Port\s+.*LISTENING"
    # For IPv6 addresses (format like [::]:5173)
    $processInfoIPv6 = netstat -ano | Select-String -Pattern "TCP\s+\[\:\:\]:$Port\s+.*LISTENING"
    
    $processInfo = $processInfoIPv4, $processInfoIPv6 | Where-Object { $_ }
    
    if ($processInfo) {
        # Extract the PID from the netstat output - it's the last column
        $processPID = ($processInfo[0] -split '\s+')[-1]
        
        # Verify it's a Node.js process
        $process = Get-Process -Id $processPID -ErrorAction SilentlyContinue
        
        if ($process -and $process.ProcessName -like "*node*") {
            Write-Host "Found Node.js process (PID: $processPID) running on port $Port. Terminating..."
            
            try {
                Stop-Process -Id $processPID -Force
                Write-Host "Successfully terminated Node.js process (PID: $processPID) on port $Port." -ForegroundColor Green
            }
            catch {
                Write-Host "Failed to terminate process (PID: $processPID). Error: $_" -ForegroundColor Red
            }
        }
        else {
            Write-Host "Process on port $Port (PID: $processPID) is not a Node.js process." -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "No process found listening on port $Port." -ForegroundColor Yellow
    }
}

# Main script execution
if ($args.Count -eq 0) {
    # Default to port 5173 if no arguments provided
    Write-Host "No ports specified. Defaulting to port 5173."
    Kill-ProcessOnPort -Port 5173
}
else {
    # Process each port specified as an argument
    foreach ($port in $args) {
        if ($port -match '^\d+$') {
            Kill-ProcessOnPort -Port ([int]$port)
        }
        else {
            Write-Host "Invalid port number: $port. Skipping." -ForegroundColor Red
        }
    }
}

Write-Host "Process completed." -ForegroundColor Cyan