import Graphics.Input as Input
import Mouse
import Signal
import Window

data Event = Click (Int, Int) | Resize (Int, Int)

-- MODEL--
model = {forms=[], sz={w=400,h=400}, pts=[], start=(0,0)}

-- INPUT
evS = merges [ Resize <~ Window.dimensions
             , Click <~ sampleOn Mouse.clicks Mouse.position
             ]

-- UPDATE
update ev m = case ev of
  Click pos -> addPoint (toCollageTrans pos m.sz) m
  Resize (w,h) -> {m | sz <- {w=toFloat w, h=toFloat <| h-50}}

addPoint p m = case m.pts of
  [] -> {m | pts <- [p], start <- p}
  _  -> if | near p m.start -> processShape m
           | otherwise -> {m | pts <- p::m.pts}

processShape m =
  let rawShape = filled gray <| polygon m.pts
      outline = outlined defaultLine <| polygon m.pts
  in {m | forms <- m.forms ++ [rawShape, outline] , pts <- [] }

-- DISPLAY
display m = flip above (asText m) <|
  collage (round m.sz.w) (round m.sz.h) <|
          [ outlined defaultLine <| rect m.sz.w m.sz.h
          , traced defaultLine <| path m.pts]
         ++ m.forms

main = display <~ foldp update model evS

-- Helpers
near p p' = 10 > dist p p'
dist (x,y) (x',y') = sqrt <| (x-x')^2 + (y-y')^2

-- translate mouse coords to collage coordinate system
toCollageTrans (x,y) c =
  (toFloat x - c.w/ 2, c.h/2 - toFloat y) -- y increases as the mouse lowers

undefined = undefined
