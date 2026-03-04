import os
import re

video_data = {
    "game-1.html": [
        {"id": "lFhE_tGzyzQ", "title": "Counting 1 to 10", "desc": "Learn to count from 1 to 10 with fun animations and blocks."},
        {"id": "eVZfKuS36ZY", "title": "Learn Basic Shapes", "desc": "Identify circles, squares, triangles, and more."},
        {"id": "UqY_NizR_fI", "title": "Simple Addition", "desc": "Learn how to add small numbers together easily."},
        {"id": "v3Hw0BOf-b8", "title": "Big vs Small", "desc": "Understand concepts of size and basic measurements."},
        {"id": "O85PstGpxIs", "title": "Learning Coins", "desc": "Basic introduction to coins and financial literacy."},
        {"id": "xYmN4E3gAfc", "title": "Subtraction for Kids", "desc": "Learn basic subtraction concepts with visual aids."},
        {"id": "IGx6b1H1c24", "title": "Number Action Song", "desc": "Count, sing and dance to learn numbers fast."},
        {"id": "nLMEpTz8s4o", "title": "Telling Time", "desc": "Learn how to read a simple clock."},
        {"id": "B-B3XQxK-1A", "title": "Fractions Basics", "desc": "An introduction to halves and quarters for beginners."},
        {"id": "5J-DDA1E1Z0", "title": "Counting to 100", "desc": "Practice counting all the way up to 100."},
        {"id": "qpeNIAjY1u0", "title": "Shapes in Real Life", "desc": "Finding shapes in everyday objects around us."},
        {"id": "YwVb94aV4U4", "title": "Greater Than, Less Than", "desc": "Learn how to compare numbers using the alligator method."},
        {"id": "S71Qv5xHYj4", "title": "Addition up to 20", "desc": "Practicing adding numbers up to 20."},
        {"id": "3A3z0D-7Zg8", "title": "Counting by 10s", "desc": "Learn how to count by tens fast and easy."},
        {"id": "K3Y-G4w2-p8", "title": "Left and Right", "desc": "Learn the difference between left and right directions."}
    ],
    "game-2.html": [
        {"id": "HQ_7_cQYc4o", "title": "The ABC Song", "desc": "The classic alphabet song to learn the English alphabet."},
        {"id": "bellZaVu2A4", "title": "Alphabet Sounds", "desc": "Learn the phonics sounds of every letter."},
        {"id": "T65Z6AkvU4w", "title": "Colors Song", "desc": "Learn the vocabulary for different basic colors."},
        {"id": "yQS29S-I07c", "title": "Hygiene Vocabulary", "desc": "Learn words related to daily routines like brushing teeth."},
        {"id": "I8GeA3anPdo", "title": "Weather Words", "desc": "How is the weather? Learn sunny, rainy, and more."},
        {"id": "Z6mH_V0jshA", "title": "Body Parts", "desc": "Head, shoulders, knees, and toes vocabulary song."},
        {"id": "qreH3P6itw4", "title": "Fruits Song", "desc": "Learn the names of delicious common fruits."},
        {"id": "Gjk_dG_c2I4", "title": "Vehicles", "desc": "Learn vocabulary about buses, cars, and other transport."},
        {"id": "YJyNoFkud6g", "title": "Family Members", "desc": "Learn words for family members like mother, father, brother."},
        {"id": "mXMofxtDPUQ", "title": "Days of the Week", "desc": "Learn all seven days of the week in English."},
        {"id": "Fe9bnYRzFvk", "title": "Months of the Year", "desc": "Learn the twelve months of the calendar year."},
        {"id": "5oYKonuEtsE", "title": "Animal Sounds", "desc": "Learn the names of common animals and their sounds."},
        {"id": "75Xv0lDDEm8", "title": "Opposites", "desc": "Learn basic opposite words like hot and cold."},
        {"id": "zZicXQvK5Ew", "title": "Clothes Vocabulary", "desc": "Learn the names of common clothing items."},
        {"id": "cIExZ07vMkc", "title": "Food Vocabulary", "desc": "Learn the names of basic everyday foods."}
    ],
    "game-3.html": [
        {"id": "l4WNrvVjiTw", "title": "How Are You Feeling?", "desc": "Learn to express basic emotions and feelings."},
        {"id": "rKshzOfNQuM", "title": "Magic Words", "desc": "Learn to use polite words like please and thank you."},
        {"id": "9_9VDbT0hxk", "title": "Sharing is Caring", "desc": "Learn the importance of sharing with friends."},
        {"id": "3k2-y6r3g6A", "title": "Making Friends", "desc": "How to introduce yourself and make new friends."},
        {"id": "qErbkZgA-b4", "title": "Taking Turns", "desc": "Learn why it's important to take turns when playing."},
        {"id": "2O5074K-w24", "title": "Saying Sorry", "desc": "Learn how and when to apologize to others."},
        {"id": "FvJ9c4F68G0", "title": "Helping Out", "desc": "The joy of helping parents and teachers."},
        {"id": "xY8h_qR1TfA", "title": "Personal Space", "desc": "Understanding boundaries and respecting personal space."},
        {"id": "8P2r5R20nJc", "title": "Listening Skills", "desc": "How to be a good listener when others are talking."},
        {"id": "B6cZq26gM4g", "title": "Being Honest", "desc": "The importance of telling the truth."},
        {"id": "_6M2I1i8Z24", "title": "Teamwork", "desc": "Working together to achieve a common goal."},
        {"id": "V_M_h5I_0b0", "title": "Dealing with Anger", "desc": "Healthy ways to cope with feeling mad or frustrated."},
        {"id": "39908F879-c", "title": "Bedtime Routine", "desc": "Establishing good routines for bedtime."},
        {"id": "4j1u20tB0E0", "title": "Asking for Help", "desc": "It's okay to ask for help when you need it."},
        {"id": "e_r2oGEE2fU", "title": "Being Brave", "desc": "How to handle feeling scared or trying new things."}
    ],
    "game-4.html": [
        {"id": "7V-YOf8oVl0", "title": "Primary Colors Art", "desc": "Learn how to mix primary colors to make new ones."},
        {"id": "_mZBaS_iMvA", "title": "Rhythm and Beats", "desc": "Learn about basic musical rhythms by clapping."},
        {"id": "nUOx7Oey8-o", "title": "Making Stories", "desc": "Use your imagination to invent fun stories."},
        {"id": "QhM_GxkI2I8", "title": "Drawing Animals", "desc": "Simple step-by-step drawing of common animals."},
        {"id": "B-Xp6Q_FmE0", "title": "Origami Basics", "desc": "Learn how to fold paper into wonderful shapes."},
        {"id": "5C8xQ2x8I20", "title": "Painting with Sponges", "desc": "A fun and messy creative art project for kids."},
        {"id": "y_D6U5w7k3k", "title": "Musical Instruments", "desc": "Discover the sounds of different musical instruments."},
        {"id": "b0n95-bJk6s", "title": "Shadow Puppets", "desc": "How to make shadow puppets with your hands."},
        {"id": "Yv_v4n5Zp88", "title": "Clay Modeling", "desc": "Basic shapes and creations using playdough or clay."},
        {"id": "h8a9v6F2b1o", "title": "Singing Along", "desc": "Warm up your voice and sing fun melodies."},
        {"id": "u4W9c6U2w3s", "title": "Dancing Fun", "desc": "Move your body and express yourself through dance."},
        {"id": "v3b4M6q2B8s", "title": "Building Blocks", "desc": "Creative block building and architecture for kids."},
        {"id": "p5X7z4Y9e2t", "title": "Nature Art", "desc": "Creating art using leaves, twigs, and nature."},
        {"id": "o9F2c5R7u1x", "title": "Let's Pretend", "desc": "The magic of pretend play and acting."},
        {"id": "k2J8v5P9w4m", "title": "Finger Painting", "desc": "Expressing creativity through colorful finger painting."}
    ],
    "game-5.html": [
        {"id": "m_QW_v7FhX4", "title": "Pattern Recognition", "desc": "Learn to identify and complete logical patterns."},
        {"id": "D3_v7S0Xj7M", "title": "Matching Game", "desc": "Improve memory and focus by matching pairs."},
        {"id": "6i1r_UvY80U", "title": "Kid Riddles", "desc": "Challenge your brain with simple logic riddles."},
        {"id": "y2_z7r4t0lY", "title": "Which one belongs?", "desc": "Find the grouping logic of different objects."},
        {"id": "0G6L0I-f-X8", "title": "Habitats Logic", "desc": "Where do animals belong? Logical categorization."},
        {"id": "M00Jb_T4_fI", "title": "Planets Order", "desc": "Learning sequence and order using the planets."},
        {"id": "zPqE6Tmv-o0", "title": "Life Cycles", "desc": "Understanding cause, effect, and sequence in nature."},
        {"id": "G39v6S0oD2Q", "title": "Dinosaur Facts", "desc": "Categorizing dinosaurs by their characteristics."},
        {"id": "h9c7v5X6m0p", "title": "Sorting Objects", "desc": "Logic of sorting by color, shape, and size."},
        {"id": "b3N8m5Z2v4x", "title": "Maze Puzzles", "desc": "Tracing paths and solving simple mazes."},
        {"id": "v5P9k2J8w4m", "title": "Spot the Difference", "desc": "Enhance visual logic by finding differences."},
        {"id": "c5R7u1xo9F2", "title": "Sequencing Events", "desc": "What happens first, next, and last?"},
        {"id": "X8m1v4T6b2p", "title": "Size Ordering", "desc": "Logical ordering from smallest to largest."},
        {"id": "Z2v4xb3N8m5", "title": "Shadow Matching", "desc": "Matching objects to their correct silhouettes."},
        {"id": "T6b2pX8m1v4", "title": "Part to Whole", "desc": "Understanding how pieces fit together to make a whole."}
    ]
}

