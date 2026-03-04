# PowerShell script to fix video translations in all game pages

$games = @(
    @{ file = "game-1.html"; title_i18n = "math_title"; title_en = "Logical Thinking" },
    @{ file = "game-2.html"; title_i18n = "science_title"; title_en = "Creative Thinking" },
    @{ file = "game-3.html"; title_i18n = "geo_title"; title_en = "Science and Technology" },
    @{ file = "game-4.html"; title_i18n = "lit_title"; title_en = "Team and Communication" },
    @{ file = "game-5.html"; title_i18n = "logic_title"; title_en = "Logic Puzzles" }
)

foreach ($game in $games) {
    Write-Host "Processing $($game.file)..."
    
    $content = Get-Content $game.file -Raw -Encoding UTF8
    
    # Replace video titles - looking for any pattern with " - Lesson X"
    for ($i = 1; $i -le 30; $i++) {
        # Match various title patterns with " - Lesson $i"
        $pattern = '<div class="video-title">[^<]+ - Lesson ' + $i + '</div>'
        $replacement = '<div class="video-title"><span data-i18n="' + $game.title_i18n + '">' + $game.title_en + '</span> - <span data-i18n="lesson">Lesson</span> ' + $i + '</div>'
        $content = $content -replace $pattern, $replacement
    }
    
    # Replace video descriptions - simpler approach
   $content = $content -replace '<div class="video-desc">Explore the fundamentals[^<]+</div>', '<div class="video-desc" data-i18n="video_lesson_desc">Explore the fundamentals in this interactive lesson. Perfect for preschool learning and development.</div>'
    
    Set-Content $game.file -Value $content -Encoding UTF8
    Write-Host "✓ $($game.file) updated!"
}

Write-Host "`n✅ All games updated successfully!"
