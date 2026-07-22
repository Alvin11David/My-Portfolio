$projectDir = $PSScriptRoot
$branch = "main"

Write-Host "Auto-commit watcher started for: $projectDir" -ForegroundColor Cyan
Write-Host "Watching for changes... Press Ctrl+C to stop." -ForegroundColor Yellow

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $projectDir
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $false
$watcher.Filter = "*.*"
$watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite -bor [System.IO.NotifyFilters]::FileName

# Folders to ignore
$ignoreFolders = @("node_modules", ".git", "dist", ".firebase", ".cache")

$debounceTimer = $null
$debounceInterval = 2000

function Process-Changes {
    Set-Location $projectDir

    $status = git status --porcelain
    if ([string]::IsNullOrWhiteSpace($status)) {
        return
    }

    Write-Host ""
    Write-Host "Changes detected at $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Green

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $changedFiles = (git status --porcelain | Measure-Object).Count
    $commitMsg = "Auto-commit: $changedFiles file(s) updated at $timestamp"

    git add -A
    git commit -m $commitMsg --quiet
    Write-Host "Committed: $commitMsg" -ForegroundColor Green

    $pushResult = git push origin $branch 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Pushed to origin/$branch" -ForegroundColor Cyan
    } else {
        Write-Host "Push failed: $pushResult" -ForegroundColor Red
    }
}

$action = {
    $changedPath = $Event.SourceEventArgs.FullPath
    $relativePath = $changedPath.Replace($projectDir, "").TrimStart("\", "/")

    $shouldIgnore = $false
    foreach ($folder in $ignoreFolders) {
        if ($relativePath.StartsWith($folder)) {
            $shouldIgnore = $true
            break
        }
    }

    if ($shouldIgnore) { return }

    if ($debounceTimer) {
        $debounceTimer.Stop()
        $debounceTimer.Dispose()
    }

    $script:debounceTimer = [System.Diagnostics.Stopwatch]::StartNew()
    Start-Sleep -Milliseconds $debounceInterval

    if ($script:debounceTimer.ElapsedMilliseconds -ge $debounceInterval) {
        &Process-Changes
    }
}

Register-ObjectEvent $watcher "Changed" -Action $action | Out-Null
Register-ObjectEvent $watcher "Created" -Action $action | Out-Null
Register-ObjectEvent $watcher "Deleted" -Action $action | Out-Null
Register-ObjectEvent $watcher "Renamed" -Action $action | Out-Null

try {
    while ($true) { Wait-Event -Timeout 1 }
} finally {
    Unregister-Event -SourceIdentifier $watcher.Name -ErrorAction SilentlyContinue
    $watcher.Dispose()
    Write-Host "Watcher stopped." -ForegroundColor Yellow
}
