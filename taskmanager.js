class TaskManager {
    constructor() {
        this.apps = new Map();
        this.activeApp = null;
        this.isTaskbarVisible = false;
        this.terminal = null; // Add terminal reference
        this.init();
    }

    init() {
        this.createWindowManager();
        this.setupKeyboardShortcuts();
        this.createTerminal(); // Initialize terminal
    }

    createTerminal() {
        this.terminal = new Terminal();
        this.setupTerminalCommands();
    }

    setupTerminalCommands() {
        this.terminal.addCommand('sudo', (args) => {
            if (args[0] === 'pc' && args[1] === 'battery' && args[2] === '--disable') {
                localStorage.setItem('batteryDisabled', 'true');
                this.hideBatteryIndicator();
                return 'Battery indicator disabled for PC.';
            }
            return 'Unknown sudo command. Try: sudo pc battery --disable';
        });

        this.terminal.addCommand('help', () => {
            return 'Available commands:\n- sudo pc battery --disable (hide battery on PC)\n- help (show this help)\n- clear (clear terminal)';
        });

        // New command to open apps from terminal
        this.terminal.addCommand('open', (args) => {
            if (args.length === 0) {
                return 'Usage: open <app-name>.html';
            }
            const filename = args[0];
            if (!filename.endsWith('.html')) {
                return 'App name must end with .html';
            }
            
            // Extract app name without .html
            const appName = filename.replace('.html', '');
            
            // Check if app exists in our apps list
            const availableApps = [
                { name: 'Bendy & Ink', url: 'Bendy&TheInkMachine.html' },
                { name: 'Minecraft', url: 'MinecraftLauncher.html' },
                { name: 'Paint', url: 'Paint.html' },
                { name: 'Calculator', url: 'Calc.html' },
                { name: 'Windows 12', url: 'Windows 12.html' },
                { name: 'Text Editor', url: 'simple text editor.html' },
                { name: 'Web Browser', url: 'webbrowser.html' },
                { name: 'Undertale', url: 'Undertale.html' },
                { name: 'Sonic Mania', url: 'SonicMania.html' },
                { name: 'Mario 64', url: 'N64 Mario 64.html' },
                { name: 'BloodMoney', url: 'BloodMoney.html' },
                { name: 'R.E.P.O.', url: 'R.E.P.O.html' },
                { name: 'Half-Life', url: 'Half-Half.html' },
                { name: 'Hollow Knight', url: 'HallowKnight.html' },
                { name: 'Zelda MM', url: 'N64 Zelda Majora\'s Mask.html' },
                { name: 'Fallout 1', url: 'Fallout1.html' },
                { name: 'ULTRAKILL', url: 'Ultrakill.html' },
                { name: 'Kindergarten', url: 'Kindergarden.html' },
                { name: 'Kindergarten 2', url: 'Kindergarden 2.html' },
                { name: 'Kindergarten 3', url: 'Kindergarten 3.html' },
                { name: 'Deltarune', url: 'Deltarune.html' },
                { name: 'DVD Bounce', url: 'DVD_BOUNCE.html' },
                { name: 'Audio Player', url: 'audio-player.html' },
                { name: 'Classic Hub', url: 'Old_Index.html' },
                { name: 'Laser Leaper V1', url: 'Laser Leaper V1.html' },
                { name: 'Patch Notes', url: 'patch-notes.html' },
                { name: 'Data Importer', url: 'HtmlDataImporter.html' },
                { name: 'The Mask', url: 'Mask.html' }
            ];
            
            const app = availableApps.find(a => 
                a.name.toLowerCase() === appName.toLowerCase() || 
                a.url.toLowerCase() === filename.toLowerCase()
            );
            
            if (app) {
                // Open the app using the task manager
                this.openApp(app.name, app.url);
                return `Opening ${app.name}...`;
            } else {
                return `App not found: ${filename}`;
            }
        });
    }

    hideBatteryIndicator() {
        const batteryIndicator = document.querySelector('.battery-indicator');
        if (batteryIndicator) {
            batteryIndicator.style.display = 'none';
        }
    }

    createWindowManager() {
        const wm = document.createElement('div');
        wm.id = 'window-manager';
        wm.innerHTML = `
            <div class="app-windows" id="app-windows"></div>
        `;
        document.body.appendChild(wm);
    }

    openApp(appName, appUrl, icon = '📱') {
        // Check if we're in desktop mode
        if (window.location.pathname.includes('desktop.html')) {
            // Use desktop's window system
            const desktopApps = [
                { name: 'Bendy & Ink', url: 'Bendy&TheInkMachine.html', icon: '😈' },
                { name: 'Minecraft', url: 'MinecraftLauncher.html', icon: '⛏️' },
                { name: 'Paint', url: 'Paint.html', icon: '🎨' },
                { name: 'Calculator', url: 'Calc.html', icon: '🧮' },
                { name: 'Windows 12', url: 'Windows 12.html', icon: '💻' },
                { name: 'Text Editor', url: 'simple text editor.html', icon: '📝' },
                { name: 'Web Browser', url: 'webbrowser.html', icon: '🌐' },
                { name: 'Undertale', url: 'Undertale.html', icon: '❤️' },
                { name: 'Sonic Mania', url: 'SonicMania.html', icon: '💨' },
                { name: 'Mario 64', url: 'N64 Mario 64.html', icon: '🍄' },
                { name: 'BloodMoney', url: 'BloodMoney.html', icon: '🎯' },
                { name: 'R.E.P.O.', url: 'R.E.P.O.html', icon: '👻' },
                { name: 'Half-Life', url: 'Half-Half.html', icon: '🔬' },
                { name: 'Hollow Knight', url: 'HallowKnight.html', icon: '🦋' },
                { name: 'Zelda MM', url: 'N64 Zelda Majora\'s Mask.html', icon: '🌙' },
                { name: 'Fallout 1', url: 'Fallout1.html', icon: '⚡' },
                { name: 'ULTRAKILL', url: 'Ultrakill.html', icon: '🔫' },
                { name: 'Kindergarten', url: 'Kindergarden.html', icon: '🏫' },
                { name: 'Kindergarten 2', url: 'Kindergarden 2.html', icon: '🏫' },
                { name: 'Kindergarten 3', url: 'Kindergarten 3.html', icon: '🏫' },
                { name: 'Deltarune', url: 'Deltarune.html', icon: '🔷' },
                { name: 'DVD Bounce', url: 'DVD_BOUNCE.html', icon: '📀' },
                { name: 'Audio Player', url: 'audio-player.html', icon: '🎵' },
                { name: 'Classic Hub', url: 'Old_Index.html', icon: '📚' },
                { name: 'Laser Leaper V1', url: 'Laser Leaper V1.html', icon: '👾' },
                { name: 'Patch Notes', url: 'patch-notes.html', icon: '📝' },
                { name: 'Data Importer', url: 'HtmlDataImporter.html', icon: '💾' },
                { name: 'The Mask', url: 'Mask.html', icon: '🎭' }
            ];
            
            const app = desktopApps.find(a => a.name.toLowerCase() === appName.toLowerCase() || a.url === appUrl);
            if (app && window.openApp) {
                window.openApp(app);
                return;
            }
        }

        // Check if app is already open
        if (this.apps.has(appName)) {
            this.focusApp(appName);
            return;
        }

        const app = {
            name: appName,
            url: appUrl,
            icon: icon,
            window: null,
            dockItem: null
        };

        this.createAppWindow(app);
        this.apps.set(appName, app);
        this.focusApp(appName);
    }

    createAppWindow(app) {
        const window = document.createElement('div');
        window.className = 'mac-window';
        window.id = `window-${app.name}`;
        // Add resize handle
        window.innerHTML = `
            <div class="window-header">
                <div class="window-controls">
                    <button class="window-control close" onclick="taskManager.closeApp('${app.name}')">×</button>
                    <button class="window-control minimize" onclick="taskManager.minimizeApp('${app.name}')">−</button>
                    <button class="window-control maximize" onclick="taskManager.maximizeApp('${app.name}')">+</button>
                </div>
                <div class="window-title">${app.name}</div>
                <div class="window-spacer"></div>
            </div>
            <div class="window-content">
                <iframe src="${app.url}" frameborder="0"></iframe>
            </div>
            <div class="resize-handle"></div>
       `;

        document.getElementById('app-windows').appendChild(window);
        app.window = window;

        // Make window draggable
        this.makeWindowDraggable(window);
        // Make window resizable
        this.makeWindowResizable(window);
    }

    makeWindowDraggable(window) {
        const header = window.querySelector('.window-header');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        header.addEventListener('mousemove', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            if (e.target.classList.contains('window-control')) return;

            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === header || header.contains(e.target)) {
                isDragging = true;
                window.style.zIndex = 1000;
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;

                window.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }
    }

    makeWindowResizable(window) {
        const resizeHandle = window.querySelector('.resize-handle');
        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        resizeHandle.addEventListener('mousemove', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(window).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(window).height, 10);
            document.addEventListener('mousemove', doResize);
            document.addEventListener('mouseup', stopResize);
            e.preventDefault();
        });

        function doResize(e) {
            if (!isResizing) return;
            window.style.width = (startWidth + e.clientX - startX) + 'px';
            window.style.height = (startHeight + e.clientY - startY) + 'px';
        }

        function stopResize() {
            isResizing = false;
            document.removeEventListener('mousemove', doResize);
            document.removeEventListener('mouseup', stopResize);
        }
    }

    focusApp(appName) {
        const app = this.apps.get(appName);
        if (!app) return;

        // Update active app
        this.activeApp = appName;

        // Bring window to front
        const windows = document.querySelectorAll('.mac-window');
        windows.forEach(w => w.style.zIndex = '');
        app.window.style.zIndex = 1000;

        // Update dock indicators
        document.querySelectorAll('.dock-app').forEach(item => {
            item.classList.remove('active');
        });
        app.dockItem.classList.add('active');

        // Show window if minimized
        app.window.classList.remove('minimized');
    }

    toggleApp(appName) {
        const app = this.apps.get(appName);
        if (!app) return;

        if (this.activeApp === appName && !app.window.classList.contains('minimized')) {
            this.minimizeApp(appName);
        } else {
            this.focusApp(appName);
        }
    }

    minimizeApp(appName) {
        const app = this.apps.get(appName);
        if (!app) return;

        app.window.classList.add('minimized');
        app.dockItem.classList.remove('active');

        if (this.activeApp === appName) {
            this.activeApp = null;
        }
    }

    maximizeApp(appName) {
        const app = this.apps.get(appName);
        if (!app) return;

        app.window.classList.toggle('maximized');
    }

    closeApp(appName) {
        const app = this.apps.get(appName);
        if (!app) return;

        // Remove window
        app.window.remove();

        // Remove from dock
        app.dockItem.remove();

        // Remove from apps
        this.apps.delete(appName);

        if (this.activeApp === appName) {
            this.activeApp = null;
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt+Tab to switch between apps
            if (e.altKey && e.key === 'Tab') {
                e.preventDefault();
                this.switchToNextApp();
            }

            // Cmd+W to close active app (simulated with Ctrl+W)
            if (e.ctrlKey && e.key === 'w' && this.activeApp) {
                e.preventDefault();
                this.closeApp(this.activeApp);
            }

            // ESC 5 times to return to desktop
            if (e.key === 'Escape') {
                this.escCount = (this.escCount || 0) + 1;
                if (this.escCount >= 5) {
                    this.escCount = 0;
                    window.location.href = 'desktop.html';
                }
                setTimeout(() => { this.escCount = 0; }, 1000);
            }
        });
    }

    switchToNextApp() {
        const appNames = Array.from(this.apps.keys());
        if (appNames.length === 0) return;

        const currentIndex = appNames.indexOf(this.activeApp);
        const nextIndex = (currentIndex + 1) % appNames.length;
        this.focusApp(appNames[nextIndex]);
    }
}

