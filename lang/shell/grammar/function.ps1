function Add-One {
  param (
    [int]$number
  )
  return $number + 1
}

$result = Add-One -number 5
Write-Output $result