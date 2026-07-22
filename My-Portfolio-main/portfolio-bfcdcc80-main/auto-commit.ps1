$projectDir = $PSScriptRoot
$branch = "main"
$pollInterval = 3

Write-Host "Auto-commit watcher started for: $projectDir" -ForegroundColor Cyan

Set-Location $projectDir

# Commit any existing changes first
$existingStatus = git status --porcelain
if (-not [string]::IsNullOrWhiteSpace($existingStatus)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $changedFiles = (git status --porcelain | Measure-Object).Count
    $commitMsg = "Auto-commit: $changedFiles file(s) updated at $timestamp"
    git add -A
    git commit -m $commitMsg --quiet
    Write-Host "Committed existing changes: $commitMsg" -ForegroundColor Green
    $pushResult = git push origin $branch 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Pushed to origin/$branch" -ForegroundColor Cyan
    } else {
        Write-Host "Push failed: $pushResult" -ForegroundColor Red
    }
}

Write-Host "Watching for changes every ${pollInterval}s... Press Ctrl+C to stop." -ForegroundColor Yellow

$lastHash = git rev-parse HEAD

while ($true) {
    Start-Sleep -Seconds $pollInterval

    $currentHash = git rev-parse HEAD
    $status = git status --porcelain

    if (-not [string]::IsNullOrWhiteSpace($status)) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $changedFiles = (git status --porcelain | Measure-Object).Count
        $commitMsg = "Auto-commit: $changedFiles file(s) updated at $timestamp"

        git add -A
        git commit -m $commitMsg --quiet
        Write-Host "[$timestamp] Committed: $commitMsg" -ForegroundColor Green

        $pushResult = git push origin $branch 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$timestamp] Pushed to origin/$branch" -ForegroundColor Cyan
        } else {
            Write-Host "[$timestamp] Push failed: $pushResult" -ForegroundColor Red
        }

        $lastHash = git rev-parse HEAD
    }
}