// Terminal class
class Terminal {
    constructor() {
        this.element = null;
        this.history = [];
        this.commands = new Map();
        this.createTerminal();
    }

    createTerminal() {
        // Create terminal container
        this.element = document.createElement('div');
        this.element.className = 'terminal';
        this.element.innerHTML = `
            <div class="terminal-header">
                <span>Terminal</span>
                <button class="terminal-close" onclick="taskManager.terminal.close()">×</button>
            </div>
            <div class="terminal-output" id="terminal-output"></div>
            <div class="terminal-input">
                <span class="terminal-prompt">$</span>
                <input type="text" class="terminal-command" id="terminal-command" placeholder="Type a command...">
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .terminal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 600px;
                height: 400px;
                background: rgba(0, 0, 0, 0.9);
                border: 1px solid #333;
                border-radius: 8px;
                color: #00ff00;
                font-family: 'Courier New', monospace;
                display: none;
                z-index: 10001;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            }

            .terminal.active {
                display: flex;
                flex-direction: column;
            }

            .terminal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: #333;
                border-radius: 8px 8px 0 0;
                color: white;
                font-size: 14px;
            }

            .terminal-close {
                background: none;
                border: none;
                color: #ff5f57;
                font-size: 18px;
                cursor: pointer;
            }

            .terminal-output {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                font-size: 13px;
                line-height: 1.4;
            }

            .terminal-input {
                display: flex;
                align-items: center;
                padding: 10px 15px;
                border-top: 1px solid #333;
            }

            .terminal-prompt {
                margin-right: 8px;
                color: #00ff00;
            }

            .terminal-command {
                flex: 1;
                background: none;
                border: none;
                color: #00ff00;
                font-family: inherit;
                font-size: 13px;
                outline: none;
            }

            .terminal-command::placeholder {
                color: #555;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(this.element);

        // Setup input handling
        const input = this.element.querySelector('#terminal-command');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(input.value);
                input.value = '';
            }
        });

        // Show initial message
        this.output('Tutoring Hub Terminal v1.0');
        this.output('Type "help" for available commands.');
    }

    addCommand(name, handler) {
        this.commands.set(name, handler);
    }

    executeCommand(commandLine) {
        const parts = commandLine.trim().split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        this.output(`$ ${commandLine}`);

        if (cmd === 'clear') {
            this.clear();
            return;
        }

        const handler = this.commands.get(cmd);
        if (handler) {
            const result = handler(args);
            if (result) this.output(result);
        } else if (cmd) {
            this.output(`Command not found: ${cmd}`);
        }
    }

    output(text) {
        const output = this.element.querySelector('#terminal-output');
        const line = document.createElement('div');
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    clear() {
        const output = this.element.querySelector('#terminal-output');
        output.innerHTML = '';
    }

    open() {
        this.element.classList.add('active');
        this.element.querySelector('#terminal-command').focus();
    }

    close() {
        this.element.classList.remove('active');
    }
}

// Update battery indicator check
function updateBattery() {
    const batteryIndicator = document.getElementById('battery-indicator');
    const batteryLevel = document.getElementById('battery-level');
    const batteryText = document.getElementById('battery-text');
    
    // Check if battery is disabled via terminal
    if (localStorage.getItem('batteryDisabled') === 'true') {
        batteryIndicator.style.display = 'none';
        return;
    }
    
    // Only show battery on mobile devices
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        batteryIndicator.style.display = 'flex';
        
        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                const level = Math.round(battery.level * 100);
                batteryText.textContent = `${level}%`;
                batteryLevel.style.width = `${battery.level * 100}%`;
                
                // Change color based on battery level
                if (level <= 20) {
                    batteryIndicator.style.color = '#f56565';
                } else if (level <= 50) {
                    batteryIndicator.style.color = '#ed8936';
                } else {
                    batteryIndicator.style.color = '#48bb78';
                }
            });
        } else {
            // Fallback for browsers without battery API
            batteryText.textContent = '??';
            batteryLevel.style.width = '50%';
        }
    } else {
        batteryIndicator.style.display = 'none';
    }
}

// Initialize task manager
const taskManager = new TaskManager();

// Add terminal shortcut to keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ... existing shortcuts ...
    
    // Ctrl+` to open terminal
    if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        taskManager.terminal.open();
    }
});

function toggleTaskManager() {
    // Simple implementation to open task manager
    window.open('taskmanager.html', '_blank');
}

// Make toggleTaskManager available globally
window.toggleTaskManager = toggleTaskManager;