def update_file(filename):
    if filename not in video_data:
        return
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    videos = video_data[filename]
    
    # We will search for block of <div class="video-card">
    # Because replacing full blocks with regex can be tricky with HTML, 
    # we'll look for iframe src, video-title, video-desc, and the saveVideo function arguments.
    
    # We will iterate and replace step by step
    for i, video in enumerate(videos):
        game_num = i + 1
        lesson_title = f"Game {game_num}: {video['title']}"
        youtube_url = f"https://www.youtube.com/embed/{video['id']}"
        poster_url = f"https://img.youtube.com/vi/{video['id']}/0.jpg"
        
        # Regex to find the i-th video card components. We'll use a custom replacement logic.
        # It's easier to split the content by <div class="video-card" and rebuild it.
        
    parts = content.split('<div class="video-card"')
    new_parts = [parts[0]]
    
    for i in range(1, len(parts)):
        part_content = parts[i]
        if i - 1 < len(videos):
            vid = videos[i-1]
            game_num = i
            lesson_title = f"Game {game_num}: {vid['title']}"
            youtube_url = f"https://www.youtube.com/embed/{vid['id']}"
            poster_url = f"https://img.youtube.com/vi/{vid['id']}/0.jpg"
            clean_title = vid['title'].replace("'", "\\'")
            clean_desc = vid['desc'].replace("'", "\\'")
            
            # Replace iframe src
            part_content = re.sub(r'<iframe src="[^"]+"', f'<iframe src="{youtube_url}"', part_content, count=1)
            
            # Replace video-title
            part_content = re.sub(r'<div class="video-title">.*?</div>', f'<div class="video-title">{lesson_title}</div>', part_content, count=1, flags=re.DOTALL)
            
            # Replace video-desc
            part_content = re.sub(r'<div class="video-desc">.*?</div>', f'<div class="video-desc">{vid["desc"]}</div>', part_content, count=1, flags=re.DOTALL)
            
            # Replace saveVideo args
            part_content = re.sub(r'saveVideo\([^)]+\)', f"saveVideo('{clean_title}', '{clean_desc}', '{youtube_url}', '{poster_url}')", part_content, count=1)
            
        new_parts.append(part_content)
        
    new_content = '<div class="video-card"'.join(new_parts)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {filename}")

for filename in video_data.keys():
    update_file(filename)
