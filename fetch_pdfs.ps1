$slugs = @(
    "longman-photo-dictionary-of-american-english",
    "english-unlimited",
    "prepositon-focus-on-building-mastery",
    "technical-english-",
    "2087-english-for-meetings-phrases-expressions-and-one-case-to-be-fluent-in-meetings",
    "mcgraw-hill-conversational-american-english",
    "english-vocabulary-in-use-upper-intermediate",
    "practical-english-usage",
    "spoken-english-conversation-practice",
    "english-phonetics-and-phonology-an-introduction-book",
    "talk-english-the-secret-to-speak-english",
    "30-topics-for-english-conversation-book",
    "1500-vocabulary-words-for-speaking-english-book",
    "how-to-get-really-good-at-english-book",
    "learn-how-to-speak-english-fluently-english-speaking-mastery-in-7-easy-steps-book",
    "macmillan-english-grammar-in-context-intermediate-1",
    "fundamentals-of-english-grammar-workbook",
    "english-in-everyday-life",
    "black-book-of-english-vocabulary",
    "improve-your-written-english-master-the-essentials-of-grammar-punctuation-and-spelling-and-write-with-greater-confidence",
    "goethe-zertifikat-pruefung-c2-grosses-deutsches-sprachdiplom-modellsatz",
    "goethe-zertifikat-c1-ubungssatz-01-kandidatenblatter-pruferblatter",
    "goethe-zertifikat-b2-prufungsziele-testbeschreibung",
    "goethe-zertifikat-b2-ubungssatz-03-kandidatenblatte-pruferblatter",
    "goethe-zertifikat-b1-deutschprufung-fur-jugendliche-und-erwachsene",
    "goethe-zertifikat-b1-ubungssatz-erwachsene-kandidatenblatte-pruferblatter",
    "goethe-zertifikat-a2-fur-jugendliche-fit-in-deutsch-2",
    "goethe-zertifikat-a2-fit-in-deutsch-2",
    "goethe-zertifikat-a1-start-deutsch-1-prufungsziele-testbeschreibung",
    "goethe-zertifikat-a1-fit-in-deutsch-1-ubungssatz-01-kandidatenblatter-pruferblatter"
)

$baseUrl = "https://pdf1.dunkinmenu.org/17490"
$outFile = "C:\Users\Office\Documents\LifeWithBooks\pdf_urls.txt"
$results = @()
$ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

foreach ($slug in $slugs) {
    $url = "$baseUrl/$slug/"
    Write-Host "Fetching: $slug ..."
    $html = $null
    for ($attempt = 1; $attempt -le 3; $attempt++) {
        $html = curl.exe -s -L --max-time 30 -A $ua $url 2>$null
        if ($html) { break }
        Write-Host "  Retry $attempt..."
        Start-Sleep -Seconds 2
    }
    if ($html) {
        $joined = ($html -join " ")
        $dlUrl = $null
        if ($joined -match 'elementor-button\s+elementor-button-link[^"]*"\s*href="([^"]+)"') {
            $dlUrl = $matches[1]
        } elseif ($joined -match 'elementor-button[^>]*href="([^"]+)"') {
            $dlUrl = $matches[1]
        }
        if ($dlUrl -and $dlUrl -ne "https://pdf1.dunkinmenu.org/" -and $dlUrl -ne "#") {
            $results += "$slug|$dlUrl"
            Write-Host "  Found: $dlUrl"
        } else {
            $results += "$slug|NOT_FOUND"
            Write-Host "  No valid download URL found"
        }
    } else {
        $results += "$slug|FETCH_ERROR"
        Write-Host "  Fetch failed after retries"
    }
}

$results | Out-File -FilePath $outFile -Encoding UTF8
Write-Host "`nDone. Saved to $outFile"
