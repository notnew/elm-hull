import Graphics.Input as Input
import Mouse
import Signal
import Window

data Event = Click (Int, Int) | Resize (Int, Int)

data Dir = LeftTurn | RightTurn | Straight

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
      hullOutLine = outlined {defaultLine | color <- red} <| polygon <|
                      hull m.pts
  in {m | forms <- m.forms ++ [rawShape, outline, hullOutLine] , pts <- [] }

-- DISPLAY
display m = flip above (asText (m.pts, m.start,
                                "dirs", getDirections m.pts,
                                "sort", sortBy fst m.pts)) <|
  collage (round m.sz.w) (round m.sz.h) <|
          [ outlined defaultLine <| rect m.sz.w m.sz.h
          , traced defaultLine <| path m.pts]
         ++ m.forms

main = display <~ foldp update model evS

-- Helpers
near p p' = 10 > dist p p'
dist (x,y) (x',y') = sqrt <| (x-x')^2 + (y-y')^2
diff (x,y) (x',y') = (x-x', y-y')

-- translate mouse coords to collage coordinate system
toCollageTrans (x,y) c =
  (toFloat x - c.w/ 2, c.h/2 - toFloat y) -- y increases as the mouse lowers

direction (x,y) (x', y') =
  let cross = x * y' - y * x' -- z component of cross product
  in if | cross < 0 -> LeftTurn
        | cross > 0 -> RightTurn
        | otherwise -> Straight

getDirection a b c = direction (diff b a) (diff c b)
getDirections ps = case ps of
  (a::b::c::ps) -> getDirection a b c :: getDirections (b::c::ps)
  _             -> []

hull pts =
  let sorted = sortBy fst pts
      top = go LeftTurn (tail sorted) [head sorted]
      bottom = go RightTurn (tail sorted) [head sorted]
      go dir pts stack = case (pts, stack) of
          ([], s)              -> s
          ((p::ps), (s::[]))   -> go dir ps (p::stack)
          ((p::ps), (b::a::ss)) ->
              if | getDirection a b p == dir -> go dir ps (p::stack)
                 | otherwise                 -> go dir pts (a::ss)
  in top ++ reverse bottom

undefined = undefined
