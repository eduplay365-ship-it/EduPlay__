import os
import re

files_to_update = {
    "game-1.html": "index.html",
    "game-2.html": "index.html",
    "game-3.html": "index.html",
    "game-4.html": "index.html",
    "game-5.html": "index.html",
    "certificate.html": "certificate.html",
    "poems.html": "poems.html",
    "index.html": "index.html",
    "main.html": "main.html",
    "login.html": "login.html",
    "settings.html": "settings.html",
    "help.html": "help.html",
    "videos.html": "videos.html",
    "video-lessons.html": "video-lessons.html",
    "test.html": "index.html",
}

sidebar_template = """    <nav class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <i class="fas fa-gamepad"></i>
                <span>EduPlay</span>
            </div>
            <ul class="nav-links">
                <li><a href="main.html"%START_ACTIVE%><i class="fas fa-star"></i> <span data-i18n="start_page">Welcome</span></a></li>
                <li class="nav-section"><span data-i18n="games">Games</span></li>
                <li><a href="index.html"%GAMES_ACTIVE%><i class="fas fa-gamepad"></i> <span data-i18n="games">Games</span></a></li>
                <li><a href="certificate.html"%CERT_ACTIVE%><i class="fas fa-certificate"></i> <span data-i18n="get_certificate">Get Certificate</span></a></li>
                <li class="nav-section"><span data-i18n="login">Login</span></li>
                <li><a href="login.html"%LOGIN_ACTIVE%><i class="fas fa-sign-in-alt"></i> <span data-i18n="login">Login</span></a></li>
                <li class="nav-section"><span data-i18n="more">More</span></li>
                <li><a href="poems.html"%POEMS_ACTIVE%><i class="fas fa-feather-alt"></i> <span data-i18n="poems">Poems</span></a></li>
                <li class="nav-section"><span data-i18n="settings">Settings</span></li>
                <li><a href="settings.html"%SETTINGS_ACTIVE%><i class="fas fa-cog"></i> <span data-i18n="settings">Settings</span></a></li>
                <li><a href="help.html"%HELP_ACTIVE%><i class="fas fa-question-circle"></i> <span data-i18n="help">Help</span></a></li>
                <li><a href="videos.html"%VIDEOS_ACTIVE%><i class="fas fa-bookmark"></i> <span data-i18n="videos">Saved Videos</span></a></li>
            </ul>
        </div>
        <div class="sidebar-footer">
            <div class="language-switcher">
                <select id="lang-select"
                    style="width: 100%; padding: 0.5rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 0.5rem;">
                    <option value="uz">O'zbekcha</option>
                    <option value="en" selected>English</option>
                    <option value="ru">Русский</option>
                </select>
            </div>
        </div>
    </nav>"""

def get_sidebar_for_file(active_href):
    s = sidebar_template
    s = s.replace("%START_ACTIVE%", ' class="active"' if active_href == "main.html" else "")
    s = s.replace("%GAMES_ACTIVE%", ' class="active"' if active_href == "index.html" else "")
    s = s.replace("%CERT_ACTIVE%", ' class="active"' if active_href == "certificate.html" else "")
    s = s.replace("%LOGIN_ACTIVE%", ' class="active"' if active_href == "login.html" else "")
    s = s.replace("%POEMS_ACTIVE%", ' class="active"' if active_href == "poems.html" else "")
    s = s.replace("%SETTINGS_ACTIVE%", ' class="active"' if active_href == "settings.html" else "")
    s = s.replace("%HELP_ACTIVE%", ' class="active"' if active_href == "help.html" else "")
    s = s.replace("%VIDEOS_ACTIVE%", ' class="active"' if active_href == "videos.html" else "")
    return s

for filename, active_href in files_to_update.items():
    if not os.path.exists(filename):
        print(f"File {filename} not found, skipping.")
        continue
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Use non-greedy regex to match the sidebar
        new_sidebar = get_sidebar_for_file(active_href)
        pattern = re.compile(r'<nav class="sidebar">.*?</nav>', re.DOTALL)
        
        if pattern.search(content):
            new_content = pattern.sub(new_sidebar, content)
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"Sidebar not found in {filename}")
    except Exception as e:
        print(f"Error updating {filename}: {e}")
