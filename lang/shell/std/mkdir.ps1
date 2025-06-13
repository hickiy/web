function New-EmptyFile {
  param (
    [Parameter(Mandatory=$true)]
    [string]$Path,
    [Parameter(Mandatory=$true)]
    [string]$FileName
  )

  $fullPath = Join-Path -Path $Path -ChildPath $FileName

  if (-not (Test-Path -Path $Path)) {
    New-Item -Path $Path -ItemType Directory | Out-Null
  }

  New-Item -Path $fullPath -ItemType File -Force | Out-Null
}

# 示例用法
New-EmptyFile -Path "E:\Temp" -FileName "test.txt"