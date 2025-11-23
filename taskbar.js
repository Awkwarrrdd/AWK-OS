class AppTaskbar {
    constructor(appName) {
        this.appName = appName;
        this.createTaskbar();
    }

    createTaskbar() {
        const taskbar = document.createElement('div');
        taskbar.className = 'app-taskbar';
        taskbar.innerHTML = `
            <div class="app-taskbar-content">
                <button class="app-back-btn" onclick="this.goBack()" title="Back to Hub">
                    ← Back to Hub
                </button>
                <div class="app-title">${this.appName}</div>
                <div class="app-controls">
                    <button class="app-minimize" onclick="this.minimize()" title="Minimize">−</button>
                    <button class="app-maximize" onclick="this.maximize()" title="Maximize">+</button>
                    <button class="app-close" onclick="this.close()" title="Close">×</button>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .app-taskbar {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 40px;
                background: rgba(26, 32, 44, 0.95);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
                padding: 0 15px;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            }

            .app-taskbar-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
            }

            .app-back-btn {
                background: rgba(59, 130, 246, 0.8);
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 500;
                transition: all 0.2s ease;
            }

            .app-back-btn:hover {
                background: rgba(59, 130, 246, 1);
                transform: translateY(-1px);
            }

            .app-title {
                font-size: 14px;
                font-weight: 500;
                color: #e2e8f0;
            }

            .app-controls {
                display: flex;
                gap: 8px;
            }

            .app-controls button {
                width: 24px;
                height: 24px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                transition: all 0.2s ease;
            }

            .app-minimize {
                background: rgba(255, 255, 255, 0.1);
                color: #e2e8f0;
            }

            .app-maximize {
                background: rgba(255, 255, 255, 0.1);
                color: #e2e8f0;
            }

            .app-close {
                background: rgba(239, 68, 68, 0.8);
                color: white;
            }

            .app-controls button:hover {
                transform: translateY(-1px);
                opacity: 0.8;
            }

            @media (prefers-color-scheme: light) {
                .app-taskbar {
                    background: rgba(255, 255, 255, 0.95);
                    border-bottom-color: rgba(0, 0, 0, 0.1);
                }

                .app-title {
                    color: #2d3748;
                }

                .app-minimize,
                .app-maximize {
                    background: rgba(0, 0, 0, 0.05);
                    color: #4a5568;
                }

                .app-close {
                    background: rgba(239, 68, 68, 0.9);
                }
            }

            @media (max-width: 768px) {
                .app-taskbar {
                    height: 50px;
                    padding: 0 10px;
                }

                .app-back-btn {
                    padding: 8px 16px;
                    font-size: 14px;
                }

                .app-title {
                    font-size: 16px;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(taskbar);

        // Add padding to body to account for taskbar
        document.body.style.paddingTop = '40px';
    }

    goBack() {
        window.location.href = 'index.html';
    }

    minimize() {
        // Implementation for minimize functionality
        console.log('Minimize clicked');
    }

    maximize() {
        // Implementation for maximize functionality
        console.log('Maximize clicked');
    }

    close() {
        // Implementation for close functionality
        console.log('Close clicked');
        this.goBack();
    }
}

// Function to add taskbar to any page
function addAppTaskbar(appName) {
    return new AppTaskbar(appName);
}

// Auto-add taskbar to apps when they load
window.addEventListener('DOMContentLoaded', () => {
    // Extract app name from URL
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');

    // Common app names mapping
    const appNames = {
        'Bendy&TheInkMachine': 'Bendy & Ink',
        'MinecraftLauncher': 'Minecraft Launcher',
        'Paint': 'Paint App',
        'Calc': 'Calculator',
        'Windows 12': 'Windows 12',
        'simple text editor': 'Text Editor',
        'Undertale': 'Undertale',
        'SonicMania': 'Sonic Mania',
        'N64 Mario 64': 'Super Mario 64',
        'BloodMoney': 'BloodMoney',
        'R.E.P.O': 'R.E.P.O.',
        'Half-Half': 'Half-Life',
        'HallowKnight': 'Hollow Knight',
        'N64 Zelda Majora\'s Mask': 'Zelda: Majora\'s Mask',
        'Fallout1': 'Fallout 1',
        'Ultrakill': 'ULTRAKILL',
        'Settings': 'Settings'
    };

    const appName = appNames[filename] || filename;

    // Don't add taskbar to main index or desktop pages
    if (filename !== 'index' && filename !== 'desktop' && filename !== '') {
        addAppTaskbar(appName);
    }
});