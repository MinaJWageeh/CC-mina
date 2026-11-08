Add-Type -AssemblyName System.Drawing
$size = 256
$bmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.Clear([System.Drawing.Color]::Transparent)

# Hexagon Shield Background
$pts = @(
    [System.Drawing.PointF]::new(128, 12),
    [System.Drawing.PointF]::new(222, 43),
    [System.Drawing.PointF]::new(232, 150),
    [System.Drawing.PointF]::new(134, 240),
    [System.Drawing.PointF]::new(122, 240),
    [System.Drawing.PointF]::new(24, 150),
    [System.Drawing.PointF]::new(34, 43)
)
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddPolygon($pts)

$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    [System.Drawing.PointF]::new(0, 0),
    [System.Drawing.PointF]::new(0, 256),
    [System.Drawing.Color]::FromArgb(255, 30, 41, 59),
    [System.Drawing.Color]::FromArgb(255, 2, 6, 23)
)
$g.FillPath($bgBrush, $path)

$ringPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 56, 189, 248)), 8
$g.DrawPath($ringPen, $path)

# Circuit pads & contactor
$blueBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 56, 189, 248))
$amberBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 245, 158, 11))
$whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
$goldPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 245, 158, 11)), 4

$g.FillEllipse($amberBrush, 80, 85, 10, 10)
$g.FillEllipse($amberBrush, 123, 80, 10, 10)
$g.FillEllipse($amberBrush, 166, 85, 10, 10)

$g.FillEllipse($blueBrush, 80, 125, 10, 10)
$g.FillEllipse($blueBrush, 123, 130, 10, 10)
$g.FillEllipse($blueBrush, 166, 125, 10, 10)

# Lightning Bolt
$boltPts = @(
    [System.Drawing.PointF]::new(140, 30),
    [System.Drawing.PointF]::new(70, 130),
    [System.Drawing.PointF]::new(125, 130),
    [System.Drawing.PointF]::new(95, 225),
    [System.Drawing.PointF]::new(186, 110),
    [System.Drawing.PointF]::new(131, 110)
)
$boltPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$boltPath.AddPolygon($boltPts)

$boltBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    [System.Drawing.PointF]::new(70, 30),
    [System.Drawing.PointF]::new(186, 225),
    [System.Drawing.Color]::FromArgb(255, 56, 189, 248),
    [System.Drawing.Color]::FromArgb(255, 251, 191, 36)
)
$g.FillPath($boltBrush, $boltPath)

# Inner Core
$corePts = @(
    [System.Drawing.PointF]::new(137, 38),
    [System.Drawing.PointF]::new(80, 125),
    [System.Drawing.PointF]::new(128, 125),
    [System.Drawing.PointF]::new(103, 210),
    [System.Drawing.PointF]::new(175, 115),
    [System.Drawing.PointF]::new(128, 115)
)
$corePath = New-Object System.Drawing.Drawing2D.GraphicsPath
$corePath.AddPolygon($corePts)
$g.FillPath($whiteBrush, $corePath)

$g.FillEllipse($whiteBrush, 125, 130, 6, 6)

if (!(Test-Path public)) { New-Item -ItemType Directory -Path public }
$bmp.Save('public\app-icon.png', [System.Drawing.Imaging.ImageFormat]::Png)

$hIcon = $bmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fs = [System.IO.File]::OpenWrite('public\favicon.ico')
$icon.Save($fs)
$fs.Close()

$fs2 = [System.IO.File]::OpenWrite('app-icon.ico')
$icon.Save($fs2)
$fs2.Close()

Write-Output 'Done'
