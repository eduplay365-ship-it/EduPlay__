import re

# Define the game configurations
games = [
    {"file": "game-1.html", "title_key": "math_title", "title_en": "Logical Thinking"},
    {"file": "game-2.html", "title_key": "science_title", "title_en": "Creative Thinking"},
    {"file": "game-3.html", "title_key": "geo_title", "title_en": "Science and Technology"},
    {"file": "game-4.html", "title_key": "lit_title", "title_en": "Team and Communication"},
    {"file": "game-5.html", "title_key": "logic_title", "title_en": "Logic Puzzles"},
]

for game in games:
    file_path = game["file"]
    title_key = game["title_key"]
    title_en = game["title_en"]
    
    print(f"Processing {file_path}...")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix video titles - replace "Title - Lesson X" with translatable version
    # Pattern matches: <div class="video-title">Some Title - Lesson 1</div>
    title_pattern = r'<div class="video-title">([^<]+?)\s*-\s*Lesson\s*(\d+)</div>'
    title_replacement = f'<div class="video-title"><span data-i18n="{title_key}">{title_en}</span> - <span data-i18n="lesson">Lesson</span> \\2</div>'
    content = re.sub(title_pattern, title_replacement, content)
    
    # Fix video descriptions - add data-i18n attribute
    # Pattern matches description divs
    desc_pattern = r'<div class="video-desc">Explore the fundamentals[^<]*</div>'
    desc_replacement = '<div class="video-desc" data-i18n="video_lesson_desc">Explore the fundamentals in this interactive lesson. Perfect for preschool learning and development.</div>'
    content = re.sub(desc_pattern, desc_replacement, content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ {file_path} updated successfully")

print("\n✅ All game pages updated!")
