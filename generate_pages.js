const fs = require('fs');
const path = require('path');

const generateVideoGrid = (title, filePrefix) => {
    let gridHtml = `
        <style>
            .video-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-top: 2rem;
            }
            .video-card {
                background: var(--card-bg);
                border: var(--glass-border);
                border-radius: 1rem;
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                box-shadow: var(--shadow);
                display: flex;
                flex-direction: column;
            }
            .video-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            }
            .video-wrapper {
                position: relative;
                padding-bottom: 56.25%; /* 16:9 */
                height: 0;
                background: #000;
                cursor: pointer;
            }
            .video-wrapper video {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .play-overlay {
                position: absolute;
                bottom: 1rem;
                left: 1rem;
                width: 50px;
                height: 50px;
                background: rgba(99, 102, 241, 0.9);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                transition: transform 0.2s, background 0.2s;
                z-index: 2;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            }
            .video-card:hover .play-overlay {
                transform: scale(1.1);
                background: var(--secondary-color);
            }
            .save-btn {
                background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
                color: white;
                border: none;
                border-radius: 0.5rem;
                padding: 0.75rem 1rem;
                cursor: pointer;
                font-weight: bold;
                margin-top: auto;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                transition: opacity 0.2s;
            }
            .save-btn:hover {
                opacity: 0.9;
            }
            .video-info {
                padding: 1.5rem;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
            }
            .video-title {
                font-weight: bold;
                font-size: 1.1rem;
                margin-bottom: 0.5rem;
                color: var(--text-color);
            }
            .video-desc {
                font-size: 0.85rem;
                color: var(--text-muted);
                margin-bottom: 1.5rem;
                line-height: 1.4;
            }
        </style>
        <section class="video-grid">`;

    for (let i = 1; i <= 30; i++) {
        const videoTitle = `${title} - Lesson ${i}`;
        const videoDesc = `Explore the fundamentals of ${title.toLowerCase()} in this interactive lesson. Perfect for preschool learning and development.`;
        const videoSrc = `assets/${filePrefix}_${i}.mp4`;
        const posterSrc = `assets/${filePrefix}_${i}.jpg`; // Placeholder for thumbnail

        gridHtml += `
            <div class="video-card">
                <div class="video-wrapper" onclick="toggleVideo(this)">
                    <video src="${videoSrc}" poster="${posterSrc}" preload="metadata" style="width: 100%; height: 100%; object-fit: cover;"></video>
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="video-info">
                    <div class="video-title">${videoTitle}</div>
                    <div class="video-desc">${videoDesc}</div>
                    <button class="save-btn" onclick="saveVideo('${videoTitle.replace(/'/g, "\\'")}', '${videoDesc.replace(/'/g, "\\'")}', '${videoSrc}')">
                        <i class="fas fa-bookmark"></i> Save to Library
                    </button>
                </div>
            </div>`;
    }
    gridHtml += `</section>`;
    return gridHtml;
};

const template = (page) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduPlay - ${page.title}</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <nav class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <i class="fas fa-gamepad"></i>
                <span>EduPlay</span>
            </div>
            <ul class="nav-links">
                <li><a href="index.html"><i class="fas fa-home"></i> <span data-i18n="home">Home</span></a></li>
                <li><a href="login.html"><i class="fas fa-sign-in-alt"></i> <span data-i18n="login">Login</span></a></li>
                <li><a href="settings.html"><i class="fas fa-cog"></i> <span data-i18n="settings">Settings</span></a></li>
                <li><a href="videos.html"><i class="fas fa-video"></i> <span data-i18n="videos">Saved Videos</span></a></li>
                <li><a href="help.html"><i class="fas fa-question-circle"></i> <span data-i18n="help">Help</span></a></li>
            </ul>
        </div>
        <div class="sidebar-footer">
            <div class="language-switcher">
                <select id="lang-select" style="width: 100%; padding: 0.5rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 0.5rem;">
                    <option value="uz">O'zbekcha</option>
                    <option value="en" selected>English</option>
                    <option value="ru">Русский</option>
                </select>
            </div>
        </div>
    </nav>

    <main class="main-content">
        <header>
            <div class="menu-toggle">
                <i class="fas fa-bars"></i>
            </div>
            <div class="page-title">
                <h1 data-i18n="${page.i18nKey}">${page.title}</h1>
            </div>
        </header>

        ${generateVideoGrid(page.title, page.filePrefix)}
    </main>
    <script src="script.js"></script>
</body>
</html>`;

const pages = [
    { file: 'game-1.html', title: 'Math Blaster', i18nKey: 'math_title', filePrefix: 'math' },
    { file: 'game-2.html', title: 'Science Lab', i18nKey: 'science_title', filePrefix: 'science' },
    { file: 'game-3.html', title: 'Geography Quiz', i18nKey: 'geo_title', filePrefix: 'geo' },
    { file: 'game-4.html', title: 'Literature Quest', i18nKey: 'lit_title', filePrefix: 'lit' },
    { file: 'game-5.html', title: 'Logic Puzzles', i18nKey: 'logic_title', filePrefix: 'logic' }
];

pages.forEach(page => {
    fs.writeFileSync(path.join(process.cwd(), page.file), template(page));
    console.log(`Updated ${page.file}`);
});
