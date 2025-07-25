# Kill Node.js Processes Script

This PowerShell script helps you identify and terminate Node.js processes running on specific ports. It's particularly useful for killing development servers (like Vite, which runs on port 5173 by default) that might be running in the background.

## Usage

### Basic Usage

To kill Node.js processes running on port 5173 (default):

```powershell
.\kill-node-processes.ps1
```

### Specifying Ports

To kill Node.js processes running on specific ports:

```powershell
.\kill-node-processes.ps1 5173 3000 8080
```

This will attempt to kill Node.js processes running on ports 5173, 3000, and 8080.

## How It Works

The script:

1. Takes port numbers as command-line arguments (defaults to port 5173 if none provided)
2. Uses `netstat` to find processes listening on the specified ports
3. Verifies that each process is a Node.js process
4. Terminates the identified Node.js processes

## Common Development Server Ports

- **5173**: Vite (default)
- **3000**: React (Create React App)
- **8080**: Various development servers
- **4000**: Various development servers
- **4173**: Vite preview

## Troubleshooting

If you encounter any issues:

1. Make sure you're running PowerShell as an administrator
2. Verify that the process you're trying to kill is actually a Node.js process
3. Check if the port is actually in use with: `netstat -ano | findstr "LISTENING" | findstr ":<port>"`

## Notes

- This script only terminates Node.js processes. It will not affect other types of processes running on the specified ports.
- The script provides feedback about what it's doing and the results of its actions.