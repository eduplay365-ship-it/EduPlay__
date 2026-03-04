import os
import re

def balance_videos():
    files = [f'game-{i}.html' for i in range(1, 6)]

    for filename in files:
        if not os.path.exists(filename):
            print(f"File {filename} not found.")
            continue
        
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all video cards to determine total count
        video_cards = re.findall(r'<div class="video-card"(?:\s+data-age="[^"]+")?', content)
        total_videos = len(video_cards)
        midpoint = total_videos // 2
        
        count = [0]
        
        def replacer(match):
            count[0] += 1
            age = "age_3_4" if count[0] <= midpoint else "age_5_6"
            return f'<div class="video-card" data-age="{age}"'
        
        # Target the class="video-card" and replace/add data-age attribute
        new_content = re.sub(r'<div class="video-card"(?:\s+data-age="[^"]+")?', replacer, content)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Updated {filename}: {total_videos} video cards balanced ({midpoint} in first group).")

if __name__ == "__main__":
    balance_videos()